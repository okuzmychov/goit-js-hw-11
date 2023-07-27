import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImgs(searchValue, page = 1) {
  const params = new URLSearchParams({
    key: '17867869-5b3518daf30dfafc0a833511f',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: `${page}`,
  });
  const { data } = await axios.get(`${BASE_URL}?${params}`);
  console.log(data);
  return data;
}

export { fetchImgs };