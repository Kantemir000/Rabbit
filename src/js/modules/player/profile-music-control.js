/* Ключевые отличия от music-control:
1) Вместо альбома в переменную album помещаем избранные треки с помощью createAlbumFavorites;
2) В loadMusic меняем пути;
3) В playTrack меняем пути и способ получения idTrack.
*/

const createProgressArea = (musicPalyerSelector, progressSongWrapperSelector) => {
	const musicPalyer = document.querySelector(musicPalyerSelector),
		progressSongWrapper = document.querySelector(progressSongWrapperSelector);

	if (window.matchMedia('(max-width: 1023px)').matches) {
		musicPalyer.insertAdjacentHTML("beforeend",
		`
			<div class="music-player__song-progress-area music-player__song-progress-area-for-small-devices">
				<div class="music-player__song-progress">
					<audio data-audio src=""></audio>
				</div> 
			</div> 
		`); 
		progressSongWrapper.style.display="none";
		musicPalyer.firstElementChild.lastElementChild.style.display="none";
	} else {		
		progressSongWrapper.insertAdjacentHTML("afterbegin",
		`
			<div class="music-player__song-progress-area">
				<div class="music-player__song-progress">
					<audio data-audio src=""></audio>
				</div> 
			</div> 
		`);
	}
};
//Запускать только в начале music-control !!!
createProgressArea(".music-player", ".music-player__progress-song-wrapper"); 

const musicPalyer = document.querySelector(".music-player"),
	progressArea = musicPalyer.querySelector(".music-player__song-progress-area"),
	progressBar = progressArea.querySelector(".music-player__song-progress"),
	musicImg = musicPalyer.querySelector(".music-player__song-img"),
	musicName = musicPalyer.querySelector(".music-player__song-name"),
	musicAuthor = musicPalyer.querySelector(".music-player__song-author"),
	mainAudio = musicPalyer.querySelector("[data-audio]"),
	musicPrev = musicPalyer.querySelector(".music-player__prev-song"),
	musicNext = musicPalyer.querySelector(".music-player__next-song"),
	musicPlayPause = musicPalyer.querySelector(".music-player__play-pause"),
	volume = musicPalyer.querySelector(".music-player__song-volume"),
	mySlider = musicPalyer.querySelector(".music-player__slider"),
	nameAlbum = document.querySelector(".tracks"),
    tracks = document.querySelectorAll(".track"),
	tracksList = document.querySelector(".tracks__list"),
	tracksNum = document.querySelectorAll(".track__number"),
	tracksName = document.querySelectorAll(".track__name");

const storageMusic = JSON.parse(localStorage.getItem("dataCard"));

let idTrack,
	album = [];

const createAlbumFavorites = () => {
    let idFavoritesTrack = 0;

    for (key in storageMusic) {    
        storageMusic[key].forEach((music, i) => {
            tracks.forEach(track => {
                if(i == track.dataset.track && key == track.dataset.album) {
                    album[idFavoritesTrack] = music;
                    idFavoritesTrack += 1;
                }
            });
        });
    }
};

createAlbumFavorites();

//Animation text(name song, artist)
const animationTxt = () => {
	const txtWrapper = document.querySelector(".music-player__txt-wrapper"),
		nameTrack = txtWrapper.querySelector(".music-player__song-name"),
		authorTrack = txtWrapper.querySelector(".music-player__song-author");

	if (txtWrapper.offsetWidth <= nameTrack.offsetWidth) {
		nameTrack.style.animation = "5s cubic-bezier(0, 0.18, 1, 0.73) 1s infinite normal none running slidein";
	} else {
		nameTrack.style.animation = "";
	}
	if (txtWrapper.offsetWidth <= authorTrack.offsetWidth) { 
		authorTrack.style.animation = "5s cubic-bezier(0, 0.18, 1, 0.73) 1s infinite normal none running slidein";
	} else {
		authorTrack.style.animation = "";
	}
};

//Используем для изменения цвета названия и номера активного трека
const changeTextColor = (text) => {
	text.forEach((item, i) => {
		if(idTrack == i) {
			item.style.color = "#2396ff";
		} else {
			item.style.color = "#fff";
		}
	});
};

const loadMusic = idTrack => {
    tracks.forEach((track, i) => {
        if(i == idTrack) {
            musicName.innerText = `${album[idTrack].name}`;
            musicAuthor.innerText = album[idTrack].artist;
            musicImg.src = `../../img/music-img/${track.dataset.album}/${album[idTrack].img}.jpg`;
            musicImg.alt = `${album[idTrack].img}`;
            mainAudio.src = `../../music/${track.dataset.album}/${album[idTrack].src}.mp3`;
            animationTxt();
        }
    });
};

const playMusic = () => {
	musicPalyer.classList.add("paused");
	musicPlayPause.firstElementChild.src = `../../img/music-icon/pause.svg`;
	musicPlayPause.firstElementChild.alt = `pause`;
	mainAudio.play();
};

