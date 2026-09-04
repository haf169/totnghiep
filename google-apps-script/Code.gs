/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - QUẢN LÝ RSVP THIỆP MỜI TỐT NGHIỆP FPT UNIVERSITY
 * Nhân vật chính: Nguyễn Hữu Trần Hà - DE170229 - Software Engineer
 * ==============================================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT 3 BƯỚC CỰC NHANH:
 * 1. Mở một Google Sheet mới (hoặc đặt tên: "Danh Sách Khách Mời Tốt Nghiệp - Trần Hà")
 * 2. Trên menu: Chọn "Tiện ích mở rộng" (Extensions) -> "Apps Script"
 * 3. Xoá code cũ, dán toàn bộ code trong file này vào.
 * 4. Bấm nút "Triển khai" (Deploy) -> "Quản lý bản triển khai mới" (New deployment)
 *    - Chọn loại: "Ứng dụng web" (Web App)
 *    - Mô tả: "RSVP Graduation Web App"
 *    - Thực thi dưới dạng: "Tôi" (Me)
 *    - Người có quyền truy cập: "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG!
 * 5. Bấm "Triển khai" (Deploy), cấp quyền và COPY ĐƯỜNG DẪN WEB APP (URL dạng https://script.google.com/macros/s/.../exec)
 * 6. Dán URL đó vào biến GOOGLE_SCRIPT_URL trong file js/script.js của website.
 */

// Hàm khởi tạo tiêu đề cột cho Sheet nếu chưa có
function setupSheetHeader(sheet) {
  if (!sheet) {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    if (doc) {
      sheet = doc.getSheetByName("RSVP") || doc.getActiveSheet();
    }
  }
  if (!sheet) return;

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Thời Gian Gửi (Timestamp)",
      "Họ Và Tên Khách Mời",
      "Trạng Thái Tham Dự",
      "Số Người Đi Cùng",
      "Lời Chúc Mừng",
      "Ghi Chú Hệ Thống"
    ];
    sheet.appendRow(headers);
    
    // Định dạng dòng tiêu đề đẹp mắt tông FPT (Cam #F26522, chữ trắng)
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#F26522");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    
    // Tự động căn chỉnh độ rộng cột
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

// Xử lý khi có dữ liệu gửi tới (POST request từ website)
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    // Đợi tối đa 30 giây để tránh xung đột khi nhiều khách gửi cùng lúc
    lock.waitLock(30000);

    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName("RSVP");
    if (!sheet) {
      sheet = doc.getActiveSheet();
      sheet.setName("RSVP");
    }

    setupSheetHeader(sheet);

    // Lấy dữ liệu được gửi từ form
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    const name = data.name || "Khách mời ẩn danh";
    const attending = data.attending || "Tham dự";
    const guests = data.guests || "1";
    const wishes = data.wishes || "(Không có lời chúc)";
    
    // Format thời gian Việt Nam (GMT+7)
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

    // Thêm dòng mới vào Google Sheet
    sheet.appendRow([
      formattedDate,
      name,
      attending,
      guests,
      wishes,
      "Gửi từ Website Thiệp Mời"
    ]);

    // Định dạng màu dòng vừa thêm (xanh nếu tham dự, cam nhạt nếu vắng)
    const lastRow = sheet.getLastRow();
    const statusCell = sheet.getRange(lastRow, 3);
    if (attending.indexOf("Tham dự") !== -1 || attending === "yes") {
      statusCell.setFontColor("#00A651");
      statusCell.setFontWeight("bold");
    } else {
      statusCell.setFontColor("#D9534F");
    }

    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Cảm ơn bạn đã gửi xác nhận tham dự lễ tốt nghiệp!",
        data: {
          timestamp: formattedDate,
          name: name,
          attending: attending,
          guests: guests,
          wishes: wishes
        }
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý GET request để kiểm tra kết nối API
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      message: "Hệ thống tiếp nhận RSVP Lễ Tốt Nghiệp FPTU - Nguyễn Hữu Trần Hà đang hoạt động tốt!",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Hàm chạy thử test trực tiếp từ trình soạn thảo Apps Script
function testRun() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName("RSVP");
  if (!sheet) {
    sheet = doc.getActiveSheet();
    sheet.setName("RSVP");
  }
  setupSheetHeader(sheet);
  sheet.appendRow([
    Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss"),
    "Khách Mời Test (Nguyễn Hữu Trần Hà)",
    "Tham dự",
    "1",
    "Chúc mừng Tân Cử Nhân tốt nghiệp xuất sắc! 🎉🎓",
    "Chạy thử nghiệm thành công"
  ]);
  Logger.log("✅ Đã ghi dữ liệu test thành công vào Google Sheet!");
}
