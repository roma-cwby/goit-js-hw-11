import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markup from '../js/markup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import history from '../js/history.js';

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '30798635-fb0e0813d5f318e7401c3a1d6';

const input = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const historyList = document.querySelector('.history');

const guard = document.querySelector('.guard');
const options = {
  root: null,
  rootMargin: '30px',
};

let lightbox = new SimpleLightbox('.gallery a');
let tag = null;
let maxPage = null;
let page = 1;

input.addEventListener('submit', onSearch);
historyList.addEventListener('click', onHistory);
const observer = new IntersectionObserver(onScroll, options);

function onSearch(e) {
  e.preventDefault();
  page = 1;
  tag = e.currentTarget.children[0].children[0].value.trim();
  gallery.innerHTML = '';

  getImg(tag);
}

async function getImg(tag) {
  const images = await axios.get(
    `${BASE_URL}?key=${apiKey}&q=${tag}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );

  if (images.data.hits.length === 0)
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

  history.addHistory(tag);

  if (page === 1) {
    Notify.info(`Hooray! We found ${images.data.totalHits} images.`);
    maxPage = Math.floor(Number(images.data.totalHits) / 40 + 1);
    observer.observe(guard);
  }

  gallery.insertAdjacentHTML('beforeend', markup.cards(images.data.hits));
  lightbox.refresh();
  page += 1;
}

async function onScroll(entries) {
  if (entries[0].isIntersecting && page > 1) {
    await getImg(tag);

    if (page >= 2) {
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }
  if (maxPage && page > maxPage) {
    observer.unobserve(guard);
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}

function onHistory(e) {
  if (e.currentTarget === e.target) return;

  tag = `${e.target.id}`;
  page = 1;
  gallery.innerHTML = '';
  getImg(tag);
}
