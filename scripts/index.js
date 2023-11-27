/*--arrays/objects--*/

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

const editProfilePopup = document.querySelector('.modal');

/*(4.1)for populating form fields*/

const nameField = document.querySelector('.modal__input');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('#about_me');

const profileOccupation = document.querySelector('.profile__occupation')

/* (4.2)submit*/

const saveButton = document.querySelector('.modal__box'); //having this target the whole form instead of just the submit button

/*(4.3)card template*/

const cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

//(5.2) modal for add photos

const cardAddButton = document.querySelector('.profile__add-button');

const modalHeader = document.querySelector('.modal__header');

/*--functions--*/ //------------------------------------------------

/*(4.0)opening modal*/

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

editProfileButton.addEventListener("click", handleEditProfileButtonClick); //

// (5.2) opening modal for photo add 
// (why make a whole other modal?)

function changeModalToAdd () { //just disguises the profile modal as add photos... now how to get it to submit as add photos...
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
}

cardAddButton.addEventListener("click", handleAddButtonClick);

/*(4.0)closing modal*/

function  closeModal(modal) {    
    modal.classList.remove('modal_opened');
}

function closeEditProfileModal() {
    closeModal(editProfilePopup);
}

profileCloseModal.addEventListener("click", closeEditProfileModal);

/*(4.2)saving/submitting*/

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
} 

//(5.3) adding photos

function addPhoto() {

}

function handleProfileFormSubmit(event) {     
    event.preventDefault();
     if (saveButton.classList.contains("saveForAdd")) { //when the modal is up for adding photos
        closeModal(editProfilePopup);
        addPhoto();
     }
    fillProfileInfo();     
    closeModal(editProfilePopup);    
}

saveButton.addEventListener("submit", handleProfileFormSubmit);

/*(4.3)rendering card*/

function getCardElement(data) {
    cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);    
    cardImage = cardElement.querySelector('.cards__image');
    /*cardImage.src = initialCards[data].link;
    cardImage.alt = initialCards[data].name;*/ //I think this is the source of malfunction- deploying in a different way
    cardImage.src = data.link; //ya I was double-asking for the array which it didn't know what to do- this way works.
    cardImage.alt = data.name;
    cardTitle = cardElement.querySelector('.cards__title');    
    /*cardTitle.textContent = initialCards[data].name;*/ //this too
    cardTitle.textContent = data.name;
    return cardElement;
}

/*(4.3)implementing card*/
/*for (i=0; i < initialCards.length; i++) {
    getCardElement(i);
    cardImplement.append(cardElement);
}*/
//striking out to see if my forEach() call works

//5.1 rendering/implementing cards with a forEach() instead of for loop

initialCards.forEach(function (item) {
    getCardElement(item);
    cardImplement.append(cardElement);    
});




