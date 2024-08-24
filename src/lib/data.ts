const LS_PREFIX = 'newtab_';
const LS_CACHE_PREFIX = `${LS_PREFIX}cache_`;

type LSCache = {
	timestamp: number;
	data: string; // base64 encoded image
};

type Settings = {
	[key: string]: any;
};

const getSettings = (): Settings => {
	const settings = localStorage.getItem(`${LS_PREFIX}settings`);
	return settings ? JSON.parse(settings) : {};
};

const setSettings = (settings: Settings) => {
	localStorage.setItem(`${LS_PREFIX}settings`, JSON.stringify(settings));
};

const faviconUrl = (url: string): string => {
	const urlObj = new URL(url);
	console.log(urlObj.hostname);
	return `https://external-content.duckduckgo.com/ip3/${urlObj.hostname}.ico`;
};

const tempSettings = async () => {
	const res = await fetch(
		'https://raw.githubusercontent.com/luximus-hunter/newtab/master/config.json'
	);
	const json = await res.json();

	return json;
};

export { getSettings, setSettings, faviconUrl, tempSettings };
