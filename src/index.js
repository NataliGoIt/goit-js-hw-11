import '/./sass/main.css';
import searchImages from './js/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('[id="search-form"]');
const galleryDiv = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';
let totalHits;

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onloadMoreBtn);
loadMoreBtn.classList.add('is-hidden');
function onloadMoreBtn() {
  searchImages(searchQuery, page).then(res => {
    renderGallery(res);
    isEndOfImg(page, totalHits);
    page += 1;
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  loadMoreBtn.classList.add('is-hidden');
  galleryDiv.innerHTML = '';
  page = 1;

  if (searchQuery === '') {
    return Notify.failure('Please enter your search data.');
  }
  e.target.reset();
  searchImages(searchQuery, page).then(res => {
    const imgArray = res.data.hits;
    totalHits = res.data.totalHits;

    if (imgArray.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    renderGallery(res);
    loadMoreBtn.classList.remove('is-hidden');
    isEndOfImg(page, totalHits);
    page += 1;
  });
}
function isEndOfImg(page, totalHits) {
  if (page * 40 >= totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.success("We're sorry, but you've reached the end of search results.");
  }
}
function renderGallery(images) {
  const imgArray = images.data.hits;
  const markup = imgArray
    .map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="354" height="225"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes </br><span class='text'>${likes}</span></b>
    </p>
    <p class="info-item">
      <b>Views  </br><span class='text'>${views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments  </br><span class='text'>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>Downloads  </br><span class='text'>${downloads}</span></b>
    </p>
  </div>
</div>`,
    )
    .join('');
  galleryDiv.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}
