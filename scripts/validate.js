const showInputError = (inputEl, formEl, settings) => {
  const errorSpan = formEl.querySelector(`#${inputEl.id}-error`);

  errorSpan.textContent = inputEl.validationMessage;
  errorSpan.classList.add(settings.errorClass);
  
  inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (inputEl, formEl, settings) => {
  const errorSpan = formEl.querySelector(`#${inputEl.id}-error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove(settings.errorClass);
  inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (inputEl.validity.valid) {
    console.log("valid");
    hideInputError(inputEl, formEl, settings);
  } else {
    showInputError(inputEl, formEl, settings);
  }
};

const isInputValid = (inputList) => {
  return inputList.every((input) => input.validity.valid === true);
};

const toggleButton = (inputList, submitButton, settings) => {
  if (isInputValid(inputList)) {
    submitButton.disabled = false;
    submitButton.classList.remove(settings.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formEl, settings) => {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  let submitButton = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, settings);

      toggleButton(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formElements = [...document.querySelectorAll(settings.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
});
