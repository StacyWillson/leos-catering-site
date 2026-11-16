const page = document.body.dataset.page || "home";

const header = document.querySelector("#site-header");
if (header) {
  header.className = "site-header";
  header.innerHTML = `
    <a class="brand" href="index.html" aria-label="Leo's Catering home">
      <img src="assets/leos-logo.png" alt="Leo's Catering">
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation">☰</button>
    <nav class="nav-links" id="primary-navigation" aria-label="Primary navigation">
      <a href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>Home</a>
      <a href="about.html" ${page === "about" ? 'aria-current="page"' : ""}>About</a>
      <a href="services.html" ${page === "services" ? 'aria-current="page"' : ""}>Services</a>
      <a href="menus.html" ${page === "menus" ? 'aria-current="page"' : ""}>Menus</a>
      <a class="nav-cta" href="contact.html" ${page === "contact" ? 'aria-current="page"' : ""}>Plan your event</a>
    </nav>`;

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
  addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 24));
}

const footer = document.querySelector("#site-footer");
if (footer) {
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="assets/leos-logo.png" alt="Leo's Catering">
        <p>Private dining and full-service catering across Costa Rica's North Pacific Gold Coast.</p>
      </div>
      <div>
        <p class="footer-title">Explore</p>
        <div class="footer-links">
          <a href="about.html">About Leo</a><a href="services.html">Services</a><a href="menus.html">Menus</a><a href="contact.html">Contact</a>
        </div>
      </div>
      <div>
        <p class="footer-title">Contact</p>
        <div class="footer-links">
          <a href="https://wa.me/50685672493" target="_blank" rel="noreferrer">WhatsApp +506 8567 2493</a>
          <a href="mailto:castroleonidas94@gmail.com">castroleonidas94@gmail.com</a>
          <span>Matapalo, Santa Cruz<br>Guanacaste, Costa Rica</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Leo's Catering Service</span><span>Website by Stacy Willson</span></div>`;
}

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = inquiryForm.querySelector(".form-status");
    const key = window.LEOS_WEB3FORMS_ACCESS_KEY || "";
    if (!key) {
      status.textContent = "The online form is being connected. Please contact Leo by WhatsApp or email in the meantime.";
      return;
    }
    const button = inquiryForm.querySelector("button[type='submit']");
    button.disabled = true;
    status.textContent = "Sending your inquiry…";
    const payload = Object.fromEntries(new FormData(inquiryForm));
    payload.access_key = key;
    payload.subject = "New Leo's Catering inquiry";
    payload.from_name = "Leo's Catering website";
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Unable to send");
      inquiryForm.reset();
      status.textContent = "Thank you. Your inquiry has been sent, and Leo will follow up with you directly.";
    } catch {
      status.textContent = "We could not send your inquiry. Please try again or contact Leo on WhatsApp.";
    } finally {
      button.disabled = false;
    }
  });
}

