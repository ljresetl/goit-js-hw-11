// Імпортуємо iziToast і його стилі (npm)
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const radioGroup = document.querySelector('.radio-group');
const radios = form.querySelectorAll('input[name="state"]');

// Додаємо клас .selected при фокусі
delayInput.addEventListener('focus', () => {
  delayInput.classList.add('selected');
});

// Видаляємо клас .selected при втраті фокусу
delayInput.addEventListener('blur', () => {
  delayInput.classList.remove('selected');
});

// Додаємо клас .active до radio-group при виборі fulfilled/rejected
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selected = form.querySelector('input[name="state"]:checked');
    if (selected) {
      radioGroup.classList.add('active');
    }
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    })
    .finally(() => {
      form.delay.value = ''; // Очистка інпуту затримки

      // Скидання вибору радіокнопок
      radios.forEach(radio => radio.checked = false);

      // Видалення активного класу для radio-group
      radioGroup.classList.remove('active');
    });
});
