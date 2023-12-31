// ({sprint project number} . {project sub-task}) this is just a system I used for indexing tasks according to the sprint and the project phase
// e.g. 4.1 would be project for sprint 4, first task: fill form field, as an example. I think it helps legibility *a bit

/*--arrays/objects--*/ //---------------------------------------------------------------------------

const initialCards = [
    
    object1 = {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    
    object2 = {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
   
    object3 = {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    
    object4 = {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    
    object5 = {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"

    },
    
    object6 = {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    } 
    
];

/*--variables--*/ //--------------------------------------

/*opening and closing*/

const editProfileButton = document.querySelector('.profile__edit-button'); //4.0

const cardAddButton = document.querySelector('.profile__add-button'); //5.2

const closeButtons = document.querySelectorAll('.modal__exit');//new

const editProfilePopup = document.querySelector('.modal'); //4.0

const addPhotoPopup = document.querySelector('.add-popup');

const cardPreviewPopup = document.querySelector('.preview-popup');

/*(4.1)for populating form fields*/

const nameField = document.querySelector('.modal__input');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('#about_me');

const profileOccupation = document.querySelector('.profile__occupation')

const titleField = document.querySelector('#title');

const imageURLField = document.querySelector('#image_url');

/* (4.2)submit button*/

const profileForm = document.forms["profile-form"];

const addForm = document.forms["add-photo-form"];

/*(4.3)card template*/

const cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

//(5.6) card preview modal

const cardPreview = document.querySelector('.preview-popup__box');

const cardPortrait = document.querySelector('.preview-popup__image');

const cardSubtitle = document.querySelector('.preview-popup__subtitle');

/*--functions--*/ //------------------------------------------------------------------------------------------

/*opening edit profile modal*///-------------------------------------

function openModal(modal) {
    modal.classList.add('modal_opened');
}

function fillProfileForm() {
    nameField.value = profileName.textContent;
    aboutMeField.value = profileOccupation.textContent;
}

function handleEditProfileButtonClick() {
    openModal(editProfilePopup);
    fillProfileForm();
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

// (5.2) opening modal for photo add -----------------------------------------

function handleAddButtonClick() {
    openModal(addPhotoPopup);
}

cardAddButton.addEventListener("click", handleAddButtonClick);

//(5.6) opening photo preview modal------------------------------------------------

function fillCardPreview(event) {
    const selectedCard = event.target;
    cardPortrait.src = selectedCard.src;
    cardPortrait.alt = selectedCard.alt;
    cardSubtitle.textContent = selectedCard.alt;
};

function handlePhotoClick(event) {
    openModal(cardPreviewPopup);
    fillCardPreview(event);
}

/*closing modal*///---------------------------------------------------------------

function  closeModal(modal) {
    modal.classList.remove('modal_opened');
}

closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
});

/*saving/submitting*/// ----------------------------------------------

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
    renderCard(makeNewPhoto());
    closeModal(addPhotoPopup);
    event.target.reset();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

addForm.addEventListener("submit", handleAddPhotoSubmit);



//(5.3) adding photos/submitting with the add photo form---------------------------------------

function makeNewPhoto() {
    const newObject = {
        name: "",
        link: ""
    };
    newObject.name = titleField.value;
    newObject.link = imageURLField.value;
    return newObject;    
}

/*(4.3)rendering card(s)*///------------------------------------------------------------------

function getCardElement(data) {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);   
    const cardImage = cardElement.querySelector('.cards__image');
    const cardDeleteButton = cardElement.querySelector('.cards__delete-button')
    const cardLikeButton = cardElement.querySelector('.cards__like-button');
    cardImage.src = data.link; 
    cardImage.alt = data.name;
    const cardTitle = cardElement.querySelector('.cards__title');
    cardTitle.textContent = data.name;    
    cardElement.id = cardImage.alt.slice(0, 4) + "LK";//assigning a generated id, just in case. Also helps with logging if targets are working.
    cardDeleteButton.addEventListener("click", handleCardDelete);
    cardImage.addEventListener("click", handlePhotoClick);
    cardLikeButton.addEventListener("click", handleLikeButtonClick);
    return cardElement;
}

// (5.3) adding a new card-----------------------------------------------------------------

function renderCard(item) {
    const newCardElement = getCardElement(item);
    cardImplement.prepend(newCardElement);
} 

//5.1 rendering/implementing cards with a forEach instead of for loop------------------------------

initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);    
    cardImplement.append(cardElement);
});

//(5.4) the like button------------------------------------------------------------------------

function handleLikeButtonClick(event) {
    const likeBinary = event.target;
    likeBinary.classList.toggle('card__like-button_active');
}

//(5.5) Deleting cards--------------------------------------------------------------------------

function handleCardDelete(event) {
    const markForDelete = event.target;
    const deleteTarget = markForDelete.closest(".cards__card");
    deleteTarget.remove();
};

// Storing all my 6.0 stuff here, *may mix in after the fact to the right places.

//objects

//variables

const closeOverlays = Array.from(document.querySelectorAll(".modal"));

const pageOverlay = document.querySelector(".page");

const modalBoxes = Array.from(document.querySelectorAll(".modal__box"));

//functions

function handleOverlayClick(evt) {
    const activeOverlay = evt.target;    
    closeModal(activeOverlay);
}

function handlePageClick(evt) {
    const bigOverlay = evt.target;
    const subordinateOverlays = Array.from(bigOverlay.querySelectorAll(".modal"));
    subordinateOverlays.forEach((subordinateOverlay) => {
        if (subordinateOverlay.classList.contains("modal_opened")) {
            closeModal(subordinateOverlay);
        };
    });
    
}

/*function handleEscapePress(evt) { //if the above works, why not copy?
    const bigOverlay = evt.currentTarget;    
    const subordinateOverlays = Array.from(bigOverlay.querySelectorAll(".modal"));
    subordinateOverlays.forEach((subordinateOverlay) => {
        console.log(evt.keyCode);     
        if ((evt.keyCode == 27) && (subordinateOverlay.classList.contains("modal_opened"))) {            
            closeModal(subordinateOverlay);
        };
    });
}*/

/*function handleEscapePress(evt) {
    const bigOverlay = evt.currentTarget;
    const subordinateOverlays = Array.from(bigOverlay.querySelectorAll(".modal"));    
    subordinateOverlays.forEach((subordinateOverlay) => {        
        if (subordinateOverlay.classList.contains("modal_opened")) {            
            if (evt.keyCode == 27) {
            closeModal(subordinateOverlay);            
            };
        };
    });
}*/

/*function handleEscapePress(evt) {
    console.log(evt.currentTarget);
    if (evt.keyCode == 27) {
        closeModal(evt.currentTarget);
    };
}*/

/*function handleEscapePress(evt) {
    const bigOverlay = evt.currentTarget;
    console.log(evt.bigOverlay);
}*/ //for some reason I can't get it to work with the preview modal

function handleBoxClick(evt) {    
    evt.stopImmediatePropagation();
    //evt.stopPropagation();
}

closeOverlays.forEach((overlay) => {
    overlay.addEventListener("click", () => closeModal(overlay));    
});

modalBoxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
});

pageOverlay.addEventListener("click", handlePageClick);

//pageOverlay.addEventListener("keydown", handleEscapePress);

closeOverlays.forEach((overlay) => {
    overlay.addEventListener("keydown", handleEscapePress);
});