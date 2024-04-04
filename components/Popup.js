export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._pageOverlay = document.querySelector(".page");
    this._closeButton = this._popupElement.querySelector(".modal__exit");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._setAltEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._unsetAltEventListeners();
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => this.close());
  }

  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };

  _handlePageClick = (evt) => {
    if (!evt.target.classList.contains("modal__box")) {
      this.close();
    }
  };

  _setAltEventListeners() {
    //this is for adding alternative closing event listeners- escape and page click
    this._pageOverlay.addEventListener("mousedown", this._handlePageClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _unsetAltEventListeners() {
    //for nullifying the above on close to save resources
    this._pageOverlay.removeEventListener("mousedown", this._handlePageClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
