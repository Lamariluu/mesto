//импорт классов
import { initialCards } from '../utils/constants.js';
import { popupAdd,
popupBigImage,
popupProfile,
profileButtonChange,
profileButtonAdd,
inputName,
inputBio,
profileUsername,
profileDescription,
validationConfig} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
//import Popup from './Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'

//подключение валидации
const formValidProfile = new FormValidator(validationConfig, popupProfile);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(validationConfig, popupAdd);
formValidAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ name: profileUsername, bio: profileDescription });

//функция создания новых карточек
const renderCard = (data) => {
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
    const newCard = renderCard(item);
    cardList.addItem(newCard);
  }
}, '.elements');
cardList.renderItems();

//функция добавления новых карточек
const popupAddCard = new PopupWithForm(popupAdd, {
  handleFormAdd: (data) => {
    const newCard = renderCard(data);
    cardList.addItem(newCard);
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

const popupChangeProfile = new PopupWithForm(popupProfile, {
  handleFormAdd: (profileData) => {
    userInfo.setUserInfo (profileData.name, profileData.bio);
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
  const {name, bio} = userInfo.getUserInfo();
  inputName.value = name;
  inputBio.value = bio;
  //formValidProfile.resetValidation();
  popupChangeProfile.open();
});

//функция сохранения данных профиля
function saveProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUsername.textContent = inputName.value;
  profileDescription.textContent = inputBio.value;
  //closePopup(popupProfile);
};

popupProfile.addEventListener('submit', saveProfileFormSubmit);

////функция открытия попапов
//function openPopup(popup) {
//  popup.classList.add('popup_opened');
//  //закрытие при нажатии Esc
//  document.addEventListener('keydown', closePopupEsc);
//};

////функция закрытия попапов
//function closePopup(popup) {
//  popup.classList.remove('popup_opened');
//  //закрытие при нажатии Esc, удаление слушателя
//  document.removeEventListener('keydown', closePopupEsc);
//};

////функция закрытия попапов при нажатии Esc
//function closePopupEsc(evt) {
//  if (evt.key === 'Escape') {
//    const popupOpened = document.querySelector('.popup_opened');
//    closePopup(popupOpened);
//  }
//};
