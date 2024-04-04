import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this._userData = {};
    this._inputs.forEach((input) => {
      this._userData[input.id] = input.value;
    });
    return this._userData;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(({} = this._getInputValues()));
      this._popupForm.reset();
    });
    super.setEventListeners();
  }
}
