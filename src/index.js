import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';

// import LoadMoreBtn from './loadMoreBtn';

const axios = require('axios');

const refs = {
  searchForm: document.querySelector('#search-form'),
  submitBtn: document.querySelector('btn[type=submit]'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.load-more',
//   hidden: true,
// });

// console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.gallery.addEventListener('click', onGalleryRefClick);
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onGalleryRefClick(event) {
  event.preventDefault();

  const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

async function onSearch(event) {
  event.preventDefault();
  myGallery.searchQuery = event.target.elements.searchQuery.value;
  clearGallery();
  const backendData = await myGallery.fetchPhotos();
  myGallery.resetPage();
  onRenderGallery(backendData.data.hits);

  if (!myGallery.searchQuery) {
    clearGallery();
    Notiflix.Notify.warning('Please write something');
  }
}

function onRenderGallery(photos) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    photos
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card"><a href="${largeImageURL}" class="link">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" height="250" width="350"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <p>${likes}</p>
    </p>
    <p class="info-item">
      <b>Views</b>
       <p>${views}</p>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <p>${comments}</p>
    </p>
    <p class="info-item">
      <b>Downloads</b>
         <p>${downloads}</p>
    </p>
  </div>
</div>`
      )
      .join('')
  );
  // lightBox.refresh();
}

class Gallery {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchPhotos(photo) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=29882819-d1b2e59da7ad20757f8559035&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
      );
      this.incrementPage();
      return response;
    } catch (error) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const myGallery = new Gallery();
// async function onLoadMore() {
//   const backendData = await myGallery.fetchPhotos();
//   myGallery.fetchPhotos().then(onRenderGallery);
//   onRenderGallery(backendData.data.hits);
// }

function clearGallery() {
  refs.gallery.innerHTML = '';
}
