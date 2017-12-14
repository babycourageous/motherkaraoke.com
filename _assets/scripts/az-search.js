import { delegateEventListener } from './helpers/events';
import PubSub from './pubsub';
import * as api from './api';

const letterMenuContainer = document.querySelector('.az-search');
const songTitles = document.getElementById('js-search_results');
const form = document.getElementById('sign-up');
var selectedArtist = document.getElementById('js-artist__input');
var selectedSong = document.getElementById('js-song__input');
var name = document.getElementById('js-name__input');
var phone = document.getElementById('js-phone__input');

// Code for Song Request Submit
const requestForm = document.querySelector('#js-songpick');

function getSong(e) {
  return e.target;
}

var selection = function(title, artist){
  this.title = title;
  this.artist = artist;
}
function fillForm(obj){
  form.classList.remove('u-hidden');
  selectedArtist.value = obj.artist;
  selectedSong.value = obj.title;
}

function getData(e){
  var title, artist, artistSongs;
  title = e.target;
  artistSongs = title.parentNode.parentNode;
  artist = artistSongs.previousSibling;
  console.log(title.innerHTML);
  console.log(artist.innerHTML);
  var data = new selection(title.innerHTML, artist.innerHTML);
  console.log(data);
  fillForm(data);
}

function submitRequest(evt) {
  const e = evt || window.event;
  e.preventDefault();

  if (selectedArtist.value === "" || selectedSong.value === "") {
    form.previousSibling.innerHTML = "Please fill out all of the fields";
  } else {
    var request = Object.assign({
      name: name.value,
      phone: phone.value,
      artist: selectedArtist.value,
      song: selectedSong.value
    });
    console.log(request);
    return false;
  }
};

function letterClickHandler(evt) {
  const e = evt || window.event;
  e.preventDefault();

  const theLetter = this.dataset.letter;


  api.findArtistsByLetter(theLetter)
    .then((songList) => {
      PubSub.publish('searchComplete', { songList, searchTerm: theLetter });
    });
}


function initLetterMenu() {
  const letters = 'qwertyuiopasdfghjklzxcvbnm';
  const uppercaseLetters = letters.toUpperCase();
  const letterList = [...uppercaseLetters];
  const sortedList = letterList.sort();
  const htmlList = sortedList.map(item => `<li class="o-list-inline__item c-az__item"><a class="c-az__letter" data-letter="${item}">${item}</a></li>`).join('');
  // container.innerHTML = `<ul class="o-list-inline c-az">${htmlList}</ul>`;
  // const letter = document.querySelectorAll('.letter');

  // letter.forEach(lett => lett.addEventListener('click', letterClickHandler));
  return `<ul class="o-list-inline c-az">${htmlList}</ul>`;
}

letterMenuContainer.innerHTML = initLetterMenu();
delegateEventListener(letterMenuContainer, 'click', 'a', letterClickHandler);
delegateEventListener(songTitles, 'click', 'a', getData);
requestForm.addEventListener('submit', submitRequest);