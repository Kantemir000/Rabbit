//Заглушка, чтобы небыло багов с плеером на главной странице
const musicPalyer = document.querySelector(".music-player"),
	progressSongWrapper = musicPalyer.querySelector(".music-player__progress-song-wrapper");
	volume = musicPalyer.querySelector(".music-player__song-volume"),
	mySlider = musicPalyer.querySelector(".music-player__slider");

const slider = () => {
    mySlider.style.background = `linear-gradient(to right, #2396ff 100%, rgb(100, 116, 139) 100%)`;
	volume.firstElementChild.src = `../../img/music-icon/volume.svg`;
	volume.firstElementChild.alt = `sound-on`;
}
slider();

const createProgressArea = () => {
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
createProgressArea();





