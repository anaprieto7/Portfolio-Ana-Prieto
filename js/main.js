// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navList.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Projects – 4 hero case studies
const projects = [
  {
  title: "Retoure24 – Multi-store Returns Management",
  role: "UX Research • IA • UI • Frontend",
  year: "2024–2025",
  description:
    "SaaS platform that lets merchants manage returns from multiple shops in one place, with dashboards, configuration and customer flows.",
  tags: ["SaaS", "Multi-tenant", "React", "Chakra UI"],
  link: "retoure24.html",   // 👈 aquí
  bg: "assets/retoure24-bg.jpg",
  visual: "assets/retoure24-screen.png",
},

  {
    title: "Handheld PWA – Warehouse Operations",
    role: "UX • IA • UI",
    year: "2022-2023",
    description:
      "Progressive web app for warehouse operators to scan, book, pick and relocate inventory directly from handheld devices.",
    tags: ["PWA", "Warehouse", "Operational UX"],
    link: "handheld.html",
    bg: "assets/handheld-bg.jpg",
    visual: "assets/handheld-phones.png",
  },
  {
    title: "WEMALO Dashboard  – Merchant Portal",
    role: "UX/UI",
    year: "2024-2025",
    description:
      "Redesign of a B2B dashboard for merchants and warehouse admins, with improved navigation, KPIs and multi-warehouse views.",
    tags: ["Dashboard", "B2B", "Data-heavy UI"],
    link: "wemalo-dashboard.html",
    bg: "assets/dashboard-bg.jpg",
    visual: "assets/dashboard-screen.png",
  },
  {
    title: "WEMALO – Warehouse Management System",
    role: "UX/UI • Product Thinking",
    year: "2024",
    description:
      "Concept for a global view that aggregates returns across warehouses and shops, giving operators and merchants one clear source of truth.",
    tags: ["Saas", "Data Heavy UI", "Product Design"],
    link: "wemalo-wms.html",
    bg: "assets/global-bg.jpg",
    visual: "assets/global-screen.png",
  },
];

const projectsGrid = document.getElementById("projects-grid");

if (projectsGrid) {
  projects.forEach((project) => {
    const card = document.createElement("article");
    // usamos la nueva clase del CSS
    card.className = "project-hero-card";

    // pasamos la imagen de fondo a la custom property --project-bg
    if (project.bg) {
      card.style.setProperty("--project-bg", `url('${project.bg}')`);
    }

    card.innerHTML = `
      <div class="project-hero-content">
        
        <h3 class="project-hero-title">${project.title}</h3>
        <div class="project-hero-meta">
          ${project.year} · ${project.role}
        </div>
        <p class="project-hero-description">
          ${project.description}
        </p>
        <div class="project-hero-tags">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        ${
          project.link
            ? `<a href="${project.link}" class="btn-hero" target="_blank" rel="noreferrer">
                 View case study
               </a>`
            : ""
        }
      </div>

      ${
        project.visual
          ? `<div class="project-hero-visual">
               <img src="${project.visual}" alt="${project.title} mockup" />
             </div>`
          : ""
      }
    `;

    projectsGrid.appendChild(card);
  });
}
// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  const toggleBackToTopVisibility = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTopVisibility);

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}


// AURORA PARALLAX + SECTION MODES
const auroraEl = document.querySelector(".aurora-bg");

if (auroraEl) {
  // PARALLAX SUAVE
  const updateAuroraParallax = () => {
    const y = window.scrollY || window.pageYOffset;
    // factor de parallax: ajusta 0.04–0.08 según lo intenso que lo quieras
    const offset = -(y * 0.06);
    document.documentElement.style.setProperty("--aurora-parallax", `${offset}px`);
  };

  // Usamos scroll + primera llamada
  window.addEventListener("scroll", updateAuroraParallax);
  updateAuroraParallax();

  // CAMBIO DE COLOR POR SECCIÓN
  const sections = document.querySelectorAll("[data-aurora]");
  const body = document.body;

  if ("IntersectionObserver" in window && sections.length) {
    let currentMode = "";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mode = entry.target.getAttribute("data-aurora");
            const newClass = `aurora-mode-${mode}`;

            if (currentMode !== newClass) {
              // quitar la clase anterior
              if (currentMode) {
                body.classList.remove(currentMode);
              }
              // añadir la nueva
              body.classList.add(newClass);
              currentMode = newClass;
            }
          }
        });
      },
      {
        threshold: 0.45, // ~45% visible para considerar que estás en esa sección
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
}



