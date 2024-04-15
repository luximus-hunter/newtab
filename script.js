const searchUrl = "https://duckduckgo.com/?q=";
const searchProvider = "DuckDuckGo";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const groupContainer = document.getElementById("groups");
const resultsContainer = document.getElementById("results");
resultsContainer.classList.add("links");
resultsContainer.classList.add("group");
resultsContainer.classList.add("hidden");

let groups = [];

fetch("./config.json")
  .then((response) => response.json())
  .then((data) => {
    groups = data;
    loaded();
  });

const loaded = () => {
  searchInput.addEventListener("keyup", searchOnKeyUp);
  searchInput.addEventListener("keypress", searchOnKeyPress);
  searchInput.focus();
  renderGroups(groups);
};

const searchOnKeyUp = () => {
  const query = searchInput.value;
  if (query.length > 0) {
    clearChildren(groupContainer);
    resultsContainer.classList.remove("hidden");
    groupContainer.classList.add("hidden");
    search(query);
  } else {
    clearChildren(resultsContainer);
    groupContainer.classList.remove("hidden");
    resultsContainer.classList.add("hidden");
    renderGroups(groups);
  }
};

const searchOnKeyPress = (event) => {
  if (!event) event = window.event;

  const keyCode = event.code || event.key;
  if (keyCode == "Enter") {
    event.preventDefault();
    goToSearchResult();
  }
};

const search = (query) => {
  const links = groups.reduce((acc, group) => {
    const found = group.links.filter((link) =>
      link.title.toLowerCase().includes(query.toLowerCase())
    );
    return [...acc, ...found];
  }, []);

  // if (links.length < 1) {
  const link = {
    title: query,
    url: searchUrl + query,
  };

  links.push(link);
  // }

  clearChildren(resultsContainer);
  renderLinks(links, resultsContainer, true);
};

const renderGroups = (groups) => {
  clearChildren(groupContainer);

  groups.forEach((g) => {
    const title = document.createElement("h1");
    title.className = "title";
    title.innerText = g.title;

    const container = document.createElement("div");
    container.className = "links";

    renderLinks(g.links, container);

    const group = document.createElement("div");
    group.className = "group";
    group.appendChild(title);
    group.appendChild(container);

    groupContainer.appendChild(group);
  });
};

const renderLinks = (links, container, renderGroup = false) => {
  clearChildren(container);
  links.forEach((link) => {
    const linkA = document.createElement("a");
    linkA.className = "link";
    linkA.href = link.url;

    const linkSpan = document.createElement("span");
    linkSpan.innerText = link.title;
    linkA.appendChild(linkSpan);

    if (renderGroup) {
      let group = groups.find((g) => g.links.includes(link));

      const groupSpan = document.createElement("span");
      groupSpan.className = "group-name";
      groupSpan.innerText = group ? group.title : `Search ${searchProvider}`;
      linkA.appendChild(groupSpan);
    }

    container.appendChild(linkA);
  });
};

const goToFirstLink = () => {
  const firstLink = document.querySelector("a");
  if (firstLink) {
    firstLink.click();
  }
};

const getLinkCount = () => {
  return document.querySelectorAll("a").length;
};

const clearChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

const goToSearchResult = () => {
  if (getLinkCount() < 1) {
    location.href = searchUrl + searchInput.value;
  } else {
    searchInput.value = "";
    goToFirstLink();
  }
};

searchButton.addEventListener("click", goToSearchResult);
