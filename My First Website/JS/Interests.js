// Name: Chew Shu Wen
// Admin number: p227423
// Class: DISM1A/05 

// checks if page has been loaded fully 
window.onload = () => {
    let range = document.getElementById("range")
    range.addEventListener("input", function (event) {
        // let col size be the trigger to the event 
        let col_size = event.target.value;
        document.querySelectorAll(".row .col").forEach(col => {
            var size, size_as_text;
            switch (Number(col_size)) {
                case 1:
                    size = 2;
                    // displays the text as XS, S, M, L, XL
                    size_as_text = "XS";
                    break;
                case 2:
                    size = 3;
                    size_as_text = "S";
                    break;
                case 3:
                    // has been set as the default size
                    size = 4;
                    size_as_text = "M";
                    break;
                case 4:
                    size = 6;
                    size_as_text = "L";
                    break;
                case 5:
                    size = 12;
                    size_as_text = "XL";
            }
            // will add the size of current column which is 4 to the respective sizes :: 2,3,4,6,12
            col.className = "col col-" + size;
            document.getElementById("size").innerText = size_as_text
        })
    })
}


const musicContainer = document.getElementById('music-container');
const audioPlayer = musicContainer.querySelector('.audio_player');

const title = document.getElementById('title');

const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');

const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const audio = document.getElementById('audio');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const speaker = musicContainer.querySelector('.speaker');
const speakerIcon = musicContainer.querySelector('#speaker_icon');

const ranges = musicContainer.querySelectorAll('.player_slider');
const volInput = musicContainer.querySelector('input[name="volume"]')


// arrange songs with song titles in an array. song titles need to match same name music folder.
const songs = [
    'Sunsetz',
    '5am empanada with you',
    'Dreaming with you',
    'Gorgeous',
    'Say so',
    'Dear future husband',
    'Try again',
    'Only',
    'Day and night'
];

// Keep track of song, keeps this song in the index as the default song
let songIndex = 0;


// initially load song details into DOM (document object module)
//take in songs array whatever the song index is 
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    //songs must be in mp3 format
    audio.src = `../Music/${song}.mp3`;
}

//when play button is clicked, it automatically switches to the pause button. The song details will also pop up

//plays the song 
function playSong() {
    // add 'play' to the class list 
    musicContainer.classList.add('play');
    // will change the play button to pause button when song is played 
    //remove the play button and adds the pause button into class list 
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pauses the song
function pauseSong() {
    // add 'pause' to the class list 
    musicContainer.classList.remove('play');
    // will change the pause button to play button when song is played 
    //remove the pause button and adds the play button into class list 
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// previous song
//ensures that the value of the song index does not decrease lower than 0. If it does, the player should loop back to the initial songs.length -1.

function prevSong() {
    // song index was set to 0 by default
    // checks if song index is less than 0 
    songIndex--;

    if (songIndex < 0) {
        // will set the song to the last song 
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}


//increment the value of the song index. checks for the song index value is more than, so it does not exceed the value of the songs.length - 1.
// next song
function nextSong() {
    songIndex++;
    // checks if song index is less than 0 
    // will set song to first song

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}


// Calculate display time format and returns the song timing in minutes and seconds
// takes in time as the event object 
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

//update progress bar as the video plays (using percentage)
function updateProgress() {
    let duration = 0;
    progressBar.style.width = `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`;
    currentTime.textContent = `${displayTime(audioPlayer.currentTime)} /`;
    duration.textContent =
        `${displayTime(audioPlayer.duration)}`;
}


// volume controls for the music player

// volume functions
function handleRangeUpdate() {
    audioPlayer[this.name] = this.value;
    (audioPlayer['volume'] === 0 ? speakerIcon.className = "fa fa-volume-off" :
        speakerIcon.className = "fa fa-volume-up")
}

let muted = false;

function mute() {
    if (!muted) {
        audioPlayer['volume'] = 0;
        volInput.value = 0;
        speakerIcon.className = "fa fa-volume-off"
        muted = true;
    } else {
        audioPlayer['volume'] = 1;
        volInput.value = 1;
        muted = false;
        speakerIcon.className = "fa fa-volume-up"
    }
}


// Event Listeners
playBtn.addEventListener('click', () => {
    // checks if the song is playing, checks if the song is in the class list and see if class list contains the play class
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// time and song update
// when song is playing, 'updateProgress' will always be called
audio.addEventListener('timeupdate', updateProgress);


// song ends, next song in the index is played 
audio.addEventListener('ended', nextSong);

// volume
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
speaker.addEventListener('click', mute)

// progress bar controls
// adjust the progress of the song 
let mouseDown = false;
progressRange.addEventListener('click', scrub);
// checks if mouse if moving first 
progressRange.addEventListener('mousemove', (event) => mouseDown && scrub(event));
progressRange.addEventListener('mousedown', () => mouseDown = true);
progressRange.addEventListener('mouseup', () => mouseDown = false);





