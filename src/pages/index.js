//imports

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {  
  formValidators,
  editProfileButton,
  cardAddButton,
  editProfilePopup,
  cardPreviewPopup,  
  config,  
  addPhotoPopup,
  userData,
  avatarButton,
  editAvatarPopup,
  avatarSelector
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupFormNoFields from "../components/PopupFormNoFields.js";//totally whack that I missed labelling this file as js. Oh well...

//variables

let deleteIdentification = ""; //I'm using this variable as storage for identifying which card gets clicked for deletion which the delete submit event can then access and know what ID to supply the API and nuke from the DOM.
//For some reason when I set it to be imported/exported it messes with the access of both the different functions that call it and it spits out errors. Until I can readily figure out why or engineer the situation to not need this variable in the first place I am going to break protocol here and have this variable stored in the index. Sorry!

//functions

function fillProfileForm() {
  const {name, job} = user.getUserInfo();
  profilePopup.setInputValues({name, about_me: job});
  
}

function handleEditProfileButtonClick() {
  profilePopup.open();
  fillProfileForm();
  formValidators["profile-form"].disableSubmitButton();
}

function handleDelButtonClick(card) {
  deleteDialogue.open();
  deleteIdentification = card;
}

function renderCard(card) {
  const newCard = new Card(card, "#card", handlePhotoClick, handleDelButtonClick, handleLikeClick);//ammended the delete and like handler so it could tell the other popup to open when the Card's del button was pressed and utilize the api.  
  const newCardElement = newCard.generateCardElement();
  cardSection.addItem(newCardElement);
}

function handleDeleteSubmit() {
  deleteDialogue.renderLoading(true, "Deleting...");
  api.deleteCard(deleteIdentification.id)
  .then(() => {
    deleteIdentification.deleteElement();
  })
  .then(() => {    
      deleteDialogue.close();
      deleteIdentification = "";
  })
  .catch((err) => {
    console.log(err);
    deleteDialogue.renderLoading(true, "Error while deleting! Please wait and try again!");
  })
  .finally(() => {
    deleteDialogue.renderLoading(false);
    formValidators["delete-photo-form"].enableSubmitButton();
  });
}

function handleEditAvatarClick() {
  avatarPopup.open()
}

function initializeProfileApi() {
  api.getUserInfo().then(data => {
    user.setUserInfo({newName: data.name, newJob: data.about});
    user.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.log("Unable to load profile/avatar info! Please wait and try again. " + err);
  });
}

function handleAddButtonClick() {
  addPopup.open();
}

function handlePhotoClick(data) {
  imageBox.open(data);
}

function handleLikeClick(card) {
  if(!card.isLiked) {
    api.likeCard(card.id)
    .then( () => {
      card.toggleLike()
  })
    .catch( (err) => {
      console.log(err)
  });
  }
  else{
    api.unlikeCard(card.id)
    .then( () => {
      card.toggleLike()
  })
    .catch( (err) => {
      console.log(err);
  });
  }
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

const api = new Api({
  method: "",
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "13f0334e-73a3-4382-9d72-604d6520bb47",
    "Content-Type": "application/json"
  },
  body: null
});

const user = new UserInfo(userData, avatarSelector);

const profilePopup = new PopupWithForm(editProfilePopup, {
  handleFormSubmit: ({ name, about_me }) => {
    profilePopup.renderLoading(true, "Submitting profile changes...");
    api.patchInfo({name, about: about_me})
    .then( () => {
      user.setUserInfo({ newName: name, newJob: about_me });
      formValidators["profile-form"].disableSubmitButton();
    })
    .then( () => {
        profilePopup.close();
    })
    .catch( (err) => {
      console.log(err);
      profilePopup.renderLoading(true, "Error while changing profile info! Please wait and try again.");
    })
    .finally(() => {
      profilePopup.renderLoading(false);     

    });
  },
});

const addPopup = new PopupWithForm(addPhotoPopup, {
  handleFormSubmit: ({ title, image_url: imageUrl }) => {
    const newObj = {
      name: title,
      link: imageUrl
    };
    addPopup.renderLoading(true, "Creating and adding card...");
    api.postCard(newObj)
    .then((data) => {
      renderCard(data);
      formValidators["add-photo-form"].disableSubmitButton();
    })    
    .then(() => {
        addPopup.close();
        formValidators["add-photo-form"].clearInputs();
    })
    .catch((err) => {
      addPopup.renderLoading(true, "Error while creating card! Please wait and try again.");
      console.log(err);
    })
    .finally(() => {
      addPopup.renderLoading(false);
    });
  },
});

const cardSection = new Section({renderer: renderCard}, ".cards");

const avatarPopup = new PopupWithForm(editAvatarPopup, {handleFormSubmit: ({avatarUrl}) => {
  avatarPopup.renderLoading(true, "Changing avatar...");
  api.patchAvatar({avatar: avatarUrl})
  .then(() => {
    user.setAvatar(avatarUrl);
    formValidators["avatar-form"].disableSubmitButton();
  })
  .then(() => {
      avatarPopup.close();
      formValidators["avatar-form"].clearInputs();
  })
  .catch((err) => {
    console.log(err);
    avatarPopup.renderLoading(true, "Error while changing avatar! Please wait and try again");
  })
  .finally(() => {
    avatarPopup.renderLoading(false);
  });
}});

const deleteDialogue = new PopupFormNoFields(".delete-popup", {handleFormSubmit: handleDeleteSubmit});//"oh hey mike why didn't you just make a function to pass into the other constructors?" Because I was having such an abysmal time with figuring out how to delete, I'm leaving the others as is, don't care if it looks messy

const imageBox = new PopupWithImage(cardPreviewPopup);

//calls

api.getCards()
.then((data) => {
  cardSection.renderItems(data);
})
.catch((err) => {
  console.log("Error while loading cards! Please try again later. " + err);
});

profilePopup.setEventListeners();

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

addPopup.setEventListeners();

deleteDialogue.setEventListeners();

avatarButton.addEventListener("click", handleEditAvatarClick);

avatarPopup.setEventListeners();

initializeProfileApi();

imageBox.setEventListeners();

cardAddButton.addEventListener("click", handleAddButtonClick);

enableValidation(config);