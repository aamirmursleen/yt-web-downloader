import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { url, format } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Create downloads directory in the project
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // Clean old files (optional - remove files older than 1 hour)
    const files = fs.readdirSync(downloadsDir);
    const now = Date.now();
    files.forEach((file) => {
      const filePath = path.join(downloadsDir, file);
      const stats = fs.statSync(filePath);
      const ageMs = now - stats.mtimeMs;
      if (ageMs > 3600000) {
        // 1 hour
        fs.unlinkSync(filePath);
      }
    });

    // Generate unique filename
    const timestamp = Date.now();
    const outputTemplate = path.join(downloadsDir, `video_${timestamp}.%(ext)s`);

    // Build yt-dlp command
    let command = `yt-dlp "${url}" -o "${outputTemplate}"`;

    if (format && format !== 'best') {
      // Add format selection with fallback to best quality
      command += ` -f "${format}/bestvideo+bestaudio/best"`;
    }

    // Execute download
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });

    // Find the downloaded file
    const downloadedFiles = fs
      .readdirSync(downloadsDir)
      .filter((f) => f.startsWith(`video_${timestamp}`));

    if (downloadedFiles.length === 0) {
      throw new Error('Download completed but file not found');
    }

    const filename = downloadedFiles[0];
    const downloadUrl = `/downloads/${filename}`;

    return NextResponse.json({
      success: true,
      downloadUrl,
      filename,
      message: 'Download completed successfully',
    });
  } catch (error: any) {
    console.error('Error downloading video:', error);

    // Extract more detailed error message from stderr if available
    let errorMessage = 'Failed to download video';
    if (error.stderr) {
      // Extract the actual error from yt-dlp
      const ytdlpError = error.stderr.match(/ERROR: (.+)/);
      if (ytdlpError && ytdlpError[1]) {
        errorMessage = ytdlpError[1];
      }
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}
