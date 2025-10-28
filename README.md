# 🎬 Phim Ko Hay - Website Xem Phim Online

Một ứng dụng web xem phim trực tuyến hiện đại được xây dựng bằng React và Vite, cung cấp trải nghiệm xem phim mượt mà với giao diện đẹp mắt và thân thiện với người dùng.

## ✨ Tính năng

- 🎥 **Xem phim trực tuyến**: Hỗ trợ HLS streaming với video.js
- 🔍 **Tìm kiếm phim**: Tìm kiếm phim nhanh chóng theo từ khóa
- 📱 **Responsive Design**: Giao diện tương thích với mọi thiết bị
- 🎨 **UI/UX hiện đại**: Thiết kế đẹp mắt với Tailwind CSS và Framer Motion
- 📑 **Phân loại phim**: Duyệt phim theo thể loại và danh mục
- 📄 **Phân trang**: Dễ dàng điều hướng qua nhiều trang phim
- 🎭 **Chi tiết phim**: Xem thông tin chi tiết về phim, diễn viên, đạo diễn
- ⚡ **Hiệu ứng tương tác**: Splash cursor effect và loading animations với Lottie
- 🎬 **Chọn chất lượng video**: Tự động điều chỉnh chất lượng phát video

## 🛠️ Công nghệ sử dụng

### Frontend Framework

- **React 18.2.0** - Thư viện UI
- **React Router DOM 7.6.2** - Điều hướng
- **Vite 6.3.5** - Build tool và dev server

### Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.9** - Animation library
- **Lucide React 0.542.0** - Icon library
- **React Icons 5.5.0** - Icon components

### UI Components & Effects

- **@lottiefiles/dotlottie-react** - Lottie animations
- **@tippyjs/react** - Tooltips và popovers

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📦 Cài đặt

### Yêu cầu hệ thống

- Node.js (version 14 hoặc cao hơn)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**

```bash
git clone https://github.com/Huann204/online-movie-site.git
cd online-movie-site
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy development server**

```bash
npm run dev
```

4. **Mở trình duyệt và truy cập**

```
http://localhost:5173
```

## 🚀 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint để kiểm tra code
- `npm run deploy` - Deploy lên GitHub Pages

## 📁 Cấu trúc thư mục

```
movie/
├── public/              # Static files
│   └── _redirects      # Redirect rules
├── src/
│   ├── assets/         # Images, animations
│   │   └── img/
│   ├── components/     # React components
│   │   ├── common/     # Common components (Header, Footer)
│   │   ├── effects/    # Effect components (SplashCursor)
│   │   ├── shared/     # Shared components (MovieCard, Pagination)
│   │   └── ui/         # UI components (CategoryPage)
│   ├── layouts/        # Layout components
│   ├── pages/          # Page components
│   │   ├── Home/
│   │   ├── Movies/
│   │   └── Search/
│   ├── routes/         # Route configuration
│   ├── services/       # API services
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── eslint.config.js    # ESLint configuration
└── vercel.json         # Vercel deployment config
```

## 🔌 API

Dự án sử dụng API từ [PhimAPI](https://phimapi.com/):

- Base URL: `https://phimapi.com/v1/api`
- Endpoints:
  - `/the-loai/{slug}` - Lấy phim theo thể loại
  - `/danh-sach/{slug}` - Lấy danh sách phim
  - `/phim/{slug}` - Lấy chi tiết phim
  - `/tim-kiem` - Tìm kiếm phim

## 🎨 Features Chi tiết

### Header & Navigation

- Desktop menu và mobile menu responsive
- Search bar với real-time search
- Logo section với navigation

### Trang chủ (HomePage)

- Hiển thị danh sách phim mới nhất
- Phim theo thể loại
- Carousel/slider cho featured movies

### Chi tiết phim (MovieDetailPage)

- Thông tin đầy đủ về phim
- Danh sách tập phim
- Thông tin diễn viên, đạo diễn
- Trailer và hình ảnh

### Xem phim (WatchPage)

- Video player với HLS streaming
- Chọn chất lượng video
- Chọn tập phim
- Phim đề xuất

### Tìm kiếm (SearchPage)

- Tìm kiếm phim theo từ khóa
- Hiển thị kết quả với pagination
- Filter và sort options

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Vercel CLI
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run deploy
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo pull request hoặc mở issue để thảo luận về các thay đổi bạn muốn thực hiện.

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

Dự án này được phân phối dưới giấy phép MIT.

## 👨‍💻 Tác giả

**Huann204**

- GitHub: [@Huann204](https://github.com/Huann204)

## 🙏 Cảm ơn

- [PhimAPI](https://phimapi.com/) - Cung cấp API phim
- [Vite](https://vitejs.dev/) - Build tool tuyệt vời
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Video.js](https://videojs.com/) - Video player

---

⭐ Nếu bạn thấy dự án hữu ích, hãy cho một star nhé!
