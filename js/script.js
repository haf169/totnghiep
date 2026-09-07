/**
 * ==============================================================================
 * WEBSITE THIỆP MỜI TỐT NGHIỆP - NGUYỄN HỮU TRẦN HÀ
 * FPT UNIVERSITY - SOFTWARE ENGINEER (DE170229)
 * LOGIC TƯƠNG TÁC, COUNTDOWN, PRELOADER, TYPEWRITER, SVG ROUTE & RSVP GOOGLE SHEET
 * ==============================================================================
 */

// Cấu hình URL Google Apps Script Web App (Thay thế bằng URL của bạn khi deploy)
// Ví dụ: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0zM-EFs0qs0Dm3DJvrJ5JjBOyS2RRe9ula7CSOjLkJrFVnyoUp4bOwkMxrIh4kr5b/exec";

// Thời điểm diễn ra lễ tốt nghiệp: 10:00:00 ngày 12/09/2026 (GMT+7)
const GRADUATION_DATE = new Date("2026-09-12T10:00:00+07:00").getTime();

// Bảng màu Swiss International cho Confetti (Swiss Signal Red, Pure Black, Pure White, Light Gray)
const SWISS_COLORS = ['#FF3000', '#000000', '#FFFFFF', '#D9D9D9'];
const FPT_COLORS = SWISS_COLORS;

/* --- 1. PRELOADER & CURTAIN REVEAL --- */
window.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCountdown();
  initTypewriter();
  initMinimalGallery();
  initSvgMapRoute();
  initRsvpForm();
  initGuestbook();
  initMicroInteractions();
});

function initPreloader() {
  const preloader = document.getElementById("preloader");
  const progressFill = document.getElementById("preloaderProgressFill");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (progressFill) progressFill.style.width = "100%";

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add("fade-out");
          // Bắn pháo hoa chào mừng khi rèm mở
          triggerCelebrationConfetti();
        }
      }, 500);
    } else {
      if (progressFill) progressFill.style.width = `${progress}%`;
    }
  }, 120);
}

/* --- 2. COUNTDOWN TIMER --- */
function initCountdown() {
  const daysEl = document.getElementById("countdownDays");
  const hoursEl = document.getElementById("countdownHours");
  const minutesEl = document.getElementById("countdownMinutes");
  const secondsEl = document.getElementById("countdownSeconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = GRADUATION_DATE - now;

    if (distance <= 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minutesEl) minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? `0${n}` : n);

    if (daysEl && daysEl.innerText !== pad(days)) daysEl.innerText = pad(days);
    if (hoursEl && hoursEl.innerText !== pad(hours)) hoursEl.innerText = pad(hours);
    if (minutesEl && minutesEl.innerText !== pad(minutes)) minutesEl.innerText = pad(minutes);
    if (secondsEl && secondsEl.innerText !== pad(seconds)) {
      secondsEl.innerText = pad(seconds);
      // Hiệu ứng nảy nhẹ khi đổi giây
      secondsEl.style.transform = "scale(1.1)";
      setTimeout(() => {
        secondsEl.style.transform = "scale(1)";
      }, 200);
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* --- 3. CONFETTI BURST FUNCTIONS --- */
function triggerCelebrationConfetti() {
  if (typeof confetti === "function") {
    // Đợt 1: Bắn từ giữa màn hình
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: FPT_COLORS
    });

    // Đợt 2: Pháo bắn 2 bên sau 350ms
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: FPT_COLORS
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: FPT_COLORS
      });
    }, 350);
  }
}

function triggerHeroCapConfetti(event) {
  if (typeof confetti === "function") {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x: x, y: y },
      colors: FPT_COLORS,
      startVelocity: 35,
      scalar: 1.1
    });

    playChimeSound();
    showToast("🎉 Chúc mừng tân cử nhân Nguyễn Hữu Trần Hà!");
  }
}

