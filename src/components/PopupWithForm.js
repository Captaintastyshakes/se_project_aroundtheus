import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    //
    this._submitButton = this._popupForm.querySelector(".modal__save");
    this._submitButtonOriginal = this._submitButton.textContent;//as with the other popup form object this is to store the initial value of the submit button text and keep it 'safe'
  }

  getInputValues() {//making public
    this._userData = {};//trying making this a constructor property to be set by the set function
    this._inputs.forEach((input) => {
      this._userData[input.id] = input.value;
    });
    return this._userData;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
    super.setEventListeners();
  }
  
  renderLoading(bool, loadText) {
    if(bool) {        
      this._submitButton.textContent = loadText;
    }
    else {
      this._submitButton.textContent = this._submitButtonOriginal;
    }
}
}
