
const songs = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
{ name: 'BACK TO ME', artist: 'ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - BACK TO ME (Lyrics) ft. Freddie Gibbs & Quavo (192 kbps).mp3' },
 { name: 'CARNIVAL', artist: 'ye', albumCover: 'album.png', url: 'CARNIVAL - Kanye West & Ty Dolla $ign (ft Playboi Carti & Rich The Kid) (lyrics) (192 kbps).mp3' },
  
];


const toggleBarsCheckbox = document.getElementById('toggleBarsCheckbox');

toggleBarsCheckbox.addEventListener('change', () => {
    const barsContainer = document.querySelector('.bars');
    Songs();

    var songs2showhide = document.getElementById("song2showhide").style.display;

  if (songs2showhide == "none") {
    document.getElementById("song2showhide").style.display = "block";
    
  } else {
    
    document.getElementById("song2showhide").style.display = "none";
    
  }
   // barsContainer.classList.toggle('hidden'); // Toggle the 'hidden' class on the barsContainer div
});


const barsContainer = document.querySelector('.bars');

window.addEventListener('load', () => {
  const barsContainer = document.querySelector('.bars');
  barsContainer.classList.add('hidden');
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

function Songs() {

var songsshowhide = document.getElementById("songshowhide").style.display;

  if (songsshowhide == "none") {
    document.getElementById("songshowhide").style.display = "block";
    
  } else {
    
    document.getElementById("songshowhide").style.display = "none";
    
  }
  
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

function generateSongList(songs) {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.name} - ${song.artist} `;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playPause();
    });
    songList.appendChild(li);
  });
}

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
    document.getElementById("musicPlayer").style.display = "block"; 
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






  