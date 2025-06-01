# IFS 3D Attractor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-green)](https://threejs.org/)

A powerful, interactive web application for creating and exploring 3D fractals using Iterated Function Systems (IFS). Built with Next.js, React Three Fiber, and modern web technologies.

![IFS 3D Attractor Screenshot](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=IFS+3D+Attractor+Screenshot)

## 🌟 Features

### Core Functionality
- **Real-time 3D Fractal Generation**: Create stunning 3D fractals using IFS algorithms
- **Interactive Matrix Editor**: Intuitive interface for editing transformation matrices
- **Multiple Fractal Presets**: Pre-built configurations for famous fractals (Sierpinski, Barnsley Fern, etc.)
- **High-Quality Rendering**: Advanced volumetric rendering with customizable shaders
- **Performance Optimization**: Adaptive quality settings for smooth interaction

### User Interface
- **Modern Design**: Clean, responsive interface with dark/light mode support
- **Floating Panels**: Organized control panels that don't obstruct the 3D view
- **Multi-language Support**: Available in 9 languages (EN, VI, ZH, JA, KO, ES, FR, DE, RU)
- **Keyboard Shortcuts**: Efficient navigation and control
- **Touch Support**: Full mobile and tablet compatibility

### Export & Import
- **PNG Export**: High-resolution image export
- **PLY Export**: 3D model export for Blender, Unity, and other 3D software
- **JSON Configuration**: Save and share fractal configurations
- **Preset Library**: Extensive collection of fractal templates

### Advanced Features
- **Real-time Animation**: Smooth rotation and morphing effects
- **Camera Controls**: Multiple viewing angles and smooth transitions
- **Performance Monitoring**: Real-time performance statistics
- **Responsive Design**: Optimized for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/ifs-3d-attractor.git
   cd ifs-3d-attractor
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Basic Usage

1. **Choose a Fractal Preset**
   - Click the 🌟 Presets button
   - Select from various fractal types (Sierpinski Triangle, Barnsley Fern, etc.)
   - Click "Load Fractal" to apply the preset

2. **Generate the Fractal**
   - Click the large green ▶️ Generate button
   - Wait for the fractal to render (progress indicator will show)

3. **Explore the Fractal**
   - Use mouse to rotate, zoom, and pan
   - Try different viewing angles
   - Adjust rendering settings for optimal performance

### Advanced Features

#### Matrix Editor
- Access via the 🔢 Matrix button
- Edit transformation matrices directly
- Adjust probabilities for each transformation
- Add or remove transformation functions

#### Performance Tuning
- Use the ⚙️ Controls panel
- Adjust iteration count for performance vs quality
- Enable/disable advanced rendering features
- Monitor performance statistics

#### Export Options
- **PNG Export**: Save current view as high-resolution image
- **PLY Export**: Export 3D point cloud for external software
- **JSON Export**: Save configuration for sharing or backup

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Generate new fractal |
| `R` | Reset camera view |
| `1-6` | Switch between camera presets |
| `Esc` | Return to previous camera position |
| `F` | Toggle fullscreen |
| `H` | Toggle help panel |

## 🛠️ Technical Details

### Architecture

The application follows a modern React architecture with the following key components:

