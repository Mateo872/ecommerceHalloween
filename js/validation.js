const inputEmail = document.querySelector("[data-email]");

const form = document.querySelector("form");

const btnSuscribe = document.querySelector(".suscribe");

btnSuscribe.addEventListener("click", (e) => {
  e.preventDefault();
  emailValidation();
});

inputEmail.addEventListener("blur", emailValidation);

function emailValidation() {
  const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const messageError = document.querySelector(".message-error");

  if (inputEmail.value.length > 0 && er.test(inputEmail.value)) {
    messageError.classList.add("none");
    timeOut();
  } else {
    messageError.classList.remove("none");
  }
}

function timeOut() {
  setTimeout(() => {
    resetForm();
  }, 1000);
}

function resetForm() {
  form.reset();
}
