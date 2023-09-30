import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38873107-2fd59623250c411d575012e5a';

export const fetchImages = async (query, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });
  const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
  return data;
};
