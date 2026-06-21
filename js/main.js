// Hide Upcoming Shows when there is no active show.
// 改成 false 后，首页 Upcoming Shows 会自动隐藏。
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
      // Keep empty image slots clean before you add real files.
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
  }, { threshold: 0.12 });

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

  const closeModal = () => {
    modal.hidden = true;
    image.removeAttribute("src");
  };

  qrLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      image.src = link.dataset.qr;
      modal.hidden = false;
    });
  });

  close.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}
// ===== 照片滑动 =====
document.querySelectorAll('.photo-slider').forEach(slider => {
  const track = slider.querySelector('.slider-track');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');

  if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -track.offsetWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: track.offsetWidth, behavior: 'smooth' });
    });
  }
});

// ===== 海报滑动 =====
document.querySelectorAll('.poster-slider').forEach(slider => {
  const track = slider.querySelector('.poster-track');
  const prevBtn = slider.querySelector('.poster-slider-btn.prev');
  const nextBtn = slider.querySelector('.poster-slider-btn.next');
  const dots = slider.closest('.poster-slider-wrapper').querySelectorAll('.hint-dot');

  if (track && prevBtn && nextBtn) {
    // 点击左右按钮滑动
    prevBtn.addEventListener('click', () => {
      const cardWidth = track.querySelector('.poster-card')?.offsetWidth || 260;
      track.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = track.querySelector('.poster-card')?.offsetWidth || 260;
      track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    });

    // 滑动时更新指示点
    track.addEventListener('scroll', () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.querySelector('.poster-card')?.offsetWidth || 260;
      const gap = 16;
      const activeIndex = Math.round(scrollLeft / (cardWidth + gap));
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
  }
});