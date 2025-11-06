'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Video,
  Music,
  ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  uploader: string;
  formats: Array<{
    format_id: string;
    ext: string;
    resolution: string;
    filesize: number | null;
    format_note: string;
  }>;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('best');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const fetchVideoInfo = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);
    setDownloadUrl('');

    try {
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch video info');
      }

      const data = await response.json();
      setVideoInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    setDownloadLoading(true);
    setError('');
    setDownloadUrl('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: selectedFormat }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to download video');
      }

      const data = await response.json();
      setDownloadUrl(data.downloadUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDownloadLoading(false);
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      description: 'Download from 1000+ websites including YouTube, Instagram, TikTok, Facebook & more',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Powered by yt-dlp for blazing-fast downloads with maximum speed',
    },
    {
      icon: Shield,
      title: '100% Free & Private',
      description: 'No registration, no tracking, no ads. Your privacy is our priority',
    },
    {
      icon: Video,
      title: 'Multiple Formats',
      description: 'Choose from various quality options - HD, 4K, or audio-only downloads',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 dark:from-violet-900 dark:via-purple-900 dark:to-pink-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Advanced AI Technology</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Download Videos
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                From Anywhere
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
              The ultimate video downloader for creators, marketers, and enthusiasts.
              Save content from 1000+ platforms in seconds.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste any video URL here... (YouTube, Instagram, TikTok, etc.)"
                  className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent text-white placeholder-white/60 font-medium transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && fetchVideoInfo()}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchVideoInfo}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get Video Info
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-white px-4 py-3 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Oops! Something went wrong</p>
                      <p className="text-sm text-white/80">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Video Info Card */}
          <AnimatePresence>
            {videoInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-1">
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {videoInfo.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-white/80">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span className="font-medium">{videoInfo.uploader}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4" />
                        <span className="font-medium">
                          {formatDuration(videoInfo.duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Format Selection */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Choose Your Quality
                  </label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-medium focus:ring-2 focus:ring-purple-400 transition-all"
                  >
                    <option value="best" className="bg-gray-900">
                      🎬 Best Quality (Video + Audio)
                    </option>
                    <option value="bestaudio" className="bg-gray-900">
                      🎵 Best Audio Only (MP3)
                    </option>
                    {videoInfo.formats.slice(0, 10).map((format) => (
                      <option
                        key={format.format_id}
                        value={format.format_id}
                        className="bg-gray-900"
                      >
                        📹 {format.resolution} - {format.ext} ({format.format_note}){' '}
                        {format.filesize && `- ${formatFileSize(format.filesize)}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadVideo}
                  disabled={downloadLoading}
                  className="w-full px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  {downloadLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Downloading Your Video...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Download Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Download Success */}
                <AnimatePresence>
                  {downloadUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-green-500/50"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-green-300" />
                        <div>
                          <p className="text-white font-bold text-lg">
                            Your download is ready!
                          </p>
                          <p className="text-white/80 text-sm">
                            Click below to save your video
                          </p>
                        </div>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={downloadUrl}
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-green-50 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Save Video to Device
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Features Section */}
          {!videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 text-center hover:bg-white/20 transition-all"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                    className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-4"
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/60 text-sm"
          >
            <p className="flex items-center justify-center gap-2">
              Powered by{' '}
              <a
                href="https://github.com/yt-dlp/yt-dlp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:text-pink-200 font-semibold underline"
              >
                yt-dlp
              </a>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <span className="text-pink-400">♥</span> for creators
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
