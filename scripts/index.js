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

/*function openModal(modal) {
    modal.classList.add('modal_opened');
}*/

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

/*function  closeModal(modal) {
    modal.classList.remove('modal_opened');
}*/

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


/*
   **Needs correcting**

 Please, call it `modals` because you fine all modals here G2G

*/
//const closeOverlays = Array.from(document.querySelectorAll(".modal"));
/*change to*/ const modals = Array.from(document.querySelectorAll(".modal"));

const pageOverlay = document.querySelector(".page");


const modalBoxes = Array.from(document.querySelectorAll(".modal__box"));

//functions

//1A THIS ONE IS VERY TRICKY/SENSITIVE. THE CHANGES I WANT TO MAKE SEEM TO BREAK THE OPEN MODAL FUNCTION. SEE 1B FOR WHAT I IMAGINE I WANT TO DO BUT WHICH DOESN'T WORK
/*function handlePageClick(evt) {//prime
    const bigOverlay = evt.target;    
/***Needs correcting** Please, use `closeOverlays` here because it's the same modals you need G2G
     No need to search them again and again
    const subordinateOverlays = Array.from(bigOverlay.querySelectorAll(".modal"));
    subordinateOverlays.forEach((subordinateOverlay) => {
        if (subordinateOverlay.classList.contains("modal_opened")) {
            closeModal(subordinateOverlay);
        };
    });    
}*/

/*1B 

/*function handlePageClick(modals) {
	modals.forEach((modal) => {
		if(modal.classList.contains("modal_opened")) {
			closeModal(modal);
		};
}); */ //but see this, for some reason, obstructs my open function; I do not get it.*/

//actually I think I can just wire the close function directly in the event listener for the page.


/***Needs correcting*** Please, donâ€™t add listeners to `document` or `window` or `pageOverlay` if you donâ€™t remove them because the listeners always watch any clicks on the page and make checks. 
Thatâ€™s a waste of resources.*/ //G2G

//pageOverlay.addEventListener("click", handlePageClick);
//hmm maybe I will add this to the open modal function, same with escape since that has the same critique.

/*function handleEscapePress(evt) {//prime
    const bigOverlay = evt.currentTarget;    
    /***Needs correcting** Please, use `closeOverlays` here because it's the same modals you need
     No need to search them again and again*/
    /*const subordinateOverlays = Array.from(bigOverlay.querySelectorAll(".modal"));
    subordinateOverlays.forEach((subordinateOverlay) => {
        if ((evt.keyCode == 27) && (subordinateOverlay.classList.contains("modal_opened"))) {            
            closeModal(subordinateOverlay);
        };
    });
}*/

/*function handleEscapePress(evt) {
	modals.forEach((modal) => {
		if (evt.key == "Escape") { //gonna try w/out the open check, seems redundant.
			closeModal(modal);
		};
	});
}*/ //refactoring 'cos if I am adding to modal on open I don't need to iterate through

function handleEscapePress(evt) {
    modals.forEach((modal) => {
        if (evt.key == "Escape") {
            closeModal(modal);
        };
    });    
}


//REWRITING OPEN MODAL AND CLOSE MODAL HERE, HAVE ANNOTATED THEM OUT ABOVE AND AM REFACTORING HERE

//open modal

function openModal(modal) {
    modal.classList.add('modal_opened');
    //document.addEventListener("click", closeModal(modal));
    document.addEventListener("keydown", handleEscapePress); //very iffy about this- I need to pass it the event object and the modal as a parameter, will see if this works.
    //document.addEventListener("keydown", (modal) => handleEscapePress(modal)); keeping this handy in the backpocket in case the above doesn't work
}

//close modal

function closeModal(modal) {
    modal.classList.remove('modal_opened');    
    //pageOverlay.removeEventListener("click", closeModal);
    document.removeEventListener("keydown", handleEscapePress);
}

/***Needs correcting*** The check list says: An event listener for closing the popup by pressing Esc is added when the popup is opened, and is removed when it's closed.*/ //G2G

//document.addEventListener("keydown", handleEscapePress); //will add elsewhere, maybe integrate with open and closing functions.

function handleBoxClick(evt) {    
    evt.stopImmediatePropagation();
}

modalBoxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
});

/*closeOverlays.forEach((overlay) => {
    overlay.addEventListener("click", () => closeModal(overlay));
});*/

modals.forEach((modal) => {
	modal.addEventListener("click", () => closeModal(modal));
}); //may have screwed up the function declaration here but you get the idea- just rewriting the above with the new variable



//-----------------------------------------------------------------------------------------------------------------------------------------worry about this later, get working first

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
*/