// Central product catalog for anagumai.com. Single source of truth for the
// homepage #products section and /products. To add a product, append an
// entry; no markup changes needed. Statuses: Live | Private Beta | Launching Soon.
(function () {
  "use strict";

  var PRODUCTS = [
    {
      slug: "the-eye",
      name: "THE EYE",
      tagline: "AI research worksuite your team can check",
      description:
        "Source-linked research scans, cited AI agents with human approval gates, team workspaces, and an auditable finance ledger: academic, medical, and finance research in one place.",
      platforms: ["Web"],
      status: "Live",
      url: "https://app.anagumai.com",
      supportEmail: "support@anagumai.com",
      privacyUrl: "/privacy",
    },
  ];

  function badge(text, tone) {
    var span = document.createElement("span");
    span.className = "badge badge-outline badge-sm" + (tone ? " " + tone : "");
    span.textContent = text;
    return span;
  }

  function card(product) {
    var article = document.createElement("article");
    article.className = "card bg-base-100 border border-base-300";
    var body = document.createElement("div");
    body.className = "card-body";
    var head = document.createElement("div");
    head.className = "flex flex-wrap items-center gap-2";
    var title = document.createElement("h3");
    title.className = "card-title";
    var name = document.createElement("a");
    name.href = "/products/" + product.slug;
    name.textContent = product.name;
    title.appendChild(name);
    head.appendChild(title);
    head.appendChild(badge(product.status, product.status === "Live" ? "badge-success" : ""));
    product.platforms.forEach(function (platform) {
      head.appendChild(badge(platform));
    });
    body.appendChild(head);
    var tagline = document.createElement("p");
    tagline.className = "font-semibold";
    tagline.textContent = product.tagline;
    body.appendChild(tagline);
    var description = document.createElement("p");
    description.className = "text-base-content/70";
    description.textContent = product.description;
    body.appendChild(description);
    var actions = document.createElement("div");
    actions.className = "card-actions pt-2";
    var visit = document.createElement("a");
    visit.className = "btn btn-primary btn-sm";
    visit.href = product.url;
    visit.textContent = product.status === "Live" ? "Visit product" : "Request access";
    if (/^https?:/.test(product.url)) visit.rel = "noopener";
    actions.appendChild(visit);
    var details = document.createElement("a");
    details.className = "btn btn-ghost btn-sm";
    details.href = "/products/" + product.slug;
    details.textContent = "View details";
    actions.appendChild(details);
    var privacy = document.createElement("a");
    privacy.className = "btn btn-ghost btn-sm";
    privacy.href = product.privacyUrl;
    privacy.textContent = "Privacy & Support";
    actions.appendChild(privacy);
    body.appendChild(actions);
    article.appendChild(body);
    return article;
  }

  function renderAll() {
    document.querySelectorAll("[data-products]").forEach(function (mount) {
      mount.textContent = "";
      var grid = document.createElement("div");
      grid.className = mount.getAttribute("data-products") || "grid gap-5 md:grid-cols-2 pt-10";
      PRODUCTS.forEach(function (product) {
        grid.appendChild(card(product));
      });
      mount.appendChild(grid);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll, { once: true });
  } else {
    renderAll();
  }
})();
