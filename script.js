const menuItems = [
  {
    title: 'media',
    color: '#a54242',
    links: [
      {
        url: 'https://www.youtube.com/',
        title: 'youtube',
      },
      {
        url: 'https://play.hbomax.com/profile/select',
        title: 'hbo_max',
      },
      {
        url: 'https://www.spotify.com/',
        title: 'spotify',
      },
    ],
  },
  {
    title: 'beatsaber',
    color: '#e03c80',
    links: [
      {
        url: 'https://www.scoresaber.com/u/76561198393226059/',
        title: 'scoresaber',
      },
      {
        url: 'https://www.beatleader.xyz/u/76561198393226059/',
        title: 'beatleader',
      },
      {
        url: 'https://beatsaver.com/',
        title: 'beatsaver',
      },
      {
        url: 'https://bsaber.com/',
        title: 'beastsaber',
      },
    ],
  },
  {
    title: 'development',
    color: '#de935f',
    links: [
      {
        url: 'https://www.github.com/',
        title: 'github',
      },
      {
        url: 'https://github.com/luximus-hunter?tab=stars',
        title: 'stars',
      },
    ],
  },
  {
    title: 'education',
    color: '#f0c674',
    links: [
      {
        url: 'https://wip.windesheim.nl/',
        title: 'wip',
      },
      {
        url: 'https://leren.windesheim.nl/',
        title: 'elo',
      },
      {
        url: 'https://windesheim.mycampusprint.nl/',
        title: 'print',
      },
    ],
  },
  {
    title: 'security',
    color: '#8c9440',
    links: [
      {
        url: 'https://vault.bitwarden.com/',
        title: 'bitwarden',
      },
      {
        url: 'https://central.bitdefender.com/dashboard/',
        title: 'bitdefender',
      },
      {
        url: 'http://192.168.2.69:8123/',
        title: 'homeassistant',
      },
    ],
  },
  {
    title: 'calendar',
    color: '#85678f',
    links: [
      {
        url: 'https://calendar.google.com/',
        title: 'google',
      },
      {
        url: 'https://www.familywall.com/events.php',
        title: 'familywall',
      },
    ],
  },
  {
    title: 'scouts',
    color: '#487e94',
    links: [
      {
        url: 'https://www.huysmangroep.nl/barbord/',
        title: 'barbord',
      },
      {
        url: 'https://huysmangroeppr.stackstorage.com/s/1d1XWfJAxyy0w7R/',
        title: 'stack',
      },
    ],
  },
];

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

  window.location.replace(`https://start.duckduckgo.com/?q=${search.value}`);
});

setInterval(() => {
  search.focus();
}, 500);
