const output = document.getElementById("output");
let touched = false;

["mousemove", "keydown", "click", "scroll"].forEach(evt =>
  document.addEventListener(evt, () => {
    touched = true;
    output.textContent = "You acted too fast.\nTry again.";
  })
);

setTimeout(() => {
  if (!touched) {
    output.textContent =
      "No interaction detected.\n\nflag{patience_is_a_skill}";
  }
}, 6000);