/* --- 4. TYPEWRITER EFFECT (LỜI NHẮN CÁ NHÂN) --- */
const PERSONAL_MESSAGE = `Gửi những người thương quý nhất của Trần Hà! 🎓

Bốn năm học tập tại Đại học FPT Đà Nẵng là một chặng đường thanh xuân thật rực rỡ và đầy ắp những kỷ niệm đáng nhớ: từ những đêm cùng đồng đội thức trắng fix bug, hoàn thành các đồ án Kỹ thuật Phần mềm cam go, đến những bài học quý giá từ thầy cô và sự đồng hành ấm áp của gia đình.

Giờ đây, giây phút thiêng liêng nhận tấm bằng Cử nhân Kỹ thuật Phần mềm (Software Engineer) đã đến. Sự hiện diện, nụ cười và lời chúc phúc của mọi người chính là món quà tuyệt vời và ý nghĩa nhất đối với mình trong ngày trọng đại này!

Trân trọng kính mời Thầy Cô, Gia Đình và Bạn Bè thân yêu đến chung vui cùng Trần Hà nhé! ✨`;

let typewriterInterval = null;

function initTypewriter() {
  const box = document.getElementById("typewriterText");
  const replayBtn = document.getElementById("replayTypingBtn");

  function startTyping() {
    if (!box) return;
    if (typewriterInterval) clearInterval(typewriterInterval);
    box.innerHTML = "";

    let i = 0;
    typewriterInterval = setInterval(() => {
      if (i < PERSONAL_MESSAGE.length) {
        const char = PERSONAL_MESSAGE.charAt(i);
        if (char === "\n") {
          box.innerHTML += "<br>";
        } else {
          box.innerHTML += char;
        }
        i++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 28);
  }

  // Kích hoạt khi cuộn tới vị trí
  const section = document.getElementById("personal-message");
  if (section && window.IntersectionObserver) {
    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            startTyping();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  } else {
    startTyping();
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      startTyping();
      playPopSound();
    });
  }
}

/* --- 5. ANIMATED SVG MAP ROUTE --- */
function initSvgMapRoute() {
  const section = document.getElementById("location");
  const traveler = document.getElementById("routeTraveler");
  const path = document.getElementById("dashedRoutePath");

  if (!section || !traveler || !path) return;

  let hasAnimated = false;

  function runRouteAnimation() {
    if (hasAnimated) return;
    hasAnimated = true;

    path.classList.add("animated");
    const pathLength = path.getTotalLength();
    let start = null;
    const duration = 2800; // 2.8 giây di chuyển

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Chuyển động nảy mượt (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const point = path.getPointAtLength(ease * pathLength);
      traveler.style.left = `${point.x}px`;
      traveler.style.top = `${point.y}px`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Đã tới đích FPT: Nhảy tưng bừng và nổ confetti nhỏ
        traveler.style.transform = "translate(-50%, -50%) scale(1.3)";
        setTimeout(() => {
          traveler.style.transform = "translate(-50%, -50%) scale(1)";
        }, 300);
      }
    }

    requestAnimationFrame(step);
  }

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runRouteAnimation();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
  }

  // Click vào biểu tượng di chuyển để kích hoạt lại
  traveler.addEventListener("click", () => {
    hasAnimated = false;
    runRouteAnimation();
    playPopSound();
  });
}

