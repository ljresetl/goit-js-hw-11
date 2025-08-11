'use strict'; 
// Вмикає строгий режим JavaScript для більш суворої перевірки помилок.

import axios from 'axios';
// Імпортуємо бібліотеку axios для зручного виконання HTTP-запитів.

import iziToast from 'izitoast';
// Імпортуємо бібліотеку iziToast для показу повідомлень (нотифікацій).

import 'izitoast/dist/css/iziToast.min.css';
// Імпортуємо стилі для iziToast, щоб повідомлення мали коректний вигляд.

export default function getImagesByQuery(query, perPage = 3) {
// Експортуємо функцію за замовчуванням (default export), яка приймає параметр пошуку `query` і необов'язковий параметр `perPage` (кількість зображень за замовчуванням 3).

  const params = new URLSearchParams({
  // Створюємо об'єкт URLSearchParams для формування параметрів запиту у форматі "key=value&..."

    key: '51734453-5d46674fc0c6d7944706aca6e',
    // Унікальний ключ доступу до API Pixabay.

    q: query,
    // Пошуковий запит, переданий у функцію.

    image_type: 'photo',
    // Тип зображень — тільки фотографії.

    per_page: perPage,
    // Кількість зображень, які потрібно отримати на одній сторінці.

    orientation: 'horizontal',
    // Орієнтація зображень — горизонтальна.

    safesearch: true,
    // Фільтр безпечного контенту (щоб не показувати дорослий контент).
  });

  const api = 'https://pixabay.com/api/';
  // Базова URL-адреса API Pixabay.

  return axios(`${api}?${params}`)
  // Виконуємо GET-запит за сформованим URL із параметрами.

    .then(response => {
    // Обробляємо успішну відповідь від сервера.

      const { hits } = response.data;
      // Дістаємо з відповіді масив об'єктів із зображеннями (hits).

      if (hits.length === 0) {
      // Якщо масив порожній — немає знайдених зображень.

        iziToast.error({
        // Виводимо помилкове повідомлення iziToast.

          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        return [];
        // Повертаємо порожній масив, щоб не далі не працювати з результатами.
      }

      return hits;
      // Якщо є результати — повертаємо масив зображень.
    })

    .catch(error => {
    // Обробляємо помилки запиту (наприклад, проблеми з мережею).

      iziToast.error({
      // Виводимо повідомлення про помилку із текстом з об'єкту помилки.

        title: 'Error',
        message: `An error occurred: ${error.message}`,
        position: 'topRight',
      });

      return [];
      // Повертаємо порожній масив при помилці, щоб не руйнувати роботу програми.
    });
}
