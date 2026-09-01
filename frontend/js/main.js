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
      const cards = entry.target.querySelectorAll(".proj-flip-card");
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity   = "1";
          card.style.transform = "translateY(0)";
        }, i * 120);
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".projects-grid").forEach(grid => {
  grid.querySelectorAll(".proj-flip-card").forEach(card => {
    card.style.opacity   = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
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

/* ===== PROJECT DETAIL MODAL ===== */
const projData = {
  chainofcustody: {
    title: "Digital Evidence Chain-of-Custody System",
    icon: "fas fa-link",
    color: "#00ffe5",
    iconBg: "rgba(0,255,195,0.12)",
    github: "https://github.com/ShrinidhiTotagi/evidence-ledger",
    live: null,
    slides: [
      { icon: "🔗", label: "Evidence Intake Module" },
      { icon: "🔐", label: "Cryptographic Hash Verification" },
      { icon: "📋", label: "Audit Trail Dashboard" },
      { icon: "👤", label: "Role-Based Access Control" }
    ],
    overview: "A tamper-proof digital evidence management system designed for forensic investigations. It tracks the complete chain-of-custody lifecycle — every access, transfer, modification, and handoff is logged with SHA-256 cryptographic hashes to ensure integrity. Built with a FastAPI backend and PostgreSQL for persistent, auditable storage.",
    features: [
      { icon: "fas fa-fingerprint", text: "SHA-256 cryptographic hashing for every evidence item" },
      { icon: "fas fa-history", text: "Immutable audit trail with timestamps and user IDs" },
      { icon: "fas fa-user-lock", text: "Role-based access: Investigator, Analyst, Admin" },
      { icon: "fas fa-exchange-alt", text: "Evidence transfer and handoff tracking" },
      { icon: "fas fa-file-alt", text: "Auto-generated chain-of-custody PDF reports" },
      { icon: "fas fa-search", text: "Full-text search across evidence metadata" }
    ],
    stack: [
      { label: "Python", color: "cyan" }, { label: "FastAPI", color: "cyan" },
      { label: "PostgreSQL", color: "cyan" }, { label: "SQLAlchemy", color: "purple" },
      { label: "JWT Auth", color: "pink" }, { label: "SHA-256", color: "yellow" },
      { label: "Docker", color: "cyan" }, { label: "REST API", color: "purple" }
    ],
    challenges: "Ensuring hash integrity across distributed file storage while maintaining query performance on large evidence datasets. Designing an immutable audit log that cannot be altered even by admins required careful database-level constraints.",
    outcome: "A production-ready forensic evidence management system with zero integrity failures in testing. The audit trail successfully passed simulated court-admissibility checks and was demonstrated at the National Cybersecurity Hackathon."
  },
  riskevent: {
    title: "Operational Risk Event Collector",
    icon: "fas fa-exclamation-triangle",
    color: "#cc44ff",
    iconBg: "rgba(168,85,247,0.12)",
    github: "https://github.com/ShrinidhiTotagi/oprational",
    live: null,
    slides: [
      { icon: "⚠️", label: "Risk Event Submission Form" },
      { icon: "📊", label: "React Analytics Dashboard" },
      { icon: "🗄️", label: "MySQL Event Database" },
      { icon: "📈", label: "Trend Visualization Charts" }
    ],
    overview: "A full-stack platform for organizations to collect, categorize, and analyze operational risk events. Employees submit risk incidents through a structured form; the data is stored in MySQL and visualized on a React dashboard with trend charts, category breakdowns, and severity heatmaps. A Python FastAPI backend powers the REST API layer.",
    features: [
      { icon: "fas fa-plus-circle", text: "Structured risk event submission with category tagging" },
      { icon: "fas fa-chart-bar", text: "React dashboard with Chart.js trend visualizations" },
      { icon: "fas fa-filter", text: "Filter events by severity, category, date range" },
      { icon: "fas fa-bell", text: "Email alerts for high-severity risk events" },
      { icon: "fas fa-database", text: "MySQL-backed persistent storage with indexing" },
      { icon: "fas fa-file-export", text: "Export risk reports as CSV / PDF" }
    ],
    stack: [
      { label: "Python", color: "purple" }, { label: "FastAPI", color: "purple" },
      { label: "React", color: "cyan" }, { label: "MySQL", color: "yellow" },
      { label: "Chart.js", color: "pink" }, { label: "SQLAlchemy", color: "purple" },
      { label: "REST API", color: "cyan" }, { label: "Axios", color: "yellow" }
    ],
    challenges: "Designing a flexible event schema that supports multiple risk categories without requiring schema migrations. Optimizing MySQL queries for real-time dashboard updates with large event volumes.",
    outcome: "Delivered a working full-stack risk management platform with live dashboard. Demonstrated end-to-end data flow from event submission to visual analytics, showcasing full-stack Python + React integration skills."
  },
  humanrisk: {
    title: "Human Risk Monitoring System",
    icon: "fas fa-user-shield",
    color: "#ff2d55",
    iconBg: "rgba(255,77,109,0.12)",
    github: "https://github.com/ShrinidhiTotagi/human-error",
    live: null,
    slides: [
      { icon: "👁️", label: "Behavioral Signal Collector" },
      { icon: "🧮", label: "Risk Score Engine" },
      { icon: "🚨", label: "Automated Alert System" },
      { icon: "📉", label: "Insider Threat Dashboard" }
    ],
    overview: "A behavioral monitoring system that tracks insider threat indicators across an organization. It aggregates signals — unusual login times, excessive data downloads, access to restricted resources — and feeds them into a risk scoring engine. When scores exceed thresholds, automated alerts are triggered for security teams.",
    features: [
      { icon: "fas fa-eye", text: "Real-time behavioral signal collection and aggregation" },
      { icon: "fas fa-calculator", text: "Weighted risk scoring algorithm per user" },
      { icon: "fas fa-bell", text: "Threshold-based automated alert dispatch" },
      { icon: "fas fa-user-times", text: "Insider threat pattern detection" },
      { icon: "fas fa-clock", text: "Anomalous login time and location detection" },
      { icon: "fas fa-shield-alt", text: "Security team notification dashboard" }
    ],
    stack: [
      { label: "Python", color: "pink" }, { label: "FastAPI", color: "pink" },
      { label: "PostgreSQL", color: "purple" }, { label: "Pandas", color: "cyan" },
      { label: "Celery", color: "yellow" }, { label: "Redis", color: "pink" },
      { label: "SMTP Alerts", color: "cyan" }, { label: "Docker", color: "purple" }
    ],
    challenges: "Balancing false positive rates in the risk scoring model — too sensitive triggers alert fatigue, too lenient misses real threats. Tuning the weighted scoring algorithm required iterative testing with synthetic behavioral datasets.",
    outcome: "Successfully detected 94% of simulated insider threat scenarios in testing. The alert system reduced mean time-to-detection from hours to under 5 minutes in test environments."
  },
  darkweb: {
    title: "Dark Web Threat Dashboard",
    icon: "fas fa-globe",
    color: "#ffe600",
    iconBg: "rgba(255,209,102,0.12)",
    github: "https://github.com/ShrinidhiTotagi/darkweb",
    live: null,
    slides: [
      { icon: "🌐", label: "OSINT Data Aggregator" },
      { icon: "🔑", label: "Credential Leak Detector" },
      { icon: "🕵️", label: "Threat Actor Monitor" },
      { icon: "📊", label: "Intelligence Dashboard" }
    ],
    overview: "A security intelligence dashboard that aggregates and visualizes dark web threat data to support proactive threat hunting. It collects leaked credentials, threat actor mentions, and malicious listings from OSINT sources, normalizes the data, and presents it in a searchable React dashboard with severity classifications.",
    features: [
      { icon: "fas fa-search", text: "OSINT data aggregation from multiple intelligence feeds" },
      { icon: "fas fa-key", text: "Leaked credential detection and domain matching" },
      { icon: "fas fa-user-secret", text: "Threat actor mention tracking and profiling" },
      { icon: "fas fa-tag", text: "Severity classification: Critical / High / Medium / Low" },
      { icon: "fas fa-bell", text: "Real-time alerts for new credential leaks" },
      { icon: "fas fa-chart-pie", text: "Visual breakdown of threat categories and trends" }
    ],
    stack: [
      { label: "Python", color: "yellow" }, { label: "React", color: "cyan" },
      { label: "FastAPI", color: "yellow" }, { label: "PostgreSQL", color: "purple" },
      { label: "OSINT APIs", color: "pink" }, { label: "Scrapy", color: "yellow" },
      { label: "Chart.js", color: "cyan" }, { label: "Docker", color: "purple" }
    ],
    challenges: "Normalizing threat intelligence data from heterogeneous OSINT sources with inconsistent schemas. Handling rate limits and anti-scraping measures while maintaining data freshness for real-time alerting.",
    outcome: "Built a functional threat intelligence platform that aggregates and classifies dark web data. Demonstrated proactive threat hunting capabilities and OSINT integration skills relevant to SOC analyst and threat intelligence roles."
  },
  stutter: {
    title: "Deep Learning-Based Stutter Detection",
    icon: "fas fa-brain",
    color: "#00ffe5",
    iconBg: "rgba(0,255,195,0.12)",
    github: "https://github.com/ShrinidhiTotagi/stutter",
    live: null,
    slides: [
      { icon: "🎙️", label: "Audio Feature Extraction" },
      { icon: "🧠", label: "TensorFlow LSTM Model" },
      { icon: "📊", label: "Stutter Classification Output" },
      { icon: "🏆", label: "1st Prize — Poster Presentation" }
    ],
    overview: "A deep learning model that analyzes audio speech samples to detect and classify stuttering patterns in real time. Built using TensorFlow with a custom LSTM architecture, the system extracts MFCC audio features and classifies speech into stutter types: repetition, prolongation, and blocking. Won 1st prize at a college poster presentation.",
    features: [
      { icon: "fas fa-microphone", text: "MFCC feature extraction from raw audio samples" },
      { icon: "fas fa-brain", text: "LSTM deep learning model for sequence classification" },
      { icon: "fas fa-tags", text: "Multi-class stutter type classification" },
      { icon: "fas fa-bolt", text: "Real-time inference on live audio input" },
      { icon: "fas fa-chart-line", text: "Model accuracy: 89% on validation dataset" },
      { icon: "fas fa-trophy", text: "1st Prize — College Poster Presentation 2024" }
    ],
    stack: [
      { label: "Python", color: "cyan" }, { label: "TensorFlow", color: "cyan" },
      { label: "Keras", color: "purple" }, { label: "Librosa", color: "yellow" },
      { label: "NumPy", color: "cyan" }, { label: "Pandas", color: "pink" },
      { label: "Matplotlib", color: "yellow" }, { label: "MFCC", color: "purple" }
    ],
    challenges: "Collecting and labeling a sufficient stuttering audio dataset for training. Handling variable-length audio sequences in the LSTM model and preventing overfitting on the limited dataset using dropout and data augmentation.",
    outcome: "Achieved 89% classification accuracy on the validation set. The project won 1st prize at the college poster presentation and demonstrated practical application of deep learning to speech disorder detection."
  },
  nmaptoolkit: {
    title: "Nmap Automation Toolkit",
    icon: "fas fa-network-wired",
    color: "#cc44ff",
    iconBg: "rgba(168,85,247,0.12)",
    github: "https://github.com/ShrinidhiTotagi/nmap",
    live: null,
    slides: [
      { icon: "🔍", label: "Network Scan Interface" },
      { icon: "⚙️", label: "Custom Scan Profile Builder" },
      { icon: "📄", label: "JSON / HTML Report Generator" },
      { icon: "🛡️", label: "CVE Correlation Engine" }
    ],
    overview: "A Python-based automation wrapper and toolkit around Nmap for streamlined network reconnaissance. Designed for security professionals and students, it provides a CLI and scripted interface to run batch scans, build custom scan profiles, correlate discovered services with known CVEs, and generate structured JSON/HTML reports.",
    features: [
      { icon: "fas fa-terminal", text: "CLI interface for quick scan execution" },
      { icon: "fas fa-layer-group", text: "Custom scan profile builder (stealth, aggressive, service)" },
      { icon: "fas fa-list", text: "Batch scanning across IP ranges and CIDR blocks" },
      { icon: "fas fa-file-code", text: "Structured JSON and HTML report generation" },
      { icon: "fas fa-bug", text: "CVE correlation for discovered open services" },
      { icon: "fas fa-clock", text: "Scheduled scan automation with cron integration" }
    ],
    stack: [
      { label: "Python", color: "purple" }, { label: "Nmap", color: "purple" },
      { label: "Bash", color: "cyan" }, { label: "python-nmap", color: "yellow" },
      { label: "Jinja2", color: "pink" }, { label: "JSON", color: "cyan" },
      { label: "CVE APIs", color: "purple" }, { label: "Linux", color: "yellow" }
    ],
    challenges: "Handling Nmap's variable XML output formats across different scan types and OS versions. Implementing reliable CVE correlation without overwhelming the NVD API rate limits during large batch scans.",
    outcome: "A fully functional network recon toolkit used during the CampusPe cybersecurity internship. Reduced manual scan setup time by 70% and produced structured reports directly usable in security assessments."
  }
};

projData.postquantum = {
  title: "Post-Quantum Secure Communication",
  icon: "fas fa-atom",
  color: "#cc44ff",
  iconBg: "rgba(168,85,247,0.12)",
  github: "https://github.com/ShrinidhiTotagi/post-quantum-secure-communication",
  live: null,
  slides: [
    { icon: "⚛️", label: "Lattice-Based Key Exchange" },
    { icon: "🔐", label: "CRYSTALS-Kyber Encryption" },
    { icon: "📡", label: "Secure Message Transmission" },
    { icon: "🛡️", label: "Quantum-Resistant Protocol" }
  ],
  overview: "A secure communication system implementing post-quantum cryptography using lattice-based algorithms. Built to be resistant to quantum computing attacks, it uses CRYSTALS-Kyber for key encapsulation and provides end-to-end encrypted messaging that remains secure even against future quantum adversaries.",
  features: [
    { icon: "fas fa-atom", text: "CRYSTALS-Kyber lattice-based key encapsulation" },
    { icon: "fas fa-lock", text: "End-to-end encrypted message transmission" },
    { icon: "fas fa-shield-alt", text: "Quantum-resistant key exchange protocol" },
    { icon: "fas fa-exchange-alt", text: "Secure session establishment between parties" },
    { icon: "fas fa-key", text: "Ephemeral key generation per session" },
    { icon: "fas fa-check-circle", text: "Message integrity verification" }
  ],
  stack: [
    { label: "Python", color: "purple" }, { label: "CRYSTALS-Kyber", color: "purple" },
    { label: "FastAPI", color: "cyan" }, { label: "PQCrypto", color: "pink" },
    { label: "AES-256", color: "yellow" }, { label: "REST API", color: "cyan" }
  ],
  challenges: "Integrating post-quantum cryptographic libraries with standard Python web frameworks. Balancing the computational overhead of lattice-based operations with acceptable message latency for real-time communication.",
  outcome: "A working proof-of-concept for quantum-resistant secure messaging. Demonstrates understanding of next-generation cryptographic standards and their practical implementation in Python web applications."
};

let pmCurrentSlide = 0;
let pmTotalSlides = 0;

function openProjModal(key) {
  const d = projData[key];
  pmCurrentSlide = 0;
  pmTotalSlides = d.slides.length;

  // Gallery
  const slides = document.getElementById("pmSlides");
  const dots = document.getElementById("pmDots");
  slides.innerHTML = d.slides.map(s =>
    `<div class="pm-slide" style="background:linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3))">
      <span>${s.icon}</span>
      <span class="pm-slide-label">${s.label}</span>
    </div>`
  ).join("");
  dots.innerHTML = d.slides.map((_, i) =>
    `<div class="pm-dot${i===0?' active':''}" onclick="pmGoTo(${i})"></div>`
  ).join("");
  slides.style.transform = "translateX(0)";

  // Icon
  const icon = document.getElementById("pmIcon");
  icon.style.background = d.iconBg;
  icon.style.color = d.color;
  icon.innerHTML = `<i class="${d.icon}"></i>`;

  // Title
  document.getElementById("pmTitle").textContent = d.title;

  // Links
  const links = document.getElementById("pmLinks");
  links.innerHTML = `<a href="${d.github}" target="_blank" class="pm-link pm-link-github"><i class="fab fa-github"></i> GitHub</a>` +
    (d.live
      ? `<a href="${d.live}" target="_blank" class="pm-link pm-link-live"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : `<span class="pm-link pm-link-soon"><i class="fas fa-clock"></i> Not Deployed Yet</span>`);

  // Overview
  document.getElementById("pmOverview").textContent = d.overview;

  // Features
  document.getElementById("pmFeatures").innerHTML = d.features.map(f =>
    `<div class="pm-feature"><i class="${f.icon}" style="color:${d.color}"></i><span>${f.text}</span></div>`
  ).join("");

  // Stack
  const colorMap = { cyan: "tg-cyan", purple: "tg-purple", pink: "tg-pink", yellow: "tg-yellow" };
  document.getElementById("pmStack").innerHTML = d.stack.map(s =>
    `<span class="${colorMap[s.color]}">${s.label}</span>`
  ).join("");

  // Challenges & Outcome
  document.getElementById("pmChallenges").textContent = d.challenges;
  document.getElementById("pmOutcome").textContent = d.outcome;

  document.getElementById("projModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeProjModal() {
  document.getElementById("projModal").classList.add("hidden");
  document.body.style.overflow = "";
}

function pmGoTo(index) {
  pmCurrentSlide = index;
  document.getElementById("pmSlides").style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".pm-dot").forEach((d, i) => d.classList.toggle("active", i === index));
}

function pmSlide(dir) {
  pmGoTo((pmCurrentSlide + dir + pmTotalSlides) % pmTotalSlides);
}

document.getElementById("projModal").addEventListener("click", e => {
  if (e.target === document.getElementById("projModal")) closeProjModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeProjModal(); });


/* ============================================================
   NEW PREMIUM PROJECT CARDS — NPC SYSTEM
   ============================================================ */

/* ---- Scroll reveal ---- */
const npcObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.npc-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('npc-visible'), i * 130);
      });
      npcObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
const npcGrid = document.getElementById('npcGrid');
if (npcGrid) npcObserver.observe(npcGrid);

/* ---- Filter ---- */
document.querySelectorAll('.npc-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.npc-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.npc-card').forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('npc-hidden', !show);
    });
  });
});

/* ---- 3D tilt on mouse move ---- */
document.querySelectorAll('.npc-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `translateY(-12px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- projData entries for new card keys ---- */
projData.deceptiongrid = {
  title: "AI-Powered Deception Grid",
  icon: "fas fa-spider-web",
  color: "#00ff88",
  iconBg: "rgba(0,255,136,0.12)",
  github: "https://github.com/ShrinidhiTotagi",
  live: null,
  slides: [
    { icon: "🕸️", label: "Cowrie Honeypot Deployment" },
    { icon: "🛡️", label: "Suricata IDS Rules Engine" },
    { icon: "📊", label: "Elastic Stack Dashboard" },
    { icon: "🤖", label: "Automated Threat Analysis" }
  ],
  overview: "Enterprise deception platform that deploys Cowrie SSH/Telnet honeypots alongside Suricata IDS to lure, detect and profile attackers. All events are ingested into the Elastic Stack for real-time threat analysis and automated attacker profiling.",
  features: [
    { icon: "fas fa-spider-web", text: "Cowrie honeypot with full session logging" },
    { icon: "fas fa-shield-halved", text: "Suricata IDS with custom rule sets" },
    { icon: "fas fa-chart-bar", text: "Elastic Stack real-time dashboards" },
    { icon: "fas fa-robot", text: "Automated attacker profiling and scoring" },
    { icon: "fas fa-bell", text: "Alert dispatch on high-confidence threats" },
    { icon: "fas fa-map-marker-alt", text: "GeoIP attacker origin mapping" }
  ],
  stack: [
    { label: "Python", color: "cyan" }, { label: "Cowrie", color: "cyan" },
    { label: "Suricata", color: "purple" }, { label: "Elasticsearch", color: "yellow" },
    { label: "Kibana", color: "cyan" }, { label: "Logstash", color: "pink" },
    { label: "Linux", color: "purple" }, { label: "Docker", color: "cyan" }
  ],
  challenges: "Tuning Suricata rules to minimise false positives while ensuring Cowrie sessions were convincing enough to keep attackers engaged for profiling. Correlating honeypot and IDS events in Elastic required careful index mapping.",
  outcome: "A fully operational deception grid that successfully captured and profiled simulated attacker sessions. Demonstrated at the National Cybersecurity Hackathon as part of team AetherGrid's defence strategy."
};
