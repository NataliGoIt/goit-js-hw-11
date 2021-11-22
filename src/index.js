import '/./sass/main.css';
import { searchImages } from './js/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/LoadMoreBtn';

const searchForm = document.querySelector('[id="search-form"]');
const galleryDiv = document.querySelector('.gallery');
const searchQueryInput = document.querySelector('[name="searchQuery"]');

let page = 1;
let pageSize = 40;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onloadMoreBtn);

function onloadMoreBtn() {
  loadMoreBtn.disable();
  page += 1;
  fetchImages();
  loadMoreBtn.enable();
}

function onFormSubmit(e) {
  e.preventDefault();
  loadMoreBtn.hide();
  page = 1;
  galleryDiv.innerHTML = '';
  fetchImages();
}
function renderGallery(images) {
  const markup = images
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
function fetchImages() {
  const searchQuery = searchQueryInput.value.trim();
  console.log(searchQuery);
  searchImages(searchQuery, page, pageSize)
    .then(({ data }) => {
      console.log(data.hits);
      console.log(data.hits.length);
      renderGallery(data.hits);

      if (data.hits.length !== 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.show();
      }
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        loadMoreBtn.hide();
        return;
      }

      if (data.hits.length < 40 && data.hits.length !== 0) {
        Notify.failure(`We're sorry, but you've reached the end of search results.`);
        loadMoreBtn.hide();
        return;
      }
    })
    .catch(error => console.log(error));
}
