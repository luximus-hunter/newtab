const getFaviconLinkFromUrl = (url: string): string => {
	const urlObj = new URL(url);
	return `https://external-content.duckduckgo.com/ip3/${urlObj.hostname}.ico`;
};

export default getFaviconLinkFromUrl;
