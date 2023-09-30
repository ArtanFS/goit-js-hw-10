import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu';

const refs = {
  select: document.querySelector('.breed-select'),
};

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
  })
  .catch(err => console.log(err));

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
