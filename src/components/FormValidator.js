export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this.inputElements = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    this._errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageElement.textContent = inputElement.validationMessage;
    this._errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageElement.textContent = "";
    this._errorMessageElement.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (this.inputElements.some(this._hasInvalidInput)) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _hasInvalidInput(inputElement) {
    return !inputElement.validity.valid;
  }

  disableSubmitButton() {
    //making public so I can just call wherever if I need to
    this._submitButton.classList.add(this._inactiveButtonClass);
    return (this._submitButton.disabled = true);
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    return (this._submitButton.disabled = false);
  }

  //resetFormValidation(inputElement) {
  resetFormValidation() {
    this._toggleButtonState();
    //this._hideInputError(inputElement);
    this.inputElements.forEach((input) => this._hideInputError(input));//tweaking this to be one call here instead of iterative in index
  }

  test() {//in case I need to see how this is being loaded/passed/treated
    console.log(this);
  }
}
