export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._submit = this._popup.querySelector('.popup__save');
  }

  //функция открытия попапов
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //функция закрытия попапов
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //функция закрытия попапов при нажатии Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  //изменение кнопки при сохранении данных
  setLoading() {
    this._submit.textContent = 'Сохранение...';
  }

  setGeneral() {
    this._submit.textContent = 'Сохранить';
  }

  //функция закрытия попапов при клике на иконку закрытия и overlay
  setEventListeners() {
    this._buttonClose.addEventListener('mousedown', () => {
      this.close()
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
    });
  }
}
