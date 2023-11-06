/*--arrays/objects--*/

let initialCards = [
    
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
let editButton = document.querySelector('.profile__edit-button');

let closeModal = document.querySelector('.profile__modal-exit');

let modalBox = document.querySelector('.profile__modal');

/*(1)for populating form fields*/

let nameField = document.querySelector('.profile__modal-name');

let profileName = document.querySelector('.profile__name');

let aboutMeField = document.querySelector('.profile__modal-occupation');

let profileOccupation = document.querySelector('.profile__occupation')

/* (2)submit*/

const saveButton = document.querySelector('.profile__modal-save');

/*(3)card template*/

let cardTemplate = document.querySelector('#card');

let cardImplement = document.querySelector('.cards');

/*--functions--*/

/*(0)opening modal*/
editButton.addEventListener("click", function() {    
    modalBox.removeAttribute('style', 'display');
    /*populating the modal/form*/
    nameField = profileName.textContent;
    aboutMeField = profileOccupation.textContent;

});
/*(0)closing modal*/
closeModal.addEventListener("click", function() {
    modalBox.addAttribute('style', "display: none");
});

/*(2)saving/submitting*/

function handleProfileFormSubmit(event) {    
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
    event.preventDefault();
}

saveButton.addEventListener("submit", handleProfileFormSubmit());

/*(3)rendering card*/

function getcardElement(data) {
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
    getcardElement(i);
    cardImplement.append(cardElement);
}


