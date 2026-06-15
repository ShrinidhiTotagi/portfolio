function parseUserAgent(ua) {
  let browser = "Unknown", browserVersion = "Unknown", os = "Unknown", osVersion = "Unknown", device = "Desktop";

  if (/Edg\/([\d.]+)/.test(ua))        { browser = "Edge";    browserVersion = RegExp.$1; }
  else if (/OPR\/([\d.]+)/.test(ua))   { browser = "Opera";   browserVersion = RegExp.$1; }
  else if (/Chrome\/([\d.]+)/.test(ua)){ browser = "Chrome";  browserVersion = RegExp.$1; }
  else if (/Firefox\/([\d.]+)/.test(ua)){ browser = "Firefox"; browserVersion = RegExp.$1; }
  else if (/Version\/([\d.]+).*Safari/.test(ua)){ browser = "Safari"; browserVersion = RegExp.$1; }

  if (/Windows NT ([\d.]+)/.test(ua))      { os = "Windows"; osVersion = RegExp.$1; }
  else if (/Mac OS X ([\d_]+)/.test(ua))   { os = "macOS";   osVersion = RegExp.$1.replace(/_/g, "."); }
  else if (/Android ([\d.]+)/.test(ua))    { os = "Android"; osVersion = RegExp.$1; }
  else if (/iPhone OS ([\d_]+)/.test(ua))  { os = "iOS";     osVersion = RegExp.$1.replace(/_/g, "."); }
  else if (/iPad.*OS ([\d_]+)/.test(ua))   { os = "iOS";     osVersion = RegExp.$1.replace(/_/g, "."); }
  else if (/Linux/.test(ua))               { os = "Linux";   osVersion = "Unknown"; }

  if (/Mobi|Android|iPhone/.test(ua)) device = "Mobile";
  else if (/iPad|Tablet/.test(ua))    device = "Tablet";

  return { browser, browserVersion, os, osVersion, device };
}

function getWebGLInfo() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return { support: "No", vendor: "N/A", renderer: "N/A" };
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    return {
      support:  "Yes",
      vendor:   ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)   : "Unknown",
      renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "Unknown"
    };
  } catch { return { support: "No", vendor: "N/A", renderer: "N/A" }; }
}

function collectVisitorInfo() {
  const ua     = navigator.userAgent;
  const parsed = parseUserAgent(ua);
  const webgl  = getWebGLInfo();
  const conn   = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
  const qp     = new URLSearchParams(window.location.search);
  const now    = new Date();

  const orientation = screen.orientation
    ? screen.orientation.type
    : (window.innerWidth > window.innerHeight ? "landscape" : "portrait");

  return {
    // Identity & Session
    session_id:        Math.random().toString(36).substring(2, 12).toUpperCase(),
    anonymous_id:      localStorage.getItem("anonId") || (() => {
                         const id = Math.random().toString(36).substring(2, 18);
                         localStorage.setItem("anonId", id);
                         return id;
                       })(),
    timestamp:         now.toISOString(),
    local_time:        now.toLocaleString(),

    // Page context
    page_url:          window.location.href,
    page_path:         window.location.pathname,
    page_title:        document.title,
    referrer:          document.referrer || "Direct",
    document_referrer: document.referrer || "Direct",

    // Display
    screen_resolution: screen.width + " x " + screen.height,
    viewport_size:     window.innerWidth + " x " + window.innerHeight,
    color_depth:       screen.colorDepth || "Unknown",
    pixel_ratio:       window.devicePixelRatio || 1,
    screen_orientation: orientation,

    // Browser & System
    user_agent:        ua,
    browser_name:      parsed.browser,
    browser_version:   parsed.browserVersion,
    platform:          navigator.platform || "Unknown",
    os_name:           parsed.os,
    os_version:        parsed.osVersion,
    device_type:       parsed.device,
    language:          navigator.language || "Unknown",
    languages:         (navigator.languages || [navigator.language]).join(", "),
    timezone:          Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset:   now.getTimezoneOffset(),

    // Network
    connection_type:   conn.effectiveType || conn.type || "Unknown",
    online_status:     navigator.onLine ? "Online" : "Offline",

    // Hardware
    webgl_support:     webgl.support,
    webgl_vendor:      webgl.vendor,
    webgl_renderer:    webgl.renderer,
    canvas_support:    (() => { try { return !!document.createElement("canvas").getContext("2d"); } catch { return false; } })(),

    // UTM
    utm_source:        qp.get("utm_source")   || "",
    utm_medium:        qp.get("utm_medium")   || "",
    utm_campaign:      qp.get("utm_campaign") || "",

    // IP / Geo (filled after fetch)
    ip_address:  "",
    country:     "",
    city:        "",
    region:      "",
    postal_code: "",
    latitude:    "",
    longitude:   "",
    isp:         "",
    organization:"",
    asn:         ""
  };
}

function sendVisitorData(name, info) {
  const params = Object.assign({ visitor_name: name }, info);
  emailjs.send(EMAILJS_SERVICE_ID, VISITOR_TEMPLATE_ID, params)
    .catch(err => console.error("EmailJS visitor send failed:", JSON.stringify(err)));
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("portfolioVisited")) return;

  const splash = document.getElementById("splashScreen");
  const btn    = document.getElementById("enterSite");
  const input  = document.getElementById("visitorName");

  if (!splash || !btn || !input) return;

  splash.style.display = "flex";

  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) {
      input.style.borderColor = "#ff4d6d";
      input.placeholder = "Please enter your name…";
      return;
    }

    sessionStorage.setItem("visitorName", name);
    sessionStorage.setItem("portfolioVisited", "true");
    splash.style.opacity = "0";
    setTimeout(() => { splash.style.display = "none"; }, 500);

    const info = collectVisitorInfo();
    info.visitor_name = name;

    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d => {
        info.ip_address   = d.ip           || "";
        info.country      = d.country_name || "";
        info.city         = d.city         || "";
        info.region       = d.region       || "";
        info.postal_code  = d.postal       || "";
        info.latitude     = d.latitude     || "";
        info.longitude    = d.longitude    || "";
        info.isp          = d.org          || "";
        info.organization = d.org          || "";
        info.asn          = d.asn          || "";
      })
      .catch(() => {})
      .finally(() => sendVisitorData(name, info));
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") btn.click();
  });
});
