import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const dateTimeInput = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let countdownInterval = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    if (selectedDates[0] <= now) {
      iziToast.error({
        title: "Помилка",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      startBtn.disabled = true;
      selectedDate = null;
    } else {
      selectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimeInput, options);

startBtn.addEventListener("click", () => {
  if (!selectedDate) return;

  startBtn.disabled = true;
  dateTimeInput.disabled = true;

  updateTimer(); // Одразу оновити таймер, щоб не чекати 1 секунду

  countdownInterval = setInterval(() => {
    updateTimer();
  }, 1000);
});

function updateTimer() {
  const now = new Date();
  const delta = selectedDate - now;

  if (delta <= 0) {
    clearInterval(countdownInterval);
    setTimerValues(0, 0, 0, 0);
    dateTimeInput.disabled = false;
    // Кнопка залишається неактивною після завершення таймера
    return;
  }

  const time = convertMs(delta);
  setTimerValues(time.days, time.hours, time.minutes, time.seconds);
}

function setTimerValues(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  // Якщо число однозначне, додає спереду "0"
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
