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
export {openPopupWindow, closePopupWindow, closeModalClick, closeModalEsc};
