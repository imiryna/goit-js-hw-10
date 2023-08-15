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

// refs.loader.classList.add('is-hidden', 'loader');
// refs.select.classList.replace('is-hidden');
// refs.error.classList.replace('is-hidden');

window.onload = () => {
  Notify.failure('Qui timide rogat docet negare');
  // refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  // refs.error.classList.replace('is-hidden');

  //   const catSelect = new SlimSelect({
  //     select: refs.select,
  //   });
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
        // settings: {
        //   hideSelected: true,
        // },
      });

      //   renderIdList(data.data);
    })
    .catch(error => console.log(error));
};

// function renderIdList(animalList) {
//   let markup = '';
//   for (const cat of animalList) {
//     markup += `<option value="${cat.id}">${cat.name}</option>`;
//   }
//   refs.select.innerHTML = markup;
// }

refs.select.addEventListener('change', showCatCard);

function showCatCard(e) {
  //   refs.loader.classList.replace('is-hidden', 'loader');
  //   refs.select.classList.add('is-hidden');
  //   refs.error.classList.add('is-hidden');
  const breedId = e.currentTarget.value;
  if (breedId != 'null') {
    fetchCatByBreed(breedId)
      .then(data => renderCatInfo(data))
      .catch(error => console.log(error));
  }
}

function renderCatInfo(catData) {
  console.log(catData);
  const { url, breeds } = catData.data[0];
  const { name, description, temperament } = breeds[0];
  refs.div.innerHTML = `<div class="box-img"><img src="${url}" alt="${name}" width="400"/></div><div class="box"><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;
}
