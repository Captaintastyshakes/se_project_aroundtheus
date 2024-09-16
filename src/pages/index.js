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
  avatarButton,
  editAvatarPopup,
  starterPack//'initial cards' or, at least, where I plan to store them.
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupFormNoFields from "../components/PopupFormNoFields";

//variables

let deleteIdentification = ""; //I'm using this variable as storage for identifying which card gets clicked for deletion which the delete submit event can then access and know what ID to supply the API and nuke from the DOM.
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

function loadApiCards() {//no longer used save as a part of the "emergency option" so holding on to just in case
  api.getCards().then(data => {
    data.forEach((datum) => (renderCard(datum)));
  });
}

function restoreOriginalCards() {//in case I ever go nuclear on the cards again by accident... call on standby at the bottom
  initialCards.forEach((card) => {
    api.postCard(card);    
  });
  loadApiCards();
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

function handleDeleteSubmit() {//did this as a pass-to for the delete popup just because I was having such a difficult time workshopping how exactly to delete, needed to segregate it. Came up with this.
  api.deleteCard(deleteIdentification.id)
  .then(() => {
    deleteDialogue.renderLoading(true, "Deleting...");    
    deleteIdentification.deleteElement();//I guess I was storing the to-be-deleted card all along and just needed to access it. WOW.
    formValidators["delete-photo-form"].disableSubmitButton();
  })
  .then(() => {
    setTimeout(() => {
      deleteDialogue.close();
      deleteIdentification = "";
      formValidators["delete-photo-form"].resetFormValidation();
      deleteDialogue.renderLoading(false);
    }, 1500);
  })
  .catch((err) => {
    console.log(err);
    deleteDialogue.renderLoading(true, "Error while deleting! Please wait and try again!")
    setTimeout(() => {
      formValidators["delete-photo-form"].resetFormValidation();
      deleteDialogue.renderLoading(false);
    }, 1500);
  })  
}

function handleEditAvatarClick() {
  avatarPopup.open()
}

function initializeProfileApi() {
  api.getUserInfo().then(data => {
    user.setUserInfo({newName: data.name, newJob: data.about});
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

const user = new UserInfo(userData);

const profilePopup = new PopupWithForm(editProfilePopup, {//new hotness
  handleFormSubmit: ({ name, about_me }) => {
    api.patchInfo({name, about: about_me})
    .then( () => {
      user.setUserInfo({ newName: name, newJob: about_me });
      profilePopup.renderLoading(true, "Submitting profile changes...");
      formValidators["profile-form"].disableSubmitButton();
    })
    .then( () => {
      //profilePopup.close();
      setTimeout(() => {
        profilePopup.close();
        profilePopup.renderLoading(false);
        formValidators["profile-form"].resetFormValidation();
      }, 1500);
    })
    .catch( (err) => {
      console.log(err);
      profilePopup.renderLoading(true, "Error while changing profile info! Please wait and try again.");
      setTimeout(() => {
        profilePopup.renderLoading(false);
        formValidators["profile-form"].resetFormValidation();
      }, 1500)
    });
  },
});

const addPopup = new PopupWithForm(addPhotoPopup, {//new hotness
  handleFormSubmit: ({ title, image_url: imageUrl }) => {
    const newObj = {
      name: title,
      link: imageUrl
    };
    api.postCard(newObj)
    .then((data) => {
      renderCard(data);
      console.log("IT GOT THIS FAR.");
      addPopup.renderLoading(true, "Creating and adding card...");
      formValidators["add-photo-form"].disableSubmitButton();
    })    
    .then(() => {
      //addPopup.close();
      setTimeout(() => {
        addPopup.close();
        formValidators["add-photo-form"].resetFormValidation();
        formValidators["add-photo-form"].clearInputs();
        addPopup.renderLoading(false);
      }, 1500);
    })
    .catch((err) => {
      addPopup.renderLoading(true, "Error while creating card! Please wait and try again.");
      console.log(err);
      setTimeout(() => {
        addPopup.renderLoading(false);
        formValidators["add-photo-form"].resetFormValidation();
      }, 1500)
    })
  },
});

const cardSection = new Section({items: starterPack, renderer: renderCard}, ".cards");//I know the array is still empty but I fill it later

const avatarPopup = new PopupWithForm(editAvatarPopup, {handleFormSubmit: ({avatarUrl}) => {//folding into api model
  api.patchAvatar({avatar: avatarUrl})
  .then(() => {
    avatarPopup.renderLoading(true, "Changing avatar...");
    user.setAvatar(avatarUrl);
    formValidators["avatar-form"].disableSubmitButton();
  })
  .then(() => {
    setTimeout(() => {
      formValidators["avatar-form"].resetFormValidation();
      avatarPopup.close();
      avatarPopup.renderLoading(false);
      formValidators["avatar-form"].clearInputs();
    }, 1500);
  })
  .catch((err) => {
    console.log(err);
    avatarPopup.renderLoading(true, "Error while changing avatar! Please wait and try again");
    setTimeout(() => {
      formValidators["avatar-form"].resetFormValidation();
      avatarPopup.renderLoading(false);
    }, 1500);
  });
}});

const deleteDialogue = new PopupFormNoFields(".delete-popup", {handleFormSubmit: handleDeleteSubmit});//"oh hey mike why didn't you just make a function to pass into the other constructors?" Because I was having such an abysmal time with figuring out how to delete, I'm leaving the others as is, don't care if it looks messy

const imageBox = new PopupWithImage(cardPreviewPopup);

//calls

//getting the avatar image loaded
api.getUserInfo()
.then((data) => {
  user.setAvatar(data.avatar);
})
.catch((err) => {
  console.log("Unable to load avatar image! Please wait and try again. " + err);
});

//loading up cards into the array that the Card section draws from and then rendering them.
api.getCards()
.then((data) => {
  starterPack.push(data);
  cardSection.renderItems();
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

//restoreOriginalCards(); //CRACK GLASS IN CASE OF EMERGENCY. Resets all cards to their original values.