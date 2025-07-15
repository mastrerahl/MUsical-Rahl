// app.js

function searchMusic() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please type a song name first.");
    return;
  }

  // Redirect to ytmp3.to search results
  const encodedQuery = encodeURIComponent(query);
  const redirectURL = `https://ytmp3.to/youtube?q=${encodedQuery}`;

  // Optional: Open in new tab
  window.open(redirectURL, "_blank");
}
