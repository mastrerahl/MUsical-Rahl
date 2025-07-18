function searchMusic() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Please enter a song name.");
  const encoded = encodeURIComponent(query);
  window.open(`https://ytmp3.to/youtube?q=${encoded}`, "_blank");
}
