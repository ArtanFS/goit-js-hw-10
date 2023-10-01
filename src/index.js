import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
  })
  .catch(err => console.log(err));

refs.select.addEventListener('change', e => {
  fetchCatByBreed(e.target.value)
    .then(data => {
      refs.catInfo.innerHTML = createMarkup(data);
    })
    .catch(err => console.log(err));
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
      }) => `<img src="${url}" alt="${name}" width="360"/>
             <div>
               <h1>${name}</h1>
               <p>${description}</p>
               <p><b>Temperament: </b>${temperament}</p>
             </div>`
    )
    .join('');
}
