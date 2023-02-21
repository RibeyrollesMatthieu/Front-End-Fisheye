const getTag = (source) => {
  let newMedia;
  const splitted = source.split('.');

  if (splitted[splitted.length - 1] === 'mp4') {
    newMedia = document.createElement('video');
    newMedia.autoplay = true;
    newMedia.muted = true;
  } else {
    newMedia = document.createElement('img');
  }

  return newMedia;
};

const openCarousel = (mediaSrc, title, id) => {
  const main = document.querySelector('main');
  const modal = document.getElementById('carousel_modal');
  const body = document.body;
  const close = document.querySelector('#carousel-close-button');
  const media = document.querySelector('#carousel-current-image');

  let newMedia = getTag(mediaSrc);
  newMedia.setAttribute('src', mediaSrc);
  newMedia.setAttribute('alt', title);
  newMedia.setAttribute('media-id', id);

  media.parentNode.replaceChild(newMedia, media);
  newMedia.setAttribute('id', 'carousel-current-image');

  modal.style.display = 'block';
  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  body.classList.add('no-scroll');
  close.focus();
};

const closeCarousel = () => {
  const main = document.querySelector('main');
  const modal = document.getElementById('carousel_modal');
  const body = document.body;

  const image = document.querySelector('#carousel-current-image');

  modal.style.display = 'none';
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  body.classList.remove('no-scroll');
  document.querySelector(`#container-for-image-${image.getAttribute('media-id')}`).focus();
};

const changeImage = async (isNext = true) => {
  /* get current image */
  const currentImage = document.querySelector('#carousel-current-image');
  const imageId = +currentImage?.getAttribute('media-id');

  /* sort images */
  const images = await getGallery();
  images.sort(sortingMethods[getCurrentSort()]);

  for (let i = 0; i < images.length; i++) {
    const currentId = images[i].id;

    /* when image is found, set the prev/next image */
    if (currentId === imageId && images[isNext ? i + 1 : i - 1]) {
      const { mediaSrc, title, id } = mediaFactory(images[isNext ? i + 1 : i - 1]);

      let newMedia = getTag(mediaSrc);
      newMedia.setAttribute('src', mediaSrc);
      newMedia.setAttribute('alt', title);
      newMedia.setAttribute('media-id', id);

      currentImage.parentNode.replaceChild(newMedia, currentImage);
      newMedia.setAttribute('id', 'carousel-current-image');

      currentImage.setAttribute('src', mediaSrc);
      currentImage.setAttribute('alt', title);
      currentImage.setAttribute('media-id', id);
    }
  }
};

document.querySelector('.carousel-previous').addEventListener('click', () => changeImage(false));
document.querySelector('.carousel-previous').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  changeImage(false);
});
document.querySelector('.carousel-next').addEventListener('click', changeImage);
document.querySelector('.carousel-next').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  changeImage(true);
});
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('carousel_modal');

  if (modal.getAttribute('aria-hidden') !== 'false') return;

  switch (e.key) {
    case 'Escape': {
      closeCarousel();
      return;
    }

    case 'ArrowLeft': {
      changeImage(false);
      return;
    }

    case 'ArrowRight': {
      changeImage(true);
      return;
    }

    default:
      return;
  }
});
document.querySelector('#carousel-close-button').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const modal = document.getElementById('carousel_modal');

  if (modal.getAttribute('aria-hidden') === 'false') {
    closeCarousel();
  }
});
