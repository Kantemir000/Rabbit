/* const fixedMenuOpacity = () => {
    const albumExit = document.querySelector(".album__exit");
    
    document.addEventListener("scroll", () => {
        const margin = window.getComputedStyle(document.querySelector(".tracks")).marginTop.replace(/px/,'')*1; //*1 - str in int
        console.log(margin);
        if (window.scrollY < margin) {
            albumExit.style.background = `linear-gradient(90deg, rgba(24, 24, 54, ${window.scrollY / 10}%) 0%, rgba(11, 17, 32, ${window.scrollY  / 10}%) 100%)`;
        } else {
            albumExit.style.background = `linear-gradient(90deg, rgba(24, 24, 54, 0.9) 0%, rgba(11, 17, 32, 0.9) 100%)`;
        }
    });
};
fixedMenuOpacity(); */

const fixedMenuOpacity = () => {
    const albumExit = document.querySelector(".album__exit");
    
    document.addEventListener("scroll", () => {
        const margin = window.getComputedStyle(document.querySelector(".tracks")).marginTop.replace(/px/,'')*1; //*1 - str in int
        
        if (window.scrollY >= margin) {
            albumExit.style.background = `linear-gradient(90deg, rgba(24, 24, 54, 0.9) 0%, rgba(11, 17, 32, 0.9) 100%)`;
        } else {
            albumExit.style.background = "";
        }
    });
};
fixedMenuOpacity();
