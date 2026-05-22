/* ==================== Force page reload at Home ==================== */
if ("scrollRestoration" in history) { history.scrollRestoration = "manual"; }
window.addEventListener("load", () => { window.scrollTo({ top: 0, behavior: "instant" }); });

/* ==================== Custom Mouse Tracker ==================== */
const cursorDot  = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Dot follows instantly
  dotX = mouseX; dotY = mouseY;
  cursorDot.style.left  = dotX  + "px";
  cursorDot.style.top   = dotY  + "px";
});

// Ring follows with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top  = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover expand effect on interactive elements
const hoverTargets = document.querySelectorAll(
  "a, button, .project-card, .skill-card, .timeline-content, .info-box, .nav-link, .btn, .social-btn, .resume-btn"
);
hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
  el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
});

// Click effect
document.addEventListener("mousedown", () => cursorDot.classList.add("clicking"));
document.addEventListener("mouseup",   () => cursorDot.classList.remove("clicking"));

// Hide cursors when leaving window
document.addEventListener("mouseleave", () => {
  cursorDot.style.opacity  = "0";
  cursorRing.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  cursorDot.style.opacity  = "1";
  cursorRing.style.opacity = "1";
});

/* ==================== Mobile Menu Toggle ==================== */
const menuToggle = document.getElementById("menu-toggle");
const navLinks   = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

/* ==================== Smooth Scroll ==================== */
const navItems = document.querySelectorAll(".nav-link");
const logo     = document.querySelector(".logo");

function smoothScroll(targetId) {
  const section = document.querySelector(targetId);
  if (section) window.scrollTo({ top: section.offsetTop - 70, behavior: "smooth" });
}

navItems.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    smoothScroll(link.getAttribute("href"));
    navItems.forEach(i => i.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("show");
  });
});

logo.addEventListener("click", (e) => {
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
      navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
      });
    }
  });
  const backToTop = document.getElementById("back-to-top");
  backToTop.style.display = scrollY > 300 ? "flex" : "none";
});

/* ==================== Back to Top ==================== */
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==================== Changing Role Text ==================== */
const roles = [
  { text: "Full Stack", color: "#3b82f6", font: "'Poppins', sans-serif" },
  { text: "Frontend",   color: "#10b981", font: "'Montserrat', sans-serif" },
  { text: "Web",        color: "#f59e0b", font: "'Roboto Slab', serif" },
];
let index = 0;
const textEl = document.getElementById("changing-role");
setInterval(() => {
  index = (index + 1) % roles.length;
  const { text, color, font } = roles[index];
  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent  = text;
    textEl.style.color  = color;
    textEl.style.fontFamily = font;
    textEl.style.opacity = 1;
  }, 300);
}, 2000);

/* ==================== Section Scroll Reveal ==================== */
document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(".skills-section, .projects-section");
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
  );
  revealSections.forEach(s => {
    // If already visible in viewport on load, show immediately
    const rect = s.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      s.classList.add("visible");
    } else {
      observer.observe(s);
    }
  });
});

/* ==================== Contact Form ==================== */
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form    = e.target;
  const name    = document.getElementById("name");
  const email   = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  let valid = true;

  [name, email, subject, message].forEach(f => {
    f.classList.remove("input-error");
    if (f.value.trim() === "") { f.classList.add("input-error"); valid = false; }
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("input-error"); valid = false;
  }
  if (!valid) return;

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.classList.add("loading");
  try {
    const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
    if (response.ok) { document.getElementById("successPopup").style.display = "block"; form.reset(); }
    else alert("Something went wrong. Please try again later.");
  } catch { alert("Error sending message. Please check your connection."); }
  finally { sendBtn.classList.remove("loading"); }
});

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("successPopup").style.display = "none";
  window.location.href = "https://anikeshtiwari.github.io/Anikesh-Portfolio/";
});

(function(){
  function logW(){ console.log('viewport width:', window.innerWidth); }
  window.addEventListener('load', logW);
  window.addEventListener('resize', logW);
})();
