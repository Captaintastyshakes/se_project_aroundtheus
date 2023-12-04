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

//(5.4) the like button

//const cardLikeButton = document.querySelector('.cards__like-button');

//(5.5) delete photo elements

const deleteButton = document.querySelector('.cards__delete-button');

//(5.6) card preview modal

//let cardImageButton = document.getElementById('#'); //do I need to make this an actual button? Or will the click event work fine?

//let cardImageButton = document.querySelector('.cards__image');

//console.log(cardImageButton + "is ok");

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
}

editProfileButton.addEventListener("click", handleEditProfileButtonClick);

// (5.2) opening modal for photo add -----------------------------------------
// why make a whole other modal? I just want to repurpose the modal I already made- it's not clear why that would be inappropriate especially in light of, "never repeat" yourself as a guiding principle
//+achieves functionality set out in the assignment +doesn't needlessly repeat code +can be ammended/expanded upon in the future

function changeModalToAdd () { //just disguises the profile modal as add photos
    modalHeader.textContent = "New Place";
    nameField.value = "";
    nameField.placeholder = "Title";
    aboutMeField.value = "";
    aboutMeField.placeholder = "Image URL";
}

function changeSaveToAdd () { //adds a ghost class to the save button that I can then apply a logic check to. It puts on a different hat, in so many words.
    saveButton.classList.add('saveForAdd');
}

function handleAddButtonClick() {
    openModal(editProfilePopup);
    changeModalToAdd();
    changeSaveToAdd();
}

cardAddButton.addEventListener("click", handleAddButtonClick);

//(5.6) opening photo preview modal------------------------------------------------

/*function fillCardPreview(event) {
    cardTarget = event.target; //do I need to be more granular with selection?
    cardTargetImage = cardTarget.querySelector('.cards__image'); //or whatever the right target is
    //cardTargetImage = document.querySelector('.cards__image');
    cardPortrait.src = `${cardTargetImage.src}`;
    cardPortrait.alt = cardTargetImage.title;
    cardSubtitle.textContent = cardTargetImage.title;
}*/

function fillCardPreview() {
    cardPortrait.src = cardImage.src;
    cardPortrait.alt = cardImage.alt;
    cardSubtitle.textContent = cardImage.alt;
};

function supressOtherModalOpening() {
    saveButton.setAttribute("style", "display: none;");
};

function openCardPreview() {
    cardPreview.setAttribute("style", "display: flex");
};

function handlePhotoClick() {
    openModal(editProfilePopup);
    fillCardPreview();
    supressOtherModalOpening();
    openCardPreview();
    console.log("It's cliiiiicking");
}


//cardImageButton.addEventListener("click", handlePhotoClick);
//console.log(cardImageButton);


/*(4.0)closing modal*///---------------------------------------------------------------

function  closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function closeEditProfileModal() { // basic catch-all closing function 
    closeModal(editProfilePopup);
    dumpCardPreview(); //just in case we are dealing with photo preview
    expressOtherModalOpening(); //reverse hiding the base modal
    saveButton.classList.remove("saveForAdd"); //removes the ghost class, in case it was added

}

profileCloseModal.addEventListener("click", closeEditProfileModal); //this x button is getting a lot of use so the handle is packed.

// (5.6) closing photo modal and dumping---------------------------------------------------

function dumpCardPreview() {  
  cardPortrait.src = "";
  cardPortrait.alt = "";
  cardSubtitle.textContent = "";
  cardPreview.setAttribute("style", "display: none");
}

function expressOtherModalOpening() {
    saveButton.removeAttribute("style", "display: none");
};

/*(4.2)saving/submitting for profile modal*/// ----------------------------------------------

function fillProfileInfo() {
    profileName.textContent = nameField.value;
    profileOccupation.textContent = aboutMeField.value;
}

function handleProfileFormSubmit(event) {
    event.preventDefault();
    if (saveButton.classList.contains("saveForAdd")) { //(5.3) for when the modal is up for adding photos        
        renderCard(makeNewPhoto());
        initialCards.shift(makeNewPhoto()); //add the new object to the array in case it needs to be nuked
        closeEditProfileModal();
     } 
    else { 
        fillProfileInfo();
        closeModal(editProfilePopup);
    }
} //running as an if/else becuase there are two, and only two, outcomes to hitting save

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
    cardImage.src = data.link; 
    cardImage.alt = data.name;
    cardTitle = cardElement.querySelector('.cards__title');
    cardTitle.textContent = data.name;
    cardElement.id = cardImage.alt.slice(0, 4) + "LK";//assigning a generated id, just in case
    cardDeleteButton.addEventListener("click", handleCardDelete);
    cardImage.addEventListener("click", handlePhotoClick);
    cardLikeButton = cardElement.querySelector('.cards__like-button');
    cardLikeButton.addEventListener("click", handleLikeButtonClick);
    return cardElement;
}

// (5.3) adding a new card-----------------------------------------------------------------

/*function getNewCardElement(object) { 
    cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
    cardImage = cardElement.querySelector('.cards__image');
    cardImage.src = object.link;
    cardImage.alt = object.name;
    cardTitle = cardElement.querySelector('.cards__title');
    cardTitle.textContent = object.name;
    return cardElement;
}*/ //do I really need this? I don't think I do. Have made the adjustments. Mark for Delete

function renderCard(item) {
    getCardElement(item);
    cardImplement.prepend(cardElement);
}

/*(4.3)implementing card*/ //the old way
/*for (i=0; i < initialCards.length; i++) {
    getCardElement(i);
    cardImplement.append(cardElement);
}*/ 

//5.1 rendering/implementing cards with a forEach instead of for loop------------------------------

initialCards.forEach(function (item) {
    getCardElement(item);
    cardImplement.append(cardElement);
});

//(5.4) the like button------------------------------------------------------------------------

function handleLikeButtonClick() {
    cardLikeButton.src = "images/union.svg";
}
/**/
//cardLikeButton.addEventListener("click", handleLikeButtonClick);

//(5.5) Deleting cards--------------------------------------------------------------------------
//I'm mostly just sketching this out

/*function handleCardDelete(event) {
  let markForDelete = event.target;//OK so the idea is this tells which delete button is pressed...
  let cardTarget = markForDelete.parentElement; //...and then it looks for the parent of the delete button. (That is, the card).
  cardTarget.setAttribute("style", "display: none"); //Once it knows the parent of the delete button it disables the card which isn't precisely the same as deleting it but I think it's close enough.  
}*/

//rewriting this- I think the key is to remove the appropriate element from the array and have the array rendered again

/*function handleCardDelete() {
//ok it needs to identify the member of the array that matches the target, then removes them from the array, then rerenders the array
  targetCardElement();
  removeTargetCard();
  initialCards.forEach(function (item) {
    getCardElement(item);
    cardImplement.append(cardElement);
});
}*/

//actually I may have been on to something just removing the elements, not screwing with the array. UGH.

/**/
//deleteButton.addEventListener("click", handleCardDelete); //might have to make this submit instead of click depending on how I set up the del button.

function handleCardDelete() {
    console.log("It's clicking.");
};
