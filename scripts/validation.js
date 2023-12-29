//for all my validation needs

console.log("I, (validation,) am loading just fine.");

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

config = {    
    formSelector: ".popup__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }

//variables

//functions

function enableValidation(validationParameters) {    
    const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
    //console.log(validationParameters);
    //console.log(formList);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationParameters);
    });    
};

function setEventListeners(formEl, valParam) {
    const {inputSelector} = valParam;//object destructuring method
    //const inputElements = Array.from(formEl.querySelectorAll(valParam.inputSelector)); //=to above
    const inputElements = Array.from(formEl.querySelectorAll(inputSelector));
    //console.log(inputElements + "here are the input elements.");
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            //console.log("input DETECTED");
            //TIMESTAMP 39:40, STOPPING FOR TONIGHT
        });
    });
};

enableValidation(config);