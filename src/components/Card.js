export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = data.handleCardClick;
  };

  createCard() {
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector(".element__like");
    this._elementTrash = this._element.querySelector(".element__trash");
    this._elementImg = this._element.querySelector(".element__photo");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  };

  _like() {
    this._elementLike.classList.toggle("element__like_active");
  };

  _trash() {
    this._element.remove();
  };

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._like();
    });
    this._elementTrash.addEventListener('click', () => {
      this._trash();
    });
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };
}
