/* ==========================================================================
   MGM CONSTRUTORA — SCRIPT INTERATIVO & CONVERSÃO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAndStickyBar();
  initMobileMenu();
  initFAQ();
  initLightbox();
  initSmoothScroll();
});

/* ── Header Scroll & Mobile Sticky Bar ───────────────────────────────────── */
function initHeaderAndStickyBar() {
  const header = document.querySelector(".header");
  const stickyBar = document.querySelector(".mobile-sticky-bar");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 30);
    if (stickyBar) stickyBar.classList.toggle("visible", y > 260);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ── Mobile Menu Toggle ──────────────────────────────────────────────────── */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!toggleBtn || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  };

  toggleBtn.addEventListener("click", toggle);

  // Fecha ao clicar nos links do menu
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target) && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ── FAQ Accordion ───────────────────────────────────────────────────────── */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Fecha outros itens
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          const otherAnswer = other.querySelector(".faq-answer");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna item atual
      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ── Lightbox Modal para Galeria ─────────────────────────────────────────── */
function initLightbox() {
  let lightbox = document.getElementById("mgm-lightbox");

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "mgm-lightbox";
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-box">
        <button class="lightbox-close" aria-label="Fechar">&times;</button>
        <div class="lightbox-img-wrap">
          <img src="" alt="" id="lightbox-img">
        </div>
        <div class="lightbox-footer">
          <span class="lightbox-title" id="lightbox-title">Obra MGM Construtora</span>
          <a href="#contato" class="btn btn-gold btn-sm">Solicitar Orçamento</a>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lbImg = lightbox.querySelector("#lightbox-img");
  const lbTitle = lightbox.querySelector("#lightbox-title");
  const lbClose = lightbox.querySelector(".lightbox-close");

  const open = (src, title) => {
    lbImg.src = src;
    lbTitle.textContent = title || "Obra Executada — MGM Construtora";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-caption");
      if (img) {
        open(img.src, caption ? caption.textContent : "");
      }
    });
  });

  lbClose.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) close();
  });
}

/* ── Smooth Scroll Offset ────────────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector(".header")?.offsetHeight || 64;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });
}
