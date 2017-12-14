import { addClass, removeClass } from './helpers/dom-elements';
import PubSub from './pubsub';

const placeholder = document.querySelector('#js-search_results');
const loadr = document.querySelector('.loader');

function clearResults() {
  placeholder.innerHTML = '';
  removeClass(loadr, 'u-hidden');
}

function render(pubobj) {
  const songList = pubobj.songList;
  const searchTerm = pubobj.searchTerm;

  let htmlStuff = '';
  htmlStuff = `<h2 class="c-search__heading">Search Results: <span c-search__term>${searchTerm}</span></h2><section class="c-search__list">`;
  Object.keys(songList).forEach((key) => {
    htmlStuff += `<p class="c-search__artist">${key}</p><ul>`;
    songList[key].forEach((value) => {
      htmlStuff += `<li class="c-search__title"><a href="#sign-up">${value.title}</a></li>`;
    });
    htmlStuff += '</ul>';
  });
  htmlStuff += '</section>';
  addClass(loadr, 'u-hidden');
  placeholder.innerHTML = htmlStuff;
}

PubSub.subscribe('searchStart', clearResults);
PubSub.subscribe('searchComplete', render);
