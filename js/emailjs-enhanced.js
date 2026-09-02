const EMAILJS_PUBLIC_KEY     = "NGKnje_lZctQhVGMs";
const EMAILJS_SERVICE_ID     = "service_9n4j8vb";
const CONTACT_TEMPLATE_ID    = "template_e0nit97";
const VISITOR_TEMPLATE_ID    = "template_g7bussp";

emailjs.init(EMAILJS_PUBLIC_KEY);

function showNotification(msg, isError = false) {
  let el = document.getElementById("ej-notification");
  if (!el) {
    el = document.createElement("div");
    el.id = "ej-notification";
    el.style.cssText = `
      position:fixed;bottom:30px;right:30px;z-index:9999;
      padding:14px 22px;border-radius:6px;font-family:monospace;font-size:13px;
      border:1px solid;max-width:340px;transition:opacity 0.4s;
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background    = isError ? "rgba(255,77,109,0.12)" : "rgba(0,255,195,0.1)";
  el.style.borderColor   = isError ? "#ff4d6d" : "#00ffc3";
  el.style.color         = isError ? "#ff4d6d" : "#00ffc3";
  el.style.opacity       = "1";
  setTimeout(() => { el.style.opacity = "0"; }, 4000);
}

function validateContactForm(name, email, message) {
  if (!/^[A-Za-z\s]{2,}$/.test(name.trim()))
    return "Name must be at least 2 characters (letters and spaces only).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Please enter a valid email address.";
  if (message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

function sendMessage(e) {
  e.preventDefault();
  const form    = e.target;
  const name    = form.querySelector("[name='from_name']").value;
  const email   = form.querySelector("[name='from_email']").value;
  const message = form.querySelector("[name='message']").value;
  const btn     = form.querySelector("button[type='submit']");

  const error = validateContactForm(name, email, message);
  if (error) { showNotification(error, true); return; }

  btn.disabled    = true;
  btn.textContent = "TRANSMITTING…";

  const params = {
    title:          `Message from ${name}`,
    visitor_name:   sessionStorage.getItem("visitorName") || "Unknown",
    from_name:      name,
    from_email:     email,
    security_level: "Standard",
    message:        message,
    timestamp:      new Date().toISOString(),
    page_url:       window.location.href,
    user_agent:     navigator.userAgent,
    to_name:        "Shrinidhi Totagi",
    to_email:       "shrinidhi@email.com"
  };

  emailjs.send(EMAILJS_SERVICE_ID, CONTACT_TEMPLATE_ID, params)
    .then(() => {
      showNotification("Message transmitted successfully. I'll get back to you soon!");
      form.reset();
    })
    .catch(() => showNotification("Failed to send message. Please try again.", true))
    .finally(() => {
      btn.disabled    = false;
      btn.innerHTML   = '<i class="fas fa-paper-plane"></i> Send Message';
    });
}
