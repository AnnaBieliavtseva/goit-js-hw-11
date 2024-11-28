const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');



form.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    const userQuery = evt.target.elements.searchQuery.value;
    console.log(userQuery);
}

const API_KEY = '29882819 - d1b2e59da7ad20757f8559035';

const params = {
  key: API_KEY,
  q: `${userQuery}`,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

console.log(params);



// fetch(`https://pixabay.com/api/?${params}`)