const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('YouTube Downloader API is running!');
});

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid or missing YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '_');

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(videoUrl, { format: 'mp4' }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error downloading video');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
