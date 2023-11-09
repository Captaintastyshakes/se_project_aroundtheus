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
const editProfileButton = document.querySelector(".profile__edit-button");

const profileCloseModal = document.querySelector('.modal__exit');

const editProfilePopup /*modal*/ = document.querySelector('.modal');

/*(1)for populating form fields*/

const nameField = document.querySelector('.modal__name');

const profileName = document.querySelector('.profile__name');

const aboutMeField = document.querySelector('.modal__occupation');

const profileOccupation = document.querySelector('.profile__occupation')

/* (2)submit*/

const saveButton = document.querySelector('.modal__save');

/*(3)card template*/

let cardTemplate = document.querySelector('#card').content;

const cardImplement = document.querySelector('.cards');

/*--functions--*/

/*(0)opening modal*/

function generalOpenModal(modal) {
    modal.classList.add(".modal__opened");
}

function fillProfileForm() {    
    nameField.value = profileName.textContent;
    aboutMeField.value = profileOccupation.textContent;
}

function editProfileHandler() {    
    generalOpenModal(editProfilePopup);
    fillProfileForm();
}

editProfileButton.addEventListener("click", editProfileHandler());

/*(0)closing modal*/

function  generalCloseModal(modal) {
    modal.classList.remove(".modal__opened");
}

profileCloseModal.addEventListener("click", generalCloseModal(editProfilePopup));

/*(2)saving/submitting*/

/*function handleProfileFormSubmit(event) {    
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
    event.preventDefault();
} just turning this into an anonymous function, seeing if that solves it.*/

function submitProfileForm() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
} 


saveButton.addEventListener("submit", function(event){
    event.preventDefault();
    submitProfileForm();
    generalCloseModal(editProfilePopup);
});

/*(3)rendering card*/

function getCardElement(data) {
    cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
    /*cardElement.querySelector('cards__image').src = initialCards[];*/
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


