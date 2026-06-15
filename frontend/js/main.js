/* ===== LOADER ===== */
window.addEventListener("load", () => {
  const bar     = document.getElementById("loaderBar");
  const percent = document.getElementById("loaderPercent");
  const loader  = document.getElementById("loader");
  let p = 0;
  const iv = setInterval(() => {
    p = Math.min(p + Math.random() * 18, 100);
    bar.style.width       = p + "%";
    percent.textContent   = Math.floor(p) + "%";
    if (p >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        loader.style.opacity    = "0";
        loader.style.transition = "opacity 0.5s";
        setTimeout(() => { loader.style.display = "none"; }, 500);
      }, 300);
    }
  }, 120);
});

/* ===== TYPED ANIMATION ===== */
const roles = [
  "Python Full Stack Developer",
  "BE CSE Student",
  "Cybersecurity Enthusiast",
  "Backend Engineer",
  "Security-Aware Builder"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed");
function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => { isDeleting = true; typeLoop(); }, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeLoop, isDeleting ? 45 : 85);
}
typeLoop();

/* ===== NAVBAR SCROLL ===== */
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

/* ===== SMOOTH NAV LINKS ===== */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    // close mobile menu
    const navLinks = document.getElementById("navLinks");
    navLinks.style.display = "";
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.classList.contains("skills-section")) animateBars();
      if (entry.target.classList.contains("stats-bar")) animateCounters();
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ===== STAGGERED PROJECT CARDS ===== */
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = "1";
          card.style.transform = "translateY(0)";
        }, i * 100);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".projects-grid").forEach(grid => {
  grid.querySelectorAll(".project-card").forEach(card => {
    card.style.opacity   = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.3s";
  });
  cardObserver.observe(grid);
});

/* ===== EXP TIMELINE REVEAL ===== */
const expObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll(".exp-item");
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add("visible"), i * 150);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".exp-timeline").forEach(tl => expObserver.observe(tl));

/* ===== SKILL BARS ===== */
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll(".fill").forEach(bar => {
    bar.style.width = bar.dataset.width + "%";
  });
}

/* ===== COUNTER ANIMATION ===== */
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  document.querySelectorAll(".counter").forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + "+";
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}

/* ===== PROJECT MODAL DATA ===== */
const projects = {
  chainofcustody: {
    title: "Digital Evidence Chain-of-Custody System",
    icon: "fas fa-link",
    desc: "A tamper-proof digital evidence management system that tracks the full chain-of-custody lifecycle for forensic investigations — logging every access, transfer, and modification with cryptographic integrity checks.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · FastAPI · PostgreSQL</p><p><strong style='color:#00ffc3'>Features:</strong> Cryptographic hashing · Audit trail · Role-based access · Evidence lifecycle tracking</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  },
  riskevent: {
    title: "Operational Risk Event Collector",
    icon: "fas fa-exclamation-triangle",
    desc: "A full-stack platform to collect, categorize, and analyze operational risk events within an organization. Provides a React dashboard for visualizing risk trends and MySQL-backed persistent storage.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · React · MySQL</p><p><strong style='color:#00ffc3'>Features:</strong> Risk event ingestion · Categorization · Trend dashboards · REST API</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  },
  humanrisk: {
    title: "Human Risk Monitoring System",
    icon: "fas fa-user-shield",
    desc: "A behavioral monitoring system that tracks insider threat indicators and human risk factors across an organization. Aggregates signals to generate risk scores and trigger alerts.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · Monitoring System</p><p><strong style='color:#00ffc3'>Features:</strong> Behavioral analytics · Risk scoring · Alert engine · Insider threat detection</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  },
  darkweb: {
    title: "Dark Web Threat Dashboard",
    icon: "fas fa-globe",
    desc: "A security intelligence dashboard that aggregates and visualizes dark web threat data — leaked credentials, threat actor mentions, and malicious listings — to support proactive threat hunting.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · React · Security Monitoring</p><p><strong style='color:#00ffc3'>Features:</strong> Threat aggregation · Credential leak detection · Visual dashboard · OSINT integration</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  },
  stutter: {
    title: "Deep Learning-Based Stutter Detection",
    icon: "fas fa-brain",
    desc: "A deep learning model that analyzes audio speech samples to detect and classify stuttering patterns. Built using TensorFlow with a custom dataset pipeline for real-time speech disorder identification.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · TensorFlow</p><p><strong style='color:#00ffc3'>Features:</strong> Audio feature extraction · Stutter classification · Real-time inference · Model evaluation</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  },
  nmaptoolkit: {
    title: "Nmap Automation Toolkit",
    icon: "fas fa-network-wired",
    desc: "A Python-based wrapper and automation toolkit around Nmap for streamlined network reconnaissance. Supports batch scanning, custom scan profiles, and structured report generation.",
    details: "<p><strong style='color:#00ffc3'>Tech Stack:</strong> Python · Nmap · Bash</p><p><strong style='color:#00ffc3'>Features:</strong> Batch scanning · Custom profiles · JSON/HTML reports · CVE correlation</p>",
    github: "https://github.com/ShrinidhiTotagi",
    live: null
  }
};

function openModal(key) {
  const p = projects[key];
  document.getElementById("modal-title").textContent    = p.title;
  document.getElementById("modal-desc").textContent     = p.desc;
  document.getElementById("modal-details").innerHTML    = p.details;
  document.getElementById("modal-github").href          = p.github;
  document.getElementById("modal-icon").className       = p.icon;

  const liveBtn = document.getElementById("modal-live");
  liveBtn.style.display = p.live ? "inline-flex" : "none";
  if (p.live) liveBtn.href = p.live;

  document.getElementById("modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("modal").addEventListener("click", e => {
  if (e.target === document.getElementById("modal")) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ===== HAMBURGER ===== */
document.getElementById("hamburger").addEventListener("click", () => {
  const links = document.getElementById("navLinks");
  const isOpen = links.style.display === "flex";
  Object.assign(links.style, {
    display:         isOpen ? "none" : "flex",
    flexDirection:   "column",
    position:        "absolute",
    top:             "64px",
    right:           "24px",
    background:      "rgba(5,5,5,0.98)",
    padding:         "20px 28px",
    border:          "1px solid rgba(0,255,195,0.15)",
    borderRadius:    "10px",
    gap:             "20px",
    backdropFilter:  "blur(16px)",
    zIndex:          "999"
  });
});
