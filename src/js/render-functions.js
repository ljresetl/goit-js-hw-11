'use strict';
// Вмикаємо строгий режим JavaScript для більш суворої перевірки помилок.

import SimpleLightbox from 'simplelightbox';
// Імпортуємо бібліотеку SimpleLightbox для створення галереї з модальним переглядом зображень.

import 'simplelightbox/dist/simple-lightbox.min.css';
// Імпортуємо стилі SimpleLightbox, щоб галерея мала коректний вигляд.

export function createGallery(images) {
// Експортуємо функцію createGallery, яка приймає масив об’єктів images і створює HTML-розмітку галереї.

  const gallery = document.querySelector('.gallery');
  // Знаходимо DOM-елемент контейнера галереї за класом .gallery.

  const galleryMarkup = images
  // Створюємо HTML-розмітку для усіх зображень, перебираючи масив images методом map.

    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        // Деструктуруємо кожен об'єкт зображення, щоб отримати потрібні властивості.

        return `
          <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img
                class="gallery-image" width="360" height="200"
                src="${webformatURL}"
                alt="${tags}"
              />
            </a>
            <div class="info-card">
              <p class="info-item">
                <b>Likes</b> ${likes}
              </p>
              <p class="info-item">
                <b>Views</b> ${views}
              </p>
              <p class="info-item">
                <b>Comments</b> ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${downloads}
              </p>
          </li>`;
        // Повертаємо рядок HTML-коду для однієї картки зображення:
        // - з посиланням на велике зображення (для SimpleLightbox),
        // - картинкою з атрибутом alt,
        // - інформацією про лайки, перегляди, коментарі і завантаження.
      }
    )
    .join('');
    // Обʼєднуємо усі рядки у один великий рядок HTML.

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  // Вставляємо створену розмітку у контейнер галереї (додаємо в кінець).

  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
  // Ініціалізуємо SimpleLightbox на посиланнях галереї з налаштуваннями:
  // - captionsData: 'alt' — підпис до зображення береться з атрибута alt,
  // - captionDelay: 250 — затримка появи підпису 250 мс,
  // Викликаємо refresh(), щоб SimpleLightbox оновився з новими елементами галереї.
}

export function clearGallery() {
  // Експортуємо функцію clearGallery, яка очищає вміст галереї.

  const gallery = document.querySelector('.gallery');
  // Знаходимо контейнер галереї.

  if (gallery) {
    gallery.innerHTML = '';
    // Якщо контейнер існує — очищаємо його вміст, видаляючи всі картки.
  }
}

export function showLoader() {
  // Експортуємо функцію showLoader, яка показує індикатор завантаження.

  const loader = document.querySelector('.loader');
  // Знаходимо елемент лоадера за класом .loader.

  if (loader) {
    loader.classList.remove('hidden');
    // Якщо елемент існує — видаляємо клас 'hidden', щоб показати лоадер.
  }
}

export function hideLoader() {
  // Експортуємо функцію hideLoader, яка ховає індикатор завантаження.

  const loader = document.querySelector('.loader');
  // Знаходимо елемент лоадера.

  if (loader) {
    loader.classList.add('hidden');
    // Якщо існує — додаємо клас 'hidden', щоб приховати лоадер.
  }
}
