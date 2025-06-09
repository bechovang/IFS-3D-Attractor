dùng web nào tạo cloud point rồi lên app này coi https://github.com/potree/PotreeDesktop

# IFS 3D Fractal Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-green)](https://threejs.org/)

Một ứng dụng web tương tác mạnh mẽ để tạo và khám phá các fractal 3D sử dụng Hệ thống Hàm Lặp (IFS). Được xây dựng với Next.js, React Three Fiber và các công nghệ web hiện đại, phục vụ cho sinh viên và nhà nghiên cứu trong lĩnh vực toán học fractal.

*A powerful, interactive web application for creating and exploring 3D fractals using Iterated Function Systems (IFS). Built with Next.js, React Three Fiber, and modern web technologies for students and researchers in fractal mathematics.*

![IFS 3D Fractal Explorer Screenshot](/placeholder.svg?height=400&width=800&text=IFS+3D+Fractal+Explorer)

## 👥 Nhóm Phát Triển / Development Team

**Được phát triển bởi / Developed by:**
- **Nguyễn Ngọc Phúc** - Lead Developer & Fractal Mathematics Specialist
- **Mai Thế Duy** - UI/UX Designer & Frontend Developer

**Dành cho / Target Audience:**
- 🎓 Sinh viên toán học và khoa học máy tính
- 🔬 Nhà nghiên cứu fractal và hình học
- 👨‍🏫 Giảng viên và giáo viên toán học
- 🎨 Nghệ sĩ kỹ thuật số và thiết kế

## 🌟 Tính Năng Chính / Key Features

### 🔬 Tính Năng Nghiên Cứu / Research Features
- **Tạo Fractal Thời Gian Thực**: Sinh fractal 3D sử dụng thuật toán IFS
- **Trình Chỉnh Sửa Ma Trận Tương Tác**: Giao diện trực quan để chỉnh sửa ma trận biến đổi
- **Thư Viện Fractal Có Sẵn**: Cấu hình sẵn cho các fractal nổi tiếng (Sierpinski, Barnsley Fern, v.v.)
- **Kết Xuất Chất Lượng Cao**: Rendering volumetric với shader tùy chỉnh
- **Tối Ưu Hóa Hiệu Suất**: Cài đặt chất lượng thích ứng cho tương tác mượt mà

### 📚 Tính Năng Giáo Dục / Educational Features
- **Hiển Thị Công Thức Toán Học**: Xem công thức IFS và ma trận biến đổi
- **Hướng Dẫn Tương Tác**: Hệ thống trợ giúp tích hợp
- **Nhiều Ngôn Ngữ**: Hỗ trợ 9 ngôn ngữ bao gồm Tiếng Việt
- **Chế Độ Giảng Dạy**: Giao diện tối ưu cho việc trình bày

### 🎨 Giao Diện Người Dùng / User Interface
- **Thiết Kế Hiện Đại**: Giao diện sạch, responsive với hỗ trợ chế độ tối/sáng
- **Panel Nổi**: Bảng điều khiển có tổ chức không che khuất view 3D
- **Phím Tắt**: Điều hướng và điều khiển hiệu quả
- **Hỗ Trợ Cảm Ứng**: Tương thích đầy đủ với mobile và tablet

### 📤 Xuất & Nhập / Export & Import
- **Xuất PNG**: Xuất hình ảnh độ phân giải cao
- **Xuất PLY**: Xuất mô hình 3D cho Blender, Unity và phần mềm 3D khác
- **Xuất LAS/LAZ**: Định dạng LiDAR cho phân tích GIS và point cloud
- **Xuất FBX/OBJ**: Định dạng 3D phổ biến cho animation và modeling
- **Cấu Hình JSON**: Lưu và chia sẻ cấu hình fractal
- **Thư Viện Preset**: Bộ sưu tập mẫu fractal phong phú

### 🔬 Tính Năng Nâng Cao / Advanced Features
- **Animation Thời Gian Thực**: Hiệu ứng xoay và biến đổi mượt mà
- **Điều Khiển Camera**: Nhiều góc nhìn và chuyển tiếp mượt mà
- **Giám Sát Hiệu Suất**: Thống kê hiệu suất thời gian thực
- **Thiết Kế Responsive**: Tối ưu cho mọi kích thước màn hình

## 🚀 Bắt Đầu Nhanh / Quick Start

