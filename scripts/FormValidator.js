class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputEl) {
    const errorSpan = this._formElement.querySelector(`#${inputEl.id}-error`);
    errorSpan.textContent = inputEl.validationMessage;
    errorSpan.classList.add(this._errorClass);
    inputEl.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputEl) {
    const errorSpan = this._formElement.querySelector(`#${inputEl.id}-error`);
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
    inputEl.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }

  _checkIfFormValid(inputList) {
    return inputList.every((input) => input.validity.valid === true);
  }

  _toggleButton(inputList, submitButton) {
    if (this._checkIfFormValid(inputList)) {
      submitButton.disabled = false;
      submitButton.classList.remove(this._inactiveButtonClass);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    submitButton.classList.add(this._inactiveButtonClass);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);

        this._toggleButton(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }
}

export default FormValidator;
