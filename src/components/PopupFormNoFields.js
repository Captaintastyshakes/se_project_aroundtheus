import Popup from "./Popup.js";
//I made this clas object to handle a form without any input fields to round up which is intrinsic to the normal form popup and without wanting to unneccesarily dabble in polymorphism
export default class PopupFormNoFields extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit;
        //
        this.submitButton = this._popupForm.querySelector(".modal__save");//making this public to emulate validator methods as needed
        this._submitButtonOriginal = this.submitButton.textContent;//stores the submit button initial value and keeps it safe from external meddling
    }


setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
        this._handleFormSubmit();
        super.setEventListeners();
    });
}

renderLoading(bool, loadText) {
    if(bool) {        
      this.submitButton.textContent = loadText;
    }
    else {
      this.submitButton.textContent = this._submitButtonOriginal;
    }
}

}