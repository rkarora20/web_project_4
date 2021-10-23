import { openPopupWindow } from "./utils.js";

const modalImagePreview = document.querySelector(".modal_type_popup");
const popupImage = modalImagePreview.querySelector(".modal__popup");
const previewTitle = modalImagePreview.querySelector(".modal__title_preview");

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
    this._elementImage = this._element.querySelector(".element__image");
    this._element.querySelector(".element__description").textContent =
      this._name;
    this._elementImage.src = `${this._link}`;
    this._elementImage.alt = `picture of ${this._name}`;
    return this._element;
  }
}

export default Card;
