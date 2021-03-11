import { fetchEarthquakes } from './lib/earthquakes';
import { el, element, formatDate } from './lib/utils';
import { init, createPopup } from './lib/map';

document.addEventListener('DOMContentLoaded', async () => {
  // TODO
  // Bæta við virkni til að sækja úr lista
  // Nota proxy
  // Hreinsa header og upplýsingar þegar ný gögn eru sótt
  // Sterkur leikur að refactora úr virkni fyrir event handler í sér fall
  
  const url = window.location.search;
  const URLparams = new URLSearchParams(url);
  const period = URLparams.has('period') ? URLparams.get('period') : 'hour';
  const type = URLparams.has('type') ? URLparams.get('type') : 'significant';

  const earthquakes = await fetchEarthquakes(type, period);
  console.log(earthquakes);
  // Fjarlægjum loading skilaboð eftir að við höfum sótt gögn
  const loading = document.querySelector('.loading');
  const parent = loading.parentNode;
  parent.removeChild(loading);
  if (!earthquakes) {
    parent.appendChild(
      el('p', 'Villa við að sækja gögn'),
    );
  }

  const ul = document.querySelector('.earthquakes');
  const map = document.querySelector('.map');
  const duration = earthquakes.info.time;

  init(map);

  earthquakes.data.features.forEach((quake) => {
    const {
      title, mag, time, url,
    } = quake.properties;

    const link = element('a', { href: url, target: '_blank' }, null, 'Skoða nánar');

    const markerContent = el('div',
      el('h3', title),
      el('p', formatDate(time)),
      el('p', link));
    const marker = createPopup(quake.geometry, markerContent.outerHTML);

    const onClick = () => {
      marker.openPopup();
    };

    const li = el('li');

    li.appendChild(
      el('div',
        el('h2', title),
        el('dl',
          el('dt', 'Tími'),
          el('dd', formatDate(time)),
          el('dt', 'Styrkur'),
          el('dd', `${mag} á richter`),
          el('dt', 'Nánar'),
          el('dd', url.toString())),
        element('div', { class: 'buttons' }, null,
          element('button', null, { click: onClick }, 'Sjá á korti'),
          link)),
    );

    ul.appendChild(li);
  });
});
