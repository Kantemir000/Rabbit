const createFavoritesTracks = () => {
    const tracksBlock = document.querySelector(".tracks"),
        tracksList = tracksBlock.querySelector(".tracks__list"),
        storageMusic = JSON.parse(localStorage.getItem("dataCard"));

    let id = 0;

    for (key in storageMusic) {    
        storageMusic[key].forEach((music, i) => {
            if (music.favorites == true) {
                tracksList.innerHTML += `
                    <div class="track" id="${id}" data-track="${i}" data-album="${key}">
                        <div class="track__info">
                            <div class="track__number">${id+1}</div>
                            <div class="track__img-wrapper">
                                <img src="../../img/music-img/${key}/${music.img}.jpg" alt="${music.img}" class="track__img" >
                            </div>
                            <div class="track__txt-wrapper">
                                <h2 class="track__name">${music.name}</h2>
                                <h2 class="track__author">${music.artist}</h2>
                            </div>
                        </div>

                        <div class="track__control">
                            <button class="track__favorites-button">
                                <img class="track__favorites-icon" src="../../img/music-icon/empty-heart.svg" alt="favorites">
                            </button>
                            <a class="track__download-button" href="../../music/${key}/${music.src}.mp3" download>
                                <img class="track__download-icon" src="../../img/music-icon/download.svg" alt="download">
                            </a>
                        </div>
                    </div>
                `;                
                id += 1;
            }
        });
    }
};

createFavoritesTracks();
