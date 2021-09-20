//cards
const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".element");
const cardElements = document.querySelector(".elements");

// profile
const profileHeading = document.querySelector(".profile__heading");
const profileSubheading = document.querySelector(".profile__subheading");

// modal
const editModal = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const editForm = editModal.querySelector(".form");
const addForm = addModal.querySelector(".form");
const popupModal = document.querySelector(".modal_type_popup");

// buttons
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = editModal.querySelector(".modal__close-btn");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseBtn = addModal.querySelector(".modal__close-btn");

const imagePopupCloseBtn = popupModal.querySelector(".modal__close-btn");

// form
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

const addImageTitle = addForm.querySelector("#image-title");
const addImageUrl = addForm.querySelector("#image-url");

const popupImage = popupModal.querySelector(".modal__popup"); 
const previewTitle = popupModal.querySelector(".modal__title_preview");

// functions 

function editModalOpen() {
    editModal.classList.toggle("modal_is-open");
    profileTitle.value = profileHeading.textContent;
    profileSubtitle.value = profileSubheading.textContent;
    }

function editModalClose() {
    editModal.classList.toggle("modal_is-open");
    }

function updateProfile(event) {
    event.preventDefault();
    profileHeading.textContent = profileTitle.value;
    profileSubheading.textContent = profileSubtitle.value;
    editModalClose();
}

function addModalOpen() {
    addModal.classList.toggle("modal_is-open");
    }

function addModalClose() {
    addModal.classList.toggle("modal_is-open");
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

function imagePreview(card) {
    popupImage.src = card.link;
    previewTitle.innerHTML = card.name;
    popupModal.classList.toggle("modal_is-open");
}

function likeButtonToggle(evt) {
    evt.target.classList.toggle("element__like-button_active");
}
function deleteCard(evt) {
    evt.target.parentNode.remove();
}

function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage =  cardElement.querySelector(".element__image");
    const imageLikeBtn = cardElement.querySelector(".element__like-button");
    const imageDeleteBtn = cardElement.querySelector(".element__delete-button");
    cardElement.querySelector(".element__description").textContent = card.name;
    cardImage.src = `${card.link}`;
    cardImage.addEventListener("click", () => imagePreview(card));
    imageLikeBtn.addEventListener("click", likeButtonToggle);
    imageDeleteBtn.addEventListener("click",deleteCard);
    return cardElement;
}


//event listeners
editForm.addEventListener("submit", updateProfile, false);
profileEditButton.addEventListener("click",editModalOpen);
editProfileCloseBtn.addEventListener("click", editModalClose);

addCardButton.addEventListener("click",addModalOpen);
addCardCloseBtn.addEventListener("click", addModalClose);
addForm.addEventListener("submit", addImage);

imagePopupCloseBtn.addEventListener("click", imagePreview);

initialCards.forEach((card) => {
    cardElement = createCard(card);
    cardElements.append(cardElement);
});