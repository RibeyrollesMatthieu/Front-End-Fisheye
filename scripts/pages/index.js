async function getPhotographers() {
  const photographers = await fetch('/data/photographers.json')
    .then((res) => res.json())
    .then((json) => json.photographers);

  // et bien retourner le tableau photographers seulement une fois récupéré
  return {
    photographers: [...photographers],
  };
}

/* display photgraphers cars in homepage */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
