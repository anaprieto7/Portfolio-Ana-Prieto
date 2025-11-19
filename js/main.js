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
        <div class="project-hero-kicker">
          ${project.client || "Client work"}
        </div>
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
