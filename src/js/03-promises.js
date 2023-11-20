import iziToast from "izitoast"

const refs = {
  form: document.querySelector("form"),
  inputs: document.querySelectorAll("input"),
};

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let values = {};
  [...refs.inputs].map((el) => (values[el.name] = Number(el.value)));
  const { delay, step, amount } = values;

  for (let i = 0; i < amount; i++) {
    let delayWithStep = delay + i * step;
    setTimeout(() => {
      createPromise(i + 1, delayWithStep)
        .then(({ position, delay }) => {
          showToast(`✅ Fulfilled promise ${position} in ${delay}ms`, "res");
        })
        .catch(({ position, delay }) => {
          showToast(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delayWithStep);
  }
  refs.form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const result = { position, delay };
  return new Promise((res, rej) => {
    if (shouldResolve) {
      res(result);
    } else {
      rej(result);
    }
  });
}

function showToast(text, string) {
  iziToast.show({
    title: "Notice",
    message: text,
    position: "topRight",
    color: string ? "green" : "red",
    transitionIn: "fadeInDown",
  });
}
