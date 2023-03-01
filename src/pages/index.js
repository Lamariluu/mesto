//импорт классов
import { initialCards } from '../utils/constants.js';
import { validationConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'

//создание переменных для открытия попапов
const popupAdd = '#popup-add-element';
const popupBigImage = '.popup_big-img';

const popupProfile = '#popup-change-profile';
const popupOpenImg = document.querySelector('#popup-open-img');
const profileButtonChange = document.querySelector('.profile__edit-button');
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
const profileUsername = '.profile__username';
const profileDescription = '.profile__description';
//создание переменных для добавления новых карточек
//const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputPlaceImg = document.querySelector('.popup__input_type_place-img');
//создание переменных для просмотра фотографий
const popupImg = document.querySelector('.popup__img');
const popupImgCaption = document.querySelector('.popup__img-caption');
const sectionElements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#elements').content;
const popups = document.querySelectorAll(".popup");
const popupBigImg = document.querySelector('.popup_big-img');

//подключение валидации
const formValidProfile = new FormValidator(validationConfig, popupProfile);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(validationConfig, popupAdd);
formValidAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: profileUsername, userBioSelector: profileDescription });

//функция создания новых карточек
const createCard = (data) => {
  const card = new Card({
    item: data, link: data.link, name: data.name, handleCardClick: () => {
      popupWithImage.open(data.name, data.link);
    },
  }, '#elements');
  const cardElement = card.createCard();
  return cardElement;
};

//отрисовка элементов на странице
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    cardList.addItem(newCard);
  }
}, '.elements');
cardList.renderItems();

//функция добавления новых карточек
const popupAddCard = new PopupWithForm(popupAdd, {
  handleFormAdd: (data) => {
    const newCard = createCard(data);
    console.log({ newCard })
    cardList.addItem(newCard);
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

const popupChangeProfile = new PopupWithForm(popupProfile, {
  handleFormAdd: (profileData) => {
    userInfo.setUserInfo(profileData.username, profileData.userbio);
    popupChangeProfile.close();
  }
});
popupChangeProfile.setEventListeners();

//открытие формы добавления карточки
profileButtonAdd.addEventListener('click', () => {
  //popupFormAdd.reset();
  formValidAdd.resetValidation();
  popupAddCard.open();
});

//открытие формы профиля
profileButtonChange.addEventListener('click', () => {
  const { name, bio } = userInfo.getUserInfo();
  inputName.value = name;
  inputBio.value = bio;
  //formValidProfile.resetValidation();
  popupChangeProfile.open();
});
