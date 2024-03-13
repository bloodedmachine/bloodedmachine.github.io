// Check if the user's name is already stored in local storage
let userName = localStorage.getItem('userName');

// If the user's name is not stored, prompt the user to input their name
if (!userName) {
    userName = prompt('Please enter your name (3 letters):');

    // Check if the user input is valid (exactly 3 letters)
    while (!userName || userName.length !== 3) {
        userName = prompt('Invalid input! Please enter exactly 3 letters for your name:');
    }

    // Store the user's name in local storage
    localStorage.setItem('userName', userName);
}

Usernamecapital = userName.toUpperCase();
document.getElementById("username").innerText = Usernamecapital;


const songs = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
  { name: 'BACK TO ME', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - BACK TO ME (Lyrics) ft. Freddie Gibbs & Quavo (192 kbps).mp3' },
  { name: 'CARNIVAL', artist: 'Ye', albumCover: 'album.png', url: 'CARNIVAL - Kanye West & Ty Dolla $ign (ft Playboi Carti & Rich The Kid) (lyrics) (192 kbps).mp3' },
  { name: 'PAPER WORK', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PAPERWORK (Lyrics) ft. Quavo (192 kbps).mp3' },
  { name: 'PROBLEMATIC', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PROBLEMATIC (Lyrics) (192 kbps).mp3' },
  { name: 'TELEKINESIS', artist: 'Travis Scott', albumCover: 'album.png', url: 'Travis Scott - TELEKINESIS (Official Audio) ft. SZA, Future (256 kbps).mp3' },

];

const Vultures = [
  { name: 'BACK TO ME', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - BACK TO ME (Lyrics) ft. Freddie Gibbs & Quavo (192 kbps).mp3' },
  { name: 'CARNIVAL', artist: 'Ye', albumCover: 'album.png', url: 'CARNIVAL - Kanye West & Ty Dolla $ign (ft Playboi Carti & Rich The Kid) (lyrics) (192 kbps).mp3' },
  { name: 'PAPER WORK', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PAPERWORK (Lyrics) ft. Quavo (192 kbps).mp3' },
  { name: 'PROBLEMATIC', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PROBLEMATIC (Lyrics) (192 kbps).mp3' },
];

const Utopia = [
  { name: 'TELEKINESIS', artist: 'Travis Scott', albumCover: 'album.png', url: 'Travis Scott - TELEKINESIS (Official Audio) ft. SZA, Future (256 kbps).mp3' },
];

var currentsongarray = songs;
const loadMoreButton = document.getElementById('loadMoreButton');

let loadedAllSongs = false;

const toggleBarsCheckbox = document.getElementById('toggleBarsCheckbox');
toggleBarsCheckbox.addEventListener('change', () => {
  const barsContainer = document.querySelector('.bars');
  var songContainer = document.getElementById("songshowhide");
  var albumContainer = document.getElementById("albumshowhide");

  if (toggleBarsCheckbox.checked) {
    document.getElementById("song2showhide").style.display = "inline-block";
    document.getElementById("song3showhide").style.display = "inline-block";
    document.getElementById("song4showhide").style.display = "inline-block";
    songContainer.style.display = "none";
    albumContainer.style.display = "none";
  } else {
    document.getElementById("song2showhide").style.display = "none";
    document.getElementById("song3showhide").style.display = "none";
    document.getElementById("song4showhide").style.display = "none";
    songContainer.style.display = "flex";
    albumContainer.style.display = "inline-block";
  }
});



function playAlbum(Album) {
  currentsongarray = Album;
  audio.src = '';
  currentSongIndex = 0;
  loadSong(currentSongIndex, Album);
  audio.play();
  document.getElementById("playpause").src = "pause.png";
  document.getElementById("musicPlayer").style.display = "block";
}


const barsContainer = document.querySelector('.bars');
window.addEventListener('load', () => {
  const barsContainer = document.querySelector('.bars');
  barsContainer.classList.add('hidden');
});

const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const songList = document.getElementById('songList');




function Songs() {
  var songContainer = document.getElementById("songshowhide");
  songContainer.style.display = (songContainer.style.display === "none") ? "block" : "none";
  loadMoreButton.style.display = (loadMoreButton.style.display === "none") ? "block" : "none";
  document.getElementById("albumshowhide").style.display = "none";
  document.getElementById("artistshowhide").style.display = "none";
  document.getElementById("song2showhide").style.display = "inline-block";
  document.getElementById("song3showhide").style.display = "inline-block";


}

function Albums() {
  var albumContainer = document.getElementById("albumshowhide");
  albumContainer.style.display = (albumContainer.style.display === "none") ? "block" : "none";
  document.getElementById("songshowhide").style.display = "none";
  document.getElementById("artistshowhide").style.display = "none";
}

function Artists() {
  var artistsContainer = document.getElementById("artistshowhide");
  artistsContainer.style.display = (artistsContainer.style.display === "none") ? "block" : "none";
  document.getElementById("songshowhide").style.display = "none";
  document.getElementById("albumshowhide").style.display = "none";
}

searchInput.addEventListener('input', filterSongs);
filterSelect.addEventListener('change', filterSongs);

function filterSongs() {
  const filterBy = "name";
  const searchTerm = searchInput.value.toLowerCase();
  let filteredSongs = songs;

  if (filterBy !== 'all') {
    filteredSongs = songs.filter(song => {
      if (filterBy === 'name') {
        return song.name.toLowerCase().includes(searchTerm);
      } else if (filterBy === 'artist') {
        return song.artist.toLowerCase().includes(searchTerm);
      }
    });
  }

  generateSongList(filteredSongs);
}


generateSongList(songs);
loadMoreButton.style.display = 'none';
let currentSongIndex = 0;
const audio = document.getElementById('audio');
const seekSlider = document.getElementById('seekSlider');
const songNameElement = document.getElementById('songName');
const artistNameElement = document.getElementById('artistName');

function generateSongList(songs) {
  songList.innerHTML = '';
  const songsToShow = loadedAllSongs ? songs : songs.slice(0, 3);

  songsToShow.forEach((song, index) => {
    const li = document.createElement('li');
    const songContainer = document.createElement('div');
    songContainer.classList.add('song-container');
    const albumCoverImg = document.createElement('img');
    albumCoverImg.src = song.albumCover;
    albumCoverImg.alt = 'Album Cover';
    albumCoverImg.classList.add('album-cover');
    songContainer.appendChild(albumCoverImg);
    const songInfo = document.createElement('div');
    songInfo.textContent = `${song.name} - ${song.artist}`;
    songContainer.appendChild(songInfo);

    // Add event listener to play the song when clicked
    songContainer.addEventListener('click', () => {
      currentSongIndex = index;
      currentsongarray = songs
      loadSong(currentSongIndex, songs);
      playPause();
    });

    // Add a button to play the song after the current one
    const playAfterButton = document.createElement('button');
    playAfterButton.textContent = 'Play After';
    playAfterButton.classList.add('play-after-button');
    playAfterButton.addEventListener('click', () => {
      playSongAfter(index);
    });
    songContainer.appendChild(playAfterButton);

    li.appendChild(songContainer);
    songList.appendChild(li);
  });

  /*if (!loadedAllSongs && songs.length > 3) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }*/
}

// Variable to store the index of the song to play after the current one finishes
let currentSongIndexToPlayAfter = -1;

// Function to play a song after the current one finishes
function playSongAfter(index) {
  // Set the index of the song to play after the current one finishes
  currentSongIndexToPlayAfter = index;
}

// Event listener for the 'ended' event on the <audio> element
audio.addEventListener('ended', function () {
  // If there's a song queued up to play after the current one finishes
  if (currentSongIndexToPlayAfter !== -1) {
    // Load the song but don't play it yet
    loadSong(currentSongIndexToPlayAfter, songs);
    // Reset the index to indicate no queued song
    currentSongIndexToPlayAfter = -1;
  }
});

// Function to play the queued song after the current one finishes
function playQueuedSong() {
  // If there's a song queued up to play after the current one finishes
  if (currentSongIndexToPlayAfter !== -1) {
    // Play the queued song
    audio.play();
    // Reset the index to indicate no queued song
    currentSongIndexToPlayAfter = -1;
  }
}




loadMoreButton.addEventListener('click', () => {
  loadedAllSongs = true;
  generateSongList(songs);
});

audio.addEventListener('ended', playNextSong);

function loadSong(index, arraysongs) {
  const song = arraysongs[index];
  audio.src = song.url;
  songNameElement.textContent = song.name;
  artistNameElement.textContent = song.artist;
}

audio.addEventListener('timeupdate', function () {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  document.getElementById("timeleft").innerHTML = Math.floor(duration - currentTime);
  if (!isNaN(duration) && !isNaN(currentTime)) {
    seekSlider.value = (currentTime / duration) * 100;
  }
});

seekSlider.addEventListener('input', function () {
  const duration = audio.duration;
  const seekTo = duration * (seekSlider.value / 100);
  audio.currentTime = seekTo;
});

function playPause() {
  if (audio.paused) {
    audio.play();
    document.getElementById("playpause").src = "pause.png";
    document.getElementById("musicPlayer").style.display = "block";
  } else {
    audio.pause();
    document.getElementById("playpause").src = "play.png";
  }
  // Play the queued song (if any) after toggling play/pause
  playQueuedSong();
}


function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % currentsongarray.length;
  loadSong(currentSongIndex, currentsongarray);
  playPause();
}

audio.addEventListener('ended', playNextSong);


// Event listener for the 'input' event on the seek slider
seekSlider.addEventListener('input', () => {
  audio.currentTime = seekSlider.value;
});

// Event listener for the 'timeupdate' event on the <audio> element
audio.addEventListener('timeupdate', () => {
  seekSlider.value = audio.currentTime;
});

// Function to update song information
function updateSongInfo(name, artist) {
  document.getElementById('songName').textContent = name;
  document.getElementById('artistName').textContent = artist;
}


