import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";

// ({sprint project number} . {project sub-task}) this is just a system I used for indexing tasks according to the sprint and the project phase
// e.g. 4.1 would be project for sprint 4, first task: fill form field, as an example. I think it helps legibility *a bit

/*--arrays/objects--*/ //---------------------------------------------------------------------------
//'but michael why didn't you just use the pre-constructed object below? This seems unneccesary.'
//oh that's very interesting and I agree it is unnecessary- except that for some reason the browser says that object1, for instance, when it's defined IN the array isn't defined. So my solution, being explicit here, seemed to solve it ¯\_(ツ)_/¯
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

const initialCards = [object1, object2, object3, object4, object5, object6];

//7

const formValidators = {};

/*--variables--*/ //--------------------------------------

/*opening and closing*/

const editProfileButton = document.querySelector(".profile__edit-button"); //4.0

const cardAddButton = document.querySelector(".profile__add-button"); //5.2

const closeButtons = document.querySelectorAll(".modal__exit"); //new

const editProfilePopup = document.querySelector(".modal"); //4.0

const addPhotoPopup = document.querySelector(".add-popup");

const cardPreviewPopup = document.querySelector(".preview-popup");

/*(4.1)for populating form fields*/

const nameField = document.querySelector(".modal__input");

const profileName = document.querySelector(".profile__name");

const aboutMeField = document.querySelector("#about_me");

const profileOccupation = document.querySelector(".profile__occupation");

const titleField = document.querySelector("#title");

const imageURLField = document.querySelector("#image_url");

/* (4.2)submit button*/

const profileForm = document.forms["profile-form"];

const addForm = document.forms["add-photo-form"];

/*(4.3)card template*/

const cardImplement = document.querySelector(".cards");

//(5.6) card preview modal

const cardPortrait = document.querySelector(".preview-popup__image");

const cardSubtitle = document.querySelector(".preview-popup__subtitle");

//7

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*--functions--*/ //------------------------------------------------------------------------------------------

/*opening edit profile modal*/ //-------------------------------------

function fillProfileForm() {
  nameField.value = profileName.textContent;
  aboutMeField.value = profileOccupation.textContent;
}

function handleEditProfileButtonClick() {
  openModal(editProfilePopup);
  fillProfileForm();
  formValidators["profile-form"].disableSubmitButton();
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

// (5.2) opening modal for photo add -----------------------------------------

function handleAddButtonClick() {
  openModal(addPhotoPopup);
}

cardAddButton.addEventListener("click", handleAddButtonClick);

//(5.6) opening photo preview modal------------------------------------------------

function fillCardPreview(data) {
  //7 refactored to accept object class
  cardPortrait.src = data.link;
  cardPortrait.alt = data.name;
  cardSubtitle.textContent = data.name;
}

function handlePhotoClick(data) {
  //7 refactored to accept object class
  openModal(cardPreviewPopup);
  fillCardPreview(data);
}

/*closing modal*/ //---------------------------------------------------------------

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

/*saving/submitting*/ // ----------------------------------------------

function fillProfileInfo() {
  profileName.textContent = nameField.value;
  profileOccupation.textContent = aboutMeField.value;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  fillProfileInfo();
  closeModal(editProfilePopup);
}

function handleAddPhotoSubmit(event) {
  event.preventDefault();
  const newCardData = {
    //7
    name: titleField.value,
    link: imageURLField.value,
  };
  createCard(newCardData); //7
  closeModal(addPhotoPopup);
  event.target.reset();
  formValidators["add-photo-form"].inputElements.forEach((input) =>
    formValidators["add-photo-form"].resetFormValidation(input)
  ); //7
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

addForm.addEventListener("submit", handleAddPhotoSubmit);

// Storing all my 6.0 stuff here, *may mix in after the fact to the right places.

//objects

//variables

const modals = Array.from(document.querySelectorAll(".modal"));

const pageOverlay = document.querySelector(".page");

const modalBoxes = Array.from(document.querySelectorAll(".modal__box"));

//functions

function handleEscapePress(evt) {
  if (evt.key == "Escape") {
    modals.forEach((modal) => {
      closeModal(modal);
    });
  }
}

function handlePageClick(evt) {
  const activeTarget = evt.target;
  if (!activeTarget.classList.contains("modal__box")) {
    modals.forEach(closeModal);
  }
}

//REWRITING OPEN MODAL AND CLOSE MODAL HERE, HAVE ANNOTATED THEM OUT ABOVE AND AM REFACTORING HERE

//open modal

function openModal(modal) {
  modal.classList.add("modal_opened");
  pageOverlay.addEventListener("mousedown", handlePageClick);
  document.addEventListener("keydown", handleEscapePress);
}

//close modal

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  pageOverlay.removeEventListener("mousedown", handlePageClick);
  document.removeEventListener("keydown", handleEscapePress);
}

function handleBoxClick(evt) {
  evt.stopImmediatePropagation();
}

modalBoxes.forEach((box) => {
  box.addEventListener("mousedown", handleBoxClick);
});

//7: card object importing and instantiation

initialCards.forEach((object) => {
  createCard(object);
});

function createCard(data) {
  //7 creating a function to make a card, to reduce duplication
  const newCard = new Card(data, "#card", handlePhotoClick);
  cardImplement.prepend(newCard.generateCardElement());
}

//7 form object validator importing

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

//{-----------------------------------------------------------------------------------------------------------------------------------------will worry about this v later

/***Could be improved** If itâ€™s interesting for you here is how you can combine **overlay** and **close buttons** listeners together:
```js
  const popups = document.querySelectorAll('.popup')
      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                  closePopup(popup)
              }
          })
      })
```

This is why we ask you to put **`generic`** classes in the common markup. In this case itâ€™s class `popup`. We find all popups in the project and run through them adding an overlay listener for each popup.

And here is another **`magic`** of `generic` css-classes:

```js
 if (evt.target.classList.contains('popup__close')) {
                closePopup(popup)
              }
```

Here we check if you have clicked a **`cross button`** and then we close the popup.
Any cross button has a generic css-class `popup__close`.
And now you can delete a lot of redundant code which handles clicks on cross buttons, searching these cross buttons and so on. You can add 10 popups and the code will be still working fine.

```js
 const popups = document.querySelectorAll('.popup')
      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                  closePopup(popup)
              }
              if (evt.target.classList.contains('popup__close')) {
                closePopup(popup)
              }
          })
      })

```
Please, pay attention that you need to use event `'mousedown'` rather than `click` because there is a bug with the overlay: if you click **inside** a popup and then move your mouse **outside** it and release the button above the overlay then the popup closes but itâ€™s not what we expect.
    }*/
