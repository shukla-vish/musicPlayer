
// Songs Details
let songs = [
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "1.jpg", songPath: "1.mp3" },
    { songName: "Guitar Song", songDescription: "The best guitar music to relax your mind", songImage: "2.jpg", songPath: "1.mp3" }
];

// Audio Object
let audio = new Audio();

// Variables
let currentSong = 0;
let songOrder = [];
let currentPosition = 0;
let songOnRepeat = false;
let isShuffle = false;

// HTML Elements
let play = document.getElementById("play");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");
let progressBar = document.getElementById("progressBar");

let playMusic = document.querySelectorAll(".playMusic");
let musicCards = document.querySelectorAll(".music-card");

// Initial Song Order
for (let i = 0; i < songs.length; i++) {
    songOrder.push(i);
}

// Load Song Details on Cards
musicCards.forEach((card, index) => {
    card.querySelector("img").src = songs[index].songImage;
    card.querySelector(".img-title").innerText = songs[index].songName;
    card.querySelector(".img-description").innerText = songs[index].songDescription;
});

// Update Bottom Player
function updateNowBar() {
    let song = songs[currentSong];

    document.querySelector(".now-bar img").src = song.songImage;
    document.querySelector(".img-title-info").innerText = song.songName;
    document.querySelector(".img-des-info").innerText = song.songDescription;
}

// Reset All Play Icons
function makeAllPlay() {
    playMusic.forEach((icon) => {
        icon.classList.remove("fa-circle-pause");
        icon.classList.add("fa-circle-play");
    });
}

// Play Selected Song
function playSong(index) {
    currentSong = index;

    audio.src = songs[currentSong].songPath;
    audio.currentTime = 0;

    updateNowBar();

    audio.play();

    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");

    makeAllPlay();

    playMusic[currentSong].classList.remove("fa-circle-play");
    playMusic[currentSong].classList.add("fa-circle-pause");
}

// Play Button
play.addEventListener("click", () => {
    if (audio.paused) {
        if (!audio.src) {
            playSong(currentSong);
        } else {
            audio.play();
        }

        play.classList.remove("fa-circle-play");
        play.classList.add("fa-circle-pause");

        makeAllPlay();
        playMusic[currentSong].classList.remove("fa-circle-play");
        playMusic[currentSong].classList.add("fa-circle-pause");
    } else {
        audio.pause();

        play.classList.remove("fa-circle-pause");
        play.classList.add("fa-circle-play");

        makeAllPlay();
    }
});

// Individual Music Card Play
playMusic.forEach((icon) => {
    icon.addEventListener("click", () => {
        let index = Number(icon.id) - 1;

        if (currentSong === index && !audio.paused) {
            audio.pause();

            icon.classList.remove("fa-circle-pause");
            icon.classList.add("fa-circle-play");

            play.classList.remove("fa-circle-pause");
            play.classList.add("fa-circle-play");
        } else {
            playSong(index);
        }
    });
});

// Next Song
function playNextSong() {
    if (songOnRepeat) {
        playSong(currentSong);
        return;
    }

    currentPosition = songOrder.indexOf(currentSong);

    currentPosition++;

    if (currentPosition >= songOrder.length) {
        currentPosition = 0;
    }

    playSong(songOrder[currentPosition]);
}

// Previous Song
function playPrevSong() {
    currentPosition = songOrder.indexOf(currentSong);

    currentPosition--;

    if (currentPosition < 0) {
        currentPosition = songOrder.length - 1;
    }

    playSong(songOrder[currentPosition]);
}

// Forward Button
forward.addEventListener("click", playNextSong);

// Backward Button
backward.addEventListener("click", playPrevSong);

// Shuffle Button
shuffle.addEventListener("click", () => {
    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffle.style.color = "green";

        songOrder = songs.map((song, index) => index);

        for (let i = songOrder.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [songOrder[i], songOrder[j]] = [songOrder[j], songOrder[i]];
        }

        // Keep current song at first position
        songOrder = songOrder.filter(index => index !== currentSong);
        songOrder.unshift(currentSong);

        currentPosition = 0;
    } else {
        shuffle.style.color = "white";

        songOrder = songs.map((song, index) => index);
        currentPosition = currentSong;
    }
});

// Repeat Button
repeat.addEventListener("click", () => {
    songOnRepeat = !songOnRepeat;

    if (songOnRepeat) {
        repeat.style.color = "green";
    } else {
        repeat.style.color = "white";
    }
});

// Progress Bar Update
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    }
});

// Progress Bar Seek
progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

// When Song Ends
audio.addEventListener("ended", () => {
    playNextSong();
});

// Reset Progress Bar on New Song
audio.addEventListener("loadedmetadata", () => {
    progressBar.value = 0;
});
