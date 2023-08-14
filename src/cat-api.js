import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_bU4Wad8w7RENsG0UdBvUpnHmL6PyCSQ62BdZGO2EefYq2BYK6TcHyi6sZGKQUy63';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
}

export { fetchBreeds, fetchCatByBreed };
