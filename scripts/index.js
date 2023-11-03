/*--objects--*/

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

/*for opening and closing functions*/
let editButton = document.querySelector('.profile__edit-button');

let closeModal = document.querySelector('.profile__modal-exit');

let modalBox = profile.querySelector('.profile__modal');

/*for populating form fields*/

let nameField = document.querySelector('.profile__modal-name');

let profileName = document.querySelector('.profile__name');

let aboutMeField = document.querySelector('.profile__modal-occupation');

let profileOccupation = document.querySelector('.profile__occupation')

/*submit*/

let saveButton = document.querySelector('profile__modal-save');



/*--functions--*/

/*opening modal*/
editButton.addEventListener("click", function() {    
    modalBox.removeAttribute('style', 'display');
    /*populating the modal/form*/
    nameField = profileName.textContent;
    aboutMeField = profileOccupation.textContent;

});
/*closing modal*/
closeModal.addEventListener("click", function() {
    modalBox.addAttribute('style', "display: none");
});

/*saving/submitting*/

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    
}

saveButton.addEventListener("submit", handleProfileFormSubmit);


