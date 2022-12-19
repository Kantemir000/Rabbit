const createModal = (parentSelector, nameModal="login") => {
    const modal = document.querySelector(parentSelector);

    const createText = (nameTitle, nameBtn, nameLink) => {
        modal.firstElementChild.innerHTML = `
            <div class="modal__content fadeIn">
                <form class="modal__form modal__form_${nameTitle.toLowerCase()}" action="#">
                    <div class="modal__close-wrapper">
                        <div data-close class="modal__close" data-close>&times;</div>
                    </div>
                    <div class="modal__title">${nameTitle}</div>
                    <div class="modal__login-error"></div>

                    <div class="modal__input-wrapper">
                        <input required placeholder="Name" name="name" type="text" class="modal__input">
                    </div>
                    <div class="modal__name-error"></div>

                    <div class="modal__input-wrapper">
                        <input required placeholder="Password" name="password" type="password" class="modal__input">
                        <div class="modal__eye-show-password">
                            <svg class="eye" width="36" height="36" viewBox="0 0 72 72">
                                <path class="eye-lower" d="M 15.6,37 C 15.6,37 24.309181,49.073101 34.102911,49.166773 43.896641,49.260445 53.4,37 53.4,37" />
                                <circle r="6" cy="36" cx="34.400002" class="eye-iris" />
                                <path class="eye-lid" d="M -5,-5 V 37 H 15.6 C 15.6,37 25.327177,48.715274 34.312131,48.785 43.297085,48.854726 53.4,37 53.4,37 H 77 V -5 Z" />
                                <g class="eye-lashes">
                                <path class="eye-lash" d="M 17.45627,17.07484 24.778981,25.652873" />
                                <path class="eye-lash" d="M 34.602,12.600574 V 23.601076" />
                                <path class="eye-lash" d="M 51.580203,17.07484 44.257492,25.652873" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="modal__password-error"></div>

                    <button class="modal__btn">${nameBtn}</button>
                </form>
                <a class="modal__link">${nameLink}</a>
            </div>
        `;
    };

    if (nameModal === "login") {
        createText("Login", "Log in", "Sign Up");
        modal.classList.remove("modal__transition_login");
        modal.classList.add("modal__transition_signup");
    } else {
        createText("Signup", "Sign up", "Log In");
        modal.classList.remove("modal__transition_signup");
        modal.classList.add("modal__transition_login");
    }
};

//Переход между модальными окнами
const transitionModal = (parentSelector) => {
    const modal = document.querySelector(parentSelector);

    modal.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("modal__link") && e.target.closest(".modal__transition_signup")) {
            createModal(parentSelector, "signup");
            //Регистрация(Signup)
            const signupBtn =  document.querySelector(".modal__form_signup > .modal__btn");
            signupBtn.addEventListener("click", signup);
			//anime.js
			const timeline = animeEye();
			//Запускаем анимацию глаза
			startAnimeEye(timeline);
        } else if (e.target.classList.contains("modal__link") && e.target.closest(".modal__transition_login")){
            createModal(parentSelector, "login");   
            //Вход(Login)
            const loginBtn = document.querySelector(".modal__form_login > .modal__btn");
            loginBtn.addEventListener("click", login);
			//anime.js
			const timeline = animeEye();
			//Запускаем анимацию глаза
			startAnimeEye(timeline);
        } 
    });
};

const openModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);  
    modal.classList.toggle('modal_show'); 
    document.body.style.overflow = 'hidden'; 
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.firstElementChild.firstElementChild.classList.remove("fadeIn");
    modal.firstElementChild.firstElementChild.classList.add("fadeOut");
    setTimeout(() => {
        modal.classList.toggle('modal_show');
        document.body.style.overflow = ''; 

    }, 450); //450 вместо 500, чтобы анимация не лагала
};

const login = () => {
    const name = document.querySelector('[name="name"]'),
        pw = document.querySelector('[name="password"]'),
        loginError = document.querySelector(".modal__login-error");

    const storedName = localStorage.getItem('name'),
        storedPw = localStorage.getItem('pw');
    console.log(storedName);
        
    if (name.value == storedName && pw.value == storedPw){
        //Чтобы кнопка профиля на главной странице отображалась, надо удалить loggedOutOfProfile
        localStorage.removeItem("loggedOutOfProfile");
        addProfileBtn();
        closeModal(".modal");
    } else {
        loginError.previousElementSibling.style.marginBottom = "0px";
        loginError.innerText = "Account doesn't exist";
    }
};

const signup = () => {
    const nameError = document.querySelector(".modal__name-error"),
        passwordError = document.querySelector(".modal__password-error"),
        name = document.querySelector('[name="name"]'),
        pw = document.querySelector('[name="password"]'); 

    const lowerCaseLetters = /[а-я]|[a-z]/g,
        upperCaseLetters = /[А-Я]|[A-Z]/g,
        numbers = /[0-9]/g;

    //Функция по добавлению невыполненных требований
    const textError = (error, margin, text = "") => {
        error.previousElementSibling.style.marginBottom = `${margin}`;
        error.innerText = `${text}`;
    };
    //Очистка невыполненных требований
    textError(nameError, "20px");
    textError(passwordError, "20px");
    //Проверка имени
    if (name.value.length < 5) {
            textError(nameError, "10px", "At least 5 characters");
    } 
    //Проверка пароля
    if (pw.value.length < 8) {
        textError(passwordError, "10px", "At least 8 characters");
    }  else if (!pw.value.match(upperCaseLetters)) {
        textError(passwordError, "10px", "Add uppercase letter");
    } else if (!pw.value.match(lowerCaseLetters)) {
        textError(passwordError, "10px", "Add lovercase letter");
    } else if (!pw.value.match(numbers)) {
        textError(passwordError, "10px", "Add number");
    } else if (name.value.length < 5) { //Чтобы при вводе правильного пароля, данные не отправились без имени
        textError(nameError, "10px", "At least 5 characters");
    } else {
        localStorage.setItem('name', name.value);
        localStorage.setItem('pw', pw.value);
        //Чтобы кнопка профиля на главной странице отображалась, надо удалить loggedOutOfProfile
        localStorage.removeItem("loggedOutOfProfile");
        addProfileBtn();
        closeModal(".modal");
    }
};

const modal = (modalTrigger, modalSelector) => {
    const modalTrig = document.querySelector(modalTrigger),
        modal = document.querySelector(modalSelector);

    modalTrig.addEventListener("click", () => {
        createModal(modalSelector); 
        openModal(modalSelector);
        transitionModal(modalSelector);
        //Вход(Login)
        const loginBtn = document.querySelector(".modal__form_login > .modal__btn");
        loginBtn.addEventListener("click", login);
		//anime.js
		const timeline = animeEye();
		//Запускаем анимацию глаза
		startAnimeEye(timeline);
    });

    modal.addEventListener('click', (e) => {  //при нажатии на пустоту и крестик, модальное окно закрывается
        if (e.target === modal || e.target.getAttribute('data-close') == '') { 
            closeModal(modalSelector); 
        }
    });

    document.addEventListener('keydown', e => { //закрытие модального окна при нажатии клавиш
        if (e.code === "Escape" && modal.classList.contains('modal_show')) { 
            closeModal(modalSelector);
        }
    });
};

modal(".nav-panel__login-button",".modal");

