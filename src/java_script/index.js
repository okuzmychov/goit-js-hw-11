import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './createGalerryPage';
import { fetchImgs } from './fetchPage';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load_more_btn = (document.querySelector('.load-more').hidden = true);
const jsSafe = document.querySelector('.jsSafe');
form.addEventListener('submit', onFormSubmit);
const simpleLightbox = new SimpleLightbox('.gallery a');

let searchValue;
let page = 1;

async function onFormSubmit(event) {
  try {
    event.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    Loading.hourglass();
    searchValue = event.currentTarget.elements.searchQuery.value.trim();
    const isValidInput = /^[a-zA-Z0-9\s]+$/.test(searchValue);
    if (!isValidInput || searchValue === '') {
      Report.warning('Invalid input');
      Loading.remove();
      return;
    } else {
      const { hits, totalHits } = await fetchImgs(searchValue);
      if (totalHits === 0) {
        throw new Error('Nothing has defined');
      }
      Notify.success(`Hooray! We found ${totalHits} images`);
      gallery.innerHTML = createMarkup(hits);
      simpleLightbox.refresh();
      event.target.reset();
    }
  } catch (error) {
    Report.warning('Please enter a valid search query.');
    console.log(error);
  } finally {
    Loading.remove();
  }
  observer.observe(jsSafe);
}

function scrolTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

let options = {
  root: null,
  rootMargin: '10px',
  threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);

async function handlerPagination(entries, observer) {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      try {
        Loading.hourglass();
        page += 1;
        const { hits, totalHits } = await fetchImgs(searchValue, page);
        gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
        simpleLightbox.refresh();
        console.log(hits);
        if (hits.length === 0 && entry.isIntersecting) {
          Report.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (err) {
        console.log(err);

        Report.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } finally {
        Loading.remove();
      }
    }
  }
}