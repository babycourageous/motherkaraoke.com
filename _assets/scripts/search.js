import PubSub from './pubsub';
import * as api from './api';

const searchForm = document.querySelector('#js-songsearch');
const searchInput = searchForm.querySelector('#js-songsearch__input');

function clearSearch() {
  searchInput.value = '';
}

function searchHandler(evt) {
  const e = evt || window.event;
  e.preventDefault();

  const searchTerm = searchInput.value;
  if (searchTerm !== '') {
    api.searchByName(searchTerm)
      .then((songList) => {
        PubSub.publish('searchComplete', { songList, searchTerm });
      });
  }
}

function onSearchStart(ps) {
  const pubsubObject = ps;

  if (pubsubObject.letter) {
    clearSearch();
  }
}

searchForm.addEventListener('submit', searchHandler);
PubSub.subscribe('searchStart', onSearchStart);

/*


function successHandler(data) {
  const i = _(data).toArray();

  fuse = new Fusejs(i, options); // "list" is the item array
}

// Get the generated search_data.json file so lunr.js can search it locally.
const searchData = $.ajax({
  url: './search_data.json',
  type: 'GET', // default is GET but you can use other verbs based on your needs.
  dataType: 'json', // specify the dataType for future reference
});
searchData.done(successHandler);

function displaySearchResults(results) {
  console.log('success');
  console.log(results);

  const $placeholder = $('#js-search_results');
  const tests = _.sortBy(results, 'artist');
  const testg = _.groupBy(tests, 'artist');
  let htmlStuff = '';
  htmlStuff = '<h2 class="c-search__heading">Search Results</h2><section class="c-search__list">';
  $.each(testg, (key, value) => {
    console.log(`${key}: `);
    console.log(`value = ${value}`);
    htmlStuff += `<p class="c-search__artist">${key}</p><ul>`;
    const val = _.sortBy(value, 'title');
    $.each(val, (k, v) => {
      console.log(`${k}:::${v.title}`);

      htmlStuff += `<li class="c-search__title">${v.title}</li>`;
    });
    htmlStuff += '</ul>';
  });
  htmlStuff += '</section>';
  $placeholder.empty().append(htmlStuff);
}

$(() => {
  // Event when the form is submitted
  $('#js-songsearch').submit((event) => {
    event.preventDefault();
    const $query = $('#js-songsearch_input').val(); // Get the value for the text field
    const fuseResults = fuse.search($query); // Get fuse.js to perform a search

    displaySearchResults(fuseResults); // Hand the results off to be displayed
  });
});
*/
