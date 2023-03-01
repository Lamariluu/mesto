import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormAdd }) {
    super(popupSelector);
    this._handleFormAdd = handleFormAdd;
    this._form = document.querySelector(popupSelector).querySelector('.popup__form');
    this._inputs = document.querySelector(popupSelector).querySelectorAll('.popup__input');
  }

  //функция сбора данных всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //расширение метода close класса Popup
  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      console.log('setEventListeners', this._getInputValues())
      evt.preventDefault();
      this._handleFormAdd(this._getInputValues());
      //this.close();
    });
    super.setEventListeners();
  }
}
