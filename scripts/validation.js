//for all my validation needs
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
    formSelector: ".popup__form",//One exception is this- just inserted this class into the relevant forms, didn't change it.
    inputSelector: ".modal__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }

//variables

//I've been toying around with making the parameters for all the descendent functions have slightly different names- e.g. what starts as formElements becomes formEls or something like that. Might be a bid at future-proofing or making it seem like the function can be used in multiple ways but... I think it's needlessly confusing for now. Going to ammend this.
//My other worry, though, is that by having all the elements in question named the same is that the, "scope," could become confused and they, (the functions,) could start pulling the data from the wrong places at the wrong time. It'll be doubly important, then, to make sure my spelling is tight and consistent.
//Regardless the, 'pedigree,' of each variable should be clear which, at this point, I value more; if this proves to be a problem then I will dice up the variable/parameter names in each function accordingly.

//OH YEAH IN CASE IT ISN'T CLEAR I WAS FOLLOWING ALONG WITH THE SCREENCAST AND MODELLING ALL THIS OFF OF THAT. I'M NOT SURE EXACTLY ON THE RULES FOR PLAGIARISM IN CODE ARE OR IF THIS COUNTS AS THAT BUT IS ACKNOWLEDGING IT HERE WORTH SOMETHING? 

//functions

function enableValidation(validationParameters) {//this is the master function for this script that is initially called. Why am I calling the required object, "validation parameters?" Good question- the object needed is all for validation and these are parameters to the master function so... yeah.
    const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationParameters);
    });
};

function setEventListeners(formElement, validationParameters) { //being literal with the paramters here so i avoid confustion, especially with plural and singular elements. 
    const {inputSelector} = validationParameters;//trying out the object destructuring method. Selecting the property/key straight out of the object. Very neat.
    //const inputElements = Array.from(formEl.querySelectorAll(valParam.inputSelector)); //=to above
    const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(".modal__save");
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, validationParameters, inputElement);
            toggleButtonState(inputElements, submitButton, validationParameters);
        });
    });
};

function checkInputValidity(formElement, validationParameters, inputElement) {
    if (!inputElement.validity.valid) {
       return showInputError(formElement, inputElement, validationParameters);
    }    
    hideInputError(formElement, inputElement, validationParameters);
    
}

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {//object destructuring again, just pulling the properties im concerned with out of the object.
    //const errorMessageElem = formElement.querySelector("#" + inputElem.id + "-error");
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);//template literal of the above, looks cooler.
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {// basically a clone, mildly tweaked, of the above
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
}

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