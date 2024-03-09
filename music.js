/*const playpause = document.getElementById('playpause');
playpause.height = window.innerHeight * 0.9 * 0.15;
playpause.width = window.innerHeight * 0.9 * 0.15; 

/*const albumart = document.getElementById('albumart');
albumart.height = window.innerHeight * 0.9 * 0.15;
albumart.width = window.innerHeight * 0.9; */


const songs = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
  { name: 'GOOD LOYAL THOTS', artist: 'Odetari', albumCover: 'album.png', url: 'ODETARI - GOOD LOYAL THOTS.mp3' },
  { name: 'MIRO', artist: 'Berlioz', albumCover: 'album.png', url: 'Berlioz-Miro.mp3' }
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const seekSlider = document.getElementById('seekSlider');
const songNameElement = document.getElementById('songName');
const artistNameElement = document.getElementById('artistName');
const albumCoverElement = document.getElementById('albumCover');


function loadSong(index) {
    const song = songs[index];
  audio.src = song.url;
  songNameElement.textContent = song.name;
  artistNameElement.textContent = song.artist;
  albumCoverElement.src = song.albumCover;
}

audio.addEventListener('timeupdate', function() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  
  if (!isNaN(duration) && !isNaN(currentTime)) {
    seekSlider.value = (currentTime / duration) * 100; // Update the value of the range input
  }
});

seekSlider.addEventListener('input', function() {
  const duration = audio.duration;
  const seekTo = duration * (seekSlider.value / 100); // Calculate the new time to seek to
  audio.currentTime = seekTo; // Seek to the new time
});


function playPause() {
  if (audio.paused) {
    audio.play();
    document.getElementById("playpause").src = "pause.png" ;
  } else {
    audio.pause();
    
    document.getElementById("playpause").src = "play.png" ;
  }
}

function skip(time) {
  audio.currentTime += time;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

audio.addEventListener('timeupdate', function() {
  seekSlider.value = audio.currentTime;
});

seekSlider.addEventListener('change', function() {
  audio.currentTime = seekSlider.value;


});

  // Load the first song
  loadSong(currentSongIndex);