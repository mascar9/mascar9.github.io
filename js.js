
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.genre-square');
    const mainContent = document.querySelector('.image-container');
    const name = document.querySelector('.name_text');

    const gradientColors = {
        'hip-hop': '#B22222',
        'pop': '#FFA500',
        'rock': '#2E8B57',
        'chill': '#6A5ACD'
    };


    squares.forEach((square) => {
        const genre = square.dataset.genre;

        square.addEventListener('mouseover', () => {

            //mainContent.style.background = `radial-gradient(circle, var(--light_black_kinda) 30%, ${gradientColors[genre]})`;
            mainContent.style.borderColor = gradientColors[genre];
            mainContent.style.background = `linear-gradient(45deg, var(--light_black_kinda) 45%, ${gradientColors[genre]})`;
            name.style.color = gradientColors[genre];

        });

        square.addEventListener('mouseout', () => {

            //mainContent.style.background = 'linear-gradient(0deg, #1c1717 70%, #bb2b0f)';
            mainContent.style.background = `linear-gradient(45deg, var(--light_black_kinda) 45%, var(--green))`;
            mainContent.style.borderColor = "#1DB954";
            name.style.color = "var(--green)";
        });
    });
});

/*
// Select the anchor tag for scrolling
const scrollLink = document.querySelector('a[href="#section-id"]');

// Add a click event listener to the anchor tag
scrollLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Get the target section element
    const targetSection = document.querySelector('#section-id');

    // Scroll to the target section
    targetSection.scrollIntoView({ behavior: 'smooth' });
});

 */


// Define the Music class
class Music {
    constructor(genre, length, name, artist, album, song, image) {
        this.genre = genre;
        this.length = length;
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.song = song;
        this.image = image;
    }
}

// Create an array to store the songs
const chillList = [];
const popList = [];
const hiphopList = [];
const rockList = [];


const playButton = document.querySelector('.play-button');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');


const volumeBtn = document.querySelector('.volume_btn');
const volumeBar = document.querySelector('.media-volume-bar');
const soundON = document.getElementById('soundON');
const soundOFF = document.getElementById('soundOFF');


hiphopList.push(new Music('hiphop', 3.5, 'Lullabies', 'Yung Raf', 'Single', "/songs/YungRaf_Lullabies.mp3", "images/lukrembo_onion.png"));
// Add songs to the array
chillList.push(new Music('chill', 3.5, 'Biscuit', 'Lukrembo', 'Single', "/songs/lukrembo_biscuit.mp3", "images/lukrembo-biscuit-img.png"));
chillList.push(new Music('chill', 3.5, 'Onion', 'Lukrembo', 'Single', "/songs/onion_lukrembo.mp3", "images/lukrembo_onion.png"));
//hiphopList.push(new Music('hiphop', 3.5, 'Lullabies', 'Yung Raf', 'Single', "/songs/YungRaf_Lullabies.mp3"));
//songs.push(new Music('pop', 4.2, 'Song 2', 'Artist 2', 'Album 2', 'song2.mp3'));
//.push(new Music('rock', 5.1, 'Song 3', 'Artist 3', 'Album 3', 'song3.mp3'));
//songs.push(new Music('chill', 2.8, 'Song 4', 'Artist 4', 'Album 4', 'song4.mp3'));



let currentAudio = null;

function playSong(genreList, audio, index) {
    const songFile = genreList[index].song;
    audio.src = songFile;
    if (currentAudio) {
        currentAudio.pause(); // Pause the currently playing audio
    }

    currentAudio = audio; // Set the new audio as the current audio
    audio.play();


    const songTitleElement = document.getElementById('song_title');
    const songArtistElement = document.getElementById('song_artist');
    const songImageElement = document.getElementById("song_img");
    songTitleElement.textContent = genreList[index].name;
    songArtistElement.textContent = genreList[index].artist;
    songImageElement.src = genreList[index].image;


    playIcon.style.display = 'none';
    pauseIcon.style.display = 'inline';
}

// Function to handle the playlist logic for a given genre
function setupPlaylist(genreList, buttonId) {
    const playButton = document.getElementById(buttonId);
    const audio = new Audio();
    let currentSongIndex = 0;
    //let genre;

    playButton.addEventListener('click', function() {
        playSong(genreList, audio, currentSongIndex);
        setupPlaylist(genreList, buttonId);
        //genre =  genreList;
    });

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    prevButton.addEventListener('click', function() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = genreList.length - 1;
        }
        playSong(genreList, audio, currentSongIndex);
    });

    nextButton.addEventListener('click', function() {
        currentSongIndex++;
        if (currentSongIndex < genreList.length) {
            playSong(genreList, audio, currentSongIndex);
        } else {
            currentSongIndex = 0;

            playSong(genreList, audio, currentSongIndex);
        }
    });


    audio.addEventListener('ended', function() {
        currentSongIndex++;
        if (currentSongIndex < genreList.length) {
            playSong(genreList, audio, currentSongIndex);
        } else {
            //playSong(genreList, audio, 0);
            currentSongIndex = 0;
            playSong(genreList, audio, currentSongIndex);
        }
    });

    //audio works but the next doesnt, vatafuck???? E porque depende da ordem que se da setup la em baixo
}



playButton.addEventListener('click', function() {

    if (currentAudio && currentAudio.paused) {
        currentAudio.play(); // Play the paused audio
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
    } else if (currentAudio && !currentAudio.paused) {
       currentAudio.pause(); // Pause the currently playing audio
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    }


});

volumeBtn.addEventListener('click', () => {
    if (currentAudio.muted) {
        currentAudio.muted = false;
        volumeBar.value = currentAudio.volume * 100;

        soundON.style.display = 'inline';
        soundOFF.style.display = 'none';
    } else {
        currentAudio.muted = true;
        volumeBar.value = 0;
        soundON.style.display = 'none';
        soundOFF.style.display = 'inline';
    }
});

volumeBar.addEventListener('input', () => {
    currentAudio.volume = volumeBar.value / 120;
    if (volumeBar.value > 0 && currentAudio.muted) {
        currentAudio.muted = false;
    } else if (volumeBar.value === 0 && !currentAudio.muted) {
        currentAudio.muted = true;
    }
});


// Setup playlist for each
setupPlaylist(chillList, 'chillButton');
setupPlaylist(hiphopList, 'hiphopButton');

// setupPlaylist(popList, 'popButton');

// setupPlaylist(rockList, 'rockButton');



