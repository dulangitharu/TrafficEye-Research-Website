/* TrafficEye Research Portfolio — minimal vanilla JavaScript.
   Everything degrades gracefully when JavaScript is off. */
(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var smooth = reduceMotion ? "auto" : "smooth";

  /* ---------- Mobile navigation ---------- */
  var toggle = doc.querySelector(".nav-toggle");
  function setNav(open) {
    root.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setNav(!root.classList.contains("nav-open")); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) { setNav(false); toggle.focus(); }
    });
    doc.addEventListener("click", function (e) {
      if (root.classList.contains("nav-open") && !e.target.closest(".navbar")) setNav(false);
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 980) setNav(false); });
  }

  /* ---------- Back to top ---------- */
  var backTop = doc.querySelector(".back-top");
  if (backTop) {
    var onScroll = function () { backTop.classList.toggle("is-visible", window.scrollY > 700); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: smooth });
      var target = doc.getElementById("main");
      if (target) target.focus({ preventScroll: true });
    });
  }

  /* ---------- Restrained reveal ---------- */
  var reveals = doc.querySelectorAll("[data-reveal]");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Section navigation highlight (Domain page) ---------- */
  var anchorLinks = Array.prototype.slice.call(doc.querySelectorAll(".anchor-nav a[href^='#']"));
  if (anchorLinks.length && "IntersectionObserver" in window) {
    var strip = doc.querySelector(".anchor-nav ol");
    var setActive = function (id) {
      anchorLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) {
          a.setAttribute("aria-current", "location");
          if (strip && strip.scrollWidth > strip.clientWidth + 4) strip.scrollTo({ left: a.parentNode.offsetLeft - (strip.clientWidth - a.parentNode.offsetWidth) / 2, behavior: smooth });
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    anchorLinks.forEach(function (a) {
      var s = doc.getElementById(a.getAttribute("href").slice(1));
      if (s) spy.observe(s);
    });
  }

  /* ---------- Lightbox ---------- */
  var zoomables = Array.prototype.slice.call(doc.querySelectorAll(".zoomable"));
  if (zoomables.length && typeof HTMLDialogElement === "function") {
    var svg = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
    var dlg = doc.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Enlarged image");
    dlg.innerHTML =
      '<div class="lightbox__top"><span class="lightbox__count" aria-live="polite"></span>' +
      '<button type="button" class="icon-btn" data-lb="close" aria-label="Close enlarged image">' + svg("M6 6l12 12M18 6 6 18") + "</button></div>" +
      '<div class="lightbox__stage"><button type="button" class="icon-btn" data-lb="prev" aria-label="Previous image">' + svg("m15 6-6 6 6 6") + "</button>" +
      '<img class="lightbox__img" alt=""><button type="button" class="icon-btn" data-lb="next" aria-label="Next image">' + svg("m9 6 6 6-6 6") + "</button></div>" +
      '<p class="lightbox__cap"></p>';
    doc.body.appendChild(dlg);
    var img = dlg.querySelector(".lightbox__img");
    var cap = dlg.querySelector(".lightbox__cap");
    var count = dlg.querySelector(".lightbox__count");
    var prev = dlg.querySelector('[data-lb="prev"]');
    var next = dlg.querySelector('[data-lb="next"]');
    var group = [], index = 0, opener = null;
    var show = function (i) {
      index = (i + group.length) % group.length;
      var el = group[index];
      var im = el.querySelector("img");
      img.src = im.currentSrc || im.src;
      img.alt = im.alt;
      cap.textContent = el.getAttribute("data-caption") || im.alt;
      count.textContent = group.length > 1 ? (index + 1) + " of " + group.length : "";
      prev.hidden = next.hidden = group.length < 2;
    };
    zoomables.forEach(function (el) {
      el.addEventListener("click", function () {
        var g = el.getAttribute("data-group");
        group = g ? zoomables.filter(function (z) { return z.getAttribute("data-group") === g; }) : [el];
        opener = el;
        show(group.indexOf(el));
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lb]");
      if (b) {
        var a = b.getAttribute("data-lb");
        if (a === "close") dlg.close();
        if (a === "prev") show(index - 1);
        if (a === "next") show(index + 1);
      } else if (e.target === dlg || e.target.classList.contains("lightbox__stage")) {
        dlg.close();
      }
    });
    dlg.addEventListener("keydown", function (e) {
      if (group.length < 2) return;
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    dlg.addEventListener("close", function () { img.removeAttribute("src"); if (opener) opener.focus(); });
  }

  /* ---------- Milestones: dropdown + deep links ---------- */
  var msSelect = doc.getElementById("ms-select");
  function goToMilestone(id) {
    var item = doc.getElementById(id);
    if (!item || !item.classList.contains("tl")) return;
    item.scrollIntoView({ behavior: smooth, block: "center" });
    if (msSelect) msSelect.value = id;
    doc.querySelectorAll(".tl.is-flash").forEach(function (t) { t.classList.remove("is-flash"); });
    item.classList.add("is-flash");
    window.setTimeout(function () { item.classList.remove("is-flash"); }, 2200);
    var title = item.querySelector(".tl__title");
    if (title) { title.setAttribute("tabindex", "-1"); title.focus({ preventScroll: true }); }
  }
  if (msSelect) {
    msSelect.addEventListener("change", function () {
      if (!msSelect.value) return;
      if (history.replaceState) history.replaceState(null, "", "#" + msSelect.value);
      goToMilestone(msSelect.value);
    });
  }
  if (doc.querySelector(".timeline")) {
    var fromHash = function () { var id = decodeURIComponent(location.hash.slice(1)); if (id) goToMilestone(id); };
    window.addEventListener("hashchange", fromHash);
    if (location.hash) window.setTimeout(fromHash, 80);
  }

  /* ---------- Copy e-mail template ---------- */
  doc.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = doc.getElementById(btn.getAttribute("data-copy-target"));
      var status = doc.getElementById(btn.getAttribute("data-copy-status"));
      if (!src) return;
      var done = function (ok) { if (status) status.textContent = ok ? "Template copied." : "Copy failed. Select the text and copy it manually."; };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(src.innerText).then(function () { done(true); }, function () { done(false); });
      } else {
        var r = doc.createRange(); r.selectNodeContents(src);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        var ok = false; try { ok = doc.execCommand("copy"); } catch (err) { ok = false; }
        sel.removeAllRanges(); done(ok);
      }
    });
  });

  /* ---------- Contact form: opens the visitor's email app (no server) ---------- */
  var form = doc.getElementById("contact-form");
  if (form) {
    var recipient = (form.getAttribute("data-recipient") || "").trim();
    var submit = form.querySelector("button[type='submit']");
    var status = doc.getElementById("form-status");
    var valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipient);
    if (!valid) {
      if (submit) { submit.disabled = true; submit.setAttribute("aria-describedby", "form-status"); }
    } else if (status) {
      status.textContent = "Selecting “Open in email app” prepares this message in your own email app. Nothing is sent from this website.";
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!valid) return;
      if (!form.reportValidity()) return;
      var v = function (n) { return (form.elements[n] && form.elements[n].value || "").trim(); };
      var body = v("message") + "\n\n" + v("name") + "\n" + v("email");
      var url = "mailto:" + recipient + "?subject=" + encodeURIComponent(v("subject") || "TrafficEye research enquiry (R26-IT-056)") + "&body=" + encodeURIComponent(body);
      window.location.href = url;
      if (status) { status.textContent = "Your email app should now open with the message filled in. Send it from there."; status.classList.add("is-ok"); }
    });
  }
})();
