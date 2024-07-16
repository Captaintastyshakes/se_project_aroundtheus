import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    //
    this._submitTitle = this._popupForm.querySelector(".modal__save");
    this._submitTitleOriginal = this._submitTitle.textContent;//as with the other popup form object this is to store the initial value of the submit button text and keep it 'safe'

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
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
    super.setEventListeners();
  }

  open() {
    this._submitTitle.textContent = this._submitTitleOriginal;
    super.open();
  }
}
