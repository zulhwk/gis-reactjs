const apiURL = 'https://nominatim.openstreetmap.org/';

const search = (searchValue = '') => {
  return new Promise((resolve, reject) => {
    searchValue = searchValue.replace(/\s/g, '%20');
    fetch(`${apiURL}?q=${searchValue}&format=json`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const reverse = ({lat = '', lon = ''}) => {
  return new Promise((resolve, reject) => {
    fetch(`${apiURL}reverse?lat=${lat}&lon=${lon}&format=json`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export {
  search,
  reverse
}