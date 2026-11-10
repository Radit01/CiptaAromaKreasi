// Navigasi mobile dan diagram penjualan sederhana menggunakan Canvas.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const canvas = document.getElementById("salesChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const values = [145, 170, 185, 205, 245, 320];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

  function drawChart() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = rect.width, h = rect.height, left = 34, right = 8, top = 20, bottom = 32;
    const cw = w - left - right, ch = h - top - bottom, max = 400;
    ctx.clearRect(0, 0, w, h);
    ctx.font = "10px DM Sans, sans-serif";
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    [0, 100, 200, 300, 400].forEach(v => {
      const y = top + ch - v / max * ch;
      ctx.strokeStyle = "#e7e4da"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(w - right, y); ctx.stroke();
      ctx.fillStyle = "#96978c"; ctx.fillText(v, left - 9, y);
    });
    const slot = cw / values.length, bw = Math.min(34, slot * .55);
    values.forEach((v, i) => {
      const x = left + slot * i + (slot - bw) / 2, bh = v / max * ch, y = top + ch - bh;
      ctx.fillStyle = i === values.length - 1 ? "#c77b4c" : "#87947a";
      ctx.beginPath(); ctx.roundRect(x, y, bw, bh, [4, 4, 0, 0]); ctx.fill();
      ctx.fillStyle = "#77796d"; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(months[i], x + bw / 2, top + ch + 11);
    });
  }
  drawChart();
  if ("ResizeObserver" in window) new ResizeObserver(drawChart).observe(canvas.parentElement);
  else window.addEventListener("resize", drawChart);
});
