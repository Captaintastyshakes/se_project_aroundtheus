export default class Card {    
    constructor ({name, link}, cardSelector, handleImageClick) {
    //constructor (data, cardSelector, handleImageClick) {
        this._name = name;        
        this._link = link;        
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.cards__like-button').addEventListener("click", () => {
            this._handleLikeClick();
        });
        this._cardElement.querySelector(".cards__delete-button").addEventListener("click", () => {
            this._handleDeleteClick();
        });
        this._cardElement.querySelector(".cards__image").addEventListener("click", () => {
            this._handleImageClick(this);
        })
    }

    _handleLikeClick() {
        this._cardElement.querySelector(".cards__like-button").classList.toggle("card__like-button_active");
    }

    _handleDeleteClick() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setCardProperties() {
        const _cardImage = this._cardElement.querySelector(".cards__image");
        const _cardTitle = this._cardElement.querySelector(".cards__title");
        _cardImage.src = this._link;
        _cardImage.alt = this._name;
        _cardTitle.textContent = this._name;
    }

    generateCardElement() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".cards__card").cloneNode(true);
        this._setEventListeners();
        this._setCardProperties();
        return this._cardElement;
    }
    
}