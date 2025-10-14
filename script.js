document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector("header"); // secció hero

  let menuOpen = false;

  menuToggle.addEventListener("click", () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle("active");
    menuToggle.textContent = menuOpen ? "✕" : "☰";

    // Si el menú s’obre, assegura que la navbar sigui visible
    if (menuOpen) {
      navbar.classList.remove("hidden");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!menuOpen) {
          if (entry.isIntersecting) {
            navbar.classList.remove("hidden");
          } else {
            navbar.classList.add("hidden");
          }
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(hero);

  // --- SHOW / HIDE ADDITIONAL EXPERIENCES ---
  const showMoreBtn = document.getElementById("show-more-btn");
  const hideBtn = document.getElementById("hide-btn");
  const otherExperiences = document.getElementById("other-experiences");

  if (showMoreBtn && hideBtn && otherExperiences) {
    showMoreBtn.addEventListener("click", () => {
      otherExperiences.style.display = "block";
      showMoreBtn.style.display = "none";
      hideBtn.classList.remove("hidden");
    });

    hideBtn.addEventListener("click", () => {
      otherExperiences.style.display = "none";
      showMoreBtn.style.display = "inline-block";
      hideBtn.classList.add("hidden");
    });
  }

  const fills = document.querySelectorAll(".bar .fill");

  if (fills.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const pct = parseInt(el.dataset.width || "0", 10);
          el.style.width = Math.max(0, Math.min(100, pct)) + "%";
          obs.unobserve(el);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    fills.forEach((el) => io.observe(el));
  }
});
