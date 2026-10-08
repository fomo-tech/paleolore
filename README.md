# The Archaeologist

Tạp chí khảo cổ học và tiền sử xây bằng Next.js/Vinext, có CMS biên tập, MongoDB HTTP adapter, SEO nền tảng và vùng quảng cáo.

## Chạy local

1. Sao chép `.env.example` thành `.env.local`.
2. Đặt `ADMIN_PASSWORD` và `ADMIN_SECRET` trước khi dùng CMS.
3. Chạy `npm run dev`.

CMS nằm ở `/admin`. Khi chưa cấu hình MongoDB, site dùng dữ liệu mẫu để preview. Khi đã cấu hình MongoDB HTTP/Data API, bài viết mới được lưu vào collection `articles`.

## SEO & Ads

- `app/sitemap.ts` và `app/robots.ts` tạo sitemap/robots tự động.
- Bài viết có metadata động và JSON-LD Article.
- `public/ads.txt` là chỗ thêm dòng publisher sau khi tài khoản quảng cáo được duyệt.
- `NEXT_PUBLIC_ADSENSE_CLIENT` được gắn vào vùng quảng cáo; cần bổ sung slot/script theo tài khoản Ads thực tế.

## Triển khai

Site dùng cấu hình portable/Vinext của Sites để chạy server-side trên edge. Các biến môi trường production cần đặt trong hosting: `ADMIN_PASSWORD`, `ADMIN_SECRET`, `MONGODB_DATA_API_URL`, `MONGODB_DATA_API_KEY`, `MONGODB_DATA_SOURCE`, `MONGODB_DATABASE`, `MONGODB_COLLECTION`, `NEXT_PUBLIC_SITE_URL`.