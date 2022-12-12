const profileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input-name');
const bioInput = document.querySelector('.popup__input-bio');
const profileName = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const popupSave = document.querySelector('.popup__save');

profileButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  bioInput.value = profileDescription.textContent;
}

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = bioInput.value;
  popup.classList.remove('popup_opened');
}
