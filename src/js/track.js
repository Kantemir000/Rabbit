const createTrack = () => {
    const nameAlbums = document.querySelectorAll(".tracks"),
        tracksList = document.querySelector(".tracks__list");

    nameAlbums.forEach(nameAlbum => {
        storageMusic[nameAlbum.dataset.card].forEach((music, i) => {
            tracksList.innerHTML += `
                <div class="track" data-track="${i}">
                    <div class="track__info">
                        <div class="track__number">${i+1}</div>
                        <div class="track__img-wrapper">
                            <img src="../../img/music-img/${nameAlbum.dataset.card}/${music.img}.jpg" alt="${music.img}" class="track__img" >
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
                        <a class="track__download-button" href="../../music/${nameAlbum.dataset.card}/${music.src}.mp3" download>
                            <img class="track__download-icon" src="../../img/music-icon/download.svg" alt="download">
                        </a>
                    </div>
                </div>
            `;
        });
    });
};

createTrack();

