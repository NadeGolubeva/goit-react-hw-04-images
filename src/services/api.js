import axios from 'axios';
const KEY = '34597953-a4e95632ef22c5c1cfd0a734f';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const findPic = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
