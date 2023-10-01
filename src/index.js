import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu';

const refs = {
  select: document.querySelector('.breed-select'),
};
const BASE_URL = 'https://api.thecatapi.com/v1/';

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
  })
  .catch(err => console.log(err));

fetchCatByBreed('abys')
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
