(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav__link");
  const pickupForm = document.getElementById("pickupForm");
  const formMessage = document.getElementById("formMessage");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Min date for pickup (today)
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Sticky header shadow
  if (header) {
    function onScroll() {
      const scrolled = window.scrollY > 60;
      header.classList.toggle("scrolled", scrolled);
      if (document.body.classList.contains("site-home")) {
        header.classList.toggle("header--solid", scrolled);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open);
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active nav link on scroll (homepage only)
  const sections = document.querySelectorAll("section[id]");
  if (sections.length && navLinks.length) {
    function setActiveNav() {
      const scrollY = window.scrollY + 120;
      sections.forEach((section) => {
        const id = section.getAttribute("id");
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const link = document.querySelector(`.nav__link[href="#${id}"], .nav__link[href="index.html#${id}"]`);
        if (link && scrollY >= top && scrollY < top + height) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }
    window.addEventListener("scroll", setActiveNav, { passive: true });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Testimonials slider
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  const dotsContainer = document.getElementById("testimonialDots");

  if (track && dotsContainer) {
    const cards = track.querySelectorAll(".testimonial-card");
    let current = 0;
    const total = cards.length;

    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    let autoplay = setInterval(() => goTo(current + 1), 6000);
    track.parentElement.addEventListener("mouseenter", () => clearInterval(autoplay));
    track.parentElement.addEventListener("mouseleave", () => {
      autoplay = setInterval(() => goTo(current + 1), 6000);
    });
  }
  // Google Ads Conversion - Website Lead
if (typeof gtag === "function") {
  gtag("event", "conversion", {
    send_to: "AW-18301192182/Tw9kCLviqtocEPaP2JZE"
  });
}

  // Pickup form validation & submit
  if (pickupForm) {
    pickupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent = "";
      formMessage.className = "form-message";

      const fields = pickupForm.querySelectorAll("[required]");
      let valid = true;

      fields.forEach((field) => {
        field.classList.remove("error");
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        }
      });

      const phone = document.getElementById("phone");
      if (phone && phone.value && !/^[\d\s+\-()]{10,}$/.test(phone.value.replace(/\s/g, ""))) {
        phone.classList.add("error");
        valid = false;
      }

      if (!valid) {
        formMessage.textContent = "Please fill in all required fields correctly.";
        formMessage.classList.add("error");
        return;
      }

      const data = Object.fromEntries(new FormData(pickupForm));
      const subject = encodeURIComponent("ClothCure Pickup Request");
      const body = encodeURIComponent(
        `Pickup Request from ClothCure Website\n\n` +
          `Name: ${data.name}\n` +
          `Phone: ${data.phone}\n` +
          `Email: ${data.email || "—"}\n` +
          `Address: ${data.address}\n` +
          `Date: ${data.date}\n` +
          `Time: ${data.time}\n` +
          `Service: ${data.service}\n` +
          `Notes: ${data.notes || "—"}`
      );

      formMessage.textContent =
        "Thank you! Your pickup request has been received. We'll contact you shortly to confirm.";
      formMessage.classList.add("success");
      pickupForm.reset();

      // Optional: open mailto for business owner (comment out if using backend)
      const mailto = `mailto:hello@clothcure.in?subject=${subject}&body=${body}`;
      setTimeout(() => {
        if (confirm("Open your email app to send this request to ClothCure?")) {
          window.location.href = mailto;
        }
      }, 500);
    });
  }
  // Google Ads Conversion Tracking
document.querySelectorAll('a[href^="https://wa.me"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    if (typeof gtag === "function") {
      gtag("event", "conversion", {
        send_to: "AW-18301192182/Tw9kCLviqtocEPaP2JZE"
      });
    }
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    if (typeof gtag === "function") {
      gtag("event", "conversion", {
        send_to: "AW-18301192182/Tw9kCLviqtocEPaP2JZE"
      });
    }
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    if (typeof gtag === "function") {
      gtag("event", "conversion", {
        send_to: "AW-18301192182/Tw9kCLviqtocEPaP2JZE"
      });
    }
  });
});
})();
