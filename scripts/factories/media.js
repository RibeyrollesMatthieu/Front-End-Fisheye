function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const mediaSrc = `/assets/photographers/samples/${photographerId}/${image || video}`;

  const getImageThumbnail = () => {
    const mediaTag = document.createElement(image ? 'img' : 'video');
    mediaTag.src = mediaSrc;

    if (image) {
      mediaTag.setAttribute('alt', title);
    }

    if (!image) {
      mediaTag.setAttribute('autoplay', true);
      mediaTag.setAttribute('muted', true);
      mediaTag.setAttribute('loop', true);
    }

    const lightboxTag = document.createElement('a');
    lightboxTag.classList.add('carousel-opener');
    lightboxTag.setAttribute('id', `container-for-image-${id}`);
    lightboxTag.setAttribute('aria-label', `${title}, closeup view`);
    lightboxTag.setAttribute('tabindex', 0);
    lightboxTag.addEventListener('click', () => openCarousel(mediaSrc, title, id));
    lightboxTag.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openCarousel(mediaSrc, title, id);
      }
    });
    lightboxTag.append(mediaTag);

    const titleTag = document.createElement('p');
    titleTag.textContent = title;

    const likesTag = document.createElement('span');
    likesTag.classList.add('like', 'like--clickable');
    likesTag.setAttribute('aria-label', 'likes');
    likesTag.textContent = `${likes}`;
    likesTag.setAttribute('tabindex', 0);

    const likeMethod = () => {
      const likesCounter = document.querySelector('.fixed-box__likes');

      if (likesTag.getAttribute('liked') === 'true') {
        likesTag.setAttribute('liked', false);
        likesTag.textContent = +likesTag.textContent - 1;
        likesCounter.textContent =
          +likesCounter?.textContent -
          1; /* FIXME: does not handle if zero likes. that would end up being -1 likes */
      } else {
        likesTag.setAttribute('liked', true);
        likesTag.textContent = +likesTag.textContent + 1;
        likesCounter.textContent = +likesCounter?.textContent + 1;
      }
    };

    likesTag.addEventListener('click', likeMethod);
    likesTag.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        likeMethod();
      }
    });

    const contentTag = document.createElement('div');
    contentTag.classList.add('media-thumbnail__content');
    contentTag.append(titleTag, likesTag);

    const thumbnailTag = document.createElement('div');
    thumbnailTag.classList.add('media-thumbnail');
    thumbnailTag.append(lightboxTag, contentTag);

    return thumbnailTag;
  };

  return { likes, getImageThumbnail, mediaSrc, id, title };
}
