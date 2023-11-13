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

/*--variables--*/

/*(0) for opening and closing functions*/
const editProfileButton = document.querySelector('.profile__edit-button');

const profileCloseModal = document.querySelector('section.profile .modal__exit');

const editProfilePopup = document.querySelector('.modal');

/*(1)for populating form fields*/

const nameField = document.querySelector('.modal__input');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('#about_me');

const profileOccupation = document.querySelector('.profile__occupation')

/* (2)submit*/

const saveButton = document.querySelector('.modal__box'); //having this target the whole form instead of just the submit button

/*(3)card template*/

const cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

/*--functions--*/

/*(0)opening modal*/

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

/*(0)closing modal*/

function  closeModal(modal) {    
    modal.classList.remove('modal_opened');
}

function closeEditProfileModal() {
    closeModal(editProfilePopup);
}

profileCloseModal.addEventListener("click", closeEditProfileModal);

/*(2)saving/submitting*/

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
} 

function handleProfileFormSubmit(event) {    
    event.preventDefault();    
    fillProfileInfo();
    closeModal(editProfilePopup);    
}

saveButton.addEventListener("submit", handleProfileFormSubmit);

/*(3)rendering card*/

function getCardElement(data) {
    cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);    
    cardImage = cardElement.querySelector('.cards__image');
    cardImage.src = initialCards[data].link;
    cardImage.alt = initialCards[data].name;
    cardTitle = cardElement.querySelector('.cards__title');    
    cardTitle.textContent = initialCards[data].name;
    return cardElement;
}

/*(3)implementing card*/
for (i=0; i < initialCards.length; i++) {
    getCardElement(i);
    cardImplement.append(cardElement);
}


