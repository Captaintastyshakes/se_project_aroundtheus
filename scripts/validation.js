//for all my validation needs

//console.log("I, (validation,) am loading just fine.");

/*this is the project 'starter,' code.

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

*/

//objects

config = {//modifying the key values a bit to match the classes I am using, i.e. modal instead of popup.
    formSelector: ".popup__form",//just inserted this class into the relevant forms, didn't change it.
    inputSelector: ".modal__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }

//variables

//I've been fucking around with making the parameters for all the descendent functions have slightly different names- e.g. what starts as formElements becomes formEls or something like that. Might be a bid at future-proofing or making it seem like the function can be used in multiple ways but... I think it's needlessly confusing for now. Going to ammend this.
//My other worry, though, is that by having all the elements in question named the same that is the, "scope," could become confused and they, (the functions,) could start pulling the data from the wrong places at the wrong time. It'll be doubly important, then, to make sure my spelling is tight and consistent.
//Regardless the, 'pedigree,' of each variable should be clear as they are passed through these functions as long as I acknowledge the above. If this proves to be a problem then I will dice up the variable/paramter names in each function.

//functions

function enableValidation(validationParameters) {//this is the master function for this script that is initially called. Why am I calling the object validation parameters? Good question- this is all for validation and these are parameters to the master function so... yeah.
    const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
    //console.log(validationParameters);
    //console.log(formList);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {//should I break this out into a function or is anonymous ok? Part of me want to be very deliberate. Then again it's a single line... will leave anonymous for now.
            evt.preventDefault();
        });
        setEventListeners(formElement, validationParameters); //passing these pieces, the form being checked and the initial object, to the next descendent.
    });
};

function setEventListeners(formElement, validationParameters) { //being literal with the paramters here so i avoid confustion, especially with plural and singular element(s). 
    const {inputSelector} = validationParameters;//object destructuring method. Selecting the property/key straight out of the object.
    //const inputElements = Array.from(formEl.querySelectorAll(valParam.inputSelector)); //=to above
    const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
    //console.log(inputElements + "here are the input elements.");
    const submitButton = formElement.querySelector(".modal__save");
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {//haven't used the event object info yet.
            //console.log("input DETECTED");            
            //console.log(inputElement.validationMessage);
            checkInputValidity(formElement, validationParameters, inputElement);
            toggleButtonState(inputElements, submitButton);
        });
    });
};

//check input validity functions

function checkInputValidity(formElement, validationParameters, inputElement) {
    if (!inputElement.validity.valid) {
       return showInputError(formElement, inputElement, validationParameters);
    }    
    hideInputError(formElement, inputElement, validationParameters);
    
}

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {//object destructuring, just pulling the properties im concerned with out of the object.
    //console.log(inputElem.id);
    //const errorMessageElem = formElement.querySelector("#" + inputElem.id + "-error");
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);//template literal of the above    
    //console.log(errorMessageElem);
    //InputElement.classList.add(validationParams.inputErrorClass);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {// basically a clone, mildly tweaked, of the above
    const errorMessageElem = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
}


//toggle button state functions

/*function toggleButtonState(inputElems, submButton, {inactiveButtonClass}) {
    let foundInvalid = false;
    inputElems.forEach(inputElem => () {
        if (!inputElem.validity.valid) {
            foundInvalid = true;
        }
    });
    if (foundInvalid) {
        submButton.classList.add(inactiveButtonClass);
        return submButton.disabled = true;
    }
    submButton.classList.remove(inactiveButtonClass);
    submButton.disabled = false;
    
};*///broke this out into smaller/clearer functions. See below

function toggleButtonState(inputElements, submitButton, {inactiveButtonClass}) {
    if (hasInvalidInput(inputElements)) {        
        disableSubmitButton(submitButton, inactiveButtonClass);
    }    
    enableSubmitButton(submitButton, inactiveButtonClass);
    
};

function hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
        return submitButton.disabled = true;
}

function enableSubmitButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

enableValidation(config);