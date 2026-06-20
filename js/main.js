// 首页演出栏开关：没有近期演出时改成 false，会自动隐藏 Upcoming Shows。
const siteConfig = {
  showUpcoming: true
};

document.addEventListener("DOMContentLoaded", () => {
  setupUpcomingSection();
  setupImageFallbacks();
  setupHeroSlides();
  setupRevealOnScroll();
  setupArtistCarousel();
  setupQrModal();
});

function setupUpcomingSection() {
  const section = document.querySelector("[data-upcoming-section]");
  if (!siteConfig.showUpcoming && section) {
    section.hidden = true;
  }
}

function setupImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      // 图片还没放进 images 文件夹时，先隐藏破图图标，让灰黑底色保持干净。
      image.classList.add("image-missing");
    });
  });
}

function setupHeroSlides() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length < 2) return;

  let currentIndex = 0;

  window.setInterval(() => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  }, 4200);
}

function setupRevealOnScroll() {
  const revealItems = document.querySelectorAll(".section-reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
}

function setupArtistCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  const scrollOneCard = (direction) => {
    const firstCard = track.querySelector(".artist-card");
    const distance = firstCard ? firstCard.offsetWidth + 18 : 280;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  prev.addEventListener("click", () => scrollOneCard(-1));
  next.addEventListener("click", () => scrollOneCard(1));
}

function setupQrModal() {
  const modal = document.querySelector("[data-qr-modal]");
  const image = document.querySelector("[data-qr-image]");
  const close = document.querySelector("[data-qr-close]");
  const qrLinks = document.querySelectorAll("[data-qr]");

  if (!modal || !image || !close) return;

  qrLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const qrPath = link.dataset.qr;
      const directUrl = link.getAttribute("href");

      // 如果链接是 # 或空链接，就只弹二维码；如果有真实链接，新窗口照常打开。
      if (!directUrl || directUrl === "#") {
        event.preventDefault();
        image.src = qrPath;
        modal.hidden = false;
      }
    });
  });

  close.addEventListener("click", () => {
    modal.hidden = true;
    image.src = "";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.hidden = true;
      image.src = "";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      modal.hidden = true;
      image.src = "";
    }
  });
}
