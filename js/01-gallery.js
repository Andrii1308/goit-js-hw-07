import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

const gallIt = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image js-gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");
gallery.insertAdjacentHTML("beforeend", gallIt);

gallery.addEventListener("click", onShowImg);

function onShowImg(event) {
  event.preventDefault();
  const { target } = event;

  if (!target.classList.contains("js-gallery__image")) return;

  const origin = target.dataset.source;

  const lightBox = basicLightbox.create(
    `
    <img src="${origin}" width="800" height="600">
`,
    {
      onShow: (lightBox) => {
        window.addEventListener("keydown", onEscClosed);
      },
      onClose: (lightBox) => {
        window.removeEventListener("keydown", onEscClosed);
      },
    }
  );
  lightBox.show();

  function onEscClosed(event) {
    if (event.code === "Escape") {
      lightBox.close();

      console.log(event);
    }
  }
}
