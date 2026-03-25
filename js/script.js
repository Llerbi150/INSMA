// Referencias del menú móvil
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Cambio visual del navbar al hacer scroll
const siteHeader = document.querySelector(".site-header");
const setHeaderState = () => {
  if (window.scrollY > 20) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
};

// Activar menú móvil
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("open");
});

// Cerrar menú al navegar a una sección
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll suave explícito para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Pequeña animación de aparición en scroll
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));
window.addEventListener("scroll", setHeaderState);
window.addEventListener("load", setHeaderState);

// Controles de galeria horizontal
const galleryTrack = document.getElementById("gallery-track");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");

if (galleryTrack && galleryPrev && galleryNext) {
  const scrollByAmount = () => Math.max(galleryTrack.clientWidth * 0.8, 280);

  galleryPrev.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  });

  galleryNext.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  });
}