/* --- 6. RSVP FORM & GOOGLE SHEETS INTEGRATION --- */
function initRsvpForm() {
  const form = document.getElementById("rsvpForm");
  const submitBtn = document.getElementById("rsvpSubmitBtn");
  const radioCards = document.querySelectorAll(".att-radio-label, .segment-item, .segment-option, .attendance-card");
  const emojiBtns = document.querySelectorAll(".emoji-swiss-btn, .emoji-btn-mini, .emoji-chip, .emoji-tag, .emoji-btn");
  const wishesInput = document.getElementById("rsvpWishes");
  const modal = document.getElementById("successModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const qrCodeSection = document.getElementById("qrCodeSection");
  const attendingInputs = document.querySelectorAll('input[name="attending"]');

  // Hàm chuyển đổi hiển thị mã QR khi gửi lời chúc từ xa
  function toggleQrCode(val) {
    if (!qrCodeSection) return;
    if (val === "Xin phép vắng" || val.indexOf("vắng") !== -1 || val.indexOf("từ xa") !== -1) {
      qrCodeSection.style.display = "block";
    } else {
      qrCodeSection.style.display = "none";
    }
  }

  // Lắng nghe sự kiện đổi radio attending trực tiếp
  attendingInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      toggleQrCode(e.target.value);
    });
  });

  // Xử lý click trên thẻ segment-item
  radioCards.forEach((card) => {
    card.addEventListener("click", () => {
      radioCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        toggleQrCode(radio.value);
      }
      playPopSound();
    });
  });

  // Hàm chèn Emoji vào lời chúc (tại đúng vị trí con trỏ chuột)
  function insertEmoji(emoji) {
    if (!wishesInput || !emoji) return;
    const start = wishesInput.selectionStart;
    const end = wishesInput.selectionEnd;
    if (typeof start === "number" && typeof end === "number") {
      const before = wishesInput.value.substring(0, start);
      const after = wishesInput.value.substring(end);
      wishesInput.value = before + emoji + " " + after;
      const newPos = start + emoji.length + 1;
      wishesInput.setSelectionRange(newPos, newPos);
    } else {
      wishesInput.value += (wishesInput.value ? " " : "") + emoji + " ";
    }
    wishesInput.focus();
    playPopSound();
  }

  // Bắt sự kiện click trên các nút emoji
  emojiBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const emoji = btn.getAttribute("data-emoji") || btn.textContent.trim();
      insertEmoji(emoji);
    });
  });

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvpName").value.trim();
      const guestsEl = document.getElementById("rsvpGuests");
      const guests = guestsEl ? guestsEl.value : "1";
      const attendingRadio = document.querySelector('input[name="attending"]:checked');
      const attending = attendingRadio ? attendingRadio.value : "Tham dự";
      const wishes = document.getElementById("rsvpWishes").value.trim();

      if (!name) {
        showToast("⚠️ Vui lòng nhập họ và tên của bạn!");
        document.getElementById("rsvpName").focus();
        return;
      }

      // Trạng thái nút bấm gửi
      if (submitBtn) {
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;
      }

      const payload = {
        timestamp: new Date().toLocaleString("vi-VN"),
        name: name,
        attending: attending,
        guests: guests,
        wishes: wishes || "Chúc mừng tốt nghiệp thành công rực rỡ!"
      };

      // 1. Lưu vào LocalStorage (Đảm bảo dữ liệu không bao giờ bị mất)
      saveToLocalStorage(payload);

      // 2. Gửi về Google Apps Script nếu đã cấu hình URL
      if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL.startsWith("http")) {
        try {
          const formParams = new URLSearchParams();
          formParams.append("timestamp", payload.timestamp);
          formParams.append("name", payload.name);
          formParams.append("attending", payload.attending);
          formParams.append("guests", payload.guests);
          formParams.append("wishes", payload.wishes);

          await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formParams.toString()
          });
          console.log("✅ Đã gửi dữ liệu RSVP tới Google Apps Script thành công!");
        } catch (error) {
          console.warn("Google Apps Script request notice:", error);
        }
      }

      // Giả lập delay 600ms tạo cảm giác xử lý mượt mà
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
        }

        // Cập nhật tên vào modal chúc mừng
        const modalGuestName = document.getElementById("modalGuestName");
        if (modalGuestName) modalGuestName.innerText = name;

        // Mở popup chúc mừng
        if (modal) modal.classList.add("active");

        // Bắn pháo hoa ăn mừng 3 đợt
        triggerCelebrationConfetti();
        playChimeSound();

        // Thêm vào Bức Tường Lời Chúc (Guestbook)
        addGuestCardToWall(payload);

        // Reset form
        form.reset();
        // Giữ mặc định chọn "Tham dự"
        if (radioCards[0]) {
          radioCards.forEach((c) => c.classList.remove("selected"));
          radioCards[0].classList.add("selected");
          const firstRadio = radioCards[0].querySelector('input[type="radio"]');
          if (firstRadio) firstRadio.checked = true;
        }
      }, 600);
    });
  }

  // Đóng Modal thành công
  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
}

