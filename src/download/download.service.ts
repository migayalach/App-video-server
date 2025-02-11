import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DownloadService {
  // Method to download video/audio based on URL, quality, and format
  async downloadVideo(
    url: string,
    quality: string,
    format: string,
  ): Promise<{ message: string }> {
    // Define the folder to save downloaded files (Desktop in this case)
    const downloadFolder = path.join(process.env.HOME, 'Escritorio', 'videos');

    // Check if the download folder exists, if not, create it
    if (!fs.existsSync(downloadFolder)) {
      fs.mkdirSync(downloadFolder, { recursive: true });
    }

    // Get the video title using yt-dlp
    const infoCommand = `yt-dlp --get-title ${url}`;

    // Wrap the exec command in a Promise to handle async flow
    const videoTitle = await new Promise<string>((resolve, reject) => {
      exec(infoCommand, (err, stdout, stderr) => {
        if (err || stderr) {
          console.error('Error getting video title:', err || stderr);
          reject(
            new HttpException(
              'Error getting video title',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }
        resolve(stdout.trim());
      });
    });

    // Clean up the video title (remove extra spaces and invalid characters)
    const safeVideoTitle = videoTitle
      .replace(/[\/:*?"<>|]/g, '') // Remove invalid characters
      .replace(/\s+/g, '_'); // Replace spaces with underscores

    // Define the output path for the downloaded file
    let outputPath = path.join(downloadFolder, `${safeVideoTitle}`);

    // Set the file extension based on the selected format (mp3 or mp4)
    if (format === 'mp3') {
      outputPath += '.mp3';
    } else {
      outputPath += '.mp4';
    }

    // Define video format based on the selected quality
    let videoFormat = '';
    if (quality === '144p') videoFormat = 'worstvideo+worstaudio';
    else if (quality === '360p')
      videoFormat = 'bestaudio[ext=m4a]+bestvideo[height<=360]/mp4';
    else if (quality === '480p')
      videoFormat = 'bestaudio[ext=m4a]+bestvideo[height<=480]/mp4';
    else if (quality === '720p')
      videoFormat = 'bestaudio[ext=m4a]+bestvideo[height<=720]/mp4';
    else if (quality === '1080p')
      videoFormat = 'bestaudio[ext=m4a]+bestvideo[height<=1080]/mp4';
    else videoFormat = 'bestvideo+bestaudio';

    // Define audio bitrate based on the selected quality
    let audioBitrate = '192k'; // Default value for audio quality
    if (quality === 'low') audioBitrate = '128k';
    else if (quality === 'high') audioBitrate = '256k';
    else if (quality === 'best') audioBitrate = '320k';

    try {
      let command = '';

      // If the format is MP3, use audio extraction with the specified bitrate
      if (format === 'mp3') {
        command = `yt-dlp -f bestaudio[ext=m4a] --extract-audio --audio-quality ${audioBitrate} --audio-format mp3 -o "${outputPath}" ${url}`;
      } else {
        // If the format is not MP3, use the selected video format
        command = `yt-dlp -f "${videoFormat}" --merge-output-format mp4 -o "${outputPath}" ${url}`;
      }

      // Wrap the exec download command in a Promise to handle async flow
      await new Promise<void>((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
          // Handle any errors that occur during the download
          if (err || stderr) {
            console.error('Error downloading the file:', err || stderr);
            reject(
              new HttpException(
                'Error downloading the file.',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }

          // Log stdout messages to the terminal
          console.log('File downloaded successfully!', stdout);
          resolve();
        });
      });

      // Return the success message after the download is complete
      return {
        message: 'Download successfully.',
      };
    } catch (err) {
      // Catch any unexpected errors during the process
      console.error('An error occurred:', err.message);
      throw new HttpException(
        'Error downloading the file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
