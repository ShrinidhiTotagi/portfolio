// ---- Fake backend simulation (intentional) ----
const originalFetch = window.fetch;

window.fetch = function (url, options = {}) {
  if (
    url === "/flag" &&
    options.method === "POST" &&
    options.headers &&
    options.headers["X-Access-Level"] === "candidate"
  ) {
    return Promise.resolve(
      new Response("flag{headers_control_access}", { status: 200 })
    );
  }
  return originalFetch(url, options);
};

// ---- Button logic ----
document.getElementById("requestBtn").addEventListener("click", () => {
  fetch("/flag", {
    method: "POST",
    headers: {
      "X-Access-Level": "candidate"
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Access denied");
      return res.text();
    })
    .then(data => {
      document.getElementById("output").textContent = data;
    })
    .catch(() => {
      document.getElementById("output").textContent =
        "Nothing happened. Maybe the request wasn’t correct.";
    });
});
