/* ═══════════════════════════════════════════
   NP TRIGUNAYAT SYSTEMS — script.js
   ═══════════════════════════════════════════ */

/* ── ACTIVE NAV LINK ── */
(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
})();

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("mobile-menu").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");
  if (
    menu &&
    menu.classList.contains("open") &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

/* ── PORTFOLIO FILTER ── */
function filterPort(btn, cat) {
  document
    .querySelectorAll(".pf-filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".port-card").forEach((card) => {
    card.style.display =
      cat === "all" || card.dataset.cat.includes(cat) ? "" : "none";
  });
}

/* ── TESTIMONIAL TABS ── */
function switchTestiTab(btn, panel) {
  document
    .querySelectorAll(".tm-tab-btn")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".testi-panel")
    .forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("panel-" + panel).classList.add("active");
}

/* ── FAQ CATEGORIES ── */
function switchFaqCat(btn, cat) {
  document
    .querySelectorAll(".fq-cat-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".faq-group")
    .forEach((g) => g.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("faq-" + cat).classList.add("active");
}

/* ── ACCORDION ── */
function toggleAccordion(trigger) {
  const item = trigger.parentElement;
  const body = item.querySelector(".accordion-body");
  const isOpen = item.classList.contains("open");
  const siblings = item.parentElement.querySelectorAll(".accordion-item");

  siblings.forEach((i) => {
    if (i !== item && i.classList.contains("open")) {
      const b = i.querySelector(".accordion-body");
      b.style.maxHeight = b.scrollHeight + "px";
      requestAnimationFrame(() => {
        b.style.maxHeight = "0";
        b.classList.remove("open");
        i.classList.remove("open");
      });
    }
  });

  if (isOpen) {
    body.style.maxHeight = body.scrollHeight + "px";
    requestAnimationFrame(() => {
      body.style.maxHeight = "0";
      body.classList.remove("open");
      item.classList.remove("open");
    });
  } else {
    body.classList.add("open");
    item.classList.add("open");
    body.style.maxHeight = body.scrollHeight + "px";
    body.addEventListener("transitionend", function onEnd(e) {
      if (e.propertyName === "max-height") {
        body.style.maxHeight = "none";
        body.removeEventListener("transitionend", onEnd);
      }
    });
  }
}

/* ── SCROLL FADE-UP ── */
function initFadeUps() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

/* ── HOME: HERO STAGGERED REVEAL ── */
function triggerHomeAnimations() {
  setTimeout(() => {
    const e = document.getElementById("h-eyebrow");
    if (e) e.classList.add("in");
  }, 100);
  setTimeout(() => {
    const r = document.getElementById("hl0");
    if (r) r.classList.add("in");
  }, 300);
  setTimeout(() => {
    const r = document.getElementById("hl1");
    if (r) r.classList.add("in");
  }, 480);
  setTimeout(() => {
    const r = document.getElementById("hl2");
    if (r) r.classList.add("in");
  }, 640);
  setTimeout(() => {
    const e = document.getElementById("h-sub");
    if (e) e.classList.add("in");
  }, 820);
  setTimeout(() => {
    const e = document.getElementById("h-actions");
    if (e) e.classList.add("in");
  }, 980);
  setTimeout(() => {
    const e = document.getElementById("h-meta");
    if (e) e.classList.add("in");
  }, 1100);
  setTimeout(() => {
    const e = document.getElementById("h-logo");
    if (e) e.classList.add("in");
  }, 200);
  setTimeout(() => animateCounters(), 1200);
}

/* ── HOME: COUNTER ANIMATION ── */
function animateCounters() {
  document.querySelectorAll(".c-stat-num").forEach((el) => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ── HOME: MARQUEE ── */
function buildMarquee() {
  const items = [
    { text: "Web Development", hi: false },
    { text: "Mobile Apps", hi: true },
    { text: "SEO & Performance", hi: false },
    { text: "React Native", hi: false },
    { text: "UI / UX Design", hi: true },
    { text: "Website Maintenance", hi: false },
    { text: "Flutter", hi: false },
    { text: "E-Commerce", hi: true },
    { text: "Next.js", hi: false },
    { text: "Local SEO", hi: false },
    { text: "Custom Development", hi: true },
    { text: "WordPress", hi: false },
  ];
  const track = document.getElementById("marquee-track");
  if (!track) return;
  let html = "";
  for (let pass = 0; pass < 2; pass++) {
    items.forEach((item) => {
      html += `<span class="c-marquee-item${item.hi ? " hi" : ""}"><span class="m-dot"></span>${item.text}</span>`;
    });
  }
  track.innerHTML = html;
}

/* ── PARTICLE CANVAS ── */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.getElementById("bg-canvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let W,
    H,
    pts = [];
  const N = 55,
    D = 155;
  const COLS = ["124,58,237", "167,139,250", "236,72,153"];
  function resize() {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  for (let i = 0; i < N; i++)
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.7,
      c: COLS[i % COLS.length],
    });
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x,
          dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d < D) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${pts[i].c},${(1 - d / D) * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},.65)`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });
    requestAnimationFrame(frame);
  })();
})();

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  initFadeUps();

  // Close mobile menu when any link inside it is clicked
  document.querySelectorAll(".mobile-menu a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
  // Home-page only
  if (document.getElementById("marquee-track")) {
    buildMarquee();
    triggerHomeAnimations();
  }
  // Contact-page only — guard prevents ReferenceError on all other pages
  if (typeof initContactForm === "function") {
    initContactForm();
  }
});

/* ═══════════════════════════════════════════════════════════════
   PRICING PAGE
   Guard: only runs when pricing panels exist
═══════════════════════════════════════════════════════════════ */
(function () {
  if (!document.getElementById("panel-web")) return;

  /* ── Tab switching ── */
  window.switchCat = function (id, btn) {
    document
      .querySelectorAll(".cat-panel")
      .forEach((p) => p.classList.remove("active"));
    document
      .querySelectorAll(".cat-btn")
      .forEach((b) => b.classList.remove("active"));
    document.getElementById("panel-" + id).classList.add("active");
    btn.classList.add("active");
    initFadeUps();
    const nav = document.querySelector(".cat-nav");
    window.scrollTo({
      top: nav.getBoundingClientRect().top + window.scrollY - (68 + 10),
      behavior: "smooth",
    });
  };

  /* ── Card expand/collapse ── */
  window.toggleCard = function (card, e) {
    const ev = e || window.event;
    if (ev && (ev.target.tagName === "A" || ev.target.closest("a"))) return;
    card.classList.toggle("expanded");
  };

  /* ── Compare table toggle ── */
  window.switchCmp = function (id, btn) {
    document
      .querySelectorAll(".ctp")
      .forEach((p) => p.classList.remove("active"));
    document
      .querySelectorAll(".ctbtn")
      .forEach((b) => b.classList.remove("active"));
    document.getElementById("ct-" + id).classList.add("active");
    btn.classList.add("active");
  };

  /* ── Calculator state ── */
  const S = { type: null, size: null, feats: new Set(), time: null };

  window.cSel = function (btn) {
    const q = btn.dataset.q,
      v = btn.dataset.v;
    document
      .querySelectorAll(`.csopt[data-q="${q}"]`)
      .forEach((b) => b.classList.remove("sel", "spk"));
    btn.classList.add(v === "urgent" ? "spk" : "sel");
    S[q] = v;
    updateFlow();
    computeRec();
  };

  window.cMulti = function (btn) {
    btn.classList.toggle("sel");
    const v = btn.dataset.v;
    btn.classList.contains("sel") ? S.feats.add(v) : S.feats.delete(v);
    computeRec();
  };

  function updateFlow() {
    const t = S.type;
    document.getElementById("step-size").style.display =
      t === "new" || t === "redesign" ? "block" : "none";
    document.getElementById("step-feats").style.display =
      t === "new" || t === "app" ? "block" : "none";
    document.getElementById("step-time").style.display = t ? "block" : "none";
    if (t !== "new" && t !== "redesign") S.size = null;
    if (t !== "new" && t !== "app") S.feats.clear();
  }

  function computeRec() {
    if (!S.type) return;
    let name,
      price,
      note,
      why,
      addons = [];
    if (S.type === "maintain") {
      name = "Maintenance Plan";
      price = "₹2,499 / month";
      note = "Billed monthly · Cancel anytime";
      why =
        "For ongoing site care, the Maintenance plan gives you everything — security, updates, backups, and priority support — for one flat monthly fee.";
    } else if (S.type === "redesign") {
      name = "Redesign Package";
      price = "₹13,999";
      note = "One-time payment";
      why =
        "A complete overhaul: fresh UI/UX audit, modern responsive layout, speed & SEO improvements, content migration, and a training session included.";
      addons = [
        "Maintenance plan for ongoing care (₹2,499/mo)",
        "SEO retainer after launch",
      ];
    } else if (S.type === "app") {
      const cmplx =
        S.feats.has("ecom") || S.feats.has("login") || S.feats.has("dashboard");
      name = "Custom Package";
      price = "₹22,999+";
      note = "Final price set after scope discussion";
      why = cmplx
        ? "Your requirements (payments, user accounts, dashboards) go beyond a standard website. The Custom package is built for this — we'll scope it precisely and give you a fixed price on a call."
        : "App development is scoped individually. The Custom package covers end-to-end development, and we'll give you a firm price after a brief discovery call.";
      addons = ["Cloud hosting setup", "Ongoing maintenance after launch"];
    } else {
      const cmplx =
        S.feats.has("ecom") ||
        S.feats.has("login") ||
        S.feats.has("dashboard") ||
        S.feats.has("booking");
      const big =
        S.size === "medium" || S.size === "large" || S.size === "unsure";
      const gallery = S.feats.has("gallery");
      const seo = S.feats.has("seo");
      if (cmplx) {
        name = "Professional or Custom";
        price = "₹17,999 – ₹22,999+";
        note = "Exact price depends on feature scope";
        why =
          "The features you've selected put this in Professional or Custom territory. A 15-min call is all it takes to nail the scope and give you a fixed price.";
        addons = [
          "Database + API integrations",
          "Admin dashboard",
          "Post-launch maintenance",
        ];
      } else if (big || gallery || seo) {
        name = "Business Package";
        price = "₹12,999";
        note = "One-time payment";
        const r = [
          big && "multiple pages",
          gallery && "a portfolio section",
          seo && "SEO-ready structure",
        ]
          .filter(Boolean)
          .join(", ");
        why = `Your requirements — ${r} — align perfectly with the Business package. Professional UI/UX, animations, and 2 months of support included.`;
        addons = seo
          ? [
              "Monthly SEO retainer for ongoing rankings",
              "Maintenance plan (₹2,499/mo)",
            ]
          : ["Maintenance plan (₹2,499/mo)"];
      } else {
        name = "Starter Package";
        price = "₹8,999";
        note = "One-time payment · Delivered in 14 days";
        why =
          "For a clean, fast 1–3 page website focused on lead capture, the Starter is the perfect fit. Fast to build, built to convert, includes everything you need to launch.";
        addons = [
          "Upgrade to Business anytime",
          "Maintenance plan (₹2,499/mo)",
        ];
      }
    }
    document.getElementById("crempty").style.display = "none";
    document.getElementById("crres").style.display = "block";
    document.getElementById("crname").textContent = name;
    document.getElementById("crpval").textContent = price;
    document.getElementById("crpnote").textContent = note;
    document.getElementById("crwhy").textContent = why;
    const aw = document.getElementById("cradw");
    const al = document.getElementById("crad");
    if (addons.length) {
      aw.style.display = "block";
      al.innerHTML = addons.map((a) => `<li>${a}</li>`).join("");
    } else {
      aw.style.display = "none";
    }
  }
})(); // end pricing IIFE
