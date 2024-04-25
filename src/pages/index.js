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
  /*nameField.value = user.getUserInfo().name;
  aboutMeField.value = user.getUserInfo().job;*/
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

const addPopup = new PopupWithForm(addPhotoPopup, {
  handleFormSubmit: ({ title, image_url: imageUrl }) => {
    const newObj = {
      name: title,
      link: imageUrl
    };
    //const newCardInfo = [newObj];
    /*const boosterCard = new Section(
      {
        items: newCardInfo,
        renderer: (item) => {
          const newerCard = new Card(item, "#card", handlePhotoClick);
          const cardElement = newerCard.generateCardElement();
          boosterCard.addItem(cardElement);
        },
      },
      ".cards"
    );*/
    const newerCard = new Card(newObj, "#card", handlePhotoClick);//reworking so that it just adds to existing section rather than make a new one
    const cardElement = newerCard.generateCardElement();
    cardSection.addItem(cardElement);
    /*formValidators["add-photo-form"].inputElements.forEach((input) =>
      formValidators["add-photo-form"].resetFormValidation(input)
    );*/
    formValidators["add-photo-form"].resetFormValidation();//tweaked the method in formvalidators to do the iterating so index doesn't have to do it
    addPopup.close();
  },
});

addPopup.setEventListeners();

//const starterPack = new Section(
  const cardSection = new Section(//renaming to something more informative rather than a cheeky MTG reference
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card", handlePhotoClick);
      const cardElement = newCard.generateCardElement();
      cardSection.addItem(cardElement);
    },
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

function handleBoxClick(evt) {
  evt.stopImmediatePropagation();
}

/*modalBoxes.forEach((box) => {
  box.addEventListener("mousedown", handleBoxClick);
});*/ //passed to popup

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
