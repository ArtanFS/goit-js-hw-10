const BASE_URL = 'https://api.thecatapi.com/v1/';

const options = {
  headers: {
    'x-api-key':
      'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu',
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`, options).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`, options).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    }
  );
}
