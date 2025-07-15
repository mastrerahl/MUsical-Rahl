const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 🔍 /search?q=burna+boy
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing ?q=" });

  try {
    const apiURL = `https://yt-api.pr0gramm.space/api/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});

// ⬇️ /download/:id
app.get("/download/:id", (req, res) => {
  const videoId = req.params.id;
  const mp3Link = `https://yt-api.pr0gramm.space/api/audio/${videoId}`;
  res.redirect(mp3Link);
});

app.get("/", (req, res) => {
  res.send("🎶 Musical Rahl Backend is Live!");
});

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
