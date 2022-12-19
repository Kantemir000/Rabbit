//После перезагрузки страницы, отображаются избранные треки 
const checkingFavorites = () => {
    const storageMusic = JSON.parse(localStorage.getItem("dataCard")),
        tracks = document.querySelectorAll(".track");

    for (key in storageMusic) {    
        storageMusic[key].forEach(music => {
            if (music.favorites == true) {
                tracks.forEach(track => {
                    track.lastElementChild.firstElementChild.firstElementChild.src = "../../img/music-icon/heart.svg";
                });    
            }
        });
    }
};

checkingFavorites();

//Добавление и удаление трека в избранное
const addFavorites = (e) => {
    const target = e.target;

    let storageMusic = JSON.parse(localStorage.getItem("dataCard"));

	if(target && target.closest(".track__favorites-button")) {
        if (target.closest(".track__favorites-button").firstElementChild.src.includes("empty-heart")) {
            target.closest(".track__favorites-button").firstElementChild.src = "../../img/music-icon/heart.svg";


            for (key in storageMusic) {    
                storageMusic[key].forEach((music, i) => {
                    if(i == target.closest(".track").dataset.track && key == target.closest(".track").dataset.album) {
                        music.favorites = true;
                    }
                });
            }

            localStorage.setItem("dataCard", JSON.stringify(storageMusic));    
        } else {
            target.closest(".track__favorites-button").firstElementChild.src = "../../img/music-icon/empty-heart.svg";

            for (key in storageMusic) {    
                storageMusic[key].forEach((music, i) => {
                    if(i == target.closest(".track").dataset.track && key == target.closest(".track").dataset.album) {
                        music.favorites = false;
                    }
                });
            }

            localStorage.setItem("dataCard", JSON.stringify(storageMusic));    
        }   
    }
};

document.querySelector(".tracks").addEventListener("click", addFavorites);