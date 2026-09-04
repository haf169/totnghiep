# 🎓 WEBSITE THIỆP MỜI LỄ TỐT NGHIỆP FPT UNIVERSITY
### Tân Cử Nhân: **Nguyễn Hữu Trần Hà** (MSSV: `DE170229`)
### Ngành: **Software Engineer** - Trường: **Đại học FPT Đà Nẵng**

---

## 🌟 Điểm Nổi Bật Của Website
- **Thiết kế rực rỡ chuẩn nhận diện FPT**: Cam FPT (`#F26522`), Xanh lá FPT (`#00A651`), Trắng (`#FFFFFF`), phong cách trẻ trung, nhiều màu sắc và hiệu ứng vui nhộn.
- **Preloader mở rèm độc đáo**: Màn hình chờ 2s với mũ cử nhân nhào lộn, thanh confetti progress bar và hiệu ứng mở rèm đôi hé lộ thiệp mời.
- **Đồng hồ đếm ngược (Countdown Timer) real-time**: Đếm chính xác Ngày/Giờ/Phút/Giây tới **10:00 Sáng, 12/09/2026**; hỗ trợ **Thêm vào Google Calendar** và **Tải file iCal (.ics)** bằng 1 click.
- **Lời nhắn cá nhân với hiệu ứng Typewriter**: Hiệu ứng gõ chữ tự động khi cuộn trang, kèm nút thả tim và xem lại.
- **Bản đồ & Animation dẫn đường SVG**: Biểu tượng mũ cử nhân di chuyển uốn lượn theo đường chấm đứt (dashed path) tới toạ độ Đại học FPT Đà Nẵng; nút mở Google Maps chỉ đường thực tế.
- **Hệ thống RSVP & Kết nối Google Sheets**: Nhận xác nhận tham dự và lưu tự động vào Google Sheets qua Google Apps Script Web App (kèm chế độ lưu LocalStorage & Bức Tường Lời Chúc trực tiếp).
- **Hiệu ứng tương tác Micro-interactions**:
  - Bấm vào mũ cử nhân ở phần giới thiệu để nổ pháo hoa confetti rực rỡ (`canvas-confetti`).
  - Âm thanh vui nhộn (sử dụng Web Audio API tích hợp sẵn, không lo bị chặn tải file).
  - Nút bật/tắt giai điệu chúc mừng tốt nghiệp trên thanh điều hướng.
- **Tối ưu Mobile-first**: Hiển thị tuyệt đẹp và mượt mà trên mọi thiết bị di động (iPhone, iPad, Android) cũng như máy tính để bàn.

---

## 📁 Cấu Trúc Thư Mục
```
thiep-moi-tot-nghiep/
├── index.html                    # Trang thiệp mời chính (HTML5 chuẩn SEO)
├── css/
│   └── style.css                 # Toàn bộ mã kiểu dáng, biến màu FPT, animations, responsive
├── js/
│   └── script.js                 # Xử lý logic countdown, typewriter, SVG animation, RSVP, confetti
├── assets/
│   └── images/                   # Hình ảnh minh hoạ & chân dung cử nhân chất lượng cao
│       ├── avatar.jpg            # Avatar 3D Pixar tân cử nhân Trần Hà
│       ├── gallery-1.jpg         # Ảnh kỷ niệm tung mũ cử nhân
│       ├── gallery-2.jpg         # Ảnh nụ cười bạn bè tốt nghiệp
│       └── gallery-3.jpg         # Ảnh bảo vệ đồ án Software Engineer
├── google-apps-script/
│   └── Code.gs                   # Mã nguồn Google Apps Script sẵn sàng copy vào Google Sheets
└── README.md                     # Tài liệu hướng dẫn sử dụng và triển khai
```

---

## 🚀 Cách Chạy & Xem Website Trực Tiếp

