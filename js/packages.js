(function () {
  "use strict";

  const offerForm = document.getElementById("offerForm");
  const offerSelect = document.getElementById("offerSelect");
  const formMessage = document.getElementById("offerFormMessage");

  document.querySelectorAll("[data-offer]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const value = btn.getAttribute("data-offer");
      if (offerSelect && value) {
        offerSelect.value = value;
      }
    });
  });

  if (window.location.hash === "#book-offer" && offerSelect) {
    const params = new URLSearchParams(window.location.search);
    const offer = params.get("offer");
    if (offer) offerSelect.value = offer;
  }

  if (offerForm) {
    offerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent = "";
      formMessage.className = "form-message";

      const name = document.getElementById("offerName");
      const phone = document.getElementById("offerPhone");

      [name, phone, offerSelect].forEach((field) => {
        if (field) field.classList.remove("error");
      });

      let valid = true;
      if (!name?.value.trim()) {
        name?.classList.add("error");
        valid = false;
      }
      if (!phone?.value.trim()) {
        phone?.classList.add("error");
        valid = false;
      }
      if (!offerSelect?.value) {
        offerSelect?.classList.add("error");
        valid = false;
      }

      if (!valid) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.classList.add("error");
        return;
      }

      const data = Object.fromEntries(new FormData(offerForm));
      const subject = encodeURIComponent("ClothCure Package / Offer Request");
      const body = encodeURIComponent(
        `Package Offer Request\n\nName: ${data.name}\nPhone: ${data.phone}\nOffer: ${data.offer}\nMessage: ${data.notes || "—"}`
      );

      formMessage.textContent =
        "Thank you! We'll call you shortly to confirm your package.";
      formMessage.classList.add("success");
      offerForm.reset();

      setTimeout(() => {
        if (confirm("Open email to send this request to ClothCure?")) {
          window.location.href = `mailto:hello@clothcure.in?subject=${subject}&body=${body}`;
        }
      }, 400);
    });
  }
})();