/* --- 7. GUESTBOOK & LOCALSTORAGE SYNC --- */
const DEFAULT_GUESTS = [
  {
    name: "Thầy Cô & Bạn Bè FPTU",
    attending: "Tham dự",
    guests: "2",
    wishes: "Chúc mừng tân kỹ sư phần mềm xuất sắc Nguyễn Hữu Trần Hà! Chúc em luôn giữ vững ngọn lửa đam mê công nghệ!",
    time: "Hôm nay"
  },
  {
    name: "Gia đình yêu thương",
    attending: "Tham dự",
    guests: "4",
    wishes: "Cả nhà vô cùng tự hào về con trai! Chúc con vững bước trên con đường tương lai!",
    time: "Hôm qua"
  },
  {
    name: "Team Đồ Án Tốt Nghiệp",
    attending: "Tham dự",
    guests: "3",
    wishes: "Qua bao đêm thức debug cuối cùng cũng chạm tay vào tấm bằng cử nhân rồi anh em ơi! Quẩy thôi! 🎉🥂",
    time: "Hôm qua"
  }
];

function initGuestbook() {
  const container = document.getElementById("guestbookGrid");
  const countBadge = document.getElementById("guestCountBadge");
  if (!container) return;

  const stored = getStoredGuests();
  const allGuests = stored.length > 0 ? stored : DEFAULT_GUESTS;

  container.innerHTML = "";
  allGuests.forEach((guest) => {
    renderGuestCard(guest, container);
  });

  if (countBadge) {
    countBadge.innerText = `${allGuests.length} lời chúc`;
  }
}

function saveToLocalStorage(guest) {
  try {
    const list = getStoredGuests();
    list.unshift({
      name: guest.name,
      attending: guest.attending,
      guests: guest.guests,
      wishes: guest.wishes,
      time: "Vừa xong"
    });
    localStorage.setItem("graduation_fptu_rsvp", JSON.stringify(list));
  } catch (e) {
    console.error("LocalStorage error:", e);
  }
}

function getStoredGuests() {
  try {
    const data = localStorage.getItem("graduation_fptu_rsvp");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function addGuestCardToWall(guest) {
  const container = document.getElementById("guestbookGrid");
  const countBadge = document.getElementById("guestCountBadge");
  if (!container) return;

  const guestData = {
    name: guest.name,
    attending: guest.attending,
    guests: guest.guests,
    wishes: guest.wishes,
    time: "Vừa xong"
  };

  renderGuestCard(guestData, container, true);

  if (countBadge) {
    const current = container.querySelectorAll(".guestbook-card").length;
    countBadge.innerText = `${current} lời chúc`;
  }
}

function renderGuestCard(guest, container, prepend = false) {
  const card = document.createElement("div");
  card.className = "guestbook-card";

  const isYes = guest.attending.indexOf("Tham dự") !== -1 || guest.attending === "yes";
  const statusClass = isYes ? "status-yes" : "status-no";
  const statusLabel = isYes ? `🎉 Sẽ tham gia (${guest.guests || 1} người)` : "💌 Gửi chúc từ xa";

  card.innerHTML = `
    <div class="guest-card-header">
      <span class="guest-name">${escapeHtml(guest.name)}</span>
      <span class="guest-status-pill ${statusClass}">${statusLabel}</span>
    </div>
    <div class="guest-wishes">${escapeHtml(guest.wishes)}</div>
    <div class="guest-time">🕒 ${guest.time || "Gần đây"}</div>
  `;

  if (prepend && container.firstChild) {
    container.insertBefore(card, container.firstChild);
    card.style.animation = "preloaderCardPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
  } else {
    container.appendChild(card);
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --- 8. AUDIO & SOUND EFFECTS (WEB AUDIO API SYNTHESIZER) --- */
let audioCtx = null;
let bgmOscillator = null;
let isMusicPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Âm thanh Pop vui nhộn khi bấm nút
function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) { }
}

// Âm thanh Chime tươi vui chúc mừng
function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Hợp âm Đô trưởng hân hoan)
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0.1, ctx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.35);
    });
  } catch (e) { }
}