### Cách 1: Mở trực tiếp bằng trình duyệt
Bạn chỉ cần nhấp đúp (Double-click) vào tệp `index.html` trong thư mục `thiep-moi-tot-nghiep` để mở trên Google Chrome, Cốc Cốc, Edge hoặc Safari.

### Cách 2: Chạy qua Live Server (VS Code / Local Server)
1. Mở thư mục `thiep-moi-tot-nghiep` trong VS Code.
2. Bấm chuột phải vào `index.html` chọn **"Open with Live Server"**.
3. Hoặc chạy lệnh PowerShell sau:
   ```powershell
   npx serve -l 3000
   ```
   Sau đó mở trình duyệt tại: `http://localhost:3000`

---

## 📊 Hướng Dẫn Kết Nối Google Sheets Bằng Google Apps Script (Chỉ 2 phút)

Để form RSVP lưu dữ liệu trực tiếp vào Google Sheets của riêng bạn:

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.google.com) và tạo một bảng tính trống mới.
2. Đặt tên bảng tính, ví dụ: `Danh Sách Khách Mời Tốt Nghiệp - Trần Hà`.

### Bước 2: Dán mã Google Apps Script
1. Trên thanh công cụ Google Sheet, chọn **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
2. Xóa toàn bộ nội dung mẫu đang có trong tệp `Code.gs`.
3. Mở tệp `google-apps-script/Code.gs` trong thư mục dự án này, copy toàn bộ nội dung và dán vào Apps Script.
4. Bấm biểu tượng đĩa mềm 💾 (Save) để lưu lại.

### Bước 3: Triển khai Web App (Deploy)
1. Bấm nút **Triển khai (Deploy)** (màu xanh dương ở góc trên bên phải) -> Chọn **Quản lý bản triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng bên cạnh "Chọn loại", chọn **Ứng dụng web (Web App)**.
3. Điền thông tin:
   - **Mô tả**: `RSVP Graduation`
   - **Thực thi dưới dạng (Execute as)**: `Tôi (Me - your-email@gmail.com)`
   - **Người có quyền truy cập (Who has access)**: `Bất kỳ ai (Anyone)` ⚠️ *(Rất quan trọng để khách không cần đăng nhập vẫn gửi được đơn)*
4. Bấm nút **Triển khai (Deploy)**.
5. Nếu Google yêu cầu cấp quyền: Bấm **Cấp quyền truy cập (Authorize access)** -> Chọn tài khoản Google của bạn -> Bấm **Nâng cao (Advanced)** -> Chọn **Đi tới (không an toàn) / Go to (unsafe)** -> Bấm **Cho phép (Allow)**.
6. Copy đường link tại mục **Ứng dụng web URL (Web App URL)** (dạng `https://script.google.com/macros/s/AKfycb.../exec`).

### Bước 4: Gắn URL vào Website
Mở tệp `js/script.js` trong thư mục `thiep-moi-tot-nghiep`, tìm dòng số 12:
```javascript
const GOOGLE_APPS_SCRIPT_URL = "DÁN_URL_CỦA_BẠN_VÀO_ĐÂY";
```
Thay thế chuỗi rỗng bằng URL bạn vừa copy ở Bước 3. Lưu tệp lại là xong!

> 💡 **Ghi chú**: Ngay cả khi chưa gắn URL Google Apps Script, website vẫn hoạt động hoàn hảo và lưu dữ liệu cục bộ vào trình duyệt (`LocalStorage`), đồng thời lập tức hiển thị lời chúc lên **Bức Tường Lời Chúc (Guestbook)**!

---

## 🎨 Tùy Biến Thông Tin
- **Đổi ảnh chân dung / kỷ niệm**: Thay thế các tệp trong thư mục `assets/images/` với cùng tên tệp hoặc đổi đường dẫn trong `index.html`.
- **Đổi thời gian / toạ độ**: Mở `js/script.js` và chỉnh sửa biến `GRADUATION_DATE` hoặc các thông tin trong `index.html`.
