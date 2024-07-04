import axios from "axios";

 
const searchPictures = async ({ query, page, per_page = 40 }) => {
      const url = "https://pixabay.com/api/";
    const API_KEY = "44765952-609f887d044cbd21207a6a8e1";
  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    },
  });
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
};
export { searchPictures };
