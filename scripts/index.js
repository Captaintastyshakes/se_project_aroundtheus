// ({sprint project number} . {project sub-task}) this is used for indexing tasks according to the sprint and the project phase
// e.g. 4.1 would be project for sprint 4, first task: fill form field, as an example.

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

//(5.5) delete photo elements

const deleteButton = document.querySelector('.card__delete');

/*--functions--*/ //------------------------------------------------

/*(4.0)opening modal*/

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
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick); //

// (5.2) opening modal for photo add 
// (why make a whole other modal? I just want to repurpose the modal I already made- it's not clear why that would be inappropriate especially in light of never repeating yourself as a guiding principle).

function changeModalToAdd () { //just disguises the profile modal as add photos
    modalHeader.textContent = "New Place";
    nameField.value = "";
    nameField.placeholder = "Title";
    aboutMeField.value = "";
    aboutMeField.placeholder = "Image URL";
}

function changeSaveToAdd () {
    saveButton.classList.add('saveForAdd'); //adds a ghost class to the save button that I can then apply a logic check to. It puts on a different hat, in so many words.
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
    saveButton.classList.remove("saveForAdd"); //removes the ghost class, just in case it was added
}

profileCloseModal.addEventListener("click", closeEditProfileModal);

/*(4.2)saving/submitting*/

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
}

//(5.3) adding photos/submitting with the add photo form

function makeNewPhoto() { //ok so I need to make an object that has name and link data THEN cram it into the beginning of the initialCards array. Do I also need to have the script run again? 
    let newObject = {};
    newObject.name = nameField.value;
    newObject.link = aboutMeField.value;
    return newObject;    
}

/*function addNewPhoto(newObject) {
    initialCards.unshift(newObject);
}*/

function handleProfileFormSubmit(event) {
    event.preventDefault();
    if (saveButton.classList.contains("saveForAdd")) { //(5.3) when the modal is up for adding photos
        makeNewPhoto();
        /*addNewPhoto(newObject);*/
        closeModal(editProfilePopup);
     } 
    else { 
        fillProfileInfo();     
        closeModal(editProfilePopup);
    }
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

/*function renderCards(item) {
    getCardElement(item);
    cardImplement.append(cardElement);
}*/

initialCards.forEach(function (item) {
    getCardElement(item);
    cardImplement.append(cardElement);    
});

/*initialCards.forEach(renderCards (item));*/

//(5.5) Deleting cards
//I'm mostly just sketching this out

function handleCardDelete(event) {
  let markForDelete = event.target;//OK so the idea is this tells which delete button is pressed...
  let cardTarget = markForDelete.parentElement; //...and then it looks for the parent of the delete button. (That is, the card).
  cardTarget.setAttribute("disabled", true); //Once it knows the parent of the delete button it disables the card which isn't precisely the same as deleting it but I think it's close enough.
  
}

deleteButton.addEventListener("click", handleCardDelete); //might have to make this submit instead of click depending on how I set up the del button.