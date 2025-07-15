// app.js

async function searchSongs() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("results");

  if (!query) return alert("Type a song title to search!");

  resultsContainer.innerHTML = `<p style="text-align:center">Searching for "${query}"...</p>`;

  try {
    const response = await fetch(`https://yt-api.pr0gramm.space/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return resultsContainer.innerHTML = `<p style="text-align:center">No results found for "${query}"</p>`;
    }

    // Render cards
    resultsContainer.innerHTML = "";
    data.items.slice(0, 6).forEach(item => {
      const videoId = item.id;
      const title = item.title;
      const thumbnail = item.thumbnail.url;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${thumbnail}" alt="${title}">
        <h3>${title}</h3>
        <audio controls src="https://yt-api.pr0gramm.space/api/audio/${videoId}"></audio>
        <br><br>
        <a href="https://yt-api.pr0gramm.space/api/audio/${videoId}" download>
          <button>Download MP3</button>
        </a>
      `;
      resultsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = `<p style="text-align:center;color:red">An error occurred. Try again later.</p>`;
  }
}
