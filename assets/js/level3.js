document.getElementById("verifyBtn").addEventListener("click", () => {
  const f1 = document.getElementById("flag1").value.trim();
  const f2 = document.getElementById("flag2").value.trim();
  const out = document.getElementById("output");

  if (
    f1 === "flag{silent_requests_speak}" &&
    f2 === "flag{patience_is_a_skill}"
  ) {
    out.textContent =
      "Correlation successful.\n\nFINAL FLAG:\nflag{chaining_beats_single_steps}";
  } else {
    out.textContent =
      "Correlation failed.\nReview previous levels.";
  }
});
