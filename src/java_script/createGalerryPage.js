function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__link" href=${largeImageURL}>
               <img class="gallery__image" src=${webformatURL} alt=${tags} loading="lazy" />
                     <p class="info__item">
                         <b>Likes</b>
                         ${likes}
                     </p>
                     <p class="info__item">
                         <b>Views</b>
                         ${views}
                     </p>
                     <p class="info__item">
                         <b>Comments</b>
                         ${comments}
                     </p>
                     <p class="info__item">
                         <b>Downloads</b>
                         ${downloads}
                     </p>
                 
             </div>
         </a>
         `
    )
    .join('');
}

export { createMarkup };