// CURSOR GLOW – motion tracking suave
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const easing = 0.08; // cuanto más bajo, más suave/lento el seguimiento

  const updateGlowPosition = () => {
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(updateGlowPosition);
  };

  // escuchar movimientos del mouse / touch
  const handlePointerMove = (event) => {
    const e = event.touches ? event.touches[0] : event;
    targetX = e.clientX;
    targetY = e.clientY;
  };

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("touchmove", handlePointerMove, { passive: true });

  // iniciar animación
  requestAnimationFrame(updateGlowPosition);
}



// =======================
//  LIGHTBOX PARA MEDIA
// =======================

(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = lightbox.querySelector(".lightbox__img");
  const videoEl = lightbox.querySelector(".lightbox__video");
  const captionEl = lightbox.querySelector(".lightbox__caption");

  function openLightboxFromElement(el) {
    const isVideo = el.tagName.toLowerCase() === "video" || el.src.endsWith(".mp4");
    const src = el.getAttribute("src");
    const alt = el.getAttribute("alt") || "";

    if (isVideo) {
      imgEl.style.display = "none";
      videoEl.style.display = "block";
      videoEl.src = src;
      videoEl.currentTime = 0;
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      videoEl.style.display = "none";
      videoEl.removeAttribute("src");
      imgEl.style.display = "block";
      imgEl.src = src;
      imgEl.alt = alt;
    }

    captionEl.textContent = alt;
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    // Pausar vídeo si estaba abierto
    videoEl.pause();
  }

  // Click en imágenes y vídeos dentro de media-card
  document.querySelectorAll(".media-card img, .media-card video").forEach((el) => {
    el.addEventListener("click", () => openLightboxFromElement(el));
  });

  // Cerrar por backdrop o botón
  lightbox.addEventListener("click", (evt) => {
    if (evt.target.hasAttribute("data-lightbox-close") || evt.target === lightbox) {
      closeLightbox();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
})();


// Flow diagrams: toggle Before/After + step focus
document.querySelectorAll(".flow-diagram").forEach((diagram) => {
  const toggles = diagram.querySelectorAll(".flow-toggle");
  const lanes = diagram.querySelectorAll(".flow-lane");

  function setMode(mode) {
    toggles.forEach((btn) => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    lanes.forEach((lane) => {
      lane.classList.toggle("is-active", lane.dataset.mode === mode);

      // reset focused step when switching
      lane.querySelectorAll(".flow-step").forEach((s) => s.classList.remove("is-focused"));
    });
  }

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode));
  });

  // Step focus highlight (click any step)
  diagram.querySelectorAll(".flow-step").forEach((step) => {
    step.addEventListener("click", () => {
      const lane = step.closest(".flow-lane");
      lane.querySelectorAll(".flow-step").forEach((s) => s.classList.remove("is-focused"));
      step.classList.add("is-focused");
    });
  });

  // default
  setMode("before");
});


// FLOW PIPELINE ANIMATION
document.querySelectorAll('[data-flow]').forEach(flow => {
  const toggles = flow.querySelectorAll('.flow-toggle');

  function animatePipeline() {
    flow.classList.remove('is-animated');
    void flow.offsetWidth; // reset animation
    flow.classList.add('is-animated');
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      toggles.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      animatePipeline();
    });
  });

  // animate on enter viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatePipeline();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(flow);
});


// ===============================
// FLOW PIPELINES — DUAL (Before/After simultaneous)
// Requires: iconSvg(name)
// ===============================

const buildStepsInto = (targetEl, dataArr) => {
  targetEl.innerHTML = dataArr.map((s, i) => `
    <div class="pipeline-step" data-step>
      <div class="pipeline-bubble">
        ${iconSvg(s.icon)}
      </div>
      <span class="pipeline-dot" aria-hidden="true"></span>
      <span class="pipeline-label">${s.label}</span>
      <span class="pipeline-mini">Step ${i + 1}</span>
    </div>
  `).join('');
};

