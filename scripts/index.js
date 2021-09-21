//cards
const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".element");
const cardElements = document.querySelector(".elements");

// profile
const profileHeading = document.querySelector(".profile__heading");
const profileSubheading = document.querySelector(".profile__subheading");

// modal
const modalEditProfile = document.querySelector(".modal_type_edit");
const modalAddCard = document.querySelector(".modal_type_add");
const formEditProfile = modalEditProfile.querySelector(".form");
const formAddCard = modalAddCard.querySelector(".form");
const modalImage = document.querySelector(".modal_type_popup");

// buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = modalEditProfile.querySelector(".modal__close-btn");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseBtn = modalAddCard.querySelector(".modal__close-btn");
const imagePopupCloseBtn = modalImage.querySelector(".modal__close-btn");

// modals
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

const addImageTitle = formAddCard.querySelector("#image-title");
const addImageUrl = formAddCard.querySelector("#image-url");

const popupImage = modalImage.querySelector(".modal__popup"); 
const previewTitle = modalImage.querySelector(".modal__title_preview");

// functions 

function editModalOpen() {
    modalEditProfile.classList.toggle("modal_is-open");
    profileTitle.value = profileHeading.textContent;
    profileSubtitle.value = profileSubheading.textContent;
    }

function editModalClose() {
    modalEditProfile.classList.toggle("modal_is-open");
    }

function updateProfile(event) {
    event.preventDefault();
    profileHeading.textContent = profileTitle.value;
    profileSubheading.textContent = profileSubtitle.value;
    editModalClose();
}

function addModalOpen() {
    modalAddCard.classList.toggle("modal_is-open");
    }

function addModalClose() {
    modalAddCard.classList.toggle("modal_is-open");
    }

function addImage(event) {
    event.preventDefault();
    const card = {
        name: addImageTitle.value,
        link: addImageUrl.value
    };
    const cardElement = createCard(card);
    cardElements.prepend(cardElement);
    addModalClose();
}


function likeButtonToggle(evt) {
    evt.target.classList.toggle("element__like-button_active");
}
function deleteCard(evt) {
    evt.target.parentNode.remove();
}

function imagePreview(card) {
    popupImage.src = card.link;
    popupImage.alt= `picture of ${card.name}`;
    previewTitle.textContent = card.name;
    modalImage.classList.toggle("modal_is-open");
}

function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage =  cardElement.querySelector(".element__image");
    const imageLikeBtn = cardElement.querySelector(".element__like-button");
    const imageDeleteBtn = cardElement.querySelector(".element__delete-button");
    cardElement.querySelector(".element__description").textContent = card.name;
    cardImage.src = `${card.link}`;
    cardImage.alt = `picture of ${card.name}`;
    cardImage.addEventListener("click", () => imagePreview(card));
    imageLikeBtn.addEventListener("click", likeButtonToggle);
    imageDeleteBtn.addEventListener("click",deleteCard);
    return cardElement;
}

//event listeners
formEditProfile.addEventListener("submit", updateProfile, false);
profileEditButton.addEventListener("click",editModalOpen);
editProfileCloseBtn.addEventListener("click", editModalClose);

addCardButton.addEventListener("click",addModalOpen);
addCardCloseBtn.addEventListener("click", addModalClose);
formAddCard.addEventListener("submit", addImage);

imagePopupCloseBtn.addEventListener("click", imagePreview); //preview popup close

initialCards.forEach((card) => {
    cardElement = createCard(card);
    cardElements.append(cardElement);
});