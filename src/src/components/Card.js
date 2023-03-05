import api from "./Api";

export default class Card {
  constructor(data, templateSelector) {
    this._link = data.item.link;
    this._name = data.item.name;
    this._cardId = data.item._id;
    this._ownerId = data.item.owner._id;
    this._userId = data.userInfo._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = data.handleCardClick;
    this._handleTrashClick = data.handleTrashClick;
    this._likes = data.item.likes;
  };

  createCard() {
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector(".element__like");
    this._elementTrash = this._element.querySelector(".element__trash");
    this._elementImg = this._element.querySelector(".element__photo");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikeCounter = this._element.querySelector(".element__like-counter");
    this._elementLikeCounter.textContent = this._likes.length;
    this._removeTrash();
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    this._likesUser();
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

    if (this._hasMyLike) {
      api.deleteLike(this._cardId)
    } else {
      api.addLike(this._cardId)
    }
  };

  _trash() {
    this._element.remove();
    this._element = null;
    api.deleteItem(this._cardId);
  };

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._like();
    });
    this._elementTrash.addEventListener('click', () => {
      this._handleTrashClick(this._trash.bind(this));
    });
    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  _addLike() {
    this._hasMyLike = true
    this._elementLike.classList.add("element__like_active");
  }

  _likesUser() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._addLike();
    }
  }

  _removeTrash() {
    if (this._userId !== this._ownerId) {
      this._elementTrash.remove();
    }
  }
}