// Giai điệu Graduation March vui tươi du dương
let bgmInterval = null;
function initAudioPlayer() {
  const audioBtn = document.getElementById("audioToggleBtn");
  if (!audioBtn) return;

  const melody = [
    { freq: 261.63, dur: 0.35 }, // C4
    { freq: 329.63, dur: 0.35 }, // E4
    { freq: 392.00, dur: 0.35 }, // G4
    { freq: 523.25, dur: 0.6 }, // C5
    { freq: 440.00, dur: 0.35 }, // A4
    { freq: 392.00, dur: 0.35 }, // G4
    { freq: 349.23, dur: 0.35 }, // F4
    { freq: 329.63, dur: 0.5 }  // E4
  ];

  function playNote(freq, dur) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  function startBgm() {
    isMusicPlaying = true;
    audioBtn.classList.add("playing");
    audioBtn.setAttribute("title", "Tắt nhạc nền");
    let step = 0;

    bgmInterval = setInterval(() => {
      const note = melody[step % melody.length];
      playNote(note.freq, note.dur);
      step++;
    }, 450);

    showToast("🎵 Đang phát giai điệu mừng Lễ Tốt Nghiệp!");
  }

  function stopBgm() {
    isMusicPlaying = false;
    audioBtn.classList.remove("playing");
    audioBtn.setAttribute("title", "Bật nhạc nền");
    if (bgmInterval) clearInterval(bgmInterval);
    showToast("🔇 Đã tạm dừng giai điệu");
  }

  audioBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      stopBgm();
    } else {
      startBgm();
    }
  });
}

/* --- 9. MICRO-INTERACTIONS & CALENDAR --- */
function initMicroInteractions() {
  // 1. Click Mũ cử nhân ở Hero bắn pháo hoa
  const heroCapBadge = document.getElementById("heroCapBadge");
  if (heroCapBadge) {
    heroCapBadge.addEventListener("click", (e) => {
      triggerHeroCapConfetti(e);
    });
  }

  // 2. Thả tim Lời nhắn cá nhân
  const loveBtn = document.getElementById("loveReactBtn");
  const loveCountEl = document.getElementById("loveCount");
  let loves = 99;

  if (loveBtn && loveCountEl) {
    loveBtn.addEventListener("click", (e) => {
      loves++;
      loveCountEl.innerText = loves;
      playPopSound();
      spawnFloatingHeart(e.clientX, e.clientY);
      showToast("💖 Cảm ơn bạn đã gửi trọn yêu thương!");
    });
  }

  // 3. Thêm vào Google Calendar
  const googleCalBtn = document.getElementById("addGoogleCalBtn");
  if (googleCalBtn) {
    googleCalBtn.addEventListener("click", () => {
      const title = encodeURIComponent("🎓 Lễ Tốt Nghiệp Nguyễn Hữu Trần Hà - FPT University");
      const details = encodeURIComponent("Lễ tốt nghiệp Tân Cử nhân Kỹ thuật Phần mềm Nguyễn Hữu Trần Hà (MSSV: DE170229). Địa điểm: Sảnh dưới cầu giữa tòa Gamma và Alpha, FPT University Đà Nẵng. Trân trọng kính mời!");
      const location = encodeURIComponent("Sảnh dưới cầu giữa tòa Gamma và Alpha, Đại học FPT Đà Nẵng, KĐT Công nghệ FPT, Ngũ Hành Sơn, Đà Nẵng");
      // 10:00 - 12:00 ngày 12/09/2026 UTC+7 -> 03:00 - 05:00 UTC
      const dates = "20260912T030000Z/20260912T050000Z";
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(calUrl, "_blank");
      playPopSound();
    });
  }

  // 4. Tải file iCal (.ics)
  const downloadIcsBtn = document.getElementById("downloadIcsBtn");
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener("click", () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//FPT University//Graduation Invitation//VI",
        "BEGIN:VEVENT",
        "UID:fptu-grad-de170229-20260912",
        "DTSTAMP:20260904T000000Z",
        "DTSTART:20260912T030000Z",
        "DTEND:20260912T050000Z",
        "SUMMARY:Lễ Tốt Nghiệp Nguyễn Hữu Trần Hà - FPT University",
        "DESCRIPTION:Lễ tốt nghiệp Tân Cử nhân Kỹ thuật Phần mềm (DE170229). Rất mong được đón tiếp bạn!",
        "LOCATION:Sảnh dưới cầu giữa tòa Gamma và Alpha, Đại học FPT Đà Nẵng",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Le_Tot_Nghiep_Nguyen_Huu_Tran_Ha_FPTU.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("📅 Đã tải file lịch (.ics) thành công!");
      playPopSound();
    });
  }

  // 5. Nút Sao chép link thiệp
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("📋 Đã sao chép đường link thiệp mời!");
        playPopSound();
      }).catch(() => {
        showToast("📋 Link thiệp: " + window.location.href);
      });
    });
  }

  // 6. Nút Chia sẻ Zalo / Facebook
  const shareFbBtn = document.getElementById("shareFbBtn");
  if (shareFbBtn) {
    shareFbBtn.addEventListener("click", () => {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    });
  }
}

