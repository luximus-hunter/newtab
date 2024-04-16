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
let focusedLink = 0;

fetch("./config.json")
  .then((response) => response.json())
  .then((data) => {
    groups = data;
    loaded();
  });

const loaded = () => {
  window.removeEventListener("keydown", onWindowKeyDown);
  window.addEventListener("keydown", onWindowKeyDown);
  searchButton.addEventListener("click", goToSearchResult);
  searchInput.addEventListener("keyup", searchOnKeyUp);
  searchInput.addEventListener("keypress", searchOnKeyPress);
  searchInput.focus();

  renderGroups(groups);
};

const focusLink = (index) => {
  const links = document.querySelectorAll("a");
  links.forEach((link, i) => {
    if (i === index) {
      link.classList.add("focused");
      //link.focus();
    } else {
      link.classList.remove("focused");
    }
  });
};

const onWindowKeyDown = (event) => {
  if (
    !(document.activeElement === searchInput && searchInput.value.length > 0)
  ) {
    return;
  }

  if (event.key === "ArrowDown") {
    focusedLink++;
    if (focusedLink >= getLinkCount()) {
      focusedLink = 0;
    }
    focusLink(focusedLink);
  } else if (event.key === "ArrowUp") {
    focusedLink--;
    if (focusedLink < 0) {
      focusedLink = getLinkCount() - 1;
    }
    focusLink(focusedLink);
  } else if (event.key === "Enter") {
    // This is handled at the input level. Do nothing.
  } else {
    searchInput.focus();
    searchInput.dispatchEvent(event);
  }
};

const searchOnKeyUp = (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    return;
  }

  const query = searchInput.value;
  if (query.length > 0) {
    clearChildren(groupContainer);
    resultsContainer.classList.remove("hidden");
    groupContainer.classList.add("hidden");
    search(query);
    focusLink(0);
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
  if (searchInput.value.length < 1) {
    return;
  }

  if (getLinkCount() < 1) {
    location.href = searchUrl + searchInput.value;
  } else if (focusedLink >= 0) {
    const links = document.querySelectorAll("a");
    searchInput.value = "";
    links[focusedLink].click();
  } else {
    searchInput.value = "";
    goToFirstLink();
  }
};
