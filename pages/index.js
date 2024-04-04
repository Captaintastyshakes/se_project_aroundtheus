import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";
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
  modalBoxes,
  addPhotoPopup,
  userData,
} from "/utils/constants.js";
import UserInfo from "/components/UserInfo.js";
import PopupWithForm from "/components/PopupWithForm.js";
import PopupWithImage from "/components/PopupWithImage.js";
import Section from "/Section.js";

const user = new UserInfo(userData);
const profilePopup = new PopupWithForm(editProfilePopup, {
  handleFormSubmit: ({ name, about_me }) => {
    user.setUserInfo({ newName: name, newJob: about_me });
    profilePopup.close();
  },
});

function fillProfileForm() {
  nameField.value = user.getUserInfo().name;
  aboutMeField.value = user.getUserInfo().job;
}

function handleEditProfileButtonClick() {
  profilePopup.open();
  fillProfileForm();
  formValidators["profile-form"].disableSubmitButton();
}

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

const addPopup = new PopupWithForm(addPhotoPopup, {
  handleFormSubmit: ({ title, image_url }) => {
    const newObj = {
      name: title,
      link: image_url,
    };
    const newCardInfo = [newObj];
    const boosterCard = new Section(
      {
        items: newCardInfo,
        renderer: (item) => {
          const newerCard = new Card(item, "#card", handlePhotoClick);
          const cardElement = newerCard.generateCardElement();
          boosterCard.addItem(cardElement);
        },
      },
      ".cards"
    );
    formValidators["add-photo-form"].inputElements.forEach((input) =>
      formValidators["add-photo-form"].resetFormValidation(input)
    );
    boosterCard.renderItems();
    addPopup.close();
  },
});

addPopup.setEventListeners();

const starterPack = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card", handlePhotoClick);
      const cardElement = newCard.generateCardElement();
      starterPack.addItem(cardElement);
    },
  },
  ".cards"
);

starterPack.renderItems();

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

modalBoxes.forEach((box) => {
  box.addEventListener("mousedown", handleBoxClick);
});

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
