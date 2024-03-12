
const songs = [
  { name: 'FASHION', artist: 'Britney Mason', albumCover: 'album.png', url: 'Britney-Manson-Fashion.mp3' },
{ name: 'BACK TO ME', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - BACK TO ME (Lyrics) ft. Freddie Gibbs & Quavo (192 kbps).mp3' },
 { name: 'CARNIVAL', artist: 'Ye', albumCover: 'album.png', url: 'CARNIVAL - Kanye West & Ty Dolla $ign (ft Playboi Carti & Rich The Kid) (lyrics) (192 kbps).mp3' },
 { name: 'PAPER WORK', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PAPERWORK (Lyrics) ft. Quavo (192 kbps).mp3' },
 { name: 'PROBLEMATIC', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PROBLEMATIC (Lyrics) (192 kbps).mp3' },
  
];



const Vultures = [
{ name: 'BACK TO ME', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - BACK TO ME (Lyrics) ft. Freddie Gibbs & Quavo (192 kbps).mp3' },
 { name: 'CARNIVAL', artist: 'Ye', albumCover: 'album.png', url: 'CARNIVAL - Kanye West & Ty Dolla $ign (ft Playboi Carti & Rich The Kid) (lyrics) (192 kbps).mp3' },
 { name: 'PAPER WORK', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PAPERWORK (Lyrics) ft. Quavo (192 kbps).mp3' },
 { name: 'PROBLEMATIC', artist: 'Ye', albumCover: 'album.png', url: 'Kanye West & Ty Dolla $ign - PROBLEMATIC (Lyrics) (192 kbps).mp3' },
  
];





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

function playVulturesSongs() {
  // Clear the existing playlist
  audio.src = '';
  // Reset the current song index
  currentSongIndex = 0;
  
  // Load and play the first song in the Vultures array
  loadSong(currentSongIndex,Vultures);
  audio.play();
  document.getElementById("playpause").src = "pause.png" ;
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

function generateSongList(songs) {
  songList.innerHTML = '';
  songs.forEach(song => {
      const li = document.createElement('li');
      li.textContent = `${song.name} - ${song.artist} `;
      songList.appendChild(li);
  });
}

function Songs() {
  var songContainer = document.getElementById("songshowhide");
  songContainer.style.display = (songContainer.style.display === "none") ? "block" : "none";
  
  // Ensure that the buttons appear in line when shown
  document.getElementById("song2showhide").style.display = "inline-block";
  document.getElementById("song3showhide").style.display = "inline-block";
}

function Albums() {
  var albumContainer = document.getElementById("albumshowhide");
 albumContainer.style.display = (albumContainer.style.display === "none") ? "block" : "none";
  
  // Ensure that the buttons appear in line when shown
  //document.getElementById("song2showhide").style.display = "inline-block";
  //document.getElementById("song3showhide").style.display = "inline-block";
}

function Artists() {
  var artistsContainer = document.getElementById("artistshowhide");
 artistsContainer.style.display = (artistsContainer.style.display === "none") ? "block" : "none";
  
  // Ensure that the buttons appear in line when shown
  //document.getElementById("song2showhide").style.display = "inline-block";
  //document.getElementById("song3showhide").style.display = "inline-block";
}

searchInput.addEventListener('input', filterSongs);
filterSelect.addEventListener('change', filterSongs);



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
//const albumCoverElement = document.getElementById('albumCover');

function generateSongList(songs) {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');

    // Create a container for album cover and song info
    const songContainer = document.createElement('div');
    songContainer.classList.add('song-container');

    // Create album cover image element
    const albumCoverImg = document.createElement('img');
    albumCoverImg.src = song.albumCover;
    albumCoverImg.alt = 'Album Cover';
    
    // Add album-cover class to limit the size
    albumCoverImg.classList.add('album-cover');

    // Append album cover image to song container
    songContainer.appendChild(albumCoverImg);

    // Append song name and artist
    const songInfo = document.createElement('div');
    songInfo.textContent = `${song.name} - ${song.artist}`;
    songContainer.appendChild(songInfo);

    // Add click event listener to play the song
    songContainer.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex,songs);
      playPause();
    });

    // Append song container to list item
    li.appendChild(songContainer);

    // Append list item to song list
    songList.appendChild(li);
  });
}











// Other code...

// Event listener for the 'ended' event on the <audio> element
audio.addEventListener('ended', playNextSong);

function loadSong(index,arraysongs) {
    const song = arraysongs[index];
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






audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', function() {
  seekSlider.value = audio.currentTime;
});

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % arraysongs.length;
  loadSong(currentSongIndex,arraysongs);
  audio.play();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % Vultures.length;
  loadSong(currentSongIndex, Vultures);
  playPause();
}

// Event listener for the 'ended' event on the <audio> element
audio.addEventListener('ended', playNextSong);


seekSlider.addEventListener('change', function() {
  audio.currentTime = seekSlider.value;


});












  