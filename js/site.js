// Site motion: one orchestrated hero sequence plus quiet scroll reveals.
// Everything on the page is fully visible without JavaScript; the tweens
// below only animate FROM an offset, so a missing library, a blocked CDN
// (all scripts here are first-party anyway) or a reduced-motion preference
// degrades to the finished static page.
(function () {
  "use strict";

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function finePointer() {
    return window.matchMedia("(pointer: fine)").matches;
  }

  function initCounters(gsap, trigger) {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (!isFinite(target)) return;
      var decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
      var state = { value: 0 };
      gsap.to(state, {
        value: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: trigger
          ? { trigger: el, start: "top 88%", once: true }
          : undefined,
        onUpdate: function () {
          el.textContent = state.value.toFixed(decimals);
        }
      });
    });
  }

  function initReveals(gsap) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
  }

  function initHero(gsap) {
    var hero = document.querySelector("[data-hero]");
    if (!hero) return;
    var timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline
      .from("[data-hero-copy] > *", { y: 26, opacity: 0, duration: 0.7, stagger: 0.09 })
      .from("[data-trace]", { y: 26, opacity: 0, duration: 0.8 }, "-=0.45")
      .from("[data-trace] .trace-step", { opacity: 0, x: -10, duration: 0.45, stagger: 0.28 })
      .from("[data-trace] .trace-verdict", { opacity: 0, duration: 0.5 }, "-=0.1");
  }

  function initMagnet() {
    if (!finePointer() || reducedMotion()) return;
    var strength = 6;
    document.querySelectorAll("[data-magnet]").forEach(function (el) {
      el.addEventListener("pointermove", function (event) {
        var box = el.getBoundingClientRect();
        var dx = event.clientX - (box.left + box.width / 2);
        var dy = event.clientY - (box.top + box.height / 2);
        var pull = strength / Math.max(box.width, box.height);
        el.style.transform = "translate(" + (dx * pull * 2).toFixed(1) + "px," + (dy * pull * 2).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  function init() {
    initMagnet();
    if (reducedMotion()) return;
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var hasTrigger = typeof window.ScrollTrigger !== "undefined";
    if (hasTrigger) gsap.registerPlugin(window.ScrollTrigger);
    initHero(gsap);
    if (hasTrigger) {
      initReveals(gsap);
      initCounters(gsap, true);
      // Images and webfonts shift section positions after first paint;
      // re-measure once everything lands so mobile triggers cannot stick.
      window.addEventListener("load", function () {
        window.ScrollTrigger.refresh();
      });
    } else {
      initCounters(gsap, false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
