//Добавление трека в избранное
const addFavorites = (e, selector) => {
    const target = e.target;

	if(target && target.closest(selector)) {
        if (target.closest(selector).firstElementChild.src.includes("empty-heart")) {
            target.closest(selector).firstElementChild.src = "../../img/music-icon/heart.svg";
        } else {
            target.closest(selector).firstElementChild.src = "../../img/music-icon/empty-heart.svg";
        }   
    }
};

tracksList.addEventListener("click", (e) => addFavorites(e, ".track__favorites-button"));