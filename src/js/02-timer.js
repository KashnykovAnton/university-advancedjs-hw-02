import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  button: document.querySelector("button[data-start]"),
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};

let futureDate = "";

refs.button.disabled = true;

refs.button.addEventListener("click", onDateButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkPastDate(selectedDates[0]);
    futureDate = selectedDates[0];
  },
};

flatpickr("#datetime-picker", options);

function onDateButtonClick() {
  let intervalId = setInterval(() => {
    const nowDate = new Date();
    const interval = futureDate - nowDate;
    const result = convertMs(interval);

    renderDigits(result);

    if (interval <= 0) {
      clearInterval(intervalId);
      showToast("Time is over");
      renderDigits(result, "00");
    }
  }, 1000);
}

function checkPastDate(date) {
  const checkValue = date - new Date() < 0;
  refs.button.disabled = checkValue ? true : false;
  if (checkValue) {
    showToast("Please select a date in the future");
  }
}

function showToast(text) {
  iziToast.show({
    title: "Notice",
    message: text,
    position: "topCenter",
    color: "blue",
  });
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
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

function renderDigits(obj, string) {
  Object.keys(obj).map((key) => (refs[key].textContent = !!string ? string : addLeadingZero(obj[key])));
}
