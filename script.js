let imagesLoaded = false;

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imagesLoaded) {
    imagesLoaded = false;
    getImagesApiCall(10);
  }
});

function showOrHideLoader() {
  const loader = document.querySelector('.loader');
  loader.hidden = !loader.hidden;
}

function changeImagesLoaded() {
  imagesLoaded = !imagesLoaded;
}

function renderMarkupWithImages(images) {
  const htmlMarkup = images
    .map(image => {
      return ` <a href='${image.links.html}' target='_blank''><div class="image-card">
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <div class="card-hover"></div>
    <img class="card-contents" alt='${image.alt_description}' src="${image.urls.small}" />
  </div></a>`;
    })
    .join('');
  return insertImagesIntoDOM('beforeend', htmlMarkup);
}

function insertImagesIntoDOM(where, what) {
  const imagesContainer = document.querySelector('.images-container');
  imagesContainer.insertAdjacentHTML(where, what);
  changeImagesLoaded();
  showOrHideLoader();
}

async function getImagesApiCall(count = 30) {
  showOrHideLoader();
  const apiKey = 'FvVwI8JYL2q0_faKBn9nvbw3Yri8ak32Sdl4gnM3h8Q';
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`);
    const images = await response.json();
    return renderMarkupWithImages(images);
  } catch (err) {
    console.log(err);
  }
}

getImagesApiCall();
