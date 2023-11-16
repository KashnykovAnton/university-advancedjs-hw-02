const buttons = document.querySelectorAll("button");
const buttonsArray = [...buttons];
let intervalID = null;

buttonsArray.map((el) => {
  const checkStopAttr = el.hasAttribute("data-stop");
  el.addEventListener("click", checkStopAttr ? onStopBtnClick : onStartBtnClick);
  el.disabled = checkStopAttr && true;
});

function onStartBtnClick() {
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  disableToggle();
}

function onStopBtnClick() {
  clearInterval(intervalID);
  disableToggle();
}

function disableToggle() {
  buttonsArray.map((el) => (el.disabled = el.disabled ? false : true));
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
