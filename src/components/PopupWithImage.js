import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupPicture = this._popupElement.querySelector("#preview-popup");
    this._popupImage = this._popupElement
      .querySelector("#preview-box")
      .querySelector(".preview-popup__image");
    this._popupSubtitle = this._popupElement
      .querySelector("#preview-box")
      .querySelector(".preview-popup__subtitle");
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
