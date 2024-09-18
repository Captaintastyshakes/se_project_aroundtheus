export default class Card {
  constructor({ name, link, _id, isLiked}, cardSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this.name = name; //making these two properties public since I use them in the handlephotoclick function
    this.link = link; //
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;    
    this._handleDeleteClick = handleDeleteClick;
    this.id = _id;
    this.isLiked = isLiked;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this.cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });    
  }

  _checkLike() {
    if (this.isLiked == true) {
      this.cardLikeButton.classList.add("card__like-button_active");
      return this.isLiked;
    }
  }

  deleteElement() {//making public, changed from handledeleteclick
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setCardProperties() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;
    this._checkLike();
  }

  generateCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__card")
      .cloneNode(true);
    //defining other class variables here to call in child functions
    this.cardLikeButton = this._cardElement.querySelector(//making public
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

  toggleLike() {//to contain like logic in the card
    if (!this.cardLikeButton.classList.contains("card__like-button_active"))
    {      
      this.cardLikeButton.classList.add("card__like-button_active");
      this.isLiked = true;
    }
    else {
      this.cardLikeButton.classList.remove("card__like-button_active");
      this.isLiked = false;
    }
  }  
}
