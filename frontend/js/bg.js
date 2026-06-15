const canvas = document.getElementById("bg3d");
if (!canvas) throw new Error("bg3d canvas not found");
const ctx = canvas.getContext("2d");

/* ===== CANVAS SIZE ===== */
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

window.addEventListener("resize", resizeCanvas);

/* ===== SETTINGS ===== */
const chars = "01";
const fontSize = 14;

let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

/* ===== DRAW LOOP ===== */
function draw(){

  /* trail fade (controls smoothness) */
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  for(let i = 0; i < drops.length; i++){

    const text = chars[Math.floor(Math.random() * chars.length)];

    /* 🔥 COLOR VARIATION (this is what you asked) */
    ctx.fillStyle = `hsl(${Math.random() * 40 + 140}, 100%, 60%)`;

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    /* reset randomly */
    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(draw);
}

/* ===== INIT ===== */
resizeCanvas();
draw();