import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

const API_KEY = '29882819-d1b2e59da7ad20757f8559035';
let userQuery;

const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

function onSearch(evt) {
  
  evt.preventDefault();
  userQuery = evt.target.elements.searchQuery.value.trim();
  if (userQuery === "") {
    return;
  }
  params.set('q', userQuery);
  gallery.innerHTML = '';
  // gallery.textContent = 'hhhhh'
  fetchApi();
  console.log(params.toString());
 
}

form.addEventListener('submit', onSearch);

function fetchApi() {
  fetch(`https://pixabay.com/api/?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      if (response.hits.length) {
        gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
        new SimpleLightbox('.gallery a', {
          captionsData: "alt",
        });
        gallery.refresh();
        console.log(response.hits);
        
      }
      else {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
    })
    .catch(error => 
        console.log(error)
      );
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `  <li  class="photo-card">
          <a href="${largeImageURL}" class="link">
          <img src="${webformatURL}" alt="${tags}" width="300" height="300">
          <div class="info">
          <p class="info-item">Likes: <span class="card-text">${likes}</span></p>
          <p class="info-item">Views: <span class="card-text">${views}</span></p>
          <p class="info-item">Comments: <span class="card-text">${comments}</span></p>
          <p class="info-item">Downloads: <span class="card-text">${downloads}</span></p>
          </div>
</a>
        </li>`
    )
    .join('');
}


