// ========================================
// APMG REALTY - MAIN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHero();
  initScrollReveal();
  initGalleryLightbox();
  initAwardsSlider();
  initBackToTop();
  initLazyLoading();
  initCounterAnimations();
  initSmoothScroll();
  initStickyBottomCta();
  initTouchEnhancements();
});

// ----------------------------------------
// NAVBAR
// ----------------------------------------
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll behavior
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Hamburger toggle
  function toggleMenu(open) {
    hamburger.classList.toggle("open", open);
    navMenu.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("open");
    toggleMenu(!isOpen);
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!navbar.contains(e.target)) toggleMenu(false);
  });

  // Close on Escape key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) toggleMenu(false);
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.dataset.section === id) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ----------------------------------------
// HERO BACKGROUND ZOOM
// ----------------------------------------
function initHero() {
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    setTimeout(() => heroBg.classList.add("loaded"), 100);
  }
}

// ----------------------------------------
// SCROLL REVEAL
// ----------------------------------------
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealEls.forEach(el => observer.observe(el));
}

// ----------------------------------------
// GALLERY LIGHTBOX
// ----------------------------------------
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const images = [];
  let currentIdx = 0;

  galleryItems.forEach((item, idx) => {
    const img = item.querySelector("img");
    images.push(img.src);

    item.addEventListener("click", () => {
      currentIdx = idx;
      openLightbox(images[currentIdx]);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + images.length) % images.length;
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = "scale(0.95)";
    setTimeout(() => {
      lightboxImg.src = images[currentIdx];
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
    }, 200);
  }

  lightboxImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", () => navigate(-1));
  lightboxNext.addEventListener("click", () => navigate(1));

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
}

// ----------------------------------------
// AWARDS SLIDER
// ----------------------------------------
function initAwardsSlider() {
  const slider = document.getElementById("awardsSlider");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");

  if (!slider) return;

  const scrollAmount = 280;

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Auto-scroll
  let autoSlide = setInterval(() => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, 3500);

  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3500);
  });
}

// ----------------------------------------
// BACK TO TOP
// ----------------------------------------
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ----------------------------------------
// LAZY LOADING
// ----------------------------------------
function initLazyLoading() {
  const lazyImgs = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "200px" });

    lazyImgs.forEach(img => observer.observe(img));
  } else {
    lazyImgs.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// ----------------------------------------
// COUNTER ANIMATIONS
// ----------------------------------------
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();

  const update = (timestamp) => {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  };

  requestAnimationFrame(update);
}

// ----------------------------------------
// SMOOTH SCROLL
// ----------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById("navbar").offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

// ----------------------------------------
// STICKY BOTTOM CTA
// ----------------------------------------
function initStickyBottomCta() {
  const cta = document.getElementById("stickyBottomCta");
  if (!cta) return;

  // Hide sticky CTA when footer is visible to avoid overlap
  const footer = document.getElementById("footer");
  if (!footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        // When footer is visible, hide the sticky CTA by lowering z-index
        cta.style.transform = entry.isIntersecting ? "translateY(100%)" : "translateY(0)";
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(footer);
  cta.style.transition = "transform 0.3s ease";
}

// ----------------------------------------
// TOUCH ENHANCEMENTS
// ----------------------------------------
function initTouchEnhancements() {
  // Swipe support for gallery lightbox
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    if (!lightbox.classList.contains("active")) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;

    // Only horizontal swipes
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      const prevBtn = document.getElementById("lightboxPrev");
      const nextBtn = document.getElementById("lightboxNext");
      if (dx > 0) prevBtn && prevBtn.click();
      else nextBtn && nextBtn.click();
    }
  }, { passive: true });

  // Swipe support for awards slider
  const awardsSlider = document.getElementById("awardsSlider");
  if (awardsSlider) {
    let sliderStartX = 0;
    awardsSlider.addEventListener("touchstart", e => {
      sliderStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    // Native scroll handles the rest; no extra JS needed for snap scrolling
  }

  // Prevent body scroll when modals/menus are open
  // (already handled in initNavbar — this is just a guard)
  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("touchend", () => {
      // Trigger the click so lightbox works on touch
      item.click();
    }, { passive: true });
  });
}
