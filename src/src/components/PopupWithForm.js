import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormAdd }) {
    super(popupSelector);
    this._handleFormAdd = handleFormAdd;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
    this._inputs = document.querySelector(popupSelector).querySelectorAll('.popup__input');
    this._submit = document.querySelector(popupSelector).querySelector('.popup__save');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setLoading() {
    console.log(this._submit, 'submit')
    this._submit.textContent = 'Сохранение...';
  }

  setGeneral() {
    this._submit.textContent = 'Сохранить';
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormAdd(this._getInputValues());
    });
    super.setEventListeners();
  }
}
