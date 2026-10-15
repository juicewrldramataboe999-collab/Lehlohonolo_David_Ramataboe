// Shared interactions for the five-page portfolio.
document.addEventListener("DOMContentLoaded", () => {
  // Automatically keep the footer year current.
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Accessible mobile navigation.
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Add your real social profile URLs below. Leave a URL blank to hide that link.
  // Example: { label: "Instagram", url: "https://instagram.com/yourusername" }
  const socialProfiles = [
    { label: "Instagram", url: "" },
    { label: "Facebook", url: "" },
    { label: "LinkedIn", url: "" },
    { label: "GitHub", url: "" },
    { label: "TikTok", url: "" }
  ];

  document.querySelectorAll("[data-social-links]").forEach((container) => {
    container.replaceChildren();
    socialProfiles.filter((profile) => profile.url.trim() !== "").forEach((profile) => {
      const link = document.createElement("a");
      link.href = profile.url;
      link.textContent = profile.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      container.appendChild(link);
    });
    const note = container.parentElement?.querySelector("p:not(.eyebrow)");
    if (note && socialProfiles.every((profile) => !profile.url.trim())) {
      note.textContent = "Your social links will appear here after you add your profile URLs in js/main.js.";
    } else if (note) {
      note.textContent = "Follow or connect with me through my professional profiles.";
    }
  });

  // Preselect a package when the visitor follows a package button.
  const packageSelect = document.querySelector("#package");
  if (packageSelect) {
    const params = new URLSearchParams(window.location.search);
    const requestedPackage = params.get("package");
    if (requestedPackage) {
      const match = Array.from(packageSelect.options).find((option) =>
        option.value.toLowerCase().startsWith(requestedPackage.toLowerCase())
      );
      if (match) packageSelect.value = match.value;
    }
  }

  // This is a mailto-based form, not a backend. It opens the visitor's email app.
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const packageName = String(formData.get("package") || "Not sure yet");
      const budget = String(formData.get("budget") || "Not specified");
      const message = String(formData.get("message") || "").trim();

      const subject = `Website enquiry from ${name}`;
      const body = [
        `Name: ${name}`,
        `Reply email: ${email}`,
        `Package/service: ${packageName}`,
        `Budget: ${budget}`,
        "",
        "Project details:",
        message
      ].join("\n");

      const feedback = document.querySelector("#form-feedback");
      if (feedback) feedback.textContent = "Opening your email app with the enquiry details…";
      const mailto = `mailto:lehlohonoloramataboe999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (feedback) {
        window.setTimeout(() => {
          feedback.textContent = "If your email app did not open, email lehlohonoloramataboe999@gmail.com directly.";
        }, 1200);
      }
    });
  }
});
