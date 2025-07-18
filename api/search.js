// api/search.js
import yts from 'yt-search';

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search query" });

  const results = await yts(q);
  const videos = results.videos.slice(0, 5).map(video => ({
    title: video.title,
    videoId: video.videoId,
    duration: video.timestamp,
    thumbnail: video.thumbnail,
  }));

  res.status(200).json({ results: videos });
}
