//imports

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,//in case of emergencies
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
  //deleteIdentification, decided not to import for reasons listed below
  starterBlank,
  avatarImg,
  avatarButton,
  editAvatarPopup
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupFormNoFields from "../components/PopupFormNoFields";

//variables

let deleteIdentification = ""; //I'm using this variable as storage for identifying which card gets clicked for deletion which the delete submit event can then access and know what ID to supply the API.
//For some reason when I set it to be imported/exported it messes with the access of both the different functions that call it and it spits out errors. Until I can readily figure out why or engineer the situation to not need this variable in the first place I am going to break protocol here and have this variable stored in the index. Sorry!

//functions

function fillProfileForm() {
  const {name, job} = user.getUserInfo();
  nameField.value = name;
  aboutMeField.value = job;
}

function handleEditProfileButtonClick() {
  profilePopup.open();
  fillProfileForm();
  formValidators["profile-form"].disableSubmitButton();
}

function loadApiCards() {
  api.getCards().then(data => {
    data.forEach((datum) => (renderCard(datum)));
  });
}

function handleDelButtonClick(card) {
  deleteDialogue.open();
  deleteIdentification = card.id;
}

function renderCard(card) {
  const newCard = new Card(card, "#card", handlePhotoClick, handleDelButtonClick, handleLikeClick);//ammended the delete and like handler so it could tell the other popup to open when the Card's del button was pressed and utilize the api.  
  const newCardElement = newCard.generateCardElement();
  cardSection.addItem(newCardElement);
}

function handleDeleteSubmit() {
  const deleteSubmit = document.querySelector("#delete-submit");
  if (!api.isComplete) {
    deleteSubmit.textContent = "Deleting...";
  }
  api.deleteCard(deleteIdentification);
  cardSection.clear();  
  deleteIdentification = "";
  setTimeout(() => {
    loadApiCards();
    deleteDialogue.close();  
  }, 700);  
  
}

function handleEditAvatarClick() {
  avatarPopup.open()
}

function initializeProfileApi() {
  api.getUserInfo().then(data => {//for initializing name and about
    user.setUserInfo({newName: data.name, newJob: data.about});
    avatarImg.src = data.avatar;    
  });
}

function handleAddButtonClick() {
  addPopup.open();
}

function handlePhotoClick(data) {
  imageBox.open(data);
}

function handleLikeClick(card) {
  if (!card.cardLikeButton.classList.contains("card__like-button_active"))
  {
    api.likeCard(card.id);
    card.cardLikeButton.classList.add("card__like-button_active");}
  else {
    api.unlikeCard(card.id);
    card.cardLikeButton.classList.remove("card__like-button_active");}}

function restoreOriginalCards() {//in case I ever go nuclear on the cards again by accident... call on standby at the bottom
  initialCards.forEach((card) => {
    api.postCard(card);    
  });
  api.dumpBody();
  loadApiCards();
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

//initializations

const user = new UserInfo(userData);

const profilePopup = new PopupWithForm(editProfilePopup, {
  handleFormSubmit: ({ name, about_me }) => {
    const profileInfoSubmit = document.querySelector("#profile-info-submit");
    profileInfoSubmit.textContent = "Saving...";
    user.setUserInfo({ newName: name, newJob: about_me });
    api.patchInfo({name, about: about_me});
    setTimeout(profilePopup.close(), 300); //I am aware this isn't necessarily the same thing as having it close when the api is finished- this is a simulacrum of it. I couldn't figure out how to connect it all. You will see this replicated elsewhere
  },
});

const addPopup = new PopupWithForm(addPhotoPopup, {
  handleFormSubmit: ({ title, image_url: imageUrl }) => {
    const newObj = {
      name: title,
      link: imageUrl
    };
    api.postCard(newObj);
    cardSection.clear();
    const addSubmit = document.querySelector("#add-popup-submit");
    if(!api.isComplete) {      
      addSubmit.textContent = "Saving...";
    }
    formValidators["add-photo-form"].resetFormValidation();    
    setTimeout(() => {
      loadApiCards()
      addPopup.close();      
    }, 700);//until I can figure out how to actually tie the save message change to the api this will suffice
  },
});

const api = new Api({
  method: "",
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "13f0334e-73a3-4382-9d72-604d6520bb47",
    "Content-Type": "application/json"
  },
  body: null
});

const cardSection = new Section(//starting with an initially blank array for now until I can be bothered to alter section to not need it.
  {    
    items: starterBlank,
    renderer: renderCard
    },    
  ".cards"
);

const avatarPopup = new PopupWithForm(editAvatarPopup, {handleFormSubmit: ({avatarUrl}) => {
  const avatarSubmit = document.querySelector("#avatar-submit");
  avatarSubmit.textContent = "Saving...";
  api.patchAvatar({avatar: avatarUrl});
  avatarImg.src = avatarUrl;
  formValidators["avatar-form"].resetFormValidation();
  setTimeout(avatarPopup.close(), 300);
}});

const deleteDialogue = new PopupFormNoFields(".delete-popup", {handleFormSubmit: handleDeleteSubmit});

const imageBox = new PopupWithImage(cardPreviewPopup);

//calls

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

addPopup.setEventListeners();

deleteDialogue.setEventListeners();

avatarButton.addEventListener("click", handleEditAvatarClick);

avatarPopup.setEventListeners();

loadApiCards();

initializeProfileApi();

imageBox.setEventListeners();

cardAddButton.addEventListener("click", handleAddButtonClick);

enableValidation(config);

//restoreOriginalCards(); //CRACK GLASS IN CASE OF EMERGENCY