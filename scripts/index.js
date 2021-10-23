import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import initialCards from "./cards.js";
import { openPopupWindow, closePopupWindow } from "./utils.js";

//cards
const cardElements = document.querySelector(".elements");

// profile
const profileHeading = document.querySelector(".profile__heading");
const profileSubheading = document.querySelector(".profile__subheading");

// modals
const modalEditProfile = document.querySelector(".modal_type_edit");
const modalAddCard = document.querySelector(".modal_type_add");
const formEditProfile = modalEditProfile.querySelector(".form");
const formAddCard = modalAddCard.querySelector(".form");
const modalImagePreview = document.querySelector(".modal_type_popup");

// buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = modalEditProfile.querySelector(".modal__close-btn");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseBtn = modalAddCard.querySelector(".modal__close-btn");
const imagePopupCloseBtn = modalImagePreview.querySelector(".modal__close-btn");
const addCardSaveButton = modalAddCard.querySelector(".modal__save-button"); //submit button for add card modal

// page elements
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

const addImageTitle = formAddCard.querySelector("#image-title");
const addImageUrl = formAddCard.querySelector("#image-url");

const popupImage = modalImagePreview.querySelector(".modal__popup");
const previewTitle = modalImagePreview.querySelector(".modal__title_preview");

// functions

function updateProfile(event) {
  event.preventDefault();
  profileHeading.textContent = profileTitle.value;
  profileSubheading.textContent = profileSubtitle.value;
  closePopupWindow(modalEditProfile);
}

function renderCard(card, wrapper) {
  const element = new Card(card, "#cardTemplate").generateCard();
  wrapper.prepend(element);
}

initialCards.forEach((card) => {
  renderCard(card, cardElements);
});

function addImage(event) {
  event.preventDefault();
  const newCard = {
    name: addImageTitle.value,
    link: addImageUrl.value,
  };
  renderCard(newCard, cardElements);

  closePopupWindow(modalAddCard);
  addCardSaveButton.classList.add("modal__save-button_disabled");
  addCardSaveButton.disabled = true;
  formAddCard.reset();
}

// //event listeners

formEditProfile.addEventListener("submit", updateProfile);
formAddCard.addEventListener("submit", addImage);

profileEditButton.addEventListener("click", function () {
  openPopupWindow(modalEditProfile);
  profileTitle.value = profileHeading.textContent;
  profileSubtitle.value = profileSubheading.textContent;
});

editProfileCloseBtn.addEventListener("click", () =>
  closePopupWindow(modalEditProfile)
);

addCardButton.addEventListener("click", () => openPopupWindow(modalAddCard));

addCardCloseBtn.addEventListener("click", () => closePopupWindow(modalAddCard));

imagePopupCloseBtn.addEventListener("click", () =>
  closePopupWindow(modalImagePreview)
); //preview popup close

//validation

const formValidationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(formValidationConfig, formAddCard);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  formEditProfile
);
editFormValidator.enableValidation();
