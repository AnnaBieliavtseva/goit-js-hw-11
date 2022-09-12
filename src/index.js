import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios');

const refs = {
  searchForm: document.querySelector('#search-form'),
  submitBtn: document.querySelector('btn[type=submit]'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  myGallery.searchQuery = event.currentTarget.elements.searchQuery.value;

  const backend = await myGallery.fetchPhotos();
  onRenderGallery(backend.data.hits);
}

function onRenderGallery(photos) {
  refs.gallery.innerHTML = photos
    .map(
      ({ largeImageURL, webformatURL, tags }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

class Gallery {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotos(photo) {
    const response = await axios.get(
      `https://pixabay.com/api/?key=29882819-d1b2e59da7ad20757f8559035&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    );
    return response;
  }
}
const myGallery = new Gallery();
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
