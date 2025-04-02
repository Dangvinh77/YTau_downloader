const ytdlp = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');

async function downloadMp3(url, outputPath = 'downloads') {
    try {
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            throw new Error('Invalid YouTube URL');
        }

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        const outputTemplate = path.join(outputPath, '%(title)s.%(ext)s');

        console.log(`Starting download from: ${url}`);

        const result = await ytdlp(url, {
            extractAudio: true,
            audioFormat: 'mp3',
            output: outputTemplate,
            noCheckCertificate: true,
            addMetadata: true,
            ffmpegLocation: 'E:/DEV/MyApp/NodeJS/YTau_downloader/ffmpeg-2025-03-31-git-35c091f4b7-essentials_build/ffmpeg-2025-03-31-git-35c091f4b7-essentials_build/bin/ffmpeg.exe', // Thay bằng đường dẫn thực tế đến ffmpeg.exe
        });

        console.log(`Download completed: ${result}`);
        const files = fs.readdirSync(outputPath);
        const downloadedFile = files.find(file => file.endsWith('.mp3') && file.includes('Never_Gonna_Give_You_Up'));
        return downloadedFile ? path.join(outputPath, downloadedFile) : outputTemplate;

    } catch (error) {
        console.error('Error in downloadMp3:', error.message);
        throw error;
    }
}

const youtubeUrl = 'https://www.youtube.com/watch?v=05JRjXL5bJI&t=12s';

downloadMp3(youtubeUrl)
    .then(file => console.log(`Download process finished: ${file}`))
    .catch(err => console.error('Download failed:', err));