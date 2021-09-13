// profile
const profileHeading = document.querySelector(".profile__heading");
const profileSubheading = document.querySelector(".profile__subheading");
const profileEditButton = document.querySelector(".profile__edit-button");

// modal
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector('.modal__close-btn');

// form
const form = document.querySelector(".form");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// functions 
function modalOpen() {
    modal.classList.toggle("modal_is-open");
    profileTitle.value = profileHeading.textContent;
    profileSubtitle.value = profileSubheading.textContent;
    }

function modalClose() {
    modal.classList.toggle("modal_is-open");
    }

function updateProfile(event) {
    event.preventDefault();
    profileHeading.textContent = profileTitle.value;
    profileSubheading.textContent = profileSubtitle.value;
    modalClose();
}

form.addEventListener("submit", updateProfile, false);
profileEditButton.addEventListener("click",modalOpen, false);
closeBtn.addEventListener("click", modalClose, false);