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

const editProfilePopup = document.querySelector('.modal'); //the basic modal

/*(4.1)for populating form fields*/

const nameField = document.querySelector('.modal__input');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('#about_me');

const profileOccupation = document.querySelector('.profile__occupation')

/* (4.2)submit button*/

const saveButton = document.querySelector('.modal__box'); //having this target the whole form instead of just the submit button

/*(4.3)card template*/

const cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

//(5.2) modal for add photos

const cardAddButton = document.querySelector('.profile__add-button');

const modalHeader = document.querySelector('.modal__header');

//(5.6) card preview modal

const cardPreview = document.querySelector('.modal__preview');

const cardPortrait = document.querySelector('.modal__image');

const cardSubtitle = document.querySelector('.modal__subtitle');

/*--functions--*/ //------------------------------------------------------------------------------------------

/*(4.0)opening edit profile modal/basics*///-------------------------------------

function openModal(modal) {    
    modal.classList.add('modal_opened');
}

function fillProfileForm() {    
    nameField.value = profileName.textContent;
    aboutMeField.value = profileOccupation.textContent;
    modalHeader.textContent = "Edit profile";
}

function handleEditProfileButtonClick() {
    openModal(editProfilePopup);
    fillProfileForm();
    suppressCardPreview();
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

// (5.2) opening modal for photo add -----------------------------------------

function changeModalToAdd () {
    modalHeader.textContent = "New Place";
    nameField.value = "";
    nameField.placeholder = "Title";
    aboutMeField.value = "";
    aboutMeField.placeholder = "Image URL";
}

function changeSaveToAdd () { 
    saveButton.classList.add('saveForAdd');
}

function handleAddButtonClick() {
    openModal(editProfilePopup);
    changeModalToAdd();
    changeSaveToAdd();
    suppressCardPreview();
}

cardAddButton.addEventListener("click", handleAddButtonClick);

//(5.6) opening photo preview modal------------------------------------------------

function fillCardPreview(event) {
    selectedCard = event.target;
    cardPortrait.src = selectedCard.src;
    cardPortrait.alt = selectedCard.alt;
    cardSubtitle.textContent = selectedCard.alt;    
};

function supressOtherModalOpening() {    
    saveButton.setAttribute("style", "visibility: hidden");    
};

function openCardPreview() {    
    cardPreview.setAttribute("style", "visibility: visible");
    cardPreview.setAttribute("style", "display: flex");
};

function handlePhotoClick(event) {
    openModal(editProfilePopup);
    fillCardPreview(event);
    supressOtherModalOpening();
    openCardPreview();
}

function suppressCardPreview() {
    cardPreview.setAttribute("style", "display: none");
}

/*(4.0)closing modal*///---------------------------------------------------------------

function  closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function closeEditProfileModal() { //catch-all closing function 
    closeModal(editProfilePopup);
    expressOtherModalOpening();
    dumpCardPreview();
    saveButton.classList.remove("saveForAdd");
}

profileCloseModal.addEventListener("click", closeEditProfileModal);

// (5.6) closing photo modal---------------------------------------------------

function dumpCardPreview() {  
  cardPreview.removeAttribute("style", "visibility: visible");
  cardPreview.setAttribute("style", "display: none");
}

function expressOtherModalOpening() {
    saveButton.removeAttribute("style", "display: none");
    saveButton.removeAttribute("style", "visibility: hidden");
};

/*(4.2)saving/submitting for profile modal*/// ----------------------------------------------

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    if (saveButton.classList.contains("saveForAdd")) {
        renderCard(makeNewPhoto());
        initialCards.shift(makeNewPhoto()); //add the new object to the array in case it needs to be nuked
        closeEditProfileModal();
     } 
    else { 
        fillProfileInfo();
        closeModal(editProfilePopup);
    }
}

saveButton.addEventListener("submit", handleProfileFormSubmit);

//(5.3) adding photos/submitting with the add photo form---------------------------------------

function makeNewPhoto() {
    let newObject = {
        name: "",
        link: ""
    };
    newObject.name = nameField.value;
    newObject.link = aboutMeField.value;
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
    cardElement.id = cardImage.alt.slice(0, 4) + "LK";//assigning a generated id, just in case. Also helps with loggin if targets are working.    
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