\`\`\`
src/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── attractor-canvas.tsx
│   ├── floating-panels.tsx
│   └── ...
├── types/                 # TypeScript type definitions
├── locales/               # Internationalization files
├── utils/                 # Utility functions
└── hooks/                 # Custom React hooks
\`\`\`

### Key Technologies

- **Next.js 15**: React framework with App Router
- **React Three Fiber**: React renderer for Three.js
- **Three.js**: 3D graphics library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Radix UI**: Accessible component primitives

### Performance Optimizations

- **Web Workers**: Heavy computations run in background threads
- **Adaptive Quality**: Automatic quality adjustment based on performance
- **Memory Management**: Efficient geometry and texture handling
- **Render Optimization**: Frustum culling and LOD systems

## 🌍 Internationalization

The application supports 9 languages:

- 🇺🇸 English
- 🇻🇳 Tiếng Việt (Vietnamese)
- 🇨🇳 中文 (Chinese)
- 🇯🇵 日本語 (Japanese)
- 🇰🇷 한국어 (Korean)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇩🇪 Deutsch (German)
- 🇷🇺 Русский (Russian)

Language is automatically detected from browser settings and can be manually changed via the language selector.

## 📊 Fractal Mathematics

### Iterated Function Systems (IFS)

An IFS is defined by a finite set of contraction mappings:

\`\`\`
f₁, f₂, ..., fₙ : ℝᵈ → ℝᵈ
\`\`\`

Each transformation is typically an affine transformation:

\`\`\`
fᵢ(x) = Aᵢx + bᵢ
\`\`\`

Where:
- `Aᵢ` is a 3×3 transformation matrix
- `bᵢ` is a 3D translation vector
- Each transformation has an associated probability `pᵢ`

### Supported Fractal Types

1. **Sierpinski Triangle**: Classic 2D fractal with 3 transformations
2. **Barnsley Fern**: Nature-inspired fractal with 4 transformations
3. **Dragon Curve**: Self-similar curve fractal
4. **3D Cube Fractal**: Extension to 3D space
5. **Menger Sponge**: 3D fractal with hole patterns
6. **Custom Configurations**: User-defined transformation sets

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Optional: Analytics tracking
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Error reporting
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Optional: Performance monitoring
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
\`\`\`

### Customization

#### Adding New Fractal Presets

1. Edit `components/fractal-presets.tsx`
2. Add your configuration to the `FRACTAL_PRESETS` array:

\`\`\`typescript
{
  name: "Your Fractal",
  description: "Description of your fractal",
  difficulty: "Medium",
  matrices: [
    // Your transformation matrices
  ]
}
\`\`\`

#### Custom Themes

Modify `tailwind.config.ts` to add custom color schemes:

\`\`\`typescript
theme: {
  extend: {
    colors: {
      'custom-primary': '#your-color',
      'custom-secondary': '#your-color',
    }
  }
}
\`\`\`

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Test Structure

\`\`\`
tests/
├── __mocks__/             # Mock files
├── components/            # Component tests
├── utils/                 # Utility function tests
└── integration/           # Integration tests
\`\`\`

## 📦 Building for Production

### Build Commands

\`\`\`bash
# Create production build
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
\`\`\`

### Deployment Options

#### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

#### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

#### Static Export
\`\`\`bash
# Generate static files
npm run export

# Files will be in the 'out' directory
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run the test suite**
   \`\`\`bash
   npm test
   \`\`\`
6. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
7. **Push to your branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
8. **Open a Pull Request**

### Code Style

We use ESLint and Prettier for code formatting:

\`\`\`bash
# Check code style
npm run lint

# Fix code style issues
npm run lint:fix

# Format code
npm run format
\`\`\`

### Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or auxiliary tool changes

## 🐛 Troubleshooting

### Common Issues

#### Performance Issues
- **Reduce iteration count**: Lower the number of iterations in settings
- **Disable advanced features**: Turn off Bézier surface and high-quality rendering
- **Check browser compatibility**: Ensure WebGL 2.0 support

#### Rendering Problems
- **Clear browser cache**: Force refresh with Ctrl+F5
- **Update graphics drivers**: Ensure latest GPU drivers are installed
- **Try different browsers**: Test in Chrome, Firefox, or Safari

#### Memory Issues
- **Close other tabs**: Free up browser memory
- **Reduce point count**: Lower iteration settings
- **Restart browser**: Clear memory leaks

### Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 80+ | Recommended |
| Firefox | 75+ | Good performance |
| Safari | 14+ | Limited WebGL features |
| Edge | 80+ | Good compatibility |

### Performance Tips

1. **Start with low iterations** (10,000-25,000)
2. **Use Fast Mode** for real-time interaction
3. **Enable Quality Mode** only for final renders
4. **Close unnecessary browser tabs**
5. **Use a dedicated GPU** for best performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community**: For the amazing 3D graphics library
- **React Three Fiber**: For the excellent React integration
- **Fractal Mathematics**: Inspired by the work of Benoit Mandelbrot and Michael Barnsley
- **Open Source Community**: For the countless libraries and tools that make this possible

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/ifs-3d-attractor/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ifs-3d-attractor/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ifs-3d-attractor/discussions)
- **Email**: support@ifs3d.com

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] WebGPU support for better performance
- [ ] Real-time collaboration features
- [ ] Advanced animation timeline
- [ ] VR/AR support
- [ ] Cloud rendering service

### Version 1.5 (In Progress)
- [ ] Additional fractal types
- [ ] Improved mobile experience
- [ ] Plugin system for custom fractals
- [ ] Advanced export options

---

**Made with ❤️ by the IFS 3D Attractor Team**

*Explore the infinite beauty of mathematics through interactive 3D fractals.*
