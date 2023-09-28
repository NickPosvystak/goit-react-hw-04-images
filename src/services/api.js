import axios from 'axios';

export const fetchImages = async () => {
  const { data } = await axios.get(
    'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'
  );
  return data;
};
