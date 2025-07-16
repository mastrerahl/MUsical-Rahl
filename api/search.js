// File: api/search.js
const ytSearch = require('yt-search');

module.exports = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const result = await ytSearch(query);
    const videos = result.videos.slice(0, 5).map((video) => ({
      title: video.title,
      videoId: video.videoId,
      thumbnail: video.thumbnail,
      duration: video.timestamp,
      download: `https://api.vevioz.com/api/button/mp3/${video.videoId}`
    }));

    res.status(200).json({ results: videos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};
