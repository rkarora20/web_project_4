// profile
const profileHeading = document.querySelector(".profile__heading");
const profileSubheading = document.querySelector(".profile__subheading");
const profileEditButton = document.querySelector(".profile__edit-button");


// modal
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector('.modal__close-btn');

// form
const form = document.querySelector(".form");
// const formInput = document.querySelector(".form__input");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// form values
profileTitle.value = profileHeading.textContent;
profileSubtitle.value = profileSubheading.textContent;


function modalToggle() {
    modal.classList.toggle("modal_is-open");
}

function updateProfile(event) {
    event.preventDefault();
    profileHeading.textContent = profileTitle.value;
    profileSubheading.textContent = profileSubtitle.value;
    modalToggle();
}

form.addEventListener("submit", updateProfile, false);
profileEditButton.addEventListener("click",modalToggle, false);
closeBtn.addEventListener("click", modalToggle, false);