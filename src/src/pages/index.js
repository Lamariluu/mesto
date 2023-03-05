//импорт классов
import { validationConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmForm from '../components/PopupConfirmForm.js';
import './index.css'
import api from '../components/Api.js';

//создание переменных для открытия попапов
const popupAdd = '#popup-add-element';
const popupBigImage = '.popup_big-img';
const popupProfile = '#popup-change-profile';
const popupAvatar = '#popup-change-avatar';
const popupOpenImg = document.querySelector('#popup-open-img');
const profileButtonChange = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileButtonAvatar = document.querySelector('.profile__edit-avatar');
const trashButton = document.querySelector('.element__trash');
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
const profileAvatar = '.profile__avatar';
const popupConfirm = '#popup-confirm';
//создание переменных для добавления новых карточек
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

const formValidAvatar = new FormValidator(validationConfig, popupAvatar);
formValidAvatar.enableValidation();

const popupWithImage = new PopupWithImage(popupBigImage);
popupWithImage.setEventListeners();


const popupConfirmRemove = new PopupConfirmForm(popupConfirm, {
  handleSubmit: () => {

  }
});
popupConfirmRemove.setEventListeners();


const userInfo = new UserInfo({ userNameSelector: profileUsername, userBioSelector: profileDescription, userAvatarSelector: profileAvatar });

//редактирование профиля
const popupChangeProfile = new PopupWithForm(popupProfile, {
  handleFormAdd: (profileData) => {
    popupChangeProfile.setLoading();
    api.setUserInfo({ name: profileData.username, about: profileData.userbio })
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        popupChangeProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeProfile.setGeneral();
      })
  }
});
popupChangeProfile.setEventListeners();

//загрузка информации о пользователе с сервера
api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
    profileButtonChange.addEventListener('click', () => {
      const { name, bio } = userInfo.getUserInfo();
      inputName.value = name;
      inputBio.value = bio;
      popupChangeProfile.open();
    });

    const createCard = (data) => {
      const card = new Card({
        item: data, handleCardClick: () => {
          popupWithImage.open(data.name, data.link);
        }, handleTrashClick: (callback) => {
          popupConfirmRemove.open(callback);
        },
        handleLikeClick: (callback) => {

        }, userInfo: userInfo.getUserInfo(),
      }, '#elements');
      const cardElement = card.createCard();
      return cardElement;
    };

    const cardList = new Section({
      items: [],
      renderer: (item) => {
        const newCard = createCard(item);
        cardList.addItem(newCard);
      }
    }, '.elements');

    //добавление новой карточки
    const popupAddCard = new PopupWithForm(popupAdd, {
      handleFormAdd: (data) => {
        popupAddCard.setLoading();
        api.createItem({ link: data.link, name: data.name })
          .then((result) => {
            console.log({ result })
            const newCard = createCard(result);
            cardList.addItem(newCard);
            popupAddCard.close();
          })
          .catch((err) => {
            console.log({ err })
          })
          .finally(() => {
            popupAddCard.setGeneral();
          })
      }
    });
    popupAddCard.setEventListeners();

    profileButtonAdd.addEventListener('click', () => {
      formValidAdd.resetValidation();
      popupAddCard.open();
    });

    api.getInitialCards()
      .then((result) => {
        cardList.updateList(result)
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

//изменить аватар
const popupChangeAvatar = new PopupWithForm(popupAvatar, {
  handleFormAdd: (data) => {
    popupChangeAvatar.setLoading();
    api.setUserAvatar({ avatar: data.avatar })
      .then((result) => {
        userInfo.setUserAvatar(data.avatar);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeAvatar.setGeneral();
      })
  }
});
popupChangeAvatar.setEventListeners();

profileButtonAvatar.addEventListener('click', () => {
  formValidAvatar.resetValidation();
  popupChangeAvatar.open();
});
