let bodyLockStatus = false;
//====================================================================================================
window.onload = function () {
	setTimeout(function () {
		document.body.classList.add("loaded");
	}, 200);
}
//====================================================================================================
// Menu 
const headerBtn = document.querySelector(".header__button");
if (headerBtn) {
  headerBtn.addEventListener("click", (e) => {
    document.documentElement.classList.toggle("_menu-show");

    if (bodyLockStatus) {
      bodyUnlock();
    } else {
      bodyLock();
    }
  });
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  document.body.style.paddingRight = lockPaddingValue;
  document.documentElement.classList.add("_lock");
  bodyLockStatus = true;
}
function bodyUnlock() {
  document.body.style.paddingRight = "0px";
  document.documentElement.classList.remove("_lock");
  bodyLockStatus = false;
}

//====================================================================================================
// Scroll on menu links

const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks) {
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.dataset.goto) {
        const goToBlock = document.querySelector(link.dataset.goto);
        if (goToBlock) {
          if (bodyLockStatus) {
            document.documentElement.classList.remove("_menu-show");
            bodyUnlock();
          }

          window.scrollTo({
            top: goToBlock.offsetTop,
            behavior: "smooth",
          });

          e.preventDefault();
        }
      }
    });
  });
}

//====================================================================================================
// Popups

const popupLinks = document.querySelectorAll('[data-popup]');
let isPopupReopeningUnblocked = true;
const OPENING_TIMEOUT = 300;

if (popupLinks) {
	popupLinks.forEach(popupLink => {
		popupLink.addEventListener("click", (e) => openPopupHandler(e, popupLink));
	});
}

function openPopupHandler(e, popupLink) {
	const popupName = popupLink.dataset.popup ? popupLink.dataset.popup : null;
	const currentPopup =document.querySelector(`.${popupName}`);
	if (currentPopup) {
		openPopup(currentPopup);
	} else {
		console.error('Нет такого всплывающего окна!');
	}
	e.preventDefault();
}

function openPopup(currentPopup) {
	if (currentPopup && isPopupReopeningUnblocked) {
		const activePopup =document.querySelector('.popup_open');
		if (activePopup) {
			closePopup(activePopup, false);
		}
		else popupReopenLock();

		currentPopup.classList.add("popup_open");

		currentPopup.addEventListener("click", (e) => {
			if (!e.target.closest(".popup__content")) {
				closePopup(currentPopup);
			}
		});
	}
}

const popupCloseBtns =document.querySelectorAll('.popup__close');
if (popupCloseBtns) {
	popupCloseBtns.forEach(popupCloseBtn => {
		popupCloseBtn.addEventListener("click", (e) => {
			closePopup(popupCloseBtn.closest(".popup"));
			e.preventDefault();
		});
	})
}

function closePopup(activePopup, doUnlock = true) {
	if (isPopupReopeningUnblocked) {
		activePopup.classList.remove("popup_open");
		if (doUnlock) {
			popupReopenUnlock();
		}
	}
}

function popupReopenLock() {
	document.documentElement.classList.add("popup-show");
	isPopupReopeningUnblocked = false;
	setTimeout(() => {
		isPopupReopeningUnblocked = true;
	}, OPENING_TIMEOUT);
}

function popupReopenUnlock() {
	document.documentElement.classList.remove("popup-show");
	isPopupReopeningUnblocked = false;
	setTimeout(() => {
		isPopupReopeningUnblocked = true;
	}, OPENING_TIMEOUT);
}

document.addEventListener("keydown", (e) => closePopupByKey(e));
function closePopupByKey(e) {
	if (e.keyCode === 27) {
		const activePopup = document.querySelector('.popup_open');
		if (activePopup) {
			closePopup(activePopup);
		}
	}
}

//====================================================================================================
// Validate inputs

const ALL_INPUTS_SELECTORS = 'input[type="text"],input[type="number"]'

document.addEventListener("submit", (e) => {
  const inputs = e.target.querySelectorAll(ALL_INPUTS_SELECTORS);
  inputs.forEach((input) => {
    if (!input.value) {
      if (
        !input.parentElement.querySelector(".error") &&
        !input.parentElement.parentElement.querySelector(".error")
      ) {
        createErrorMessage(input);
      }

      e.preventDefault();
    }
  });
});

const inputs = document.querySelectorAll(ALL_INPUTS_SELECTORS);
inputs.forEach((input) => {
  //Удаление сообщений с ошибками при повторном фокусе на инпуте
  input.addEventListener("focus", (e) => {
    if (input.parentElement.querySelector(".error")) {
      input.nextElementSibling.remove();
    }
  });
	input.addEventListener("blur", (e) => {
		if (input.classList.contains("input-phone")) {
			checkInputValue(input, validatePhoneNumber);
		}
		else if (input.classList.contains("input-mail")) {
				checkInputValue(input, validateEmail);;
  	} else {
				checkInputValue(input, validateUsername);
		}
	});
});

function checkInputValue(input, method){
	if (input.value && !input.parentElement.querySelector(".error")) {
		if (!method(input)) {
			createErrorMessage(input);
		}
	}
}

function createErrorMessage(input) {
  const errorMessage = document.createElement("span");
  errorMessage.innerHTML = input.getAttribute("data-error");
  errorMessage.classList.add("error");

  if (input.classList.contains("subscribe-input")) {
    input.parentElement.insertAdjacentElement("afterend", errorMessage);
  } else {
    input.parentElement.insertAdjacentElement("beforeend", errorMessage);
  }
}

function validateUsername(input) {
  return /^[а-яА-ЯёЁ]{3,20}$/.test(input.value);
}
function validatePhoneNumber(input) {
	return  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
}
function validateEmail(input) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//====================================================================================================
