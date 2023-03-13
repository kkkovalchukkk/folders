const classificationPopupWindow = document.querySelector(".popup-window-classification");
const classificationPopup = classificationPopupWindow.querySelector(".popup");
const addClassificationBtn = document.querySelector(".content-menu-btn-classification");

const popupCloseBtns = document.querySelectorAll(".popup__close-btn");

const classificationForm = document.querySelector(".classification-form");
const classificationFormCloseBtn = classificationForm.querySelector(".popup-form__cancel-btn");

const folderList = document.querySelector(".folders-list");

const folderTemplate = document
  .querySelector("#folder-template")
  .content.querySelector(".folder-item");

function closePopupWindow(popupSelector) {
  popupSelector.classList.add("popup-window--hidden");
  window.removeEventListener("click", closePopupWindowClick);
  window.removeEventListener("keydown", closePopupWindowByEsc);
}
function openPopupWindow(popupSelector) {
  popupSelector.classList.remove("popup-window--hidden");
  window.addEventListener("click", closePopupWindowClick);
  window.addEventListener("keydown", closePopupWindowByEsc);
}
function closePopupWindowClick(e) {
  if (e.target == classificationPopupWindow) {
    closePopupWindow(classificationPopupWindow);
  }
}
function closePopupWindowByEsc(e) {
  if (e.key === "Escape") {
    closePopupWindow(classificationPopupWindow);
  }
}

function createFolder(title, date) {
  const newFolder = folderTemplate.cloneNode(true);

  const newFolderTitle = newFolder.querySelector(".folder-item__heading");
  const newFolderDate = newFolder.querySelector(".folder-item__date");
  const newFolderDelBtn = newFolder.querySelector(".folder-item__delete-btn");

  newFolderTitle.textContent = title;
  newFolderDate.textContent = date;

  newFolderDelBtn.addEventListener("click", () => {
    newFolder.remove();
  });

  return newFolder;
}

function renderFolder(folder) {
  folderList.append(folder);
}

classificationFormCloseBtn.addEventListener("click", () => {
  closePopupWindow(classificationPopupWindow);
});

addClassificationBtn.addEventListener("click", () => {
  openPopupWindow(classificationPopupWindow);
});

popupCloseBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", (e) => {
    const popupWindow = e.target.closest(".popup-window");
    closePopupWindow(popupWindow);
  });
});

classificationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.elements[0].value) {
    const date = new Date();
    renderFolder(
      createFolder(e.target.elements[0].value, date.toLocaleDateString().split(".").join("/")),
    );
    classificationForm.reset();
    closePopupWindow(classificationPopupWindow);
  }
});
