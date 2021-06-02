const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const backwardBtn = document.querySelector('#backward');
const forwardBtn = document.querySelector('#forward');

const musicContainer = document.querySelector('.music-container');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const durationTime = document.querySelector('.duration')
const cover = document.querySelector('#cover')
const totalTime = document.querySelector('.total-time')
const timer = document.querySelector('.timer')
// const containerBackground = document.querySelector('.container-background')
const containerBackground = document.querySelector('#container-background')

const mute = document.querySelector('#mute');
const like = document.querySelector('#like');
// const heart = document.querySelector('.fa-heart')





// const songs = ['song1', 'song2', 'song3'];
const songs = ['Frostpunk Theme', 'Another Day in Paradise', 'song1', 'song2'];
let songIndex = 0;


loadSong(songs[songIndex]);
// playNextSong(songs[songIndex]);

//functions
function loadSong(song) {
	audio.src = `files/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
	containerBackground.src = `images/${song}.jpg`;
	title.innerHTML = song

	// musicContainer.style.background = `"url(/images/${song}.jpg)"`;
	// musicContainer.style.background = "url('/images/" + song + ".jpg')";
}

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play')
	playBtn.querySelector('i.fas').classList.add('fa-pause')
	audio.play();
}
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause')
	playBtn.querySelector('i.fas').classList.add('fa-play')
	audio.pause();
}
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;

	}
	loadSong(songs[songIndex]);
	playSong()
}
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;

	}
	loadSong(songs[songIndex]);
	playSong()
}

function backwardTenSecond() {
	audio.currentTime -= 10;
}
function forwardTenSecond() {

}

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	// let du = (duration / 60)
	// console.log(0|du)
	// let minutes = Math.floor(parseFloat(du));
	// let minutes = parseInt(0|du);
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration - minutes * 60);

	let currentMinutes = Math.floor(currentTime / 60);
	let currentSecond = Math.floor(currentTime - currentMinutes * 60);

	totalTime.innerHTML = `${minutes}:${seconds}`;
	timer.innerHTML = `${currentMinutes}:${currentSecond}`

	progress.style.width = `${progressPercent}%`

	if (currentTime == duration) {
		console.log('music  finished')
		nextSong()
	}
}


function setProgress(e) {
	const width = this.clientWidth;
	const clientX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clientX / width) * duration;
	console.log(clientX)
}
function toggleMute() {
	let audioStatus = audio.muted;
	if (audioStatus) {
		audio.muted = false
		mute.querySelector('i.fas').classList.remove('fa-volume-mute')
		mute.querySelector('i.fas').classList.add('fa-volume-up')
	}
	else {
		audio.muted = true
		mute.querySelector('i.fas').classList.remove('fa-volume-up')
		mute.querySelector('i.fas').classList.add('fa-volume-mute')
	}
}

function toggleLike() {
	let h = document.querySelector('.fa-heart');
	h.style.color == 'rgb(255, 255, 255)' ? h.style.color = '#02C3D5' : h.style.color = 'rgb(255, 255, 255)';
}


//event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play')
	console.log('play clicked')
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
})
prevBtn.addEventListener('click', () => {
	console.log('prev clicked')
})
nextBtn.addEventListener('click', () => {
	console.log('next clicked')
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

backwardBtn.addEventListener('click', backwardTenSecond)
forwardBtn.addEventListener('click', () => { audio.currentTime += 10; })


audio.addEventListener('timeupdate', updateProgress);



progressContainer.addEventListener('click', setProgress);


cover.addEventListener("mousemove", (e) => {
	let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
	let yAxis = (window.innerWidth / 2 - e.pageY) / 25;

	cover.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`
})

cover.addEventListener("mouseenter", (e) => {
	cover.style.transition = "none"
})

cover.addEventListener("mouseleave", (e) => {

	cover.style.transition = "all 0.5s ease"
	cover.style.transform = `rotateY(0deg) rotateX(0deg)`
})


like.addEventListener('click', toggleLike

)

mute.addEventListener('click', toggleMute)