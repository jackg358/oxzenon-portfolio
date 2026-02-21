// ================================
//   OXZENON PORTFOLIO — script.js
// ================================


// ── 1. CUSTOM CURSOR ──────────────────────────────────────
// Grabs both cursor elements from the HTML
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

// These store current mouse position (m) and trail position (t)
let mx = 0, my = 0;
let tx = 0, ty = 0;

// Every time the mouse moves, snap the dot to it instantly
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px'; // -6 centers the 12px dot
  cursor.style.top  = my - 6 + 'px';
});

// The trail ring uses lerping (smooth lag) — runs 60x per second
function animateTrail() {
  // Move 12% of the remaining distance each frame = smooth lag effect
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;

  cursorTrail.style.left = tx - 16 + 'px'; // -16 centers the 32px ring
  cursorTrail.style.top  = ty - 16 + 'px';

  requestAnimationFrame(animateTrail); // keep looping
}
animateTrail(); // start the loop


// ── 2. CURSOR GROW ON HOVER ───────────────────────────────
// When hovering links/buttons, the cursor dot grows bigger
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
  });
});


// ── 3. SCROLL REVEAL ANIMATION ────────────────────────────
// Watches all elements with class "reveal"
// When they enter the screen, adds "visible" class to animate them in

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger: each element delays by 80ms more than the previous
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, {
  threshold: 0.1 // trigger when 10% of the element is visible
});

// Tell the observer to watch every .reveal element
revealElements.forEach((el) => observer.observe(el));