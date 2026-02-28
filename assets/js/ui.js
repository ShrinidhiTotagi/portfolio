let currentProject = null;

/* =========================
   PROJECT CONFIG
========================= */
const projects = {
  honeypot: {
    flag: "flag{chaining_beats_single_steps}",
    challenge: "labs/level1.html",
    overview: "projects/honeypot.html"
  },
  ctf: {
    flag: "flag{chaining_beats_single_steps}",
    challenge: "labs/level1.html",
    overview: "projects/ctf.html"
  }
};

/* =========================
   OPEN MODAL
========================= */
function openGate(projectKey) {
  currentProject = projectKey;

  document.getElementById("flagInput").value = "";
  document.getElementById("modalMsg").textContent = "";
  document.getElementById("visitLink").href =
    projects[projectKey].challenge;

  document.getElementById("flagModal")
    .classList.remove("hidden");
}

/* =========================
   CLOSE MODAL
========================= */
function closeModal() {
  document.getElementById("flagModal")
    .classList.add("hidden");
}

/* =========================
   FLAG VALIDATION
========================= */
function checkFlag() {
  const input =
    document.getElementById("flagInput").value.trim();

  if (input === projects[currentProject].flag) {
    closeModal();

    // ✅ Redirect to project details
    window.location.href =
      projects[currentProject].overview;
  } else {
    document.getElementById("modalMsg").textContent =
      "Invalid flag. Complete the lab.";
  }
}
