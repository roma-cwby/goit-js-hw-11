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
            Likes
            <b>${img.likes}</b>
          </p>
          <p class="info-item">
            Views
            <b>${img.views}</b>
          </p>
          <p class="info-item">
            Comments
            <b>${img.comments}</b>
          </p>
          <p class="info-item">
            Downloads
            <b>${img.downloads}</b>
          </p>
        </div>
      </div>
    </a>`,
    ''
  );
}
