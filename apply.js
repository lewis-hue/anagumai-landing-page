// Composes a job application email from the careers form and opens it in
// the applicant's mail app, where they attach their resume. No backend:
// the site is static, so mailto carries the structured fields.
(function () {
  "use strict";

  var CAREERS_EMAIL = "careers@anagumai.com";

  function buildMailto(fields) {
    var subject = "Application: " + fields.position + " - " + fields.name;
    var lines = [
      "Name: " + fields.name,
      "Email: " + fields.email,
      "Position: " + fields.position,
      "LinkedIn: " + (fields.linkedin || "-"),
      "Portfolio: " + (fields.portfolio || "-"),
      "",
      fields.note || "(No cover note)",
      "",
      "---",
      "Resume attached to this email by the applicant."
    ];
    return (
      "mailto:" + CAREERS_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"))
    );
  }

  function init() {
    var position = document.getElementById("apply-position");
    var submit = document.getElementById("apply-submit");
    var status = document.getElementById("apply-status");
    if (!position || !submit || !status) return;

    document.querySelectorAll("[data-apply-for]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        position.value = btn.getAttribute("data-apply-for");
      });
    });

    submit.addEventListener("click", function () {
      var name = document.getElementById("apply-name").value.trim();
      var email = document.getElementById("apply-email").value.trim();
      if (!name || email.indexOf("@") < 1 || !position.value) {
        status.textContent = "Please fill in your name, a valid email and a position.";
        return;
      }
      window.location.href = buildMailto({
        name: name,
        email: email,
        position: position.value,
        linkedin: document.getElementById("apply-linkedin").value.trim(),
        portfolio: document.getElementById("apply-portfolio").value.trim(),
        note: document.getElementById("apply-note").value.trim()
      });
      status.textContent = "Your email app should now open with the application ready. Please attach your resume before sending.";
    });
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { buildMailto: buildMailto, careersEmail: CAREERS_EMAIL };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
