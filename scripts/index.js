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

/*(4.0) for opening and closing functions*/

const editProfileButton = document.querySelector('.profile__edit-button');

const profileCloseModal = document.querySelector('section.profile .modal__exit');

const addPhotoCloseModal = document.querySelector('section.cards .add__exit');

const cardPreviewCloseModal = document.querySelector('section.cards .preview__exit');

const editProfilePopup = document.querySelector('.modal'); //the profile modal

/*(4.1)for populating form fields*/

const nameField = document.querySelector('.modal__input');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('#about_me');

const profileOccupation = document.querySelector('.profile__occupation')

const titleField = document.querySelector('.add__input');

const imageURLField = document.querySelector('#image_url');

/* (4.2)submit button*/

const saveButtonProfile = document.querySelector('.modal__box'); //having this target the whole form instead of just the submit button

const saveButtonAdd = document.querySelector('.add__box'); //for the add photos box

/*(4.3)card template*/

const cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

//(5.2) modal for add photos

const cardAddButton = document.querySelector('.profile__add-button');

//const modalHeader = document.querySelector('.modal__header');

const addPhotoPopup = document.querySelector('.add');

//(5.6) card preview modal

const cardPreviewPopup = document.querySelector('.preview');

const cardPreview = document.querySelector('.preview__main');

const cardPortrait = document.querySelector('.preview__image');

const cardSubtitle = document.querySelector('.preview__subtitle');

/*--functions--*/ //------------------------------------------------------------------------------------------

/*(4.0)opening edit profile modal/basics*///-------------------------------------

function openModal(modal) {    
    modal.classList.add('modal_opened');
}

function fillProfileForm() {
    nameField.value = profileName.textContent;
    aboutMeField.value = profileOccupation.textContent;
    //modalHeader.textContent = "Edit profile";
}

function handleEditProfileButtonClick() {
    openModal(editProfilePopup);
    fillProfileForm();
    //suppressCardPreview();
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

// (5.2) opening modal for photo add -----------------------------------------

/*function changeModalToAdd () {
    modalHeader.textContent = "New Place";
    nameField.value = "";
    nameField.placeholder = "Title";
    aboutMeField.value = "";
    aboutMeField.placeholder = "Image URL";
}*/

/*function changeSaveToAdd () { 
    saveButton.classList.add('saveForAdd');
}*/

function handleAddButtonClick() {
    openModal(addPhotoPopup);
    //changeModalToAdd();
    //changeSaveToAdd();
    //suppressCardPreview();
}

cardAddButton.addEventListener("click", handleAddButtonClick);

//(5.6) opening photo preview modal------------------------------------------------

function fillCardPreview(event) {
    selectedCard = event.target;
    cardPortrait.src = selectedCard.src;
    cardPortrait.alt = selectedCard.alt;
    cardSubtitle.textContent = selectedCard.alt;
};

/*function supressOtherModalOpening() {    
    saveButton.setAttribute("style", "visibility: hidden");    
};*/

//
/*function openCardPreview() {    
    cardPreview.setAttribute("style", "visibility: visible");
    cardPreview.setAttribute("style", "display: flex");
};*///re-evaluate

function handlePhotoClick(event) {
    openModal(cardPreviewPopup);
    fillCardPreview(event);
    //supressOtherModalOpening();
    //openCardPreview();
}

/*function suppressCardPreview() {
    cardPreview.setAttribute("style", "display: none");
}*/

/*(4.0)closing modal*///---------------------------------------------------------------

function  closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function closeEditProfileModal() {
    closeModal(editProfilePopup);    
}

function closeAddPhotoModal() {
    closeModal(addPhotoPopup);    
}

function closeCardPreviewModal() {
    closeModal(cardPreviewPopup);
}

profileCloseModal.addEventListener("click", closeEditProfileModal);

profileCloseModal.addEventListener("click", closeAddPhotoModal);

profileCloseModal.addEventListener("click", closeCardPreviewModal);

// (5.6) closing photo modal---------------------------------------------------

/*function dumpCardPreview() {
  cardPreview.removeAttribute("style", "visibility: visible");
  cardPreview.setAttribute("style", "display: none");
}*/

/*function expressOtherModalOpening() {
    saveButton.removeAttribute("style", "display: none");
    saveButton.removeAttribute("style", "visibility: hidden");
};*/

/*(4.2)saving/submitting for profile modal*/// ----------------------------------------------

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
}

/*function handleProfileFormSubmit(event) {
    event.preventDefault();
    /*if (saveButton.classList.contains("saveForAdd")) {
        renderCard(makeNewPhoto());
        initialCards.shift(makeNewPhoto()); //add the new object to the array in case it needs to be nuked
        closeEditProfileModal();
     }
    //else { 
        fillProfileInfo();
        closeModal(editProfilePopup);
    //}
}*/

function handleProfileFormSubmit(event) {
    event.preventDefault();
    fillProfileInfo();
    closeEditProfileModal();
}

function handleAddPhotoSubmit(event) {
    event.preventDefault();
    renderCard(makeNewPhoto());
        initialCards.shift(makeNewPhoto()); //add the new object to the array in case it needs to be nuked
        closeCardPreviewModal();
}

saveButtonProfile.addEventListener("submit", handleProfileFormSubmit);

saveButtonAdd.addEventListener("submit", handleAddPhotoSubmit);



//(5.3) adding photos/submitting with the add photo form---------------------------------------

function makeNewPhoto() {
    let newObject = {
        name: "",
        link: ""
    };
    newObject.name = titleField.value;
    newObject.link = imageURLField.value;
    return newObject;
}

/*(4.3)rendering card(s)*///------------------------------------------------------------------

function getCardElement(data) { 
    cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);   
    cardImage = cardElement.querySelector('.cards__image');
    cardDeleteButton = cardElement.querySelector('.cards__delete-button')
    cardLikeButton = cardElement.querySelector('.cards__like-button');
    cardImage.src = data.link; 
    cardImage.alt = data.name;
    cardTitle = cardElement.querySelector('.cards__title');
    cardTitle.textContent = data.name;
    cardElement.id = cardImage.alt.slice(0, 4) + "LK";//assigning a generated id, just in case. Also helps with logging if targets are working.    
    cardDeleteButton.addEventListener("click", handleCardDelete);
    cardImage.addEventListener("click", handlePhotoClick);    
    cardLikeButton.addEventListener("click", handleLikeButtonClick);
    return cardElement;
}

// (5.3) adding a new card-----------------------------------------------------------------

function renderCard(item) {
    getCardElement(item);
    cardImplement.prepend(cardElement);
} 

//5.1 rendering/implementing cards with a forEach instead of for loop------------------------------

initialCards.forEach(function (item) {
    getCardElement(item);
    cardImplement.append(cardElement);
});

//(5.4) the like button------------------------------------------------------------------------

function changeLike() {    
    likeBinary.src = "images/Union.svg";        
}

function changeLiked() {
    likeBinary.src = "images/Vector.svg";     
}

function handleLikeButtonClick(event) {
    likeBinary = event.target;        
    if (likeBinary.src.includes("Vector")) {
        changeLike()
    }
    else {
        changeLiked()
    }
}

//(5.5) Deleting cards--------------------------------------------------------------------------

function handleCardDelete(event) {
    markForDelete = event.target;
    deleteTarget = markForDelete.closest(".cards__card");
    deleteTarget.remove();    
};