//импорт классов
import initialCards from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const popupCloseButtons = document.querySelectorAll(".popup__close");
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
const popups = document.querySelectorAll(".popup");

//создание переменной для валидации всех форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible',
  typeError: 'popup__input_type_error',
};

//подключение валидации
const formValidProfile = new FormValidator(validationConfig, popupProfile);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(validationConfig, popupAdd);
formValidAdd.enableValidation();

//открытие формы профиля
profileButtonProfile.addEventListener('click', () => {
  inputName.value = profileUsername.textContent;
  inputBio.value = profileDescription.textContent;
  formValidProfile.resetValidation();
  openPopup(popupProfile);
});

//функция сохранения данных профиля
function saveProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUsername.textContent = inputName.value;
  profileDescription.textContent = inputBio.value;
  closePopup(popupProfile);
};

//функция создания новых карточек
function renderCard(data) {
  const card = new Card(data, '#elements', handleOpenPopupImg);
  const cardElement = card.createCard();
  sectionElements.prepend(cardElement);
  return cardElement;
};

//функция добавления новых карточек в начало страницы
initialCards.forEach(renderCard);

//открытие формы добавления карточки
profileButtonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  popupFormAdd.reset();
  formValidAdd.resetValidation();
});

function handleFormAdd(evt) {
  evt.preventDefault();
  const cardName = inputPlaceName.value;
  const cardLink = inputPlaceImg.value;
  const data = { name: cardName, link: cardLink }
  renderCard(data);
  closePopup(popupAdd);
};

function handleOpenPopupImg(title, img) {
  popupImg.alt = `${title}.`;
  popupImg.src = img;
  popupImgCaption.textContent = title;
  openPopup(popupOpenImg);
};

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //закрытие при нажатии Esc
  document.addEventListener('keydown', closePopupEsc);
};

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //закрытие при нажатии Esc, удаление слушателя
  document.removeEventListener('keydown', closePopupEsc);
};

popupCloseButtons.forEach(button => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.currentTarget.closest('.popup'));
  });
});

//функция закрытия попапов при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//закрытие попапов при клике на overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

popupProfile.addEventListener('submit', saveProfileFormSubmit);

popupFormAdd.addEventListener('submit', handleFormAdd);
