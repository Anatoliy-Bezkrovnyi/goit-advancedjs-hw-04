import { searchPictures } from './JS/picture-search-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  searchInput: document.querySelector('#search-input'),
  btnSearch: document.querySelector('#btn-submit'),
  btnLoadMore: document.querySelector('#load-more'),
};
const lightbox = new SimpleLightbox(`.gallery .photo-link`, {});
let pageData = {
  query: '',
  page: 0,
  per_page: 40,
};

const fetchData = async () => {
  pageData.page += 1;
  try {
    const data = await searchPictures({
      query: pageData.query,
      page: pageData.page,
      per_page: pageData.per_page,
    });
    const { hits, totalHits } = data;
    if (hits?.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (pageData.page === 1) {
      iziToast.success({
        position: 'topRight',
        message: `Hooray! We found ${totalHits} images.`,
      });
    }
    const itemsMarkup = hits.map(item => galleryItemMarkup(item)).join('');
    refs.gallery.insertAdjacentHTML('beforeend', itemsMarkup);
    if (!(pageData.page * pageData.per_page < totalHits)) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      refs.btnLoadMore.classList.add('hidden');
    } else {
      refs.btnLoadMore.classList.remove('hidden');
    }
    lightbox.refresh();
    return data;
  } catch (err) {
    iziToast.error({
      position: 'topRight',
      message: err.message,
    });
  }
};
refs.form.addEventListener('submit', function (event) {
  event.preventDefault();
  const value = refs.searchInput.value.trim();
  if (!value) {
    iziToast.warning({
      position: 'topRight',
      message: `Input is empty! Please, type your query`,
    });
    return;
  }
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.add('hidden');
  pageData.page = 0;
  pageData.query = value;
  fetchData();
});
refs.btnLoadMore.addEventListener('click', () => {
  fetchData();
});
function galleryItemMarkup({
  id,
  largeImageURL: original,
  webformatURL: thumb,
  tags: title,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <div class="photo-card" data-id="${id}">
    <a class="photo-link" href="${original}" >
      <img src="${thumb}" alt="${title}" title="${title}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b><span class="value"> ${likes}</span>
          
        </p>
        <p class="info-item">
          <b>Views</b><span class="value"> ${views} </span>
          
        </p>
        <p class="info-item">
          <b>Comments</b><span class="value"> ${comments} </span>
          
        </p>
        <p class="info-item">
          <b>Downloads</b><span class="value"> ${downloads} </span>
          
        </p>
      </div>
    </a>
  </div>`;
}