/* ==================== Scroll to top on load ==================== */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("load", () => window.scrollTo({ top: 0, behavior: "instant" }));

/* ==================== Mouse Tracker ==================== */
const dot  = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move dot instantly on mousemove
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top  = mouseY + "px";
});

// Ring follows with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  ring.style.left = ringX + "px";
  ring.style.top  = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on interactive elements
document.querySelectorAll("a, button, .project-card, .skill-card, .timeline-content, .nav-link, .btn, .social-btn, .resume-btn, .back-to-top").forEach(el => {
  el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
});

// Shrink dot on click
document.addEventListener("mousedown", () => dot.classList.add("clicking"));
document.addEventListener("mouseup",   () => dot.classList.remove("clicking"));

/* ==================== Mobile Menu ==================== */
const menuToggle = document.getElementById("menu-toggle");
const navLinks   = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

/* ==================== Smooth Scroll ==================== */
function smoothScroll(id) {
  const el = document.querySelector(id);
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    smoothScroll(link.getAttribute("href"));
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("show");
  });
});

document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();
  smoothScroll("#home");
  navLinks.classList.remove("show");
});

/* ==================== Scroll Spy ==================== */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll("section").forEach(section => {
    const top = section.offsetTop - 100;
    const id  = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + section.offsetHeight) {
      document.querySelectorAll(".nav-link").forEach(l => {
        l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
      });
    }
  });
  const btn = document.getElementById("back-to-top");
  btn.style.display = scrollY > 300 ? "flex" : "none";
});

/* ==================== Back to Top ==================== */
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==================== Role Text Animation ==================== */
const roles = [
  { text: "Full Stack", color: "#3b82f6" },
  { text: "Frontend",   color: "#10b981" },
  { text: "AI-Powered", color: "#f59e0b" },
];
let roleIndex = 0;
const textEl = document.getElementById("changing-role");
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent = roles[roleIndex].text;
    textEl.style.color  = roles[roleIndex].color;
    textEl.style.opacity = 1;
    textEl.style.transition = "opacity 0.4s ease";
  }, 350);
}, 2200);

/* ==================== Contact Form ==================== */
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form    = e.target;
  const fields  = ["name","email","subject","message"].map(id => document.getElementById(id));
  let valid = true;
  fields.forEach(f => { f.classList.remove("input-error"); if (!f.value.trim()) { f.classList.add("input-error"); valid = false; } });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)) {
    document.getElementById("email").classList.add("input-error"); valid = false;
  }
  if (!valid) return;
  const btn = document.getElementById("sendBtn");
  btn.classList.add("loading");
  try {
    const res = await fetch(form.action, { method: "POST", body: new FormData(form) });
    if (res.ok) { document.getElementById("successPopup").style.display = "block"; form.reset(); }
    else alert("Something went wrong. Please try again.");
  } catch { alert("Connection error. Please try again."); }
  finally { btn.classList.remove("loading"); }
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("successPopup").style.display = "none";
  window.location.href = "https://anikeshtiwari.github.io/Anikesh-Portfolio/";
});

/* ==================== Viewport debug ==================== */
(function(){ const l=()=>console.log("vw:",window.innerWidth); window.addEventListener("load",l); window.addEventListener("resize",l); })();