const pauseMusic = () => {
	musicPalyer.classList.remove("paused");
	musicPlayPause.firstElementChild.src = `../../img/music-icon/play.svg`;
	musicPlayPause.firstElementChild.alt = `play`;
	mainAudio.pause();
};

const prevMusic = () =>{
	idTrack--;
	//if idTrack is less than 0 then idTrack will be the array length so the last music play
	idTrack < 0 ? idTrack = album.length - 1 : idTrack = idTrack;
	changeTextColor(tracksNum);
	changeTextColor(tracksName);
	loadMusic(idTrack);
	playMusic();	
};

const nextMusic = () => {
	idTrack++;
	//if idTrack is greater than array length then idTrack will be 0 so the first music play
	idTrack > album.length - 1 ? idTrack = 0 : idTrack = idTrack;
	changeTextColor(tracksNum);
	changeTextColor(tracksName);
	loadMusic(idTrack);
	playMusic();
};

const playPauseSong = () => {
	const isMusicPlay = musicPalyer.classList.contains("paused");
	//if isPlayMusic is true then call pauseMusic else call playMusic
	isMusicPlay ? pauseMusic() : playMusic();
};


//При клике на трек включается музыка 
const playTrack = (e) => {
	const target = e.target;

	if(target && !target.closest(".track__control")) {
		idTrack = Number(target.closest(".track").id);

		musicName.innerText = `${album[idTrack].name}`;
		musicAuthor.innerText = album[idTrack].artist;
		musicImg.src = `../../img/music-img/${target.closest(".track").dataset.album}/${album[idTrack].img}.jpg`;
		musicImg.alt = `${album[idTrack].img}`;
		mainAudio.src = `../../music/${target.closest(".track").dataset.album}/${album[idTrack].src}.mp3`;

		changeTextColor(tracksNum);
		changeTextColor(tracksName);
		animationTxt();
		playMusic();
	}
}; 

// update progress bar width according to music current time
const updateProgressBar = (e) => {
	const currentTime = e.target.currentTime; //getting playing song currentTime
	const duration = e.target.duration; //getting playing song total duration
	let progressWidth = (currentTime / duration) * 100;
	progressBar.style.width = `${progressWidth}%`;
	let musicCurrentTime = musicPalyer.querySelector(".music-player__current-time"),
	musicDuartion = musicPalyer.querySelector(".music-player__max-duration");
	mainAudio.addEventListener("loadeddata", () => {
		// update song total duration
		let mainAdDuration = mainAudio.duration;
		let totalMin = Math.floor(mainAdDuration / 60);
		let totalSec = Math.floor(mainAdDuration % 60);
		if(totalSec < 10){ //if sec is less than 10 then add 0 before it
			totalSec = `0${totalSec}`;
		}
		musicDuartion.innerText = `${totalMin}:${totalSec}`;
	});
	// update playing song current time
	let currentMin = Math.floor(currentTime / 60);
	let currentSec = Math.floor(currentTime % 60);
	if(currentSec < 10){ //if sec is less than 10 then add 0 before it
	  	currentSec = `0${currentSec}`;
	}
	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
};

// update playing song currentTime on according to the progress bar width
const updateTimeCurrentSong = (e) => {
	let progressWidth = progressArea.clientWidth; //getting width of progress bar
	let clickedOffsetX = e.offsetX; //getting offset x value
	let songDuration = mainAudio.duration; //getting song total duration
	
	mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
	playMusic(); //calling playMusic function
};

//line slider
const slider = () => {
    valPercent = (mySlider.value / mySlider.max)*100;
    mySlider.style.background = `linear-gradient(to right, #2396ff ${valPercent}%, rgb(100, 116, 139) ${valPercent}%)`;
	mainAudio.volume = mySlider.value / 100; 
	//при изменении громкости автоматически включается звук, поэтому надо поменять иконку
	volume.firstElementChild.src = `../../img/music-icon/volume.svg`;
	volume.firstElementChild.alt = `sound-on`;
}
slider();

const OffOnSound = () => {
	if (volume.firstElementChild.src.includes("no-volume")) {
		volume.firstElementChild.src = `../../img/music-icon/volume.svg`;
		volume.firstElementChild.alt = `sound-on`;
		mainAudio.volume = mySlider.value / 100;
	} else {
		volume.firstElementChild.src = `../../img/music-icon/no-volume.svg`;
		volume.firstElementChild.alt = `sound-off`;
		mainAudio.volume = 0;	
	}
};

window.addEventListener("load", () => loadMusic(idTrack));
musicPlayPause.addEventListener("click", playPauseSong);
musicPrev.addEventListener("click", prevMusic);
musicNext.addEventListener("click", nextMusic);
tracksList.addEventListener("click", playTrack);
mainAudio.addEventListener("timeupdate", updateProgressBar);
mainAudio.addEventListener("ended", nextMusic); //code for what to do after song ended

if (!window.matchMedia('(max-width: 1023px)').matches) {
	progressArea.addEventListener("click", updateTimeCurrentSong);
	mySlider.addEventListener("input", slider); //transform sound
	volume.addEventListener("click", OffOnSound);
}

