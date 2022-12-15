//создание переменных
const profileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
//создание переменных для сохранения данных профиля
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');
const profileName = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
//функция открытия попапа
function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileDescription.textContent;
}
//функция закрытия попапа
function closePopup(event) {
  popup.classList.remove('popup_opened');
}
//функция сохранения данных профиля
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = bioInput.value;
  closePopup();
}
//слушатели событий
profileButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
