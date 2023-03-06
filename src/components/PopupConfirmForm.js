import Popup from "./Popup.js";

export default class PopupConfirmForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
    this._save = this._popup.querySelector('.popup__save');
  }

  open(handleSubmit) {
    super.open();
    this._handleSubmit = handleSubmit;
  }

  close() {
    super.close();
    this._handleSubmit = undefined;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
