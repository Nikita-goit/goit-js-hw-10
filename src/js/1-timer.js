import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.is-active');
const dataObjects = document.querySelectorAll('span');
const inputCalendar = document.querySelector('#datetime-picker');

document.addEventListener('DOMContentLoaded', function () {
  startBtn.classList.add('disabled');
});

let selectedTime = 0;
let currentTime = 0;
let convertObject = {};

const izi = {
  timeout: 5000,
  messageColor: 'white',
  backgroundColor: '#ef4040',
  message: 'Please choose a date in the future',
  position: 'topRight',
  // iconUrl: '/img/svg/bi_x-octagon.svg',
  iconUrl: 'https://icons.iconarchive.com/icons/bogo-d/project/32/Error-icon.png',
  close: false,
  closeOnClick: true,
  transitionIn: 'bounceInUp',
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    selectedTime = new Date(selectedDates[0]).getTime();
    currentTime = new Date().getTime();

    if (selectedTime > currentTime) {
      startBtn.disabled = false;
      startBtn.classList.remove('disabled');
    } else {
      startBtn.disabled = true;
      startBtn.classList.add('disabled');
      iziToast.error(izi);
    }
  },
};

flatpickr('#datetime-picker', options);

const onClick = event => {
  event.preventDefault();
  startBtn.disabled = true;
  startBtn.classList.add('disabled');
  inputCalendar.disabled = true;

  const currentTime = new Date().getTime();
  let countTime = selectedTime - currentTime;

  const intervalId = setInterval(() => {
    if (countTime < 1000) {
      clearInterval(intervalId);
      inputCalendar.disabled = false;
      console.log(`Interval with id ${intervalId} has stopped!`);
    }

    convertObject = convertMs(countTime);
    countTime -= 1000;

    for (const element of dataObjects) {
      if (element.hasAttribute('data-days')) {
        element.textContent = addLeadingZero(convertObject.days.toString());
      } else if (element.hasAttribute('data-hours')) {
        element.textContent = addLeadingZero(convertObject.hours.toString());
      } else if (element.hasAttribute('data-minutes')) {
        element.textContent = addLeadingZero(convertObject.minutes.toString());
      } else if (element.hasAttribute('data-seconds')) {
        element.textContent = addLeadingZero(convertObject.seconds.toString());
      }
    }
  }, 1000);
};

startBtn.addEventListener('click', onClick);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
