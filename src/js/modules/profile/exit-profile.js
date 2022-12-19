const exitProfile = () => {
    const exitProfile = document.querySelector(".profile__exit-wrapper");

    exitProfile.addEventListener("click", () => {
        //Чтобы после перезагрузки кнопка профиля на главной странице не отображалась
        localStorage.setItem("loggedOutOfProfile", true);
    });
};

exitProfile();