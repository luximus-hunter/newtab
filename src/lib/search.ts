import type { TLink } from './types/link';

const search = (query: string, links: TLink[]): TLink[] => {
	const queryCleaned = query.toLowerCase().trim();
	const results = links.filter((link) => {
		const title = link.title.toLowerCase();
		const url = link.url.toLowerCase();

		return title.includes(queryCleaned) || url.includes(queryCleaned);
	});

	return results;
};

export default search;
