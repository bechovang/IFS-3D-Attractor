# Maintenance Guide

This document provides comprehensive guidance for maintaining and developing the IFS 3D Attractor application.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Development Environment](#development-environment)
- [Code Architecture](#code-architecture)
- [Testing Strategy](#testing-strategy)
- [Performance Monitoring](#performance-monitoring)
- [Deployment Process](#deployment-process)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)
- [Monitoring and Analytics](#monitoring-and-analytics)

## 🏗️ Project Structure

### Directory Overview

\`\`\`
ifs-3d-attractor/
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
│   └── ply-exporter.ts         # Export functionality
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── tests/                       # Test files
└── docs/                        # Documentation
\`\`\`

### Key Files and Their Purposes

| File | Purpose | Maintenance Notes |
|------|---------|-------------------|
| `components/ifs-context.tsx` | Global state management | Critical for app functionality |
| `components/attractor-canvas.tsx` | 3D rendering logic | Performance-sensitive |
| `utils/attractor-math.ts` | Mathematical calculations | Requires mathematical expertise |
| `locales/translations.ts` | Internationalization | Update when adding new languages |
| `types/ifs.ts` | Type definitions | Keep in sync with data structures |

## 🛠️ Development Environment

### Required Tools

\`\`\`bash
# Node.js (LTS version recommended)
node --version  # Should be 18.0+

# Package manager
npm --version   # or yarn/pnpm

# Git
git --version

# Optional: VS Code with extensions
code --list-extensions | grep -E "(typescript|react|tailwind)"
\`\`\`

### Recommended VS Code Extensions

\`\`\`json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
\`\`\`

### Environment Setup

1. **Clone and Setup**
   \`\`\`bash
   git clone <repository-url>
   cd ifs-3d-attractor
   npm install
   cp .env.example .env.local
   \`\`\`

2. **Development Scripts**
   \`\`\`bash
   npm run dev          # Start development server
   npm run build        # Build for production
   npm run start        # Start production server
   npm run lint         # Run ESLint
   npm run type-check   # TypeScript type checking
   npm test             # Run tests
   \`\`\`

3. **Git Hooks Setup**
   \`\`\`bash
   # Install husky for git hooks
   npm run prepare
   \`\`\`

## 🏛️ Code Architecture

### State Management

The application uses React Context for state management:

\`\`\`typescript
// Main contexts
IFSProvider     // Fractal generation and settings
I18nProvider    // Internationalization
ThemeProvider   // Dark/light mode
\`\`\`

### Component Hierarchy

\`\`\`
App
├── I18nProvider
│   ├── IFSProvider
│   │   ├── AttractorCanvas (3D rendering)
│   │   ├── FloatingPanels (UI controls)
│   │   │   ├── ControlsPanel
│   │   │   ├── MatrixEditor
│   │   │   ├── PresetPanel
│   │   │   └── HelpPanel
│   │   └── LoadingSpinner
│   └── LanguageSelector
\`\`\`

### Data Flow

1. **User Interaction** → UI Components
2. **UI Components** → Context Actions
3. **Context Actions** → State Updates
4. **State Updates** → Re-render Components
5. **Mathematical Calculations** → Web Workers (if applicable)

### Performance Considerations

#### Critical Performance Areas

1. **3D Rendering**
   - Use `useMemo` for expensive calculations
   - Implement proper cleanup in `useEffect`
   - Monitor frame rates and adjust quality

2. **State Updates**
   - Batch state updates when possible
   - Use `useCallback` for event handlers
   - Implement proper dependency arrays

3. **Memory Management**
   - Dispose of Three.js objects properly
   - Clear intervals and timeouts
   - Remove event listeners in cleanup

#### Code Example: Proper Three.js Cleanup

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

## 🧪 Testing Strategy

### Test Structure

\`\`\`
tests/
├── __mocks__/                   # Mock files
│   ├── three.js                # Three.js mocks
│   └── canvas.js               # Canvas API mocks
├── components/                  # Component tests
│   ├── attractor-canvas.test.tsx
│   └── floating-panels.test.tsx
├── utils/                       # Utility tests
│   ├── attractor-math.test.ts
│   └── ply-exporter.test.ts
├── integration/                 # Integration tests
│   └── fractal-generation.test.ts
└── e2e/                        # End-to-end tests
    └── user-workflows.test.ts
\`\`\`

### Testing Guidelines

#### Unit Tests
\`\`\`typescript
// Example: Testing mathematical functions
describe('generateLorenz', () => {
  it('should generate correct number of points', () => {
    const params = { sigma: 10, rho: 28, beta: 8/3, steps: 1000, dt: 0.01 }
    const points = generateLorenz(params)
    expect(points).toHaveLength(1000)
  })
  
  it('should handle edge cases', () => {
    const params = { sigma: 0, rho: 0, beta: 0, steps: 10, dt: 0.01 }
    const points = generateLorenz(params)
    expect(points).toBeDefined()
  })
})
\`\`\`

#### Component Tests
\`\`\`typescript
// Example: Testing React components
describe('FloatingPanels', () => {
  it('should render all panel buttons', () => {
    render(<FloatingPanels />)
    expect(screen.getByRole('button', { name: /presets/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /controls/i })).toBeInTheDocument()
  })
})
\`\`\`

#### Integration Tests
\`\`\`typescript
// Example: Testing complete workflows
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

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- attractor-math.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should generate"
\`\`\`

### Test Coverage Goals

- **Unit Tests**: 90%+ coverage for utility functions
- **Component Tests**: 80%+ coverage for UI components
- **Integration Tests**: Cover all major user workflows
- **E2E Tests**: Cover critical user journeys

## 📊 Performance Monitoring

### Key Metrics to Monitor

1. **Rendering Performance**
   - Frame rate (target: 60 FPS)
   - Render time per frame
   - Memory usage
   - GPU utilization

2. **Application Performance**
   - Bundle size
   - Load time
   - Time to interactive
   - Core Web Vitals

3. **User Experience**
   - Error rates
   - User engagement
   - Feature usage
   - Performance across devices

### Performance Monitoring Tools

#### Built-in Monitoring

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
}
\`\`\`

#### External Tools

1. **Lighthouse**: Web performance auditing
2. **Chrome DevTools**: Detailed performance profiling
3. **Sentry**: Error tracking and performance monitoring
4. **Google Analytics**: User behavior tracking

### Performance Optimization Checklist

- [ ] Bundle size analysis with `npm run analyze`
- [ ] Image optimization and lazy loading
- [ ] Code splitting for large components
- [ ] Service worker for caching
- [ ] CDN for static assets
- [ ] Gzip/Brotli compression
- [ ] Tree shaking for unused code
- [ ] Proper memoization of expensive calculations

## 🚀 Deployment Process

### Pre-deployment Checklist

\`\`\`bash
# 1. Run all tests
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
\`\`\`

### Deployment Environments

#### Development
- **URL**: `https://dev-ifs3d.vercel.app`
- **Branch**: `develop`
- **Auto-deploy**: On push to develop
- **Features**: Debug mode, verbose logging

#### Staging
- **URL**: `https://staging-ifs3d.vercel.app`
- **Branch**: `staging`
- **Auto-deploy**: On push to staging
- **Features**: Production-like environment, testing

#### Production
- **URL**: `https://ifs3d.com`
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
NEXT_PUBLIC_API_URL=https://api.ifs3d.com
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_GA_ID=your_ga_id
\`\`\`

### Monitoring Deployment

1. **Health Checks**: Automated endpoint monitoring
2. **Error Tracking**: Real-time error notifications
3. **Performance Monitoring**: Core Web Vitals tracking
4. **User Feedback**: In-app feedback collection

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Build Issues

**Problem**: TypeScript compilation errors
\`\`\`bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run type-check
\`\`\`

**Problem**: Memory issues during build
\`\`\`bash
# Solution: Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

#### Runtime Issues

**Problem**: Three.js WebGL context lost
\`\`\`typescript
// Solution: Handle context restoration
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault()
  console.log('WebGL context lost')
})

canvas.addEventListener('webglcontextrestored', () => {
  console.log('WebGL context restored')
  // Reinitialize renderer
})
\`\`\`

**Problem**: Memory leaks in 3D rendering
\`\`\`typescript
// Solution: Proper cleanup
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

#### Performance Issues

**Problem**: Low frame rate
- Reduce iteration count
- Disable advanced rendering features
- Check for memory leaks
- Profile with Chrome DevTools

**Problem**: High memory usage
- Implement object pooling
- Dispose unused resources
- Optimize texture sizes
- Use efficient data structures

### Debug Tools

#### Development Tools

\`\`\`typescript
// Debug utility for development
const DEBUG = process.env.NODE_ENV === 'development'

export const debug = {
  log: (...args: any[]) => DEBUG && console.log(...args),
  warn: (...args: any[]) => DEBUG && console.warn(...args),
  error: (...args: any[]) => DEBUG && console.error(...args),
  time: (label: string) => DEBUG && console.time(label),
  timeEnd: (label: string) => DEBUG && console.timeEnd(label)
}
\`\`\`

#### Performance Profiling

\`\`\`typescript
// Performance profiler
export class Profiler {
  private marks = new Map<string, number>()
  
  start(name: string) {
    this.marks.set(name, performance.now())
  }
  
  end(name: string) {
    const start = this.marks.get(name)
    if (start) {
      const duration = performance.now() - start
      console.log(`${name}: ${duration.toFixed(2)}ms`)
      this.marks.delete(name)
    }
  }
}
\`\`\`

### Logging Strategy

#### Log Levels

1. **ERROR**: Critical issues requiring immediate attention
2. **WARN**: Potential issues that should be monitored
3. **INFO**: General application flow information
4. **DEBUG**: Detailed information for debugging

#### Log Format

\`\`\`typescript
interface LogEntry {
  timestamp: string
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
  message: string
  context?: Record<string, any>
  userId?: string
  sessionId?: string
}
\`\`\`

## 🔒 Security Considerations

### Security Checklist

- [ ] **Input Validation**: Sanitize all user inputs
- [ ] **XSS Prevention**: Use proper escaping for dynamic content
- [ ] **CSRF Protection**: Implement CSRF tokens for forms
- [ ] **Content Security Policy**: Configure CSP headers
- [ ] **Dependency Security**: Regular security audits
- [ ] **Environment Variables**: Secure sensitive configuration
- [ ] **HTTPS**: Enforce HTTPS in production
- [ ] **Error Handling**: Don't expose sensitive information

### Security Monitoring

\`\`\`typescript
// Security event logging
export const securityLogger = {
  logSuspiciousActivity(event: string, details: any) {
    console.warn('Security Event:', { event, details, timestamp: new Date().toISOString() })
    // Send to security monitoring service
  },
  
  logAuthEvent(type: 'login' | 'logout' | 'failed_login', userId?: string) {
    console.info('Auth Event:', { type, userId, timestamp: new Date().toISOString() })
  }
}
\`\`\`

### Regular Security Tasks

1. **Weekly**: Dependency vulnerability scan
2. **Monthly**: Security audit of new features
3. **Quarterly**: Penetration testing
4. **Annually**: Comprehensive security review

## 📈 Monitoring and Analytics

### Analytics Implementation

\`\`\`typescript
// Analytics utility
export const analytics = {
  track(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties)
    }
  },
  
  page(path: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path
      })
    }
  }
}
\`\`\`

### Key Metrics to Track

1. **User Engagement**
   - Session duration
   - Pages per session
   - Bounce rate
   - Feature usage

2. **Performance Metrics**
   - Page load time
   - Time to interactive
   - Core Web Vitals
   - Error rates

3. **Business Metrics**
   - User retention
   - Feature adoption
   - Export usage
   - User feedback

### Monitoring Dashboard

Create a monitoring dashboard that includes:

- Real-time error rates
- Performance metrics
- User activity
- System health
- Deployment status

## 📝 Maintenance Schedule

### Daily Tasks
- [ ] Monitor error rates and performance
- [ ] Review user feedback
- [ ] Check deployment status

### Weekly Tasks
- [ ] Dependency updates (non-breaking)
- [ ] Performance analysis
- [ ] Security scan
- [ ] Backup verification

### Monthly Tasks
- [ ] Major dependency updates
- [ ] Performance optimization review
- [ ] Security audit
- [ ] User analytics review

### Quarterly Tasks
- [ ] Architecture review
- [ ] Technology stack evaluation
- [ ] Comprehensive testing
- [ ] Documentation updates

### Annual Tasks
- [ ] Major version upgrades
- [ ] Security penetration testing
- [ ] Performance benchmarking
- [ ] Technology roadmap planning

## 🆘 Emergency Procedures

### Incident Response

1. **Immediate Response** (0-15 minutes)
   - Assess severity
   - Implement hotfix if available
   - Notify stakeholders

2. **Short-term Response** (15 minutes - 2 hours)
   - Investigate root cause
   - Implement temporary solution
   - Monitor system stability

3. **Long-term Response** (2+ hours)
   - Develop permanent fix
   - Test thoroughly
   - Deploy and monitor

### Rollback Procedures

\`\`\`bash
# Quick rollback to previous version
vercel --prod --force

# Database rollback (if applicable)
npm run db:rollback

# Clear CDN cache
npm run cache:clear
\`\`\`

### Communication Templates

#### Incident Notification
\`\`\`
🚨 INCIDENT ALERT
Severity: [HIGH/MEDIUM/LOW]
Service: IFS 3D Attractor
Issue: [Brief description]
Impact: [User impact description]
ETA: [Estimated resolution time]
Updates: [Status page URL]
\`\`\`

#### Resolution Notification
\`\`\`
✅ INCIDENT RESOLVED
Service: IFS 3D Attractor
Issue: [Brief description]
Resolution: [What was fixed]
Duration: [Total downtime]
Next Steps: [Prevention measures]
\`\`\`

---

This maintenance guide should be reviewed and updated quarterly to ensure it remains current with the evolving codebase and infrastructure.

**Last Updated**: [Current Date]
**Next Review**: [Date + 3 months]
