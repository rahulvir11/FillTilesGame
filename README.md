# 🎮 Tiles Connect - Modern Puzzle Game

A beautiful, modern tile-connecting puzzle game built with Next.js and React. Connect all tiles in a path while avoiding obstacles and complete increasingly challenging levels!

![Game Screenshot](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-13+-black) ![React](https://img.shields.io/badge/React-18+-blue)

## ✨ Features

### 🎯 **Core Gameplay**
- **Path-based Puzzle**: Connect tiles to create a continuous path
- **4 Challenging Levels**: Progressive difficulty with unique layouts
- **Multiple Controls**: Play with arrow keys or mouse clicks
- **Smart Undo System**: Click on previous tiles to backtrack
- **Obstacle Avoidance**: Navigate around blocked tiles

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful frosted glass effects with blur backgrounds
- **Dynamic Gradients**: Color-shifting backgrounds and animated elements
- **Glow Effects**: Neon-like glowing tiles and connection lines
- **3D Depth**: Realistic shadows and hover animations
- **Responsive Layout**: Works seamlessly on different screen sizes

### 🏆 **Enhanced Game Experience**
- **Real-time Stats**: Live progress tracking and timer
- **Victory Celebrations**: Cinematic win modal with particle effects
- **Smart Feedback**: Dynamic congratulation messages based on performance
- **Visual Path Tracking**: Numbered tiles showing connection sequence
- **Professional Animations**: Smooth transitions with cubic-bezier easing

### 🔊 **Audio Integration**
- **Connection Sounds**: Satisfying audio feedback when tiles connect
- **Victory Music**: Celebratory sound effects on level completion
- **Volume Control**: Balanced audio levels for optimal experience
- **Error Handling**: Graceful fallback for audio playback issues

### 🌐 **Production Features**
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Cards
- **PWA Support**: Installable as mobile/desktop app with offline capabilities
- **Performance**: Optimized bundle size with tree shaking and code splitting
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Security**: CSP headers, XSS protection, and security best practices
- **Analytics Ready**: Google Analytics integration prepared
- **Cross-browser**: Tested and optimized for all major browsers
- **Mobile-first**: Responsive design with touch-friendly controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahulvir11/tiles-connect.git
   cd tiles-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Production Deployment

### Deploy on Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rahulvir11/tiles-connect)

1. **Fork this repository**
2. **Connect to Vercel**: Import your fork to Vercel
3. **Deploy**: Vercel will automatically build and deploy
4. **Custom Domain** (Optional): Add your custom domain in Vercel settings

### Deploy on Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rahulvir11/tiles-connect)

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Node Version**: 18+

### Deploy on Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Optional)
For production deployment, you can set these environment variables:

```env
# Google Analytics (optional)
GA_MEASUREMENT_ID=your-google-analytics-id

# Asset optimization
ASSET_PREFIX=https://your-cdn.com

# Bundle analysis
ANALYZE=true
```

### Production Checklist
- ✅ **SEO Optimized**: Comprehensive meta tags and structured data
- ✅ **PWA Ready**: Service worker and manifest.json
- ✅ **Accessibility**: WCAG 2.1 AA compliant
- ✅ **Performance**: Optimized assets and lazy loading
- ✅ **Security**: CSP headers and security best practices
- ✅ **Analytics Ready**: Google Analytics integration prepared
- ✅ **Responsive**: Works on all device sizes
- ✅ **Cross-browser**: Tested on major browsers

## 🎮 How to Play

### Basic Controls
- **🔼🔽◀️▶️ Arrow Keys**: Move in any direction
- **🖱️ Mouse Click**: Click on adjacent tiles to move
- **⬅️ Backtrack**: Click on previous tiles to undo moves

### Game Rules
1. **Start Point**: Begin at the tile marked with 🎯
2. **Goal**: Fill ALL available tiles with your path
3. **Movement**: Only move to adjacent tiles (no diagonal)
4. **Obstacles**: Avoid black tiles marked with 🚫
5. **No Crossing**: Can't revisit tiles (except to backtrack)

### Winning
- Connect all playable tiles to complete the level
- Faster completion times earn better congratulation messages
- Progress through 4 increasingly challenging levels

## 🏗️ Project Structure

```
tiles-connect/
├── public/
│   ├── connect.mp3          # Connection sound effect
│   ├── victory.mp3          # Victory sound effect
│   └── ...
├── src/
│   ├── app/
│   │   ├── layout.js        # Root layout
│   │   ├── page.js          # Main game page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   └── FillTilesGame.jsx # Main game component
│   └── constant/
│       └── levels.js        # Level configurations
├── package.json
└── README.md
```

## 🛠️ Technical Implementation

### Technologies Used
- **Frontend**: Next.js 13+ with App Router
- **Styling**: CSS-in-JS with styled-jsx
- **Audio**: Web Audio API with MP3 files
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Animations**: CSS keyframes with cubic-bezier timing

### Key Components

#### `FillTilesGame.jsx`
- Main game logic and rendering
- State management for game progress
- Audio integration and effects
- Modern UI with glassmorphism design

#### `levels.js`
- Configuration for all game levels
- Defines grid size, start position, and obstacles
- Easy to extend with new levels

### Performance Optimizations
- **Efficient Rendering**: Optimized tile rendering with React keys
- **Audio Preloading**: Sound files loaded on component mount
- **Smooth Animations**: Hardware-accelerated CSS transforms
- **Memory Management**: Proper cleanup of event listeners

## 🎨 Design System

### Color Palette
- **Primary**: `#ff6b6b` (Coral Red)
- **Secondary**: `#4ecdc4` (Turquoise)
- **Accent**: `#00ff88` (Bright Green)
- **Warning**: `#ffaa00` (Orange)
- **Background**: Dark gradients with transparency

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts with proper contrast
- **UI Elements**: Consistent sizing and spacing

### Animations
- **Duration**: 0.3s for interactions, 2s+ for celebrations
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth feel
- **Effects**: Scale, translate, glow, and color shifts

## 🎯 Level Design

### Level 1 - Getting Started
- **Size**: 5x5 grid
- **Difficulty**: Beginner
- **Obstacles**: 4 blocked tiles
- **Focus**: Learn basic mechanics

### Level 2 - Zigzag Challenge
- **Size**: 6x6 grid  
- **Difficulty**: Intermediate
- **Obstacles**: 6 strategically placed blocks
- **Focus**: Path planning

### Level 3 - The Maze
- **Size**: 7x7 grid
- **Difficulty**: Advanced
- **Obstacles**: 12 blocks forming maze-like patterns
- **Focus**: Complex navigation

### Level 4 - Expert Challenge
- **Size**: 8x8 grid
- **Difficulty**: Expert
- **Obstacles**: 13 blocks with challenging layouts
- **Focus**: Master-level problem solving

## 🔧 Customization

### Adding New Levels
Edit `src/constant/levels.js`:

```javascript
export const levels = [
  // ...existing levels
  {
    name: "Level 5 - Your Custom Level",
    rows: 6,
    cols: 8,
    start: { row: 0, col: 0 },
    disabledTiles: [
      { row: 2, col: 3 },
      // Add more obstacles...
    ],
  },
];
```

### Custom Sound Effects
Replace files in `public/` directory:
- `connect.mp3` - Played when tiles connect
- `victory.mp3` - Played on level completion

### Styling Modifications
The game uses CSS-in-JS. Modify styles in the component's `style` objects or the `<style jsx>` block.

## 📱 Browser Compatibility

- **Chrome**: Full support with all features
- **Firefox**: Full support with all features  
- **Safari**: Full support (may require user interaction for audio)
- **Edge**: Full support with all features
- **Mobile**: Responsive design works on touch devices

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Ideas for Contributions
- 🎮 New level designs
- 🎨 Visual effect improvements
- 🔊 Additional sound effects
- 📱 Mobile-specific optimizations
- 🏆 Achievement system
- 💾 Save/load progress
- 🌍 Internationalization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahulvir11**
- GitHub: [@rahulvir11](https://github.com/rahulvir11)

## 🙏 Acknowledgments

- Modern design trends and glassmorphism effects
- React and Next.js communities
- Inspiration from classic puzzle games

---

**🎮 Ready to play?** Run `npm run dev` and start connecting tiles!

**⭐ Enjoyed the game?** Please give this repo a star and share it with friends!
