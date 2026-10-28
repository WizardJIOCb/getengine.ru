const currentYear = new Date().getFullYear();
const startYear = 2011;
const experienceYears = Math.max(currentYear - startYear, 1);
const previewUnlockKey = "getengine-preview-unlocked";
const previewTrigger = document.querySelector("[data-preview-trigger]");
const previewGate = document.querySelector("[data-preview-gate]");
let previewClicks = 0;

const unlockPreview = () => {
  document.body.classList.remove("preview-locked");
  document.body.classList.add("preview-unlocked");
  sessionStorage.setItem(previewUnlockKey, "true");

  if (previewGate) {
    previewGate.setAttribute("aria-hidden", "true");
  }
};

if (sessionStorage.getItem(previewUnlockKey) === "true") {
  unlockPreview();
} else if (previewTrigger) {
  previewTrigger.addEventListener("click", () => {
    previewClicks += 1;

    if (previewClicks >= 11) {
      unlockPreview();
    }
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = currentYear;
});

document.querySelectorAll("[data-experience]").forEach((node) => {
  node.textContent = experienceYears;
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
