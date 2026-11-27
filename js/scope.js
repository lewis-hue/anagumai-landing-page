// Composes the structured project inquiry on contact.html into a mailto link.
// Project inquiries route to sales@; product-support inquiries route to
// support@. Validation runs first and status is reported inline. Kept in an
// external file because the site's enforcing Content-Security-Policy blocks
// inline scripts.
(function () {
  "use strict";

  function init() {
    var submit = document.getElementById("scope-submit");
    var status = document.getElementById("scope-status");
    if (!submit || !status) return;
    submit.addEventListener("click", function () {
      var name = document.getElementById("scope-name").value.trim();
      var email = document.getElementById("scope-email").value.trim();
      var company = document.getElementById("scope-company").value.trim();
      var category = document.getElementById("scope-category").value;
      var stage = document.getElementById("scope-stage").value;
      var nda = document.querySelector('input[name="nda"]:checked');
      var brief = document.getElementById("scope-brief").value.trim();
      if (!name) { status.textContent = "Please fill in your name."; return; }
      if (email.indexOf("@") < 1) { status.textContent = "Please fill in a valid work email."; return; }
      if (!category) { status.textContent = "Please choose a project category."; return; }
      if (!stage) { status.textContent = "Please choose a project stage."; return; }
      if (!brief) { status.textContent = "Please add a few lines about the project."; return; }
      var to = category === "Product Support / Partnership" ? "support@anagumai.com" : "sales@anagumai.com";
      var subject = "Project inquiry: " + category + " \u2014 " + name;
      var body = "Name: " + name + "\nEmail: " + email +
        (company ? "\nCompany: " + company : "") +
        "\nCategory: " + category + "\nStage: " + stage +
        "\nNDA required: " + (nda ? nda.value : "No") + "\n\n" + brief;
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email client to send the inquiry to " + to + ".";
    });
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
