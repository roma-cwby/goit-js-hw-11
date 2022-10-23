export default { cards };

function cards(images) {
  return images.reduce(
    (acc, img) =>
      acc +
      `<a clacc="gallery__item" href="${img.largeImageURL}">
      <div class="gallery-wrap">
        <img
          class="gallery__img"
          src="${img.webformatURL}"
          alt="${img.tags}"
          loadind="lazy"
        />
        <div class="info">
          <p class="info-item">
            <svg class="heart" width="20" height="20">
              <use href="./icons.svg#icon-heart"></use>
            </svg>
            <b>${img.likes}</b>
          </p>
          <p class="info-item">
            <svg class="eye" width="20" height="20">
              <use href="./icons.svg#icon-eye"></use>
            </svg>
            <b>${img.views}</b>
          </p>
          <p class="info-item">
            <svg class="bubble" width="20" height="20">
              <use href="./icons.svg#icon-bubble"></use>
            </svg>
            <b>${img.comments}</b>
          </p>
          <p class="info-item">
            <svg class="download" width="20" height="20">
              <use href="./icons.svg#icon-download3"></use>
            </svg>
            <b>${img.downloads}</b>
          </p>
        </div>
      </div>
    </a>`,
    ''
  );
}
