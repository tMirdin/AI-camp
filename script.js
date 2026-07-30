// ===== Video play/pause overlay logic (hero section) =====
(function () {
  var video = document.getElementById("heroVideo");
  var overlay = document.getElementById("heroVideoOverlay");
  if (!video || !overlay) return;

  function hideOverlay() {
    overlay.style.display = "none";
  }

  video.addEventListener("play", hideOverlay);
  video.addEventListener("click", function () {
    video.play();
  });
})();

// ===== Photo carousel logic (previous camp photos) =====
(function () {
  var cur = 0;
  var total = 7;
  var slides = document.querySelectorAll(".ph-slide");
  var dots = document.querySelectorAll(".ph-dot");

  function show(i) {
    slides[cur].style.display = "none";
    dots[cur].style.background = "rgba(26,140,62,.2)";
    dots[cur].style.width = "8px";
    cur = (i + total) % total;
    slides[cur].style.display = "block";
    dots[cur].style.background = "var(--g)";
    dots[cur].style.width = "24px";
  }

  window.shiftPh = function (d) {
    show(cur + d);
  };
  window.goPh = function (i) {
    show(i);
  };

  var sx = 0;
  var track = document.getElementById("phTrack");
  track.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    function (e) {
      var dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) show(cur + (dx > 0 ? 1 : -1));
    },
    { passive: true },
  );
})();

// ===== Reviews carousel logic (parent testimonials) =====
(function () {
  var cur = 0;
  var total = 9;
  var slides = document.querySelectorAll(".rev-slide");
  var dots = document.querySelectorAll(".rev-dot");

  function show(idx) {
    slides[cur].style.display = "none";
    dots[cur].style.background = "rgba(26,140,62,.25)";
    dots[cur].style.width = "8px";
    cur = (idx + total) % total;
    slides[cur].style.display = "block";
    dots[cur].style.background = "var(--g)";
    dots[cur].style.width = "20px";
    document.getElementById("revCounter").textContent = cur + 1 + " / " + total;
  }

  window.shiftRev = function (d) {
    show(cur + d);
  };
  window.goRev = function (i) {
    show(i);
  };

  var sx = 0;
  var track = document.getElementById("revTrack");
  track.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    function (e) {
      var dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 40) show(cur + (dx > 0 ? 1 : -1));
    },
    { passive: true },
  );
})();

// ===== Portfolio video carousel logic (Aigerim's work samples) =====
(function () {
  var cur = 0;
  var total = 5;
  var slides = document.querySelectorAll(".port-slide");
  var dots = document.querySelectorAll(".port-dot");
  if (!slides.length) return;

  function show(i) {
    var video = slides[cur].querySelector("video");
    if (video) video.pause();
    slides[cur].style.display = "none";
    dots[cur].classList.remove("active");

    cur = (i + total) % total;
    slides[cur].style.display = "block";
    dots[cur].classList.add("active");
  }

  window.shiftPort = function (d) {
    show(cur + d);
  };
  window.goPort = function (i) {
    show(i);
  };
})();

// ===== Nav menu (burger button on mobile) =====
function toggleMenu() {
  const m = document.getElementById("mobileMenu");
  m.classList.toggle("open");
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// ===== Scroll reveal animation (fade/slide sections into view) =====
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.07 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// ===== Form submission (sends lead to the same Google Sheet) =====
function sendForm() {
  const name = document.getElementById("fname").value.trim();
  const age = document.getElementById("fage").value.trim();
  const phone = document.getElementById("fphone").value.trim();

  if (!name || !age || !phone) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Отправляем…";

  const url =
    "https://script.google.com/macros/s/AKfycbzljDTuvwKFIzZblCOPfIHQnjYDKthXjop4jLl8gSdijk2trmyRvyn4iCmZfsKXp_Tf/exec";

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ name, age, phone, camp: "AI Camp" }),
  })
    .then(() => {
      document.getElementById("successMsg").style.display = "block";
      document.getElementById("fname").value = "";
      document.getElementById("fage").value = "";
      document.getElementById("fphone").value = "";
      btn.textContent = "Отправлено ✓";
      btn.style.opacity = ".5";
    })
    .catch(() => {
      document.getElementById("successMsg").style.display = "block";
      document.getElementById("fname").value = "";
      document.getElementById("fage").value = "";
      document.getElementById("fphone").value = "";
      btn.textContent = "Отправлено ✓";
      btn.style.opacity = ".5";
    });
}
