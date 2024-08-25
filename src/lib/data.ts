import type { TGroup } from './types/group';
import type { TLink } from './types/link';

const LS_PREFIX = 'newtab_';

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const getGroups = (): TGroup[] => {
	const groups = localStorage.getItem(`${LS_PREFIX}groups`);
	const groupsJson = JSON.parse(groups || '[]') as TGroup[];

	groupsJson.sort((a, b) => a.title.localeCompare(b.title));

	return groupsJson;
};
const getGroup = (id: string): TGroup | null => {
	const groups = getGroups();
	return groups.find((group) => group.id === id) || null;
};
const setGroups = (groups: TGroup[]) => {
	localStorage.setItem(`${LS_PREFIX}groups`, JSON.stringify(groups));
};

const setGroup = (group: TGroup) => {
	const groups = getGroups();

	if (groups.some((g) => g.id === group.id)) {
		const index = groups.findIndex((g) => g.id === group.id);
		groups[index] = group;
	} else {
		groups.push(group);
	}

	localStorage.setItem(`${LS_PREFIX}groups`, JSON.stringify(groups));
};
const deleteGroup = (id: string) => {
	const groups = getGroups();
	const newGroups = groups.filter((group) => group.id !== id);
	localStorage.setItem(`${LS_PREFIX}groups`, JSON.stringify(newGroups));
};

const getLinks = (): TLink[] => {
	const links = localStorage.getItem(`${LS_PREFIX}links`);
	return (links ? JSON.parse(links) : []) as TLink[];
};
const getLink = (id: string): TLink | null => {
	const links = getLinks();
	return links.find((link) => link.id === id) || null;
};
const setLinks = (links: TLink[]) => {
	localStorage.setItem(`${LS_PREFIX}links`, JSON.stringify(links));
};
const setLink = (link: TLink) => {
	const links = getLinks();

	if (links.some((l) => l.id === link.id)) {
		const index = links.findIndex((l) => l.id === link.id);
		links[index] = link;
	} else {
		links.push(link);
	}

	localStorage.setItem(`${LS_PREFIX}links`, JSON.stringify(links));
};
const deleteLink = (id: string) => {
	const links = getLinks();
	const newLinks = links.filter((link) => link.id !== id);
	localStorage.setItem(`${LS_PREFIX}links`, JSON.stringify(newLinks));
};

const getGroupLinks = (groupId: string): TLink[] => {
	const links = getLinks();
	return links.filter((link) => link.groupId === groupId);
};

const getLinkGroup = (linkId: string): TGroup | null => {
	const links = getLinks();
	const link = links.find((link) => link.id === linkId);

	if (!link) return null;

	const groups = getGroups();
	const group = groups.find((group) => group.id === link.groupId);

	return group || null;
};

const importOnlineSettings = async () => {
	const response = await fetch(
		'https://raw.githubusercontent.com/luximus-hunter/newtab/master/config.json'
	);
	const data = (await response.json()) as {
		title: string;
		links: { title: string; url: string }[];
	}[];

	console.log('importOnlineSettings', data);

	const groups: TGroup[] = data.map((group) => ({
		id: generateId(),
		title: group.title
	}));

	const links: TLink[] = data.flatMap((group, groupIndex) =>
		group.links.map((link) => ({
			id: generateId(),
			title: link.title,
			url: link.url,
			groupId: groups[groupIndex].id
		}))
	);

	console.log(`${LS_PREFIX}groups`, JSON.stringify(groups));
	console.log(`${LS_PREFIX}links`, JSON.stringify(links));

	localStorage.setItem(`${LS_PREFIX}groups`, JSON.stringify(groups));
	localStorage.setItem(`${LS_PREFIX}links`, JSON.stringify(links));
};

export {
	getGroups,
	getGroup,
	setGroups,
	setGroup,
	deleteGroup,
	getLinks,
	getLink,
	setLinks,
	setLink,
	deleteLink,
	getGroupLinks,
	getLinkGroup,
	importOnlineSettings
};
