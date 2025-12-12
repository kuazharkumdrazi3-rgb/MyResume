// scripts.js

// Ensure page starts at top on load (useful when navigating quickly on tablet)
window.addEventListener("load", () => {
  try {
    window.scrollTo(0, 0);
  } catch (e) {
    // ignore silently
  }
});

// Simple intersection observer for .fade-in elements (optional “nice” effect)
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just mark them visible
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }
});

// Toast helper
let toastTimeout;

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Copy portfolio link (used on download.html)
function copyPortfolioLink() {
  const url = window.location.href;

  // When opened as file:// some browsers restrict clipboard API
  if (!navigator.clipboard || window.location.protocol === "file:") {
    showToast("Clipboard limited in file mode. Long-press and copy the URL.");
    return;
  }

  navigator.clipboard
    .writeText(url)
    .then(() => {
      showToast("Portfolio link copied to clipboard!");
    })
    .catch(() => {
      showToast("Unable to copy. Please copy the address bar manually.");
    });
}
