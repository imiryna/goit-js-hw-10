import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};

refs.select.classList.replace('breed-select', 'is-hidden');
refs.error.classList.replace('error', 'is-hidden');
refs.loader.classList.replace('is-hidden', 'loader');

function createErr() {
  Notify.failure('Something goes wrong');
}

window.onload = () => {
  fetchBreeds()
    .then(res => {
      const array = [
        {
          value: 'null',
          text: 'Select a cat',
          placeholder: true,
        },
      ];
      res.data.forEach(el => {
        array.push({ text: el.name, value: el.id });
      });
      console.log(array);
      new SlimSelect({
        select: refs.select,
        data: array,
      });

      refs.select.classList.replace('is-hidden', 'breed-select');
      refs.loader.classList.replace('loader', 'is-hidden');
    })
    .catch(error => {
      createErr();
      console.log(error);
    });
};

refs.select.addEventListener('change', showCatCard);

function showCatCard(e) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.div.classList.replace('cat-info', 'is-hidden');
  const breedId = e.currentTarget.value;
  if (breedId != 'null') {
    fetchCatByBreed(breedId)
      .then(data => {
        renderCatInfo(data);
      })
      .catch(error => {
        createErr();
        console.log(error);
      });
  }
}
/*
refs.div.classList.replace('cat-info', 'is-hidden');
*/
function renderCatInfo(catData) {
  refs.loader.classList.replace('loader', 'is-hidden');
  refs.div.classList.replace('is-hidden', 'cat-info');
  const { url, breeds } = catData.data[0];
  const { name, description, temperament } = breeds[0];
  refs.div.innerHTML = `<div class="box-img"><img src="${url}" alt="${name}" width="400"/></div><div class="box"><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;
}
