const animeEye = () => {
    return anime
    .timeline({
        duration: 300,
        easing: "cubicBezier(.4, 0, .2, 1)",
        autoplay: false,
    })
    .add(
        {
            targets: document.querySelector(".eye-lid"),
            d: "M -5,-5 V 37 H 15.6 C 15.6,37 21.35124,23.469343 34.312131,23.469343 47.273022,23.469343 53.4,37 53.4,37 H 77 V -5 Z",
        },
        0
    )
    .add(
        {
            targets: document.querySelector(".eye-lashes"),
            rotateX: ["180deg", "0deg"],
        },
        0
    );
};

const startAnimeEye = (timeline) => {
    //Переключает внутренний атрибут на противоположный 
    timeline.reverse();
    //Запускаем анимацию, чтобы закрыть глаз перед открытием модального окна
    timeline.play();

    const eye = document.querySelector(".modal__eye-show-password");
    eye.addEventListener("click", () => {
        const pw = document.querySelector('[name="password"]'); 
        
        pw.classList.toggle("show-password");
        if (pw.classList.contains("show-password")) {
            pw.setAttribute("type", "text");
        } else {
            pw.setAttribute("type", "password");
        }
        //Переключает внутренний атрибут на противоположный 
        timeline.reverse();
        //Запускаем анимацию глаза
        timeline.play();
    });
};