const animateLineIn = (scopeEl) => {
  scopeEl.classList.remove('is-animated');
  void scopeEl.offsetWidth;
  scopeEl.classList.add('is-animated');
};

const animateNumber = (el, from, to, ms = 650) => {
  const start = performance.now();
  const f = Number(from);
  const t = Number(to);
  const step = (now) => {
    const p = Math.min(1, (now - start) / ms);
    const v = Math.round(f + (t - f) * (1 - Math.pow(1 - p, 3))); // easeOut
    el.textContent = v;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

document.querySelectorAll('[data-flow-dual]').forEach(flowEl => {
  const before = JSON.parse(flowEl.dataset.before || '[]');
  const after  = JSON.parse(flowEl.dataset.after || '[]');
  const improved = JSON.parse(flowEl.dataset.improved || '[]');

  // Steps targets
  const beforeTarget = flowEl.querySelector('[data-steps-before]');
  const afterTarget  = flowEl.querySelector('[data-steps-after]');

  buildStepsInto(beforeTarget, before);
  buildStepsInto(afterTarget, after);

  // Improved list
  const improvedList = flowEl.querySelector('[data-improved-list]');
  if (improvedList) {
    improvedList.innerHTML = improved.map(item => `
      <li class="flow-improved__item">
        <span class="flow-improved__dot" aria-hidden="true"></span>
        <div>
          <span class="flow-improved__label">${item.label}</span>
          <span class="flow-improved__desc">${item.desc}</span>
        </div>
      </li>
    `).join('');
  }

  // Counter: default from=before length, to=after length (animate on view)
  const fromEl = flowEl.querySelector('[data-count-from]');
  const toEl   = flowEl.querySelector('[data-count-to]');
  const fromN = before.length;
  const toN = after.length;

  if (fromEl) fromEl.textContent = fromN;
  if (toEl) toEl.textContent = toN;

  const onEnter = () => {
    // animate both lines (each panel has its own canvas)
    flowEl.querySelectorAll('.flow-panel').forEach(panel => animateLineIn(panel));

    // animate counter (nice and subtle)
    if (fromEl) animateNumber(fromEl, 0, fromN, 550);
    if (toEl) animateNumber(toEl, 0, toN, 700);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) onEnter();
    });
  }, { threshold: 0.35 });

  observer.observe(flowEl);
});