### Yêu Cầu Hệ Thống / Prerequisites
- Node.js 18.0 hoặc cao hơn
- npm, yarn, hoặc pnpm package manager
- Trình duyệt hỗ trợ WebGL 2.0

### Cài Đặt / Installation

1. **Clone repository**
   \`\`\`bash
   git clone https://github.com/your-username/ifs-3d-fractal-explorer.git
   cd ifs-3d-fractal-explorer
   \`\`\`

2. **Cài đặt dependencies**
   \`\`\`bash
   npm install
   # hoặc
   yarn install
   # hoặc
   pnpm install
   \`\`\`

3. **Khởi động development server**
   \`\`\`bash
   npm run dev
   # hoặc
   yarn dev
   # hoặc
   pnpm dev
   \`\`\`

4. **Mở trình duyệt**
   Truy cập [http://localhost:3000](http://localhost:3000)

## 📖 Hướng Dẫn Sử Dụng / Usage Guide

### Sử Dụng Cơ Bản / Basic Usage

1. **Chọn Fractal Preset**
   - Nhấp nút 🌟 Presets
   - Chọn từ các loại fractal khác nhau (Sierpinski Triangle, Barnsley Fern, v.v.)
   - Nhấp "Load Fractal" để áp dụng preset

2. **Tạo Fractal**
   - Nhấp nút ▶️ Generate lớn màu xanh
   - Chờ fractal render (thanh tiến trình sẽ hiển thị)

3. **Khám Phá Fractal**
   - Sử dụng chuột để xoay, zoom và pan
   - Thử các góc nhìn khác nhau
   - Điều chỉnh cài đặt rendering để tối ưu hiệu suất

### Tính Năng Nâng Cao / Advanced Features

#### Trình Chỉnh Sửa Ma Trận / Matrix Editor
- Truy cập qua nút 🔢 Matrix
- Chỉnh sửa ma trận biến đổi trực tiếp
- Điều chỉnh xác suất cho mỗi biến đổi
- Thêm hoặc xóa hàm biến đổi

#### Tối Ưu Hiệu Suất / Performance Tuning
- Sử dụng panel ⚙️ Controls
- Điều chỉnh số lần lặp cho cân bằng hiệu suất vs chất lượng
- Bật/tắt tính năng rendering nâng cao
- Giám sát thống kê hiệu suất

#### Tùy Chọn Xuất / Export Options
- **Xuất PNG**: Lưu view hiện tại dưới dạng hình ảnh độ phân giải cao
- **Xuất PLY**: Xuất point cloud 3D cho phần mềm bên ngoài
- **Xuất LAS/LAZ**: Định dạng LiDAR cho phân tích GIS
- **Xuất FBX/OBJ**: Định dạng 3D cho animation và modeling
- **Xuất JSON**: Lưu cấu hình để chia sẻ hoặc backup

### Phím Tắt / Keyboard Shortcuts

| Phím / Key | Hành Động / Action |
|------------|-------------------|
| `Space` | Tạo fractal mới / Generate new fractal |
| `R` | Reset camera view |
| `1-6` | Chuyển đổi giữa các preset camera |
| `Esc` | Quay về vị trí camera trước |
| `F` | Toggle fullscreen |
| `H` | Toggle help panel |

## 🔬 Toán Học Fractal / Fractal Mathematics

### Hệ Thống Hàm Lặp (IFS)

Một IFS được định nghĩa bởi một tập hữu hạn các ánh xạ co:

\`\`\`
f₁, f₂, ..., fₙ : ℝᵈ → ℝᵈ
\`\`\`

Mỗi biến đổi thường là một biến đổi affine:

\`\`\`
fᵢ(x) = Aᵢx + bᵢ
\`\`\`

Trong đó:
- `Aᵢ` là ma trận biến đổi 3×3
- `bᵢ` là vector dịch chuyển 3D
- Mỗi biến đổi có xác suất liên kết `pᵢ`

### Các Loại Fractal Được Hỗ Trợ

1. **Sierpinski Triangle**: Fractal 2D cổ điển với 3 biến đổi
2. **Barnsley Fern**: Fractal lấy cảm hứng từ thiên nhiên với 4 biến đổi
3. **Dragon Curve**: Fractal đường cong tự tương tự
4. **3D Cube Fractal**: Mở rộng sang không gian 3D
5. **Menger Sponge**: Fractal 3D với mẫu lỗ
6. **Cấu Hình Tùy Chỉnh**: Tập biến đổi do người dùng định nghĩa

## 🛠️ Chi Tiết Kỹ Thuật / Technical Details

### Kiến Trúc / Architecture

Ứng dụng tuân theo kiến trúc React hiện đại với các thành phần chính:

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

### Công Nghệ Chính / Key Technologies

- **Next.js 15**: React framework với App Router
- **React Three Fiber**: React renderer cho Three.js
- **Three.js**: Thư viện đồ họa 3D
- **TypeScript**: JavaScript an toàn kiểu
- **Tailwind CSS**: CSS framework utility-first
- **Framer Motion**: Thư viện animation
- **Radix UI**: Component primitives có thể truy cập

### Tối Ưu Hiệu Suất / Performance Optimizations

- **Web Workers**: Tính toán nặng chạy trong background threads
- **Chất Lượng Thích Ứng**: Điều chỉnh chất lượng tự động dựa trên hiệu suất
- **Quản Lý Bộ Nhớ**: Xử lý geometry và texture hiệu quả
- **Tối Ưu Render**: Frustum culling và hệ thống LOD

## 🌍 Đa Ngôn Ngữ / Internationalization

Ứng dụng hỗ trợ 9 ngôn ngữ:

- 🇺🇸 English
- 🇻🇳 Tiếng Việt (Vietnamese)
- 🇨🇳 中文 (Chinese)
- 🇯🇵 日本語 (Japanese)
- 🇰🇷 한국어 (Korean)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇩🇪 Deutsch (German)
- 🇷🇺 Русский (Russian)

Ngôn ngữ được tự động phát hiện từ cài đặt trình duyệt và có thể thay đổi thủ công qua language selector.

## 🎓 Ứng Dụng Giáo Dục / Educational Applications

### Cho Sinh Viên / For Students
- **Học Fractal Geometry**: Hiểu trực quan về IFS và fractal
- **Thực Hành Toán Học**: Thử nghiệm với ma trận và biến đổi
- **Dự Án Khoa Học**: Sử dụng cho báo cáo và thuyết trình
- **Nghiên Cứu Độc Lập**: Khám phá các mẫu fractal mới

### Cho Giảng Viên / For Educators
- **Công Cụ Giảng Dạy**: Minh họa khái niệm fractal trong lớp học
- **Bài Tập Tương Tác**: Tạo bài tập thực hành cho sinh viên
- **Nghiên Cứu**: Công cụ cho nghiên cứu fractal và hình học
- **Trình Bày**: Tạo hình ảnh và animation cho bài giảng

### Cho Nghiên Cứu / For Research
- **Phân Tích Fractal**: Nghiên cứu tính chất của các fractal khác nhau
- **Xuất Dữ Liệu**: Xuất point cloud cho phân tích nâng cao
- **Tích Hợp GIS**: Sử dụng định dạng LAS/LAZ cho ứng dụng GIS
- **Visualization**: Tạo hình ảnh chất lượng cao cho xuất bản

## 🔧 Cấu Hình / Configuration

### Biến Môi Trường / Environment Variables

Tạo file `.env.local` trong thư mục gốc:

\`\`\`env
# Tùy chọn: Analytics tracking
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Tùy chọn: Error reporting
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Tùy chọn: Performance monitoring
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
\`\`\`

### Tùy Chỉnh / Customization

#### Thêm Fractal Preset Mới

1. Chỉnh sửa `components/fractal-presets.tsx`
2. Thêm cấu hình của bạn vào mảng `FRACTAL_PRESETS`:

\`\`\`typescript
{
  name: "Your Fractal",
  description: "Mô tả fractal của bạn",
  difficulty: "Medium",
  matrices: [
    // Ma trận biến đổi của bạn
  ]
}
\`\`\`

#### Theme Tùy Chỉnh

Chỉnh sửa `tailwind.config.ts` để thêm color scheme tùy chỉnh:

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

### Chạy Tests

\`\`\`bash
# Chạy tất cả tests
npm test

# Chạy tests ở chế độ watch
npm run test:watch

# Chạy tests với coverage
npm run test:coverage
\`\`\`

### Cấu Trúc Test

\`\`\`
tests/
├── __mocks__/             # Mock files
├── components/            # Component tests
├── utils/                 # Utility function tests
└── integration/           # Integration tests
\`\`\`

## 📦 Build cho Production

### Lệnh Build

\`\`\`bash
# Tạo production build
npm run build

# Khởi động production server
npm start

# Phân tích bundle size
npm run analyze
\`\`\`

### Tùy Chọn Deployment

#### Vercel (Khuyến nghị)
\`\`\`bash
# Cài đặt Vercel CLI
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

## 🤝 Đóng Góp / Contributing

Chúng tôi hoan nghênh các đóng góp! Vui lòng xem [Contributing Guide](CONTRIBUTING.md) để biết chi tiết.

### Quy Trình Phát Triển

1. **Fork repository**
2. **Tạo feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Thực hiện thay đổi**
4. **Thêm tests** cho tính năng mới
5. **Chạy test suite**
   \`\`\`bash
   npm test
   \`\`\`
6. **Commit thay đổi**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
7. **Push lên branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
8. **Mở Pull Request**

### Code Style

Chúng tôi sử dụng ESLint và Prettier cho code formatting:

\`\`\`bash
# Kiểm tra code style
npm run lint

# Sửa code style issues
npm run lint:fix

# Format code
npm run format
\`\`\`

## 🐛 Khắc Phục Sự Cố / Troubleshooting

### Vấn Đề Thường Gặp

#### Vấn Đề Hiệu Suất
- **Giảm số lần lặp**: Giảm số lần lặp trong cài đặt
- **Tắt tính năng nâng cao**: Tắt Bézier surface và high-quality rendering
- **Kiểm tra tương thích trình duyệt**: Đảm bảo hỗ trợ WebGL 2.0

#### Vấn Đề Rendering
- **Xóa browser cache**: Force refresh với Ctrl+F5
- **Cập nhật graphics drivers**: Đảm bảo driver GPU mới nhất
- **Thử trình duyệt khác**: Test trong Chrome, Firefox, hoặc Safari

#### Vấn Đề Bộ Nhớ
- **Đóng tabs khác**: Giải phóng bộ nhớ trình duyệt
- **Giảm point count**: Giảm cài đặt iteration
- **Restart trình duyệt**: Xóa memory leaks

### Tương Thích Trình Duyệt

| Trình Duyệt | Phiên Bản Tối Thiểu | Ghi Chú |
|-------------|---------------------|---------|
| Chrome | 80+ | Khuyến nghị |
| Firefox | 75+ | Hiệu suất tốt |
| Safari | 14+ | Tính năng WebGL hạn chế |
| Edge | 80+ | Tương thích tốt |

## 📄 Giấy Phép / License

Dự án này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Lời Cảm Ơn / Acknowledgments

- **Three.js Community**: Cho thư viện đồ họa 3D tuyệt vời
- **React Three Fiber**: Cho tích hợp React xuất sắc
- **Fractal Mathematics**: Lấy cảm hứng từ công trình của Benoit Mandelbrot và Michael Barnsley
- **Open Source Community**: Cho vô số thư viện và công cụ làm cho dự án này có thể thực hiện được
- **Cộng Đồng Toán Học Việt Nam**: Cho sự hỗ trợ và phản hồi quý báu

## 📞 Hỗ Trợ / Support

- **Tài Liệu**: [Wiki](https://github.com/your-username/ifs-3d-fractal-explorer/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/ifs-3d-fractal-explorer/issues)
- **Thảo Luận**: [GitHub Discussions](https://github.com/your-username/ifs-3d-fractal-explorer/discussions)
- **Email**: support@ifs3d-explorer.com

## 🗺️ Lộ Trình / Roadmap

### Phiên Bản 2.0 (Dự Kiến)
- [ ] Hỗ trợ WebGPU cho hiệu suất tốt hơn
- [ ] Tính năng cộng tác thời gian thực
- [ ] Timeline animation nâng cao
- [ ] Hỗ trợ VR/AR
- [ ] Dịch vụ cloud rendering

### Phiên Bản 1.5 (Đang Phát Triển)
- [ ] Thêm các loại fractal mới
- [ ] Cải thiện trải nghiệm mobile
- [ ] Hệ thống plugin cho fractal tùy chỉnh
- [ ] Tùy chọn xuất nâng cao

---

**Được tạo với ❤️ bởi Nguyễn Ngọc Phúc và Mai Thế Duy**

*Khám phá vẻ đẹp vô hạn của toán học thông qua fractal 3D tương tác.*

**Made with ❤️ by Nguyễn Ngọc Phúc and Mai Thế Duy**

*Explore the infinite beauty of mathematics through interactive 3D fractals.*
