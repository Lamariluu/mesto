//создание переменных для открытия попапов
const popupAdd = document.querySelector('#popup-add-element');
const popupProfile = document.querySelector('#popup-change-profile');
const popupOpenImg = document.querySelector('#popup-open-img');
const profileButtonProfile = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
//создание переменных для закрытия попапов
const popupCloseProfile = document.querySelector('.popup__close_edit');
const popupCloseImg = document.querySelector('.popup__close_img');
const popupCloseAdd = document.querySelector('.popup__close_add');
//создание переменных для сохранения данных профиля
const popupFormProfile = document.querySelector('.popup__form_edit');
const inputName = document.querySelector('.popup__input_type_name');
const inputBio = document.querySelector('.popup__input_type_bio');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
//создание переменных для добавления новых карточек
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputPlaceImg = document.querySelector('.popup__input_type_place-img');
//создание переменных для просмотра фотографий
const popupImg = document.querySelector('.popup__img');
const popupImgCaption = document.querySelector('.popup__img-caption');
const sectionElements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements').content;
const elementsImg = document.querySelector('.element__photo');
const popups = document.querySelectorAll(".popup");

//создание переменной для массива с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//создание переменной для валидации всех форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible',
  typeError : 'popup__input_type_error',
};

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //закрытие при нажатии Esc
  document.addEventListener('keydown', closePopupEsc);
};

//функция закрытия попапов при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция закрытия попапов при клике на overlay
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
};

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //закрытие при нажатии Esc, удаление слушателя
  document.removeEventListener('keydown', closePopupEsc);
};

//функция сохранения данных профиля
function saveProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUsername.textContent = inputName.value;
  profileDescription.textContent = inputBio.value;
  closePopup(popupProfile);
};

//функция создания новых карточек
function createElement(name, link) {
  const newElement = elementsTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__photo').src = link;
  newElement.querySelector('.element__photo').alt = name;
  newElement.querySelector('.element__title').textContent = name;
//просмотр фотографии
  newElement.querySelector('.element__photo').addEventListener('click', () => {
    popupImg.src = newElement.querySelector('.element__photo').src;
    popupImg.alt = newElement.querySelector('.element__title').textContent;
    popupImgCaption.textContent = newElement.querySelector('.element__title').textContent;
    openPopup(popupOpenImg);
  });
//добавление лайка
  newElement.querySelector('.element__like').addEventListener('click', () => {
    newElement.querySelector('.element__like').classList.toggle('element__like_active');
  });
//удаление карточки
  newElement.querySelector('.element__trash').addEventListener('click', () => {
    newElement.remove();
  });

  return newElement;
};

//функция добавления новых карточек
function createCardFormSubmit(evt) {
  evt.preventDefault();
  sectionElements.prepend(createElement(inputPlaceName.value, inputPlaceImg.value));
  closePopup(popupAdd);
};

//функция добавления новых карточек в начало страницы
function appendElement(name, link) {
  sectionElements.append(createElement(name, link));
};
initialCards.forEach(partOfCard => {
  appendElement(partOfCard.name, partOfCard.link);
});

//открытие формы профиля
profileButtonProfile.addEventListener('click',()=>{
  inputName.value = profileUsername.textContent;
  inputBio.value = profileDescription.textContent;
  openPopup(popupProfile);
});
//открытие формы добавления карточки
profileButtonAdd.addEventListener('click',()=>{
  inputPlaceName.value = '';
  inputPlaceImg.value = '';
  openPopup(popupAdd);
});
//закрытие формы профиля
popupCloseProfile.addEventListener('click',()=>{
  closePopup(popupProfile);
});
//закрытие формы добавления карточки
popupCloseAdd.addEventListener('click',()=>{
  closePopup(popupAdd);
});
//добавление новых карточек
popupFormAdd.addEventListener('submit', createCardFormSubmit);
//сохранение данных профиля
popupFormProfile.addEventListener('submit', saveProfileFormSubmit);
//закрытие попапа просмотра фотографии
popupCloseImg.addEventListener('click',()=>{
  closePopup(popupOpenImg);
});
//закрытие попапов при клике на overlay
popupProfile.addEventListener("click", closePopupOverlay);
popupAdd.addEventListener("click", closePopupOverlay);
popupOpenImg.addEventListener("click", closePopupOverlay);

//подключение валидации
enableValidation(validationConfig);