(() => {
  const flowCards = document.querySelectorAll("[data-flow]");
  if (!flowCards.length) return;

  // SVG icons using currentColor so --accent works reliably
  function iconSvg(name) {
    const common = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = {
      list: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M8 6h13M8 12h13M8 18h13"/><path ${common} d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>`,
      tabs: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 7h7l2 2h7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>`,
      detail: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path ${common} d="M8 9h8M8 13h8M8 17h5"/></svg>`,
      search: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><circle ${common} cx="11" cy="11" r="7"/><path ${common} d="M21 21l-4.3-4.3"/></svg>`,
      action: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M12 20h9"/><path ${common} d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z"/></svg>`,
      status: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M9 12l2 2 4-4"/><path ${common} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>`,
      inline: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 7h16M4 12h10M4 17h16"/><path ${common} d="M18 11l2 1-2 1"/></svg>`,
      sidepanel: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 4h16v16H4z"/><path ${common} d="M15 4v16"/></svg>`,
      confirm: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M20 6L9 17l-5-5"/></svg>`,

      form: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M6 4h12a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2z"/><path ${common} d="M8 9h8M8 13h8M8 17h5"/></svg>`,
      fields: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 7h16"/><path ${common} d="M4 12h16"/><path ${common} d="M4 17h10"/></svg>`,
      jump: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M7 7h10v10H7z"/><path ${common} d="M14 10h7v7"/><path ${common} d="M21 10l-7 7"/></svg>`,
      error: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M12 9v4"/><path ${common} d="M12 17h.01"/><path ${common} d="M10.3 3.2h3.4L22 20H2L10.3 3.2z"/></svg>`,
      repeat: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M17 1l4 4-4 4"/><path ${common} d="M3 11V9a4 4 0 0 1 4-4h14"/><path ${common} d="M7 23l-4-4 4-4"/><path ${common} d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
      entry: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M10 17l5-5-5-5"/><path ${common} d="M15 12H3"/><path ${common} d="M21 3v18"/></svg>`,
      steps: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 7h6M4 12h10M4 17h14"/></svg>`,
      validate: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M9 12l2 2 4-4"/><path ${common} d="M20 6v14H4V4h12"/></svg>`,
      review: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 4h16v16H4z"/><path ${common} d="M8 9h8M8 13h6"/></svg>`,

      inv: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M3 7l9-4 9 4-9 4-9-4z"/><path ${common} d="M3 7v10l9 4 9-4V7"/></svg>`,
      dense: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
      hunt: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><circle ${common} cx="11" cy="11" r="7"/><path ${common} d="M21 21l-4.3-4.3"/><path ${common} d="M8 11h6"/></svg>`,
      multi: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M8 7h12v12H8z"/><path ${common} d="M4 5h12"/><path ${common} d="M4 5v12"/></svg>`,
      outside: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M14 3h7v7"/><path ${common} d="M21 3l-9 9"/><path ${common} d="M10 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>`,
      split: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 4h7v16H4z"/><path ${common} d="M13 4h7v7h-7z"/><path ${common} d="M13 13h7v7h-7z"/></svg>`,
      highlight: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 20h16"/><path ${common} d="M7 15l10-10 2 2-10 10H7v-2z"/></svg>`,
      kpi: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 19V5"/><path ${common} d="M4 19h16"/><path ${common} d="M7 15l3-4 3 2 4-6"/></svg>`,
      filters: `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M4 5h16"/><path ${common} d="M7 12h10"/><path ${common} d="M10 19h4"/></svg>`
    };

    return icons[name] || `<svg viewBox="0 0 24 24" class="step-icon" aria-hidden="true"><path ${common} d="M6 12h12"/></svg>`;
  }

  function safeParseJSON(str, fallback) {
    try { return JSON.parse(str); } catch { return fallback; }
  }

  function buildSteps(container, steps) {
    if (!container) return;
    container.style.setProperty("--n", steps.length);

    container.innerHTML = steps.map((s) => {
      return `
        <div class="pipeline-step">
          <span class="step-badge">${iconSvg(s.icon)}</span>
          <span class="step-label">${s.label}</span>
        </div>
      `;
    }).join("");
  }

  function buildImproveChips(container, items) {
    if (!container) return;
    container.innerHTML = items.map((t) => `<span class="improve-chip">✨ ${t}</span>`).join("");
  }

  function animateCounter(card) {
    const fromEl = card.querySelector("[data-counter-from]");
    const toEl = card.querySelector("[data-counter-to]");
    if (!fromEl || !toEl) return;

    const from = Number(card.dataset.stepsBefore || fromEl.textContent || 0);
    const to = Number(card.dataset.stepsAfter || toEl.textContent || 0);

    const duration = 650;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const currentFrom = Math.round(from * (1 - p));
      const currentTo = Math.round(to * p);

      fromEl.textContent = String(Math.max(to, currentFrom));
      toEl.textContent = String(Math.min(to, currentTo));

      if (p < 1) requestAnimationFrame(tick);
      else {
        fromEl.textContent = String(from);
        toEl.textContent = String(to);
      }
    };

    // start from 0-ish for a nice effect
    fromEl.textContent = "0";
    toEl.textContent = "0";
    requestAnimationFrame(tick);
  }

  // Initial render (inject steps)
  flowCards.forEach((card) => {
    const before = safeParseJSON(card.getAttribute("data-before"), []);
    const after = safeParseJSON(card.getAttribute("data-after"), []);
    const improve = safeParseJSON(card.getAttribute("data-improve"), []);

    buildSteps(card.querySelector("[data-steps-before]"), before);
    buildSteps(card.querySelector("[data-steps-after]"), after);
    buildImproveChips(card.querySelector("[data-improve]"), improve);
  });

  // Animate line draw + counters when visible
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const card = e.target;
      card.classList.add("is-animate");
      animateCounter(card);
      io.unobserve(card);
    });
  }, { threshold: 0.35 });

  flowCards.forEach((card) => io.observe(card));
})();
