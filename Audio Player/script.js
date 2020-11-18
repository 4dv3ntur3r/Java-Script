// variable declaration
const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// declaring song titles
const songs = ['Begin Again', 'Rockelbel Canon', 'Mission Impossible'];

// declaring the first song
let songIndex = 2;

// calling loadsong function
loadSong(songs[songIndex]);

// declaring song src and image src also the name of the song
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

//adding pause icon when play is clicked
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

// adding play icon when paused is clicked
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');

	audio.pause();
}

//go to previous song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//go to nextx song
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

//updating progress bar when playing
function updateProgress(e) {
	const { duration, currentTime} = e.srcElement;
	// console.log(duration, currentTime);

	const progressPercent = (currentTime/duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

//change progress when clicked on it
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}
//all the event listners
//changing icon when play btn or pause is clicked
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	}else {
		playSong();
	}
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);