export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name; //making these two properties public since I use them in the handlephotoclick function
    this.link = link; //
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeClick() {
    this._cardLikeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setCardProperties() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;
  }

  generateCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    //defining other class variables here to call in child functions
    this._cardLikeButton = this._cardElement.querySelector(
      ".cards__like-button"
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._setEventListeners();
    this._setCardProperties();
    return this._cardElement;
  }
}
