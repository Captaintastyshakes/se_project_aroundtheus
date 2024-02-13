export default class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });    
    this._setEventListeners();
    }

    _setEventListeners() {
        const _inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        _inputElements.forEach((_inputElement) => {
            _inputElement.addEventListener("input", () => {
                this._checkInputValidity(_inputElement);
                this._toggleButtonState(_inputElement);
            });
        });
    }

    _checkInputValidity(_inputElement) {
        if (!_inputElement.validity.valid) {            
            return this._showInputError(_inputElement);
        }
        this._hideInputError(_inputElement);
    }

    _showInputError(_inputElement) {
        const _errorMessageElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
        _inputElement.classList.add(this._inputErrorClass);
        _errorMessageElement.textContent = _inputElement.validationMessage;
        _errorMessageElement.classList.add(this._errorClass);
    }

    _hideInputError(_inputElement) {
        const _errorMessageElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
        _inputElement.classList.remove(this._inputErrorClass);
        _errorMessageElement.textContent = "";
        _errorMessageElement.classList.remove(this._errorClass);
    }

    _toggleButtonState(_inputElement) {
        const _submitButton = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(_inputElement)) {            
            this._disableSubmitButton(_submitButton);
        }        
        else {this._enableSubmitButton(_submitButton);}
    }

    _hasInvalidInput(_inputElement) {
        return !_inputElement.validity.valid;
    }

    _disableSubmitButton(_submitButton) {
        _submitButton.classList.add(this._inactiveButtonClass);        
        return _submitButton.disabled = true;
    }
    
    _enableSubmitButton(_submitButton) {
        _submitButton.classList.remove(this._inactiveButtonClass);        
        return _submitButton.disabled = false;
    }

    resetFormValidation() {
        //console.log("form reset is running.");        
    }
}