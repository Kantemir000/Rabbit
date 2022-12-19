const fixedMenuOpacity = () => {
    const exit = document.querySelector(".exit"),
        title = exit.querySelector(".exit__title");
    
    document.addEventListener("scroll", () => {
        const margin = window.getComputedStyle(document.querySelector(".tracks")).marginTop.replace(/px/,'')*1; //*1 - str in int
        
        if (window.scrollY > margin - 1) {
            exit.style.background = `linear-gradient(90deg, rgba(24, 24, 54, 0.9) 0%, rgba(11, 17, 32, 0.9) 100%)`;
            title.style.opacity = `${window.scrollY}`;
        } else {
            exit.style.background = "";
            title.style.opacity = "";
        }
    });
};
fixedMenuOpacity();
