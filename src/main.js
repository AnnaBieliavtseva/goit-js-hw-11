import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchApi, params } from './js/pixabay-api.js';
import createMarkup from './js/render-functions.js';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

let userQuery;

form.addEventListener('submit', onSearchForm);

function onSearchForm(evt) {
  evt.preventDefault();
  userQuery = evt.target.elements.searchQuery.value.trim();
  if (userQuery === '') {
    iziToast.warning({
      message:
        'Please enter some data',
      position: 'topRight',
    });
    return;
  }

  params.set('q', userQuery);

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  fetchApi()
    .then(response => {
      if (response.hits.length) {
        gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
        lightbox.refresh();
      } else {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
    })
    .catch(error => console.log(error))
    .finally(() => { 
      evt.target.elements.searchQuery.value = ''
       loader.classList.add('hidden');
     });
   
}