// Tạo hiệu ứng tim bay bồng bềnh
function spawnFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.style.position = "fixed";
  heart.style.left = `${x || window.innerWidth / 2}px`;
  heart.style.top = `${y || window.innerHeight / 2}px`;
  heart.style.fontSize = "24px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "99999";
  heart.style.transform = "translate(-50%, -50%) scale(1)";
  heart.style.transition = "transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1s ease";

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(-50%, -120px) scale(1.6) rotate(${Math.random() * 40 - 20}deg)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => {
    document.body.removeChild(heart);
  }, 1000);
}

// Toast Notification
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* --- 10. EDITORIAL PHOTO GALLERY & LIGHTBOX CONTROLLER --- */
function initMinimalGallery() {
  const cards = document.querySelectorAll(".portfolio-swiss-card, .editorial-card, .gallery-card");
  const modal = document.getElementById("lightboxModal");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");
  const lightboxImg = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const descEl = document.getElementById("lightboxDesc");
  const counterEl = document.getElementById("lightboxCounter");
  const downloadBtn = document.getElementById("lightboxDownloadBtn");
  const heroAvatarWrap = document.getElementById("heroAvatarWrap");

  if (!modal || cards.length === 0) return;

  let currentIndex = 0;
  const galleryData = Array.from(cards).map(card => ({
    fullSrc: card.getAttribute("data-full") || card.getAttribute("data-src"),
    title: "Nguyễn Hữu Trần Hà",
    desc: ""
  }));

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Khóa cuộn trang khi xem ảnh
    playPopSound();
  }

  function closeLightbox() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightboxContent() {
    const item = galleryData[currentIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = "0.3";
      lightboxImg.src = item.fullSrc;
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = "1";
      };
    }

    if (titleEl) titleEl.innerText = item.title;
    if (descEl) descEl.innerText = item.desc;
    if (counterEl) {
      const cur = String(currentIndex + 1).padStart(2, '0');
      const total = String(galleryData.length).padStart(2, '0');
      counterEl.innerText = `${cur} / ${total}`;
    }

    if (downloadBtn) {
      downloadBtn.href = item.fullSrc;
      downloadBtn.download = `NguyenHuuTranHa_TotNghiep_${currentIndex + 1}.jpg`;
    }
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightboxContent();
    playPopSound();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
    playPopSound();
  }

  // Gắn sự kiện click cho từng card
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => openLightbox(idx));
  });

  // Click vào Avatar ở Hero để mở ảnh chân dung chính phóng to
  if (heroAvatarWrap) {
    heroAvatarWrap.addEventListener("click", (e) => {
      // Nếu bấm trúng nút pháo hoa thì không mở lightbox
      if (e.target.closest("#heroCapBadge")) return;
      openLightbox(0);
    });
  }

  // Các nút điều hướng trong Lightbox
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", nextPhoto);
  if (prevBtn) prevBtn.addEventListener("click", prevPhoto);

  // Phím tắt bàn phím: ESC để đóng, ← / → để chuyển ảnh
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") nextPhoto();
    else if (e.key === "ArrowLeft") prevPhoto();
  });
}
