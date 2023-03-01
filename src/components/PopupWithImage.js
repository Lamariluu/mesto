import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = document.querySelector('.popup__img');
    this._title = document.querySelector('.popup__img-caption');
  }

  open(name, link) {
    this._img.alt = name;
    this._img.src = link;
    this._title.textContent = name;
    super.open();
  }
}
