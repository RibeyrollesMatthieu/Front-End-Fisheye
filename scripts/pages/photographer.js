let sort = 'likeAsc';
const getCurrentSort = () => sort;

// get photographer's data based on id in url params
const getPhotographer = async () => {
  const searchParams = new URLSearchParams(window.location.search);

  if (!searchParams.has('id')) {
    throw new Error('No id provided.');
  }

  const id = searchParams.get('id');

  const photographers = await fetch('/data/photographers.json')
    .then((res) => res.json())
    .then((json) => json.photographers);

  const photographer = photographers.filter((p) => p.id === +id);

  if (photographer.length === 0) {
    throw new Error('Unvalid id provided. No matching user.');
  }

  return photographer[0];
};

// get medias associated to a photographer
const getGallery = async () => {
  const searchParams = new URLSearchParams(window.location.search);

  if (!searchParams.has('id')) {
    throw new Error('No id provided.');
  }

  const id = searchParams.get('id');

  const medias = await fetch('/data/photographers.json')
    .then((res) => res.json())
    .then((json) => json.media);

  const photographerMedias = medias.filter((m) => m.photographerId === +id);

  if (photographerMedias.length === 0) {
    throw new Error('Unvalid id provided. No matching user.');
  }

  return [...photographerMedias];
};

async function displayData(photographer) {
  const photographHeader = document.querySelector('.photograph-header');

  const photographerModel = photographerFactory(photographer);
  const { data, image, fixedBox } = photographerModel.getUserProfileDOM();
  photographHeader.insertBefore(data, photographHeader.firstChild);
  photographHeader.append(image);
  document.body.append(fixedBox);
}

const sortingMethods = {
  likeAsc: (a, b) => (a.likes > b.likes ? 1 : -1),
  likesDesc: (a, b) => (a.likes < b.likes ? 1 : -1),
  dateAsc: (a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1),
  dateDesc: (a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1),
  titleAsc: (a, b) => (a.title > b.title ? 1 : -1),
  titleDesc: (a, b) => (a.title < b.title ? 1 : -1),
};

const displayGallery = (medias) => {
  const photographGallery = document.querySelector('.photograph-gallery__content');

  photographGallery.replaceChildren();

  let totalLikes = 0;

  medias.sort(sortingMethods[sort]).forEach((media) => {
    const { likes, getImageThumbnail } = mediaFactory(media);
    const mediaThumbnail = getImageThumbnail();
    photographGallery.append(mediaThumbnail);
    totalLikes += likes;
  });

  const likesCounter = document.querySelector('.fixed-box__likes');

  if (!likesCounter) return;

  likesCounter.textContent = totalLikes;
};

const initGallery = async () => {
  const medias = await getGallery();
  displayGallery(medias);
};

const displaySorter = () => {
  const options = {
    likesAsc: {
      sort: 'likeAsc',
      label: 'Trier par likes (croissant)',
      checked: true,
    },
    likesDesc: {
      sort: 'likeDesc',
      label: 'Trier par likes (décroissant)',
    },
    dateAsc: {
      sort: 'dateAsc',
      label: 'Trier par date (croissant)',
    },
    dateDesc: {
      sort: 'dateDesc',
      label: 'Trier par date (décroissant)',
    },
    titleAsc: {
      sort: 'titleAsc',
      label: 'Trier par nom (croissant)',
    },
    titleDesc: {
      sort: 'titleDesc',
      label: 'Trier par nom (décroissant)',
    },
  };

  const sorter = document.querySelector('.select-box__current');
  const listContainer = document.querySelector('.select-box__list');

  // initialize the inputs and labels for the sorter
  for (let option in options) {
    const currentOption = options[option];

    // the radio input
    const inputTag = document.createElement('input');
    inputTag.setAttribute('type', 'radio');
    inputTag.setAttribute('id', `sorter--${currentOption.sort}`);
    inputTag.setAttribute('value', currentOption.sort);
    inputTag.setAttribute('name', 'sorter-select');
    if (currentOption.checked) inputTag.setAttribute('checked', true);
    inputTag.classList.add('select-box__input');

    // diplayed sort label
    const textTag = document.createElement('p');
    textTag.classList.add('select-box__input-text');
    textTag.innerText = currentOption.label;
    const boxValueTag = document.createElement('div');
    boxValueTag.classList.add('select-box__value');
    boxValueTag.append(inputTag, textTag);

    sorter.appendChild(boxValueTag);

    // the labels for each option
    const labelTag = document.createElement('label');
    labelTag.classList.add('select-box__option');
    labelTag.setAttribute('for', `sorter--${currentOption.sort}`);
    labelTag.innerHTML = currentOption.label;
    labelTag.setAttribute('aria-hidden', true);
    labelTag.setAttribute('tabindex', 0);
    labelTag.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;

      sort = currentOption.sort;
      initGallery();
      e.target.blur();
      document.querySelector('.carousel-opener').focus();
    });
    labelTag.addEventListener('click', (e) => {
      sort = currentOption.sort;
      initGallery();
      e.target.blur();
      document.querySelector('.carousel-opener').focus();
    });

    // the list of options
    const listTag = document.createElement('li');
    listTag.appendChild(labelTag);

    listContainer.appendChild(listTag);
  }
};

const init = async () => {
  const photographer = await getPhotographer();
  displayData(photographer);
  initGallery();
  displaySorter();
};

init();
