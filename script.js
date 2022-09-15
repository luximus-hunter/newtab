fetch('./config.json')
  .then((response) => response.json())
  .then((menuItems) => {
    // Menu
    const menu = document.getElementById('menu');

    menuItems.forEach((menuItem) => {
      const ul = document.createElement('ul');
      const t = document.createElement('li');

      t.innerHTML = menuItem.title;
      t.style.color = menuItem.color;

      ul.appendChild(t);

      menuItem.links.forEach((link) => {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.innerHTML = link.title;
        a.href = link.url;

        li.appendChild(a);
        ul.appendChild(li);
      });

      menu.appendChild(ul);
    });

    // Search
    const search = document.getElementById('search');
    search.focus();

    search.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter' || search.value.trim() === '') {
        return;
      }

      window.location.replace(
        `https://start.duckduckgo.com/?q=${search.value}`
      );
    });
  });

setInterval(() => {
  search.focus();
}, 500);
