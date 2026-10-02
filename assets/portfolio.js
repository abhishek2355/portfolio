const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeNavigation() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

let scrollUpdateScheduled = false;
function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  document.documentElement.style.setProperty("--scroll-progress", String(Math.min(progress, 1)));
  scrollUpdateScheduled = false;
}

window.addEventListener("scroll", () => {
  if (scrollUpdateScheduled) return;
  scrollUpdateScheduled = true;
  window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });
updateScrollProgress();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.querySelector("#contact-status");
  let statusTimeout;

  function showContactStatus(message, state) {
    if (!(status instanceof HTMLElement)) return;
    window.clearTimeout(statusTimeout);
    status.textContent = message;
    status.dataset.state = state;
    status.classList.add("is-visible");

    if (state !== "sending") {
      statusTimeout = window.setTimeout(() => {
        status.classList.remove("is-visible");
      }, state === "error" ? 10000 : 6000);
    }
  }

  contactForm.addEventListener("invalid", () => {
    showContactStatus("Please complete the required fields and enter a valid email address.", "error");
  }, true);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const endpoint = contactForm.getAttribute("action");
    if (!endpoint || !/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint)) {
      showContactStatus("The contact form is not configured correctly. Please email me directly.", "error");
      return;
    }

    const buttonContent = submitButton?.innerHTML;
    showContactStatus("Sending your message…", "sending");
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    fetch(endpoint, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    })
      .then(async (response) => {
        const result = await response.json().catch(() => null);
        if (!response.ok) {
          const detail = result && Array.isArray(result.errors)
            ? result.errors
              .map((error) => error && typeof error.message === "string" ? error.message : "")
              .filter(Boolean)
              .join(" ")
            : "";
          throw new Error(detail || "Your message could not be sent. Please try again or email me directly.");
        }

        contactForm.reset();
        showContactStatus("Thanks for reaching out. Your message has been sent.", "success");
      })
      .catch((error) => {
        showContactStatus(error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again or email me directly.", "error");
      })
      .finally(() => {
        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
          if (buttonContent) submitButton.innerHTML = buttonContent;
        }
      });
  });
}
