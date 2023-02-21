function photographerFactory(data) {
  const { name, portrait, city, country, price, tagline, id } = data;

  const picture = `/assets/photographers/samples/ids/${portrait}`;

  /**
   * Retrieve all user data, creates the appropriate DOM element and add them to a new DOM article element.
   * @returns the article DOM element
   */
  function getUserCardDOM() {
    const profilePictureTag = document.createElement('img');
    profilePictureTag.setAttribute('src', picture);

    const nameTag = document.createElement('h2');
    nameTag.textContent = name;

    const pageLinkTag = document.createElement('a');
    pageLinkTag.href = `/photographer.html?id=${id}`;
    pageLinkTag.setAttribute('aria-label', name);
    pageLinkTag.className = 'photographer__page_link';
    pageLinkTag.append(profilePictureTag, nameTag);

    const locationTag = document.createElement('p');
    locationTag.className = 'photographer__location';
    locationTag.textContent = `${city}, ${country}`;

    const taglineTag = document.createElement('p');
    taglineTag.className = 'photographer__tagline';
    taglineTag.textContent = tagline;

    const priceTag = document.createElement('span');
    priceTag.className = 'photographer__price';
    priceTag.textContent = `${price}€/jour`;

    const article = document.createElement('article');
    article.append(pageLinkTag, locationTag, taglineTag, priceTag);

    return article;
  }

  const getUserProfileDOM = () => {
    const nameTag = document.createElement('h1');
    nameTag.classList.add('photograph__name');
    nameTag.textContent = name;

    const locationTag = document.createElement('p');
    locationTag.classList.add('photograph__location');
    locationTag.textContent = `${city}, ${country}`;

    const taglineTag = document.createElement('p');
    taglineTag.classList.add('photograph__tagline');
    taglineTag.textContent = tagline;

    const descriptionTag = document.createElement('div');
    descriptionTag.append(locationTag, taglineTag);

    const profilePictureTag = document.createElement('img');
    profilePictureTag.setAttribute('src', picture);
    profilePictureTag.setAttribute('alt', name);

    const likesTag = document.createElement('span');
    likesTag.classList.add('fixed-box__likes', 'like');
    likesTag.textContent = `${0} likes`;

    const priceTag = document.createElement('span');
    priceTag.textContent = `${price}€ / jour`;

    const fixedTag = document.createElement('div');
    fixedTag.classList.add('photograph__fixed-box');
    fixedTag.append(likesTag, priceTag);

    const dataTag = document.createElement('div');
    dataTag.append(nameTag, descriptionTag);

    return { data: dataTag, image: profilePictureTag, fixedBox: fixedTag };
  };

  return { getUserCardDOM, getUserProfileDOM };
}
