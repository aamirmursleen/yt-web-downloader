# 🎬 YouTube Video Downloader

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**The ultimate video downloader for creators, marketers, and enthusiasts.**

Save content from 1000+ platforms including YouTube, Instagram, TikTok, Facebook & more.

[View Demo](http://localhost:3001) · [Report Bug](https://github.com/aamirmursleen/yt-web-downloader/issues) · [Request Feature](https://github.com/aamirmursleen/yt-web-downloader/issues)

</div>

---

## ✨ Features

- 🌍 **Multi-Platform Support** - Download from 1000+ websites
- ⚡ **Lightning Fast** - Powered by yt-dlp for blazing-fast downloads
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 🔒 **100% Free & Private** - No registration, no tracking, no ads
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 🎯 **Multiple Formats** - Choose from various quality options (HD, 4K, audio-only)
- 🎭 **Animated Experience** - Framer Motion powered smooth animations
- 🌈 **Gradient Background** - Beautiful animated gradient effects

## 🎥 Supported Platforms

- ✅ YouTube
- ✅ Instagram
- ✅ TikTok
- ✅ Facebook
- ✅ Twitter/X
- ✅ Vimeo
- ✅ And 1000+ more!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- yt-dlp installed (`brew install yt-dlp` on macOS)
- ffmpeg installed (`brew install ffmpeg` on macOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aamirmursleen/yt-web-downloader.git
   cd yt-web-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Downloader:** [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **Video Processing:** [FFmpeg](https://ffmpeg.org/)

## 📖 Usage

1. **Paste a video URL** from any supported platform
2. **Click "Get Video Info"** to analyze the video
3. **Choose your preferred quality** from the dropdown
4. **Click "Download Now"** to save the video
5. **Save to your device** when ready

## 🎨 Design Features

- **Glassmorphism UI** - Frosted glass effect with backdrop blur
- **Animated Gradients** - Continuously moving background animations
- **Smooth Transitions** - Micro-interactions on every element
- **Responsive Layout** - Mobile-first design approach
- **Modern Typography** - Clean, readable fonts
- **Intuitive UX** - User-friendly interface

## 📁 Project Structure

```
yt-web-downloader/
├── app/
│   ├── api/
│   │   ├── download/
│   │   │   └── route.ts      # Download API endpoint
│   │   └── info/
│   │       └── route.ts       # Video info API endpoint
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page with UI
│   └── globals.css            # Global styles
├── public/
│   └── downloads/             # Downloaded videos storage
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 🔧 Configuration

The app automatically creates a `public/downloads` folder for temporary video storage. Downloaded videos are automatically cleaned up after 1 hour.

## 🌐 Deployment

### Deploy to Vercel (Frontend Only)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aamirmursleen/yt-web-downloader)

**Note:** For full functionality, you'll need a VPS or cloud server to run yt-dlp backend.

### Deploy to VPS (Full Stack)

1. **DigitalOcean / AWS / Linode**
   - Install Node.js, yt-dlp, and ffmpeg
   - Clone the repository
   - Run `npm install && npm run build`
   - Use PM2 or Docker for process management

2. **Docker Deployment** (Coming Soon)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for personal use only. Please respect copyright laws and terms of service of the platforms you download from. Only download content you have the right to download.

## 🙏 Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - The amazing video downloader
- [Next.js](https://nextjs.org/) - The React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons

## 📧 Contact

Aamir Mursleen - [@aamirmursleen](https://github.com/aamirmursleen)

Project Link: [https://github.com/aamirmursleen/yt-web-downloader](https://github.com/aamirmursleen/yt-web-downloader)

---

<div align="center">
Made with ❤️ for creators
</div>
