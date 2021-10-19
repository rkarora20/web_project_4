const modalImagePreview = document.querySelector(".modal_type_popup");
const popupImage = modalImagePreview.querySelector(".modal__popup");
const previewTitle = modalImagePreview.querySelector(".modal__title_preview");

const imagePopupCloseBtn = modalImagePreview.querySelector(".modal__close-btn");

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    return closePopupWindow(document.querySelector(".modal_is-open"));
  }
}

function closeModalClick(evt) {
  if (evt.target.classList.contains("modal")) {
    return closePopupWindow(document.querySelector(".modal_is-open"));
  }
}

function resetAddCardForm() {
  addCardSaveButton.classList.toggle("modal__save-button_disabled");
  addCardSaveButton.disabled = true;
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

class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeButton() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _handlePreviewCard() {
    openPopupWindow(modalImagePreview);
    popupImage.src = this._link;
    popupImage.alt = `picture of ${this._name}`;
    previewTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handlePreviewCard();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__description").textContent =
      this._name;
    this._element.querySelector(".element__image").src = `${this._link}`;
    this._element.querySelector(
      ".element__image"
    ).alt = `picture of ${this._name}`;
    return this._element;
  }
}

export default Card;
