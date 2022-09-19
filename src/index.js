import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';

import LoadMoreBtn from './js/loadMoreBtn';
import Gallery from './js/Gallery';

const refs = {
  searchForm: document.querySelector('#search-form'),
  submitBtn: document.querySelector('btn[type=submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  cls: '.load-more',
  hidden: true,
});

const myGallery = new Gallery();

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// }

async function onSearch(event) {
  event.preventDefault();
  clearGallery();
  myGallery.searchQuery = event.target.elements.searchQuery.value.trim();
  console.log(myGallery.searchQuery);

  loadMoreBtn.show();
  loadMoreBtn.dissable();
  let backendData = await myGallery.fetchPhotos().then(loadMoreBtn.enable());

  onRenderGallery(backendData.data.hits);

  if (myGallery.searchQuery.length <= 0) {
    clearGallery();
    Notiflix.Notify.failure('Please write something');
    loadMoreBtn.hide();
  } else if (backendData.data.total === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.hide();
  }

  myGallery.resetPage();
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
      Likes:<b>
${likes}</b>
    </p>
    <p class="info-item">
      Views:<b>
       ${views}</b>
   </p>
    <p class="info-item">
      Comments:<b>
       ${comments}</b>
   </p>
    <p class="info-item">
      Downloads:<b>
       ${downloads}</b>  </p>
  </div>
</div>`
      )
      .join('')
  );
  lightBox.refresh();
}

async function onLoadMore() {
  loadMoreBtn.dissable();
  const backendData = await myGallery.fetchPhotos().then(loadMoreBtn.enable());
  myGallery.fetchPhotos().then(onRenderGallery);
  onRenderGallery(backendData.data.hits);

  if (myGallery.page >= 13) {
    loadMoreBtn.hide();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
