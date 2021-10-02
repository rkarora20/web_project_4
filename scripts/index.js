//cards
const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".element");
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

function closeModalClick(evt) {
  if(evt.target.classList.contains("modal")) {
    return closePopupWindow(document.querySelector(".modal_is-open"));
}
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    return closePopupWindow(document.querySelector(".modal_is-open"));
  }
}

function resetAddCardForm() {
  addCardSaveButton.classList.toggle("modal__save-button_disabled");
  addCardSaveButton.disabled=true;
  formAddCard.reset();
}

function openPopupWindow(modalWindow) {
  document.addEventListener("click", closeModalClick);
  document.addEventListener("keydown", closeModalEsc);
  modalWindow.classList.toggle("modal_is-open");
}

function closePopupWindow(modalWindow) {
  document.removeEventListener("click", closeModalClick);
  document.removeEventListener("keydown", closeModalEsc);
  modalWindow.classList.toggle("modal_is-open");
}

function updateProfile(event) {
  event.preventDefault();
  profileHeading.textContent = profileTitle.value;
  profileSubheading.textContent = profileSubtitle.value;
  closePopupWindow(modalEditProfile);
}

function addImage(event) {
  event.preventDefault();
  const card = {
    name: addImageTitle.value,
    link: addImageUrl.value,
  };
  const cardElement = createCard(card);
  cardElements.prepend(cardElement);
  closePopupWindow(modalAddCard);
  resetAddCardForm();
}

function likeButtonToggle(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function imagePreview(card) {
  openPopupWindow(modalImagePreview);
  popupImage.src = card.link;
  popupImage.alt = `picture of ${card.name}`;
  previewTitle.textContent = card.name;
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".element__image");
  const imageLikeBtn = cardElement.querySelector(".element__like-button");
  const imageDeleteBtn = cardElement.querySelector(".element__delete-button");
  cardElement.querySelector(".element__description").textContent = card.name;
  cardImage.src = `${card.link}`;
  cardImage.alt = `picture of ${card.name}`;
  cardImage.addEventListener("click", () => imagePreview(card));
  imageLikeBtn.addEventListener("click", likeButtonToggle);
  imageDeleteBtn.addEventListener("click", () => cardElement.remove());
  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.append(createCard(card));
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

initialCards.forEach((card) => {
  renderCard(card, cardElements);
});
