import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const labels = document.querySelectorAll('label');
const formInputs = document.querySelectorAll('input');
const button = document.querySelector('button');

document.addEventListener('DOMContentLoaded', function () {
  labels.forEach(label => {
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'flex-start';
    label.style.gap = '8px';
  });

  labels[0].style.flexDirection = 'column';
  labels[0].style.marginBottom = '16px';
  labels[0].style.alignItems = 'flex-start';

  formInputs.forEach(formInput => {
    formInput.style.width = '100%';
    formInput.style.margin = '0';
  });

  button.style.backgroundColor = '#4e75ff';
  button.style.fontWeight = '500';
  button.style.fontSize = '16px';
  button.style.letterSpacing = '0.04em';
  button.style.color = '#fff';
  button.style.marginTop = '24px';
  button.style.width = '100%';
});

button.addEventListener('mouseenter', function () {
  this.style.backgroundColor = '#6c8cff';
});

button.addEventListener('mouseleave', function () {
  this.style.backgroundColor = '#4e75ff';
});

formInputs[0].addEventListener('mouseenter', function () {
  formInputs[0].classList.add();
});

const iziToastOption = {
  timeout: 3000,
  messageColor: 'white',
  position: 'topRight',
  close: false,
  closeOnClick: true,
};

button.addEventListener('click', event => {
  event.preventDefault();
  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const delay = +formInputs[0].value;
  if (!selectedRadio) {
    iziToast.show({
      ...iziToastOption,
      message: '❗ Будь ласка, оберіть стан (fulfilled або rejected)',
      backgroundColor: '#ffa500',
    });
    return;
  }
  const success = selectedRadio.value === 'fulfilled';
  new Promise((resolve, reject) => {
    setTimeout(() => {
      success
        ? resolve({ message: `✅ Fulfilled promise in ${delay}ms`, iziToastColor: '#59a10d' })
        : reject({ message: `❌ Rejected promise in ${delay}ms`, iziToastColor: '#f17676' });
    }, delay);
  })

    .then(fulfilledObject => {
      iziToastOption.message = fulfilledObject.message;
      iziToastOption.backgroundColor = fulfilledObject.iziToastColor;
      iziToast.show(iziToastOption);
    })

    .catch(rejectedObject => {
      iziToastOption.message = rejectedObject.message;
      iziToastOption.backgroundColor = rejectedObject.iziToastColor;
      iziToast.show(iziToastOption);
    });
});
