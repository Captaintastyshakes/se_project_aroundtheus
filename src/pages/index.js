import "./index.css";

//image nonsense- in case I needed to import the images into webpack the other way

/*import headerLogo from "../images/logo.svg";
const headerLogoImage = document.getElementById("header-logo");
headerLogoImage.src = headerLogo;
import profileAvatar from "../images/Avatar.png";
const profileAvatarImage = document.getElementById("profile-avatar");
profileAvatarImage.src = profileAvatar;
import profileModalClose from "../images/Close-Icon.svg";
const profileModalCloseImage = document.getElementById("profile-modal-close");
profileModalCloseImage.src = profileModalClose;
const addModalCloseImage = document.getElementById("add-modal-close");
addModalCloseImage.src = profileModalClose;
const previewModalCloseImage = document.getElementById("preview-modal-close");
previewModalCloseImage.src = profileModalClose;
import deleteButton from "../images/Trash.svg";
const deleteButtonImage = document.getElementById("card-delete-button");
deleteButtonImage.src = deleteButton;
import cardLike from "../images/Vector.svg";
const cardLikeImage = document.getElementById("card-like");
cardLikeImage.src = cardLike;*/

//

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  formValidators,
  editProfileButton,
  cardAddButton,
  editProfilePopup,
  cardPreviewPopup,
  nameField,
  aboutMeField,
  config,  
  addPhotoPopup,
  userData,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

const user = new UserInfo(userData);

const profilePopup = new PopupWithForm(editProfilePopup, {
  handleFormSubmit: ({ name, about_me }) => {
    user.setUserInfo({ newName: name, newJob: about_me });
    profilePopup.close();
  },
});

function fillProfileForm() {
  const {name, job} = user.getUserInfo();
  nameField.value = name;
  aboutMeField.value = job; //implementing some of that destructuring magic.
}

function handleEditProfileButtonClick() {
  profilePopup.open();
  fillProfileForm();
  formValidators["profile-form"].disableSubmitButton();
}

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

function renderCard(card) {//to address the recursive code I had been writing in the section and addphoto initializations
  const newCard = new Card(card, "#card", handlePhotoClick);
  const newCardElement = newCard.generateCardElement();
  cardSection.addItem(newCardElement);
}

const addPopup = new PopupWithForm(addPhotoPopup, {
  handleFormSubmit: ({ title, image_url: imageUrl }) => {
    const newObj = {
      name: title,
      link: imageUrl
    };
    renderCard(newObj);    
    formValidators["add-photo-form"].resetFormValidation();
    addPopup.close();
  },
});


addPopup.setEventListeners();

const cardSection = new Section(
{
  items: initialCards,
  renderer: renderCard,
},
".cards"
);

cardSection.renderItems();

const imageBox = new PopupWithImage(cardPreviewPopup);

imageBox.setEventListeners();

function handleAddButtonClick() {
  addPopup.open();
}

cardAddButton.addEventListener("click", handleAddButtonClick);

function handlePhotoClick(data) {
  imageBox.open(data);
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
