// Motivasyon mesajları
const motivasyonlar = [
  "Bugün çalış, yarın fark yarat!",
  "Vazgeçme, hayallerin sınavı geçmeni bekliyor.",
  "Bir soru daha, bir adım daha başarıya!",
  "Unutma: Zorluklar geçici, KPSS puanı kalıcı."
];

// Motivasyon mesajını güncelle
function guncelleMotivasyon() {
  const index = Math.floor(Math.random() * motivasyonlar.length);
  const motivasyonElem = document.getElementById("motivation");
  if (motivasyonElem) motivasyonElem.textContent = motivasyonlar[index];
}

// LocalStorage'a checkbox durumunu kaydet
function kaydetDurum() {
  const checkboxlar = document.querySelectorAll(".subject ul li input[type='checkbox']");
  const durum = Array.from(checkboxlar).map(checkbox => checkbox.checked);
  localStorage.setItem("checkboxDurum", JSON.stringify(durum));
}

// LocalStorage'dan checkbox durumunu yükle
function yukleDurum() {
  const durum = JSON.parse(localStorage.getItem("checkboxDurum"));
  if (!durum) return;

  document.querySelectorAll(".subject ul li input[type='checkbox']").forEach((checkbox, i) => {
    if (typeof durum[i] !== "undefined") {
      checkbox.checked = durum[i];
    }
  });
}

// Tüm checkboxları işaretle
function tumunuIsaretle() {
  document.querySelectorAll(".subject ul li input[type='checkbox']").forEach(checkbox => {
    checkbox.checked = true;
  });
  kaydetDurum();
}

// Tüm checkboxları temizle
function tumunuTemizle() {
  document.querySelectorAll(".subject ul li input[type='checkbox']").forEach(checkbox => {
    checkbox.checked = false;
  });
  kaydetDurum();
}

// Karanlık mod toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Dark mode ayarını yükle
function yukleDarkMode() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
  }
}

// Sayfa yüklendiğinde
window.addEventListener("DOMContentLoaded", () => {
  guncelleMotivasyon();
  yukleDarkMode();
  yukleDurum();

  // Checkbox değişimlerinde durumu kaydet
  document.querySelectorAll(".subject ul li input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", kaydetDurum);
  });

  // Karanlık mod butonuna event bağla
  const toggleBtn = document.getElementById("darkModeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleDarkMode);
  }

  // Footer varsa toplu butonları oluştur
  const footer = document.querySelector(".footer");
  if (footer) {
    const btnAll = document.createElement("button");
    btnAll.textContent = "Tümünü İşaretle";
    btnAll.className = "toggle-btn";
    btnAll.style.marginRight = "15px";
    btnAll.addEventListener("click", tumunuIsaretle);

    const btnClear = document.createElement("button");
    btnClear.textContent = "Tümünü Temizle";
    btnClear.className = "toggle-btn";
    btnClear.addEventListener("click", tumunuTemizle);

    footer.appendChild(btnAll);
    footer.appendChild(btnClear);
  }
});

let startTime, interval, elapsed = 0;

function updateTimerDisplay() {
  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById("timer-display").textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (!interval) {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateTimerDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  saveDailyTime(elapsed);
  elapsed = 0;
  updateTimerDisplay();
}

function saveDailyTime(ms) {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem('studyLog')) || {};
  stored[today] = (stored[today] || 0) + ms;
  localStorage.setItem('studyLog', JSON.stringify(stored));
}

function showHistory() {
  const log = JSON.parse(localStorage.getItem('studyLog')) || {};
  const sortedDates = Object.keys(log).sort().reverse().slice(0, 10);
  const historyBox = document.getElementById("history");

  if (historyBox.style.display === "none") {
    let html = "<strong>Son 10 Günlük Ders Süreleri:</strong><ul>";
    for (let date of sortedDates) {
      const totalSec = Math.floor(log[date] / 1000);
      const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      const s = String(totalSec % 60).padStart(2, '0');
      html += `<li>${date}: ${h}:${m}:${s}</li>`;
    }
    html += "</ul>";
    historyBox.innerHTML = html;
    historyBox.style.display = "block";
  } else {
    historyBox.style.display = "none";
  }
}
function toggleBranch(id) {
  const branch = document.getElementById("branch-" + id);
  if (branch.style.display === "flex") {
    branch.style.display = "none";
  } else {
    branch.style.display = "flex";
  }
}

