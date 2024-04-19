//VARIABLES GET YOUR VARIABLES HERE
const object1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const object2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const object3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const object4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const object5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const object6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

export const initialCards = [
  object1,
  object2,
  object3,
  object4,
  object5,
  object6,
];

export const formValidators = {};

export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

export const cardAddButton = document.querySelector(".profile__add-button");

export const editProfilePopup = ".modal";

export const addPhotoPopup = ".add-popup";

export const cardPreviewPopup = ".preview-popup";

export const nameField = document.querySelector(".modal__input");

export const aboutMeField = document.querySelector("#about_me");

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const modalBoxes = Array.from(document.querySelectorAll(".modal__box"));

export let userData = {};
userData = {
  name: ".profile__name",
  job: ".profile__occupation",
};
