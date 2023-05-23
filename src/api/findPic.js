const URL = 'https://pixabay.com/api/';
const KEY = '34597953-a4e95632ef22c5c1cfd0a734f';
export const findPic = (text, page) => {
  return fetch(
    `${URL}?key=${KEY}&q=${text}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
