
document.addEventListener("DOMContentLoaded", () => {
  // UPDATE YOUR PERSONAL LINKS HERE
  const CONFIG = {
    whatsapp: "6281234567890",
    email: "hello@example.com",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",

    // Ganti dengan video MP4 milikmu atau URL video demo.
    demoVideo:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  };

  // CONTACT LINKS
  document.getElementById("whatsappLink").href =
    `https://wa.me/${CONFIG.whatsapp}`;

  document.getElementById("emailLink").href =
    `mailto:${CONFIG.email}`;

  document.getElementById("instagramLink").href = CONFIG.instagram;
  document.getElementById("linkedinLink").href = CONFIG.linkedin;
  document.getElementById("youtubeLink").href = CONFIG.youtube;

  // CURRENT YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // PORTFOLIO FILTER
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach(card => {
        const matches =
          filter === "all" ||
          card.dataset.category === filter;

        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // VIDEO PLAYER MODAL
  const videoModal = document.getElementById("videoModal");
  const portfolioVideo = document.getElementById("portfolioVideo");
  const modalClose = document.getElementById("modalClose");

  const videoSource = portfolioVideo.querySelector("source");
  videoSource.src = CONFIG.demoVideo;
  portfolioVideo.load();

  function openVideo() {
    videoModal.classList.add("open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    portfolioVideo.currentTime = 0;

    portfolioVideo.play().catch(() => {
      // Pengguna dapat menekan tombol Play secara manual.
    });

    modalClose.focus();
  }

  function closeVideo() {
    portfolioVideo.pause();
    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-video]").forEach(button => {
    button.addEventListener("click", openVideo);
  });

  document.getElementById("heroPlay")
    .addEventListener("click", openVideo);

  modalClose.addEventListener("click", closeVideo);

  videoModal.addEventListener("click", event => {
    if (event.target === videoModal) {
      closeVideo();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        videoModal.classList.contains("open")) {
      closeVideo();
    }
  });

  // SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }
});
