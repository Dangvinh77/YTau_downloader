import { YtDlp } from 'ytdlp-nodejs';
const ytdlp = new YtDlp({
    ffmpegPath: 'E:/DEV/MyApp/NodeJS/YTau_downloader/ffmpeg/bin/ffmpeg.exe'
}

);

async function downloadAudioWithHighBitrate() {
    try {
        const file = await ytdlp.downloadAsync(
            'https://www.youtube.com/watch?v=_AL4IwHuHlY',
            {
                format: {
                    filter: 'audioonly',
                    quality: "highest" // 0 là chất lượng cao nhất (nén ít nhất)
                },
                filename: 'audio.mp3',
                onProgress: (progress) => {
                    console.log(progress);
                },
                // Thêm tùy chọn FFmpeg để tăng bitrate
                extraArgs: ['-b:a', '320k'] // Tùy chọn FFmpeg bổ sung
            }
        );
        console.log('Download completed with 320kbps:', file);
    } catch (error) {
        console.error('🚨 Lỗi:', error.message);
    }
}

downloadAudioWithHighBitrate();