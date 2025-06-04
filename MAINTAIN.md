# Hướng Dẫn Bảo Trì / Maintenance Guide

Tài liệu này cung cấp hướng dẫn toàn diện để bảo trì và phát triển ứng dụng IFS 3D Fractal Explorer.

*This document provides comprehensive guidance for maintaining and developing the IFS 3D Fractal Explorer application.*

## 📋 Mục Lục / Table of Contents

- [Cấu Trúc Dự Án](#cấu-trúc-dự-án--project-structure)
- [Môi Trường Phát Triển](#môi-trường-phát-triển--development-environment)
- [Kiến Trúc Code](#kiến-trúc-code--code-architecture)
- [Chiến Lược Testing](#chiến-lược-testing--testing-strategy)
- [Giám Sát Hiệu Suất](#giám-sát-hiệu-suất--performance-monitoring)
- [Quy Trình Deployment](#quy-trình-deployment--deployment-process)
- [Khắc Phục Sự Cố](#khắc-phục-sự-cố--troubleshooting)
- [Bảo Mật](#bảo-mật--security-considerations)
- [Giám Sát và Phân Tích](#giám-sát-và-phân-tích--monitoring-and-analytics)

## 🏗️ Cấu Trúc Dự Án / Project Structure

### Tổng Quan Thư Mục / Directory Overview

\`\`\`
ifs-3d-fractal-explorer/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── attractor-canvas.tsx     # Main 3D canvas
│   ├── floating-panels.tsx     # UI panels
│   ├── ifs-context.tsx         # State management
│   └── ...
├── types/                       # TypeScript definitions
│   ├── ifs.ts                  # IFS-related types
│   └── i18n.ts                 # Internationalization types
├── locales/                     # Translation files
│   └── translations.ts
├── utils/                       # Utility functions
│   ├── attractor-math.ts       # Mathematical calculations
│   ├── ply-exporter.ts         # PLY export functionality
│   ├── las-exporter.ts         # LAS/LAZ export functionality
│   ├── fbx-exporter.ts         # FBX export functionality
│   └── obj-exporter.ts         # OBJ export functionality
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── tests/                       # Test files
└── docs/                        # Documentation
\`\`\`

### File Quan Trọng / Key Files and Their Purposes

| File | Mục Đích / Purpose | Ghi Chú Bảo Trì / Maintenance Notes |
|------|-------------------|-------------------------------------|
| `components/ifs-context.tsx` | Quản lý state toàn cục / Global state management | Quan trọng cho chức năng app / Critical for app functionality |
| `components/attractor-canvas.tsx` | Logic rendering 3D / 3D rendering logic | Nhạy cảm về hiệu suất / Performance-sensitive |
| `utils/attractor-math.ts` | Tính toán toán học / Mathematical calculations | Cần chuyên môn toán học / Requires mathematical expertise |
| `locales/translations.ts` | Đa ngôn ngữ / Internationalization | Cập nhật khi thêm ngôn ngữ mới / Update when adding new languages |
| `types/ifs.ts` | Định nghĩa type / Type definitions | Giữ đồng bộ với cấu trúc dữ liệu / Keep in sync with data structures |
| `utils/*-exporter.ts` | Chức năng xuất file / Export functionality | Quan trọng cho tính năng xuất / Critical for export features |

## 🛠️ Môi Trường Phát Triển / Development Environment

### Công Cụ Cần Thiết / Required Tools

\`\`\`bash
# Node.js (phiên bản LTS khuyến nghị)
node --version  # Nên là 18.0+

# Package manager
npm --version   # hoặc yarn/pnpm

# Git
git --version

# Tùy chọn: VS Code với extensions
code --list-extensions | grep -E "(typescript|react|tailwind)"
\`\`\`

### VS Code Extensions Khuyến Nghị / Recommended VS Code Extensions

\`\`\`json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
\`\`\`

### Thiết Lập Môi Trường / Environment Setup

1. **Clone và Setup**
   \`\`\`bash
   git clone <repository-url>
   cd ifs-3d-fractal-explorer
   npm install
   cp .env.example .env.local
   \`\`\`

2. **Development Scripts**
   \`\`\`bash
   npm run dev          # Khởi động development server
   npm run build        # Build cho production
   npm run start        # Khởi động production server
   npm run lint         # Chạy ESLint
   npm run type-check   # TypeScript type checking
   npm test             # Chạy tests
   npm run analyze      # Phân tích bundle size
   \`\`\`

3. **Git Hooks Setup**
   \`\`\`bash
   # Cài đặt husky cho git hooks
   npm run prepare
   \`\`\`

## 🏛️ Kiến Trúc Code / Code Architecture

### Quản Lý State / State Management

Ứng dụng sử dụng React Context cho quản lý state:

\`\`\`typescript
// Main contexts
IFSProvider     // Tạo fractal và cài đặt / Fractal generation and settings
I18nProvider    // Đa ngôn ngữ / Internationalization
ThemeProvider   // Chế độ tối/sáng / Dark/light mode
\`\`\`

### Phân Cấp Component / Component Hierarchy

\`\`\`
App
├── I18nProvider
│   ├── IFSProvider
│   │   ├── AttractorCanvas (3D rendering)
│   │   ├── FloatingPanels (UI controls)
│   │   │   ├── ControlsPanel
│   │   │   ├── MatrixEditor
│   │   │   ├── PresetPanel
│   │   │   ├── ExportDialog
│   │   │   └── HelpPanel
│   │   └── LoadingSpinner
│   └── LanguageSelector
\`\`\`

### Luồng Dữ Liệu / Data Flow

1. **Tương Tác Người Dùng** → UI Components
2. **UI Components** → Context Actions
3. **Context Actions** → State Updates
4. **State Updates** → Re-render Components
5. **Tính Toán Toán Học** → Web Workers (nếu có)

### Cân Nhắc Hiệu Suất / Performance Considerations

#### Khu Vực Hiệu Suất Quan Trọng / Critical Performance Areas

1. **3D Rendering**
   - Sử dụng `useMemo` cho tính toán đắt đỏ
   - Implement cleanup đúng cách trong `useEffect`
   - Giám sát frame rates và điều chỉnh chất lượng

2. **State Updates**
   - Batch state updates khi có thể
   - Sử dụng `useCallback` cho event handlers
   - Implement dependency arrays đúng cách

3. **Quản Lý Bộ Nhớ / Memory Management**
   - Dispose Three.js objects đúng cách
   - Clear intervals và timeouts
   - Remove event listeners trong cleanup

#### Ví Dụ Code: Three.js Cleanup Đúng Cách

\`\`\`typescript
useEffect(() => {
  const geometry = new THREE.BufferGeometry()
  const material = new THREE.PointsMaterial()
  
  return () => {
    // Cleanup
    geometry.dispose()
    material.dispose()
  }
}, [])
\`\`\`

## 🧪 Chiến Lược Testing / Testing Strategy

### Cấu Trúc Test / Test Structure

\`\`\`
tests/
├── __mocks__/                   # Mock files
│   ├── three.js                # Three.js mocks
│   └── canvas.js               # Canvas API mocks
├── components/                  # Component tests
│   ├── attractor-canvas.test.tsx
│   ├── floating-panels.test.tsx
│   └── export-dialog.test.tsx
├── utils/                       # Utility tests
│   ├── attractor-math.test.ts
│   ├── ply-exporter.test.ts
│   ├── las-exporter.test.ts
│   └── fbx-exporter.test.ts
├── integration/                 # Integration tests
│   └── fractal-generation.test.ts
└── e2e/                        # End-to-end tests
    └── user-workflows.test.ts
\`\`\`

### Hướng Dẫn Testing / Testing Guidelines

#### Unit Tests
\`\`\`typescript
// Ví dụ: Testing mathematical functions
describe('generateSierpinski', () => {
  it('should generate correct number of points', () => {
    const params = { iterations: 1000, matrices: [...] }
    const points = generateSierpinski(params)
    expect(points).toHaveLength(1000)
  })
  
  it('should handle edge cases', () => {
    const params = { iterations: 0, matrices: [] }
    const points = generateSierpinski(params)
    expect(points).toBeDefined()
  })
})
\`\`\`

#### Component Tests
\`\`\`typescript
// Ví dụ: Testing React components
describe('FloatingPanels', () => {
  it('should render all panel buttons', () => {
    render(<FloatingPanels />)
    expect(screen.getByRole('button', { name: /presets/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /controls/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument()
  })
})
\`\`\`

#### Integration Tests
\`\`\`typescript
// Ví dụ: Testing complete workflows
describe('Fractal Generation Workflow', () => {
  it('should generate fractal from preset', async () => {
    const { user } = setup(<App />)
    
    await user.click(screen.getByRole('button', { name: /presets/i }))
    await user.click(screen.getByText('Sierpinski Triangle'))
    await user.click(screen.getByRole('button', { name: /generate/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/generating/i)).toBeInTheDocument()
    })
  })
})
\`\`\`

### Chạy Tests / Running Tests

\`\`\`bash
# Chạy tất cả tests
npm test

# Chạy tests ở chế độ watch
npm run test:watch

# Chạy tests với coverage
npm run test:coverage

# Chạy test file cụ thể
npm test -- attractor-math.test.ts

# Chạy tests matching pattern
npm test -- --testNamePattern="should generate"
\`\`\`

### Mục Tiêu Test Coverage / Test Coverage Goals

- **Unit Tests**: 90%+ coverage cho utility functions
- **Component Tests**: 80%+ coverage cho UI components
- **Integration Tests**: Cover tất cả major user workflows
- **E2E Tests**: Cover critical user journeys

## 📊 Giám Sát Hiệu Suất / Performance Monitoring

### Metrics Quan Trọng / Key Metrics to Monitor

1. **Hiệu Suất Rendering / Rendering Performance**
   - Frame rate (mục tiêu: 60 FPS)
   - Render time per frame
   - Memory usage
   - GPU utilization

2. **Hiệu Suất Ứng Dụng / Application Performance**
   - Bundle size
   - Load time
   - Time to interactive
   - Core Web Vitals

3. **Trải Nghiệm Người Dùng / User Experience**
   - Error rates
   - User engagement
   - Feature usage
   - Performance across devices

### Công Cụ Giám Sát / Performance Monitoring Tools

#### Giám Sát Tích Hợp / Built-in Monitoring

\`\`\`typescript
// Performance monitoring utility
class PerformanceMonitor {
  private frameCount = 0
  private lastTime = performance.now()
  
  measureFrameRate() {
    const now = performance.now()
    this.frameCount++
    
    if (now - this.lastTime >= 1000) {
      const fps = this.frameCount
      console.log(`FPS: ${fps}`)
      this.frameCount = 0
      this.lastTime = now
    }
  }
  
  measureMemory() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      console.log({
        used: Math.round(memory.usedJSHeapSize / 1048576),
        total: Math.round(memory.totalJSHeapSize / 1048576),
        limit: Math.round(memory.jsHeapSizeLimit / 1048576)
      })
    }
  }
  
  measureExportPerformance(format: string, pointCount: number) {
    const startTime = performance.now()
    return {
      end: () => {
        const duration = performance.now() - startTime
        console.log(`Export ${format} (${pointCount} points): ${duration.toFixed(2)}ms`)
      }
    }
  }
}
\`\`\`

#### Công Cụ Bên Ngoài / External Tools

1. **Lighthouse**: Web performance auditing
2. **Chrome DevTools**: Detailed performance profiling
3. **Sentry**: Error tracking và performance monitoring
4. **Google Analytics**: User behavior tracking

### Checklist Tối Ưu Hiệu Suất / Performance Optimization Checklist

- [ ] Bundle size analysis với `npm run analyze`
- [ ] Image optimization và lazy loading
- [ ] Code splitting cho large components
- [ ] Service worker cho caching
- [ ] CDN cho static assets
- [ ] Gzip/Brotli compression
- [ ] Tree shaking cho unused code
- [ ] Proper memoization của expensive calculations
- [ ] Optimize export functions cho large datasets

## 🚀 Quy Trình Deployment / Deployment Process

### Checklist Trước Deployment / Pre-deployment Checklist

\`\`\`bash
# 1. Chạy tất cả tests
npm test

# 2. Type checking
npm run type-check

# 3. Linting
npm run lint

# 4. Build verification
npm run build

# 5. Bundle analysis
npm run analyze

# 6. Security audit
npm audit

# 7. Dependency check
npm outdated

# 8. Test export functionality
npm run test:exports
\`\`\`

### Môi Trường Deployment / Deployment Environments

#### Development
- **URL**: `https://dev-ifs3d-explorer.vercel.app`
- **Branch**: `develop`
- **Auto-deploy**: On push to develop
- **Features**: Debug mode, verbose logging

#### Staging
- **URL**: `https://staging-ifs3d-explorer.vercel.app`
- **Branch**: `staging`
- **Auto-deploy**: On push to staging
- **Features**: Production-like environment, testing

#### Production
- **URL**: `https://ifs3d-explorer.com`
- **Branch**: `main`
- **Auto-deploy**: On push to main (with approval)
- **Features**: Optimized build, monitoring

### Deployment Scripts

\`\`\`bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production

# Rollback deployment
npm run rollback

# Health check
npm run health-check
\`\`\`

### Environment Variables

\`\`\`bash
# Production environment variables
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_URL=https://api.ifs3d-explorer.com
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_VERSION=1.0.0
\`\`\`

## 🔧 Khắc Phục Sự Cố / Troubleshooting

### Vấn Đề Thường Gặp / Common Issues and Solutions

#### Build Issues

**Vấn Đề**: TypeScript compilation errors
\`\`\`bash
# Giải pháp: Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
npm run type-check
\`\`\`

**Vấn Đề**: Memory issues during build
\`\`\`bash
# Giải pháp: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

#### Runtime Issues

**Vấn Đề**: Three.js WebGL context lost
\`\`\`typescript
// Giải pháp: Handle context restoration
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault()
  console.log('WebGL context lost')
})

canvas.addEventListener('webglcontextrestored', () => {
  console.log('WebGL context restored')
  // Reinitialize renderer
})
\`\`\`

**Vấn Đề**: Memory leaks in 3D rendering
\`\`\`typescript
// Giải pháp: Proper cleanup
useEffect(() => {
  return () => {
    // Dispose geometries
    geometry.dispose()
    
    // Dispose materials
    material.dispose()
    
    // Dispose textures
    texture.dispose()
    
    // Remove from scene
    scene.remove(mesh)
  }
}, [])
\`\`\`

#### Export Issues

**Vấn Đề**: Large file export failures
\`\`\`typescript
// Giải pháp: Implement chunked export
const exportInChunks = async (points: Point[], chunkSize = 100000) => {
  const chunks = []
  for (let i = 0; i < points.length; i += chunkSize) {
    chunks.push(points.slice(i, i + chunkSize))
  }
  
  // Process chunks with delays to prevent blocking
  for (const chunk of chunks) {
    await processChunk(chunk)
    await new Promise(resolve => setTimeout(resolve, 10))
  }
}
\`\`\`

### Debug Tools

#### Development Tools

\`\`\`typescript
// Debug utility cho development
const DEBUG = process.env.NODE_ENV === 'development'

export const debug = {
  log: (...args: any[]) => DEBUG && console.log(...args),
  warn: (...args: any[]) => DEBUG && console.warn(...args),
  error: (...args: any[]) => DEBUG && console.error(...args),
  time: (label: string) => DEBUG && console.time(label),
  timeEnd: (label: string) => DEBUG && console.timeEnd(label),
  export: (format: string, size: number) => DEBUG && console.log(`Export ${format}: ${size} points`)
}
\`\`\`

## 🔒 Bảo Mật / Security Considerations

### Security Checklist

- [ ] **Input Validation**: Sanitize tất cả user inputs
- [ ] **XSS Prevention**: Sử dụng proper escaping cho dynamic content
- [ ] **File Upload Security**: Validate file types và sizes
- [ ] **Content Security Policy**: Configure CSP headers
- [ ] **Dependency Security**: Regular security audits
- [ ] **Environment Variables**: Secure sensitive configuration
- [ ] **HTTPS**: Enforce HTTPS trong production
- [ ] **Error Handling**: Không expose sensitive information

### Security Monitoring

\`\`\`typescript
// Security event logging
export const securityLogger = {
  logSuspiciousActivity(event: string, details: any) {
    console.warn('Security Event:', { event, details, timestamp: new Date().toISOString() })
    // Send to security monitoring service
  },
  
  logFileExport(format: string, size: number, userId?: string) {
    console.info('File Export:', { format, size, userId, timestamp: new Date().toISOString() })
  },
  
  logLargeExport(format: string, pointCount: number) {
    if (pointCount > 1000000) {
      console.warn('Large Export Detected:', { format, pointCount })
    }
  }
}
\`\`\`

## 📈 Giám Sát và Phân Tích / Monitoring and Analytics

### Analytics Implementation

\`\`\`typescript
// Analytics utility
export const analytics = {
  track(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties)
    }
  },
  
  trackExport(format: string, pointCount: number, fileSize: number) {
    this.track('file_export', {
      format,
      point_count: pointCount,
      file_size: fileSize
    })
  },
  
  trackFractalGeneration(type: string, iterations: number, duration: number) {
    this.track('fractal_generation', {
      fractal_type: type,
      iterations,
      generation_time: duration
    })
  }
}
\`\`\`

### Key Metrics để Track

1. **User Engagement**
   - Session duration
   - Fractal generations per session
   - Export usage by format
   - Feature adoption rates

2. **Performance Metrics**
   - Generation time by fractal type
   - Export time by format and size
   - Memory usage patterns
   - Error rates

3. **Educational Metrics**
   - Preset usage patterns
   - Help panel interactions
   - Language preferences
   - User retention

## 📝 Lịch Trình Bảo Trì / Maintenance Schedule

### Nhiệm Vụ Hàng Ngày / Daily Tasks
- [ ] Monitor error rates và performance
- [ ] Review user feedback
- [ ] Check deployment status
- [ ] Monitor export success rates

### Nhiệm Vụ Hàng Tuần / Weekly Tasks
- [ ] Dependency updates (non-breaking)
- [ ] Performance analysis
- [ ] Security scan
- [ ] Backup verification
- [ ] Export functionality testing

### Nhiệm Vụ Hàng Tháng / Monthly Tasks
- [ ] Major dependency updates
- [ ] Performance optimization review
- [ ] Security audit
- [ ] User analytics review
- [ ] Documentation updates

### Nhiệm Vụ Hàng Quý / Quarterly Tasks
- [ ] Architecture review
- [ ] Technology stack evaluation
- [ ] Comprehensive testing
- [ ] Export format compatibility check
- [ ] Educational content review

### Nhiệm Vụ Hàng Năm / Annual Tasks
- [ ] Major version upgrades
- [ ] Security penetration testing
- [ ] Performance benchmarking
- [ ] Technology roadmap planning
- [ ] User survey và feedback collection

## 🆘 Quy Trình Khẩn Cấp / Emergency Procedures

### Incident Response

1. **Phản Ứng Ngay Lập Tức** (0-15 phút)
   - Đánh giá mức độ nghiêm trọng
   - Implement hotfix nếu có
   - Thông báo stakeholders

2. **Phản Ứng Ngắn Hạn** (15 phút - 2 giờ)
   - Điều tra root cause
   - Implement temporary solution
   - Monitor system stability

3. **Phản Ứng Dài Hạn** (2+ giờ)
   - Develop permanent fix
   - Test thoroughly
   - Deploy và monitor

### Rollback Procedures

\`\`\`bash
# Quick rollback to previous version
vercel --prod --force

# Clear CDN cache
npm run cache:clear

# Notify users of temporary service disruption
npm run notify:maintenance
\`\`\`

### Communication Templates

#### Thông Báo Sự Cố / Incident Notification
\`\`\`
🚨 CẢNH BÁO SỰ CỐ / INCIDENT ALERT
Mức độ / Severity: [HIGH/MEDIUM/LOW]
Dịch vụ / Service: IFS 3D Fractal Explorer
Vấn đề / Issue: [Mô tả ngắn gọn]
Tác động / Impact: [Mô tả tác động người dùng]
ETA: [Thời gian dự kiến giải quyết]
Cập nhật / Updates: [Status page URL]
\`\`\`

#### Thông Báo Giải Quyết / Resolution Notification
\`\`\`
✅ SỰ CỐ ĐÃ ĐƯỢC GIẢI QUYẾT / INCIDENT RESOLVED
Dịch vụ / Service: IFS 3D Fractal Explorer
Vấn đề / Issue: [Mô tả ngắn gọn]
Giải pháp / Resolution: [Những gì đã được sửa]
Thời gian / Duration: [Tổng thời gian downtime]
Bước tiếp theo / Next Steps: [Biện pháp phòng ngừa]
\`\`\`

## 🎓 Hướng Dẫn Cho Nhà Phát Triển Mới / Guide for New Developers

### Onboarding Checklist

- [ ] Setup development environment
- [ ] Read codebase documentation
- [ ] Understand fractal mathematics basics
- [ ] Review export format specifications
- [ ] Complete first bug fix or feature
- [ ] Pair programming session với senior developer

### Tài Nguyên Học Tập / Learning Resources

#### Fractal Mathematics
- "The Fractal Geometry of Nature" - Benoit Mandelbrot
- "Fractals Everywhere" - Michael Barnsley
- Online courses về fractal geometry

#### Technical Skills
- Three.js documentation
- React Three Fiber tutorials
- WebGL fundamentals
- File format specifications (PLY, LAS, FBX, OBJ)

#### Code Style Guide

\`\`\`typescript
// Naming conventions
const fractalPoints = []        // camelCase for variables
const SIERPINSKI_PRESET = {}   // UPPER_CASE for constants
interface FractalConfig {}     // PascalCase for types

// Function documentation
/**
 * Generates IFS fractal points
 * @param config - Fractal configuration
 * @param iterations - Number of iterations
 * @returns Array of 3D points
 */
function generateFractal(config: FractalConfig, iterations: number): Point3D[] {
  // Implementation
}

// Error handling
try {
  const result = await exportToLAS(points)
  return result
} catch (error) {
  console.error('Export failed:', error)
  throw new Error(`LAS export failed: ${error.message}`)
}
\`\`\`

---

Hướng dẫn bảo trì này nên được review và cập nhật hàng quý để đảm bảo nó luôn phù hợp với codebase và infrastructure đang phát triển.

*This maintenance guide should be reviewed and updated quarterly to ensure it remains current with the evolving codebase and infrastructure.*

**Cập Nhật Lần Cuối / Last Updated**: [Current Date]
**Review Tiếp Theo / Next Review**: [Date + 3 months]

**Được tạo bởi / Created by**: Nguyễn Ngọc Phúc và Mai Thế Duy
**Cho / For**: Cộng đồng nghiên cứu fractal / Fractal research community
