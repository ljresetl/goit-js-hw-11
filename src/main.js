'use strict';
// Вмикаємо строгий режим JavaScript для кращої безпеки та виявлення помилок.

import iziToast from 'izitoast';
// Імпортуємо бібліотеку iziToast для показу повідомлень (тостів).

import 'izitoast/dist/css/iziToast.min.css';
// Імпортуємо стилі iziToast для коректного відображення повідомлень.

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
// Імпортуємо функції для роботи з UI: створення галереї, очищення, показ та приховування лоадера.

import getImagesByQuery from './js/pixabay-api';
// Імпортуємо функцію для отримання зображень з API за пошуковим запитом.

const form = document.querySelector('.form');
// Знаходимо в DOM форму пошуку за класом .form і зберігаємо у змінну.

form.addEventListener('submit', event => {
// Додаємо слухача події на відправку форми.

  event.preventDefault();
  // Відміняємо стандартну поведінку форми (щоб сторінка не перезавантажувалась).

  clearGallery();
  // Очищаємо галерею від попередніх результатів пошуку.

  showLoader();
  // Показуємо індикатор завантаження, щоб користувач бачив, що триває запит.

  const query = document.querySelector('[name="search-text"]').value.trim();
  // Отримуємо значення текстового поля форми (пошуковий запит),
  // видаляємо зайві пробіли по краях.

  const perPage = document.querySelector('[name="per-page"]').value;
  // Отримуємо значення поля, яке вказує скільки карток показувати на сторінці.

  getImagesByQuery(query, perPage)
  // Викликаємо функцію для отримання зображень з API, передаючи пошуковий рядок і кількість результатів.

    .then(hits => {
      createGallery(hits);
      // Якщо запит успішний, створюємо галерею з отриманих даних (масиву зображень).
    })

    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });
      // Якщо сталася помилка під час запиту, показуємо повідомлення з текстом помилки.
    })

    .finally(() => {
      hideLoader();
      // У будь-якому випадку, після завершення запиту (успішного чи з помилкою) ховаємо індикатор завантаження.

      form.reset();
      // Скидаємо форму (очищуємо поля введення).
    });
});
