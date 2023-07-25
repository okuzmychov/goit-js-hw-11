import axios from 'axios';
import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

//! const API_KEY = '17867869-5b3518daf30dfafc0a833511f';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

let page = 1;
let currentQuery = '';
let isFirstSearch = true;

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);