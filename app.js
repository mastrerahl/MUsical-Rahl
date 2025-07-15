// app.js

const musicList = document.getElementById("music-list");
const searchInput = document.getElementById("search");

// Sample songs (you can load from Firebase or JSON later)
const songs = [
  {
    title: "Royal Anthem",
    artist: "Rahl Empire",
    cover: "https://i.imgur.com/k9qP8VR.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Victory Chant",
    artist: "Lord Rahl",
    cover: "https://i.imgur.com/QkP62mM.jpg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Rise of the Throne",
    artist: "Golden Reign",
    cover: "https://i.imgur.com/jTF7sFQ.jpeg",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

// Render songs into HTML
function displaySongs(songArray) {
  musicList.innerHTML = "";
  songArray.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <audio controls src="${song.audio}"></audio>
      <a href="${song.audio}" download>
        <button>Download</button>
      </a>
    `;
    musicList.appendChild(card);
  });
}

// Live search filtering
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(keyword) ||
    song.artist.toLowerCase().includes(keyword)
  );
  displaySongs(filtered);
});

// Initial load
displaySongs(songs);
