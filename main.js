const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

// Function to download YouTube video as MP3
async function downloadMp3(url, outputPath = 'downloads') {
    try {
        // Validate YouTube URL
        if (!ytdl.validateURL(url)) {
            throw new Error('Invalid YouTube URL');
        }

        // Create downloads directory if it doesn't exist
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        // Get video info
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title
            .replace(/[^a-zA-Z0-9]/g, '_') // Replace special characters with underscore
            .substring(0, 50); // Limit filename length

        const outputFile = path.join(outputPath, `${videoTitle}.mp3`);

        console.log(`Starting download: ${videoTitle}`);

        // Download audio
        const audioStream = ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        // Pipe the stream to a file
        audioStream.pipe(fs.createWriteStream(outputFile));

        // Handle events
        return new Promise((resolve, reject) => {
            audioStream.on('end', () => {
                console.log(`Download completed: ${outputFile}`);
                resolve(outputFile);
            });

            audioStream.on('error', (error) => {
                console.error('Error during download:', error);
                reject(error);
            });
        });

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Example usage
const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with your YouTube URL

downloadMp3(youtubeUrl)
    .then(() => console.log('Download process finished'))
    .catch(err => console.error('Download failed:', err));