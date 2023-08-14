import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};
console.log(refs.select);
console.log(refs.loader);
console.log(refs.error);

window.onload = event => {
  fetchBreeds()
    .then(data => renderIdList(data.data))
    .catch(error => console.log(error));
};

function renderIdList(animalList) {
  let markup = '';
  for (const cat of animalList) {
    markup += `<option value="${cat.id}">${cat.name}</option>`;
  }
  refs.select.innerHTML = markup;
}

refs.select.addEventListener('change', showCatCard);

function showCatCard(e) {
  fetchCatByBreed(e.currentTarget.value)
    .then(data => renderCatInfo(data))
    .catch(error => console.log(error));
}

function renderCatInfo() {
  let catCardInfo = `<img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p>`;
  refs.div.innerHTML = catCardInfo;
}
