(function () {
  "use strict";

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("back-to-top");
  function toggleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    toggleBackToTop();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  var navOverlay = document.getElementById("nav-overlay");

  function closeNav() {
    mainNav.classList.remove("open");
    navOverlay.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    mainNav.classList.add("open");
    navOverlay.classList.add("show");
    navToggle.setAttribute("aria-expanded", "true");
  }
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.contains("open");
    if (isOpen) { closeNav(); } else { openNav(); }
  });
  navOverlay.addEventListener("click", closeNav);
  mainNav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Scroll reveal ----------
     Elements are visible by default (see CSS). Only once we know
     IntersectionObserver is available do we arm the hidden state,
     so content is never stuck invisible if JS is slow/unsupported. */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal-armed");
      io.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();

      var text =
        "Hola Lic. José Alberto, mi nombre es " + name +
        ". Quisiera solicitar información sobre: " + service +
        ". " + message;

      var waUrl = "https://wa.me/5215644077684?text=" + encodeURIComponent(text);
      window.open(waUrl, "_blank", "noopener");
    });
  }
})();
