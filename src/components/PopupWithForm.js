import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormAdd }) {
    super(popupSelector);
    this._handleFormAdd = handleFormAdd;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
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

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormAdd(this._getInputValues());
    });
    super.setEventListeners();
  }
}
