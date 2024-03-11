
const songs = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
  { name: 'GOOD LOYAL THOTS', artist: 'Odetari', albumCover: 'album.png', url: 'ODETARI - GOOD LOYAL THOTS.mp3' },
  { name: 'MIRO', artist: 'Berlioz', albumCover: 'album.png', url: 'Berlioz-Miro.mp3' }
  
];

const playlist1 = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
  { name: 'GOOD LOYAL THOTS', artist: 'Odetari', albumCover: 'album.png', url: 'ODETARI - GOOD LOYAL THOTS.mp3' },
  { name: 'MIRO', artist: 'Berlioz', albumCover: 'album.png', url: 'Berlioz-Miro.mp3' }
];


const toggleBarsButton = document.getElementById('toggleBarsButton');
const barsContainer = document.querySelector('.bars');

window.addEventListener('load', () => {
  const barsContainer = document.querySelector('.bars');
  barsContainer.classList.add('hidden');
});

toggleBarsButton.addEventListener('click', () => {
    barsContainer.classList.toggle('hidden'); // Toggle the 'hidden' class on the barsContainer div
});

const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const songList = document.getElementById('songList');

function generateSongList(songs) {
  songList.innerHTML = '';
  songs.forEach(song => {
      const li = document.createElement('li');
      li.textContent = `${song.name} - ${song.artist} `;
      songList.appendChild(li);
  });
}

function filterSongs() {
  const filterBy = filterSelect.value;
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

searchInput.addEventListener('input', filterSongs);
filterSelect.addEventListener('change', filterSongs);

// Initial song list generation
generateSongList(songs);





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
 // albumCoverElement.src = song.albumCover;
}

audio.addEventListener('timeupdate', function() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  document.getElementById("timeleft").innerHTML = Math.floor(duration - currentTime);
  
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
  playPause();
  audio.play();

}
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playPause();
  audio.play();

}

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', function() {
  seekSlider.value = audio.currentTime;
});

seekSlider.addEventListener('change', function() {
  audio.currentTime = seekSlider.value;


});

  // Load the first song
  loadSong(currentSongIndex);