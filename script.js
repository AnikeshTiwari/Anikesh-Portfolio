/* ===================================================================
   ANIKESH TIWARI â€” PORTFOLIO ENGINE
   =================================================================== */

// Spotlight mouse effect
const spotlight = document.getElementById("spotlight");
if (spotlight) {
  window.addEventListener("mousemove", (e) => {
    spotlight.style.background = `radial-gradient(circle 600px at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.07), transparent 80%)`;
  });
}

// Mobile Menu Toggle
const mobileBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

if (mobileBtn && navMenu) {
  mobileBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

// Copy Email Utility
const heroCopyBtn = document.getElementById("heroCopyEmailBtn");
const triggerCopy = document.getElementById("copyEmailTrigger");
const emailRow = document.getElementById("emailCopyRow");
const toast = document.getElementById("toast");

function copyEmailAddress() {
  const email = "sparkle.anikesh01@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast();
  }).catch(() => {
    const tempInput = document.createElement("input");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast();
  });
}

function showToast() {
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

if (heroCopyBtn) heroCopyBtn.addEventListener("click", copyEmailAddress);
if (triggerCopy) triggerCopy.addEventListener("click", (e) => { e.stopPropagation(); copyEmailAddress(); });
if (emailRow) emailRow.addEventListener("click", copyEmailAddress);

// Contact Form AJAX Submission
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (sendBtn) sendBtn.classList.add("loading");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        if (successModal) successModal.style.display = "flex";
        contactForm.reset();
      } else {
        alert("Transmission error. Please email directly at sparkle.anikesh01@gmail.com");
      }
    } catch (err) {
      alert("Network connectivity issue. Please reach out to sparkle.anikesh01@gmail.com");
    } finally {
      if (sendBtn) sendBtn.classList.remove("loading");
    }
  });
}

if (modalCloseBtn && successModal) {
  modalCloseBtn.addEventListener("click", () => {
    successModal.style.display = "none";
  });
}