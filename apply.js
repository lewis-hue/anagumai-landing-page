// Submits the careers form (including the resume file) to the Basin form
// backend via AJAX. The endpoint lives in the form's data-endpoint
// attribute; validation runs first and status is reported inline.
(function () {
  "use strict";

  var MAX_RESUME_BYTES = 10 * 1024 * 1024;
  var PLACEHOLDER = "REPLACE-WITH-YOUR-FORM-ID";

  function validateApplication(fields, file) {
    if (!fields.name) return "Please fill in your name.";
    if (fields.email.indexOf("@") < 1) return "Please fill in a valid email.";
    if (!fields.position) return "Please choose a position.";
    if (!file || file.size === 0) return "Please attach your resume (PDF or Word).";
    if (file.size > MAX_RESUME_BYTES) return "Please attach a resume under 10 MB.";
    return null;
  }

  function submitApplication(endpoint, formData, fetchImpl) {
    return fetchImpl(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    }).then(function (response) {
      return response.ok;
    }).catch(function () {
      return false;
    });
  }

  function init() {
    var form = document.getElementById("apply-form");
    var position = document.getElementById("apply-position");
    var submit = document.getElementById("apply-submit");
    var status = document.getElementById("apply-status");
    if (!form || !position || !submit || !status) return;

    document.querySelectorAll("[data-apply-for]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        position.value = btn.getAttribute("data-apply-for");
      });
    });

    submit.addEventListener("click", function () {
      var endpoint = form.getAttribute("data-endpoint") || "";
      if (endpoint.indexOf(PLACEHOLDER) !== -1) {
        status.textContent = "Applications are opening soon. Please email careers@anagumai.com for now.";
        return;
      }
      var resume = document.getElementById("apply-resume").files[0];
      var error = validateApplication({
        name: document.getElementById("apply-name").value.trim(),
        email: document.getElementById("apply-email").value.trim(),
        position: position.value
      }, resume);
      if (error) {
        status.textContent = error;
        return;
      }
      submit.disabled = true;
      status.textContent = "Sending your application...";
      submitApplication(endpoint, new FormData(form), window.fetch.bind(window)).then(function (ok) {
        submit.disabled = false;
        if (ok) {
          form.reset();
          status.textContent = "Application sent. We read every one and reply to shortlisted candidates.";
        } else {
          status.textContent = "Something went wrong. Please email careers@anagumai.com with your resume attached.";
        }
      });
    });
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      validateApplication: validateApplication,
      submitApplication: submitApplication,
      maxResumeBytes: MAX_RESUME_BYTES
    };
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
