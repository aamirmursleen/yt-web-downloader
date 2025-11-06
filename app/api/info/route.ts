import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Get video info using yt-dlp
    const { stdout } = await execAsync(
      `yt-dlp --dump-json --no-playlist "${url}"`
    );

    const videoInfo = JSON.parse(stdout);

    // Extract relevant information
    const info = {
      title: videoInfo.title,
      thumbnail: videoInfo.thumbnail,
      duration: videoInfo.duration,
      uploader: videoInfo.uploader,
      formats: videoInfo.formats
        .filter((f: any) => f.vcodec !== 'none' || f.acodec !== 'none')
        .map((f: any) => ({
          format_id: f.format_id,
          ext: f.ext,
          resolution: f.resolution || 'audio only',
          filesize: f.filesize,
          vcodec: f.vcodec,
          acodec: f.acodec,
          format_note: f.format_note,
        }))
        .slice(0, 20), // Limit to top 20 formats
    };

    return NextResponse.json(info);
  } catch (error: any) {
    console.error('Error fetching video info:', error);

    // Extract more detailed error message from stderr if available
    let errorMessage = 'Failed to fetch video information';
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
