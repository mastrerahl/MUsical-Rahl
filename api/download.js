// api/download.js
export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing video ID" });

  const downloadURL = `https://ytmp3.to/youtube/${id}`;
  return res.redirect(downloadURL);
}
