//создание переменной для массива с карточками
export const initialCards = [
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

//создание переменных для открытия попапов
export const popupAdd = document.querySelector('#popup-add-element');
export const popupBigImage = document.querySelector('.popup_big-img');

export const popupProfile = document.querySelector('#popup-change-profile');
export const popupOpenImg = document.querySelector('#popup-open-img');
export const profileButtonChange = document.querySelector('.profile__edit-button');
export const profileButtonAdd = document.querySelector('.profile__add-button');
//создание переменных для закрытия попапов
export const popupCloseProfile = document.querySelector('.popup__close_edit');
export const popupCloseImg = document.querySelector('.popup__close_img');
export const popupCloseAdd = document.querySelector('.popup__close_add');
export const popupCloseButtons = document.querySelectorAll(".popup__close");
//создание переменных для сохранения данных профиля
export const popupFormProfile = document.querySelector('.popup__form_edit');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputBio = document.querySelector('.popup__input_type_bio');
export const profileUsername = document.querySelector('.profile__username');
export const profileDescription = document.querySelector('.profile__description');
//создание переменных для добавления новых карточек
export const popupFormAdd = popupAdd.querySelector('.popup__form_add');
export const inputPlaceName = document.querySelector('.popup__input_type_place-name');
export const inputPlaceImg = document.querySelector('.popup__input_type_place-img');
//создание переменных для просмотра фотографий
export const popupImg = document.querySelector('.popup__img');
export const popupImgCaption = document.querySelector('.popup__img-caption');
export const sectionElements = document.querySelector('.elements');
export const elementsTemplate = document.querySelector('#elements').content;
export const popups = document.querySelectorAll(".popup");
export const popupBigImg = document.querySelector('.popup_big-img');

//создание переменной для валидации всех форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible',
  typeError: 'popup__input_type_error',
};
