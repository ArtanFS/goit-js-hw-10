import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//? ???????????????????????????????
// axios.defaults.headers.common['x-api-key'] =
//   'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

// new SlimSelect({
//   select: '.breed-select',
//   settings: {
//     placeholderText: 'Custom Placeholder Text',
//   },
// });

// select.setData([
//   { text: 'Value 1', value: 'value1' },
//   { text: 'Value 2', value: 'value2' },
// ]);

refs.select.classList.add('visually-hidden');
refs.error.classList.add('visually-hidden');

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
    refs.select.classList.remove('visually-hidden');
    refs.loader.classList.add('visually-hidden');
  })
  .catch(err => {
    refs.loader.classList.add('visually-hidden');
    // refs.error.classList.remove('visually-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      position: 'center-top',
      width: '600px',
      fontSize: '24px',
      timeout: 1500,
      useIcon: false,
    });
  });

refs.select.addEventListener('change', e => {
  refs.catInfo.classList.add('visually-hidden');
  refs.loader.classList.remove('visually-hidden');
  fetchCatByBreed(e.target.value)
    .then(data => {
      refs.catInfo.innerHTML = createMarkup(data);
      refs.catInfo.classList.remove('visually-hidden');
      refs.loader.classList.add('visually-hidden');
    })
    .catch(err => {
      refs.catInfo.classList.add('visually-hidden');
      refs.loader.classList.add('visually-hidden');
      refs.error.classList.remove('visually-hidden');
    });
});

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        url,
        breeds: [{ name, description, temperament }],
      }) => `<img src="${url}" alt="${name}" height="360"/>
             <div>
               <h1>${name}</h1>
               <p>${description}</p>
               <p><b>Temperament: </b>${temperament}</p>
             </div>`
    )
    .join('');
}
