//После перезагрузки страницы, отображаются избранные треки 
const checkingFavorites = () => {
    const storageMusic = JSON.parse(localStorage.getItem("dataCard")),
        tracksBlock = document.querySelector(".tracks"),
        tracks = document.querySelectorAll(".track");

    storageMusic[tracksBlock.dataset.card].forEach((music, i) => {
        if (music.favorites == true) {
            tracks.forEach((track, j) => {
                if (i == j) {
                    track.lastElementChild.firstElementChild.firstElementChild.src = "../../img/music-icon/heart.svg";
                }
            });
        }
    });
};

checkingFavorites();

//Добавление и удаление трека в избранное
const addFavorites = e => {
    const target = e.target,
        tracksBlock = document.querySelector(".tracks");

    let storageMusic = JSON.parse(localStorage.getItem("dataCard"));

	if(target && target.closest(".track__favorites-button")) {
        if (target.closest(".track__favorites-button").firstElementChild.src.includes("empty-heart")) {
            target.closest(".track__favorites-button").firstElementChild.src = "../../img/music-icon/heart.svg";

            storageMusic[tracksBlock.dataset.card].forEach((music, i) => {
                if(i == target.closest(".track").dataset.track) {
                    music.favorites = true;
                }
            });

            localStorage.setItem("dataCard", JSON.stringify(storageMusic));    
        } else {
            target.closest(".track__favorites-button").firstElementChild.src = "../../img/music-icon/empty-heart.svg";

            storageMusic[tracksBlock.dataset.card].forEach((music, i) => {
                if(i == target.closest(".track").dataset.track) {
                    music.favorites = false;
                }
            });

            localStorage.setItem("dataCard", JSON.stringify(storageMusic));    
        }   
    }
};

document.querySelector(".tracks").addEventListener("click", addFavorites);

