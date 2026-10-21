/*
 * Portfolio renderer. All content comes from window.SITE (assets/site/content.js).
 * No build step and no dependencies, so it runs as-is on GitHub Pages.
 */
(function () {
  "use strict";

  var S = window.SITE;
  var root = document.documentElement;

  // Review mode shows items marked `confirm` with a badge; production hides them.
  // ?review forces review mode anywhere; ?live previews the production view locally.
  var params = new URLSearchParams(location.search);
  var REVIEW =
    !params.has("live") &&
    (/^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/.test(location.hostname) ||
      location.protocol === "file:" ||
      params.has("review"));

  // ── Helpers ───────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function visible(item) {
    return !item || typeof item !== "object" || !item.confirm || REVIEW;
  }
  function only(list) {
    return (list || []).filter(visible);
  }
  function badge(text) {
    return REVIEW && text
      ? '<div class="confirm-badge"><b>Needs confirmation</b><span>' + esc(text) + "</span></div>"
      : "";
  }
  function flagged(item) {
    return REVIEW && item && item.confirm ? " is-unconfirmed" : "";
  }
  function textOf(x) {
    return typeof x === "string" ? x : x.text;
  }
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
    medium:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
  };

  var LEVEL = {
    production: { cls: "badge-production", label: "Production" },
    applied: { cls: "badge-applied", label: "Applied / prototype" },
    learning: { cls: "badge-learning", label: "Learning" },
  };
  function levelBadge(level) {
    var l = LEVEL[level] || LEVEL.applied;
    return '<span class="badge ' + l.cls + '">' + l.label + "</span>";
  }

  var projectsById = {};
  S.projects.forEach(function (p) {
    projectsById[p.id] = p;
  });
  var codeById = {};
  S.code.forEach(function (c) {
    codeById[c.id] = c;
  });

  // Resolve an evidence key to a link: project id, "exp:<id>", or a section id.
  var SECTION_LABELS = {
    code: "Code samples",
    decisions: "Engineering decisions",
    simulator: "Failure simulator",
    architecture: "Architecture explorer",
  };
  function evidenceLink(key) {
    if (projectsById[key] && visible(projectsById[key])) {
      return { href: "#/work/" + key, label: projectsById[key].title };
    }
    if (key.indexOf("exp:") === 0) {
      var e = S.experience.filter(function (x) {
        return x.id === key.slice(4);
      })[0];
      if (e && visible(e)) return { href: "#exp-" + e.id, label: e.org + " experience" };
      return null;
    }
    if (SECTION_LABELS[key]) return { href: "#" + key, label: SECTION_LABELS[key] };
    return null;
  }

  // ── Minimal syntax highlighting (SQL + Python) ────────────────────────────
  var KW =
    "SELECT|FROM|WHERE|AND|OR|AS|ON|MERGE|USING|WHEN|MATCHED|NOT|THEN|DELETE|UPDATE|SET|INSERT|VALUES|CREATE|TABLE|IF|EXISTS|PARTITION|BY|CLUSTER|OPTIONS|REPLACE|MODEL|STRUCT|ORDER|OVER|EXCEPT|DESC|NULL|TRUE|FALSE|" +
    "def|class|return|import|from|if|raise|for|in|not|None|True|False|with|elif|else";
  var TOKEN = new RegExp(
    "(--[^\\n]*|#[^\\n]*)|(\"\"\"[\\s\\S]*?\"\"\"|r?'(?:[^'\\\\\\n]|\\\\.)*'|r?\"(?:[^\"\\\\\\n]|\\\\.)*\")|\\b(" + KW + ")\\b",
    "g"
  );
  function highlight(src) {
    var out = "",
      last = 0,
      m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(src))) {
      out += esc(src.slice(last, m.index));
      var cls = m[1] ? "c" : m[2] ? "s" : "k";
      out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
      last = TOKEN.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  function codeBlock(c) {
    return (
      '<figure class="card code-block" style="margin:0">' +
      '<div class="code-head"><div><h3>' + esc(c.title) + '</h3><p>' + esc(c.context) + "</p></div>" +
      '<span class="lang">' + esc(c.lang) + "</span>" +
      '<button type="button" class="btn btn-sm copy-btn" data-copy="' + esc(c.id) + '">Copy</button></div>' +
      '<pre class="code" tabindex="0" aria-label="' + esc(c.title) + ' code"><code>' + highlight(c.body) + "</code></pre>" +
      "</figure>"
    );
  }

  // ── Flow diagram (used by case studies) ───────────────────────────────────
  function flowDiagram(nodes, name) {
    var items = nodes
      .map(function (n, i) {
        return (
          '<li><button type="button" class="flow-node" aria-pressed="' + (i === 0) + '" data-flow="' + name + '" data-idx="' + i + '">' +
          '<span class="n-step">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="n-label">' + esc(n.label) + "</span>" +
          '<span class="n-tech">' + esc(n.tech) + "</span></button></li>"
        );
      })
      .join("");
    return (
      '<ol class="flow" aria-label="Architecture flow — select a step for details">' + items + "</ol>" +
      '<p class="flow-note" aria-live="polite" id="note-' + name + '"><strong>' + esc(nodes[0].label) + ":</strong> " + esc(nodes[0].note) + "</p>"
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  //  Home sections
  // ════════════════════════════════════════════════════════════════════════
  function sectionHead(eyebrow, title, lede, extra) {
    return (
      '<div class="section-head"><span class="eyebrow">' + esc(eyebrow) + "</span>" +
      '<h2 class="section-title">' + esc(title) + "</h2>" +
      (lede ? '<p class="section-lede">' + lede + "</p>" : "") + (extra || "") + "</div>"
    );
  }

  function renderHero() {
    var p = S.profile,
      L = S.links;
    var orgs = only(S.experience)
      .slice()
      .reverse()
      .map(function (e) {
        return e.org;
      })
      .join(" → ");
    var certs = S.certifications.filter(function (c) {
      return !c.confirm && c.issuer === "Google Cloud";
    });
    var headline = esc(p.headline).replace("production-ready AI systems", "<em>production-ready AI systems</em>");
    return (
      '<section class="hero" id="top" aria-labelledby="hero-title"><div class="container hero-grid"><div>' +
      '<div class="hero-eyebrow"><span class="status-dot" aria-hidden="true"></span><span class="eyebrow">' + esc(p.positioning) + "</span></div>" +
      '<h1 id="hero-title">' + headline + "</h1>" +
      '<p class="hero-sub">' + esc(p.subhead) + "</p>" +
      '<p class="hero-intro">' + esc(p.intro[0]) + "</p>" +
      '<div class="hero-cta">' +
      '<a class="btn btn-primary" href="#work">Explore my projects ' + ICON.arrow + "</a>" +
      '<a class="btn" href="' + esc(L.resume) + '" download="' + esc(L.resumeFileName) + '">' + ICON.download + " Download résumé</a>" +
      '<a class="btn" href="#contact">' + ICON.mail + " Contact me</a></div>" +
      '<div class="hero-links">' +
      '<a href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">' + ICON.linkedin + " LinkedIn</a>" +
      '<a href="' + esc(L.github) + '" target="_blank" rel="noopener">' + ICON.github + " GitHub</a>" +
      '<a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></div>" +
      '<ul class="chips hero-stack" aria-label="Core technologies">' +
      p.heroStack.map(function (t) {
        return '<li class="chip">' + esc(t) + "</li>";
      }).join("") +
      "</ul></div>" +
      '<aside class="card glance" aria-labelledby="glance-title"><h2 id="glance-title">At a glance</h2><dl>' +
      "<div><dt>Role focus</dt><dd>" + esc(p.role) + "<small>Pipelines · cloud data platforms · AI-assisted data engineering</small></dd></div>" +
      "<div><dt>Experience</dt><dd>Data engineering since " + esc(p.careerStart) + "<small>" + esc(orgs) + "</small></dd></div>" +
      "<div><dt>Primary platform</dt><dd>Google Cloud<small>BigQuery · Dataflow · Pub/Sub · Composer · Dataform · Vertex AI</small></dd></div>" +
      (certs.length ? "<div><dt>Certifications</dt><dd>" + certs.length + " Google Cloud professional certifications<small><a href=\"#credentials\">View details</a></small></dd></div>" : "") +
      "<div><dt>Education</dt><dd>" + esc(S.education.degree) + "<small>" + esc(S.education.school) + "</small></dd></div>" +
      "</dl></aside></div></section>"
    );
  }

  function renderStrengths() {
    var items = S.highlights
      .map(function (h) {
        var ev = h.evidence
          .map(function (e) {
            var href = e.project ? "#/work/" + e.project : "#" + e.section;
            return '<a href="' + href + '">' + esc(e.label) + " →</a>";
          })
          .join("");
        return '<article class="strength"><h3>' + esc(h.title) + "</h3><p>" + esc(h.body) + '</p><div class="evidence">' + ev + "</div></article>";
      })
      .join("");
    return (
      '<section class="section" id="strengths" aria-labelledby="strengths-h"><div class="container">' +
      sectionHead("Core strengths", "What I bring to a data team", S.profile.intro[1]).replace('class="section-title"', 'class="section-title" id="strengths-h"') +
      '<div class="strengths">' + items + "</div></div></section>"
    );
  }

  function renderWork() {
    var cards = only(S.projects)
      .map(function (p) {
        var facts = only(p.facts)
          .slice(0, 3)
          .map(function (f) {
            return "<div><strong>" + esc(f.value) + "</strong><span>" + esc(f.label) + "</span></div>";
          })
          .join("");
        return (
          '<a class="card project-card' + flagged(p) + '" href="#/work/' + p.id + '">' +
          '<div class="case-meta"><span class="kicker">' + esc(p.kicker) + "</span>" +
          '<span class="badge ' + LEVEL[p.status].cls + '">' + esc(p.statusLabel) + "</span></div>" +
          "<h3>" + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
          (facts ? '<div class="project-facts">' + facts + "</div>" : "") +
          '<ul class="chips">' + p.stack.slice(0, 6).map(function (t) { return '<li class="chip">' + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<span class="more">Read case study ' + ICON.arrow + "</span></a>"
        );
      })
      .join("");
    return (
      '<section class="section" id="work" aria-labelledby="work-h"><div class="container">' +
      sectionHead(
        "Selected work",
        "Engineering case studies",
        "Each case study covers the problem, my role, architecture, implementation, reliability and results. Employer details are sanitised; code samples are illustrative and written for this site."
      ).replace('class="section-title"', 'class="section-title" id="work-h"') +
      '<div class="projects">' + cards + "</div></div></section>"
    );
  }

  function renderTeaser() {
    return (
      '<section class="section" id="technical" aria-labelledby="tech-h"><div class="container">' +
      '<div class="card teaser"><div><span class="eyebrow">For technical interviewers</span>' +
      '<h3 id="tech-h" style="margin-top:8px">Architecture, trade-offs and failure handling</h3>' +
      "<p>Switch to the technical view for an interactive reference architecture, a pipeline failure simulator, 11 engineering decision records and annotated code samples.</p>" +
      '<ul><li><a class="chip" href="#architecture">Architecture explorer</a></li><li><a class="chip" href="#simulator">Failure simulator</a></li>' +
      '<li><a class="chip" href="#decisions">Engineering decisions</a></li><li><a class="chip" href="#code">Code samples</a></li></ul></div>' +
      '<button type="button" class="btn btn-primary" data-set-mode="engineer" data-scroll="architecture">Open technical view ' + ICON.arrow + "</button>" +
      "</div></div></section>"
    );
  }

  function renderExplorer() {
    var X = S.explorer;
    var nodes = X.nodes
      .map(function (n, i) {
        return (
          '<li><button type="button" class="flow-node" data-explore="' + i + '" aria-pressed="' + (i === 0) + '" aria-controls="explorer-detail">' +
          '<span class="n-step">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="n-label">' + esc(n.name) + "</span>" +
          '<span class="n-tech">' + esc(n.short) + "</span></button></li>"
        );
      })
      .join("");
    var textVersion = X.nodes
      .map(function (n, i) {
        return "<details><summary>" + (i + 1) + ". " + esc(n.name) + "</summary><div>" + explorerDetail(n, true) + "</div></details>";
      })
      .join("");
    return (
      '<section class="section" id="architecture" aria-labelledby="arch-h"><div class="container">' +
      sectionHead(
        "Interactive",
        "Architecture explorer",
        "Select a component to see its responsibility, inputs and outputs, failure scenarios, recovery strategy and trade-offs."
      ).replace('class="section-title"', 'class="section-title" id="arch-h"') +
      '<div class="card explorer">' +
      '<div class="explorer-top"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="badge badge-ref">' + esc(X.label) + "</span>" +
      "<p>" + esc(X.note) + "</p></div>" +
      '<button type="button" class="btn btn-sm" id="explorer-mode" aria-expanded="false">View as text</button></div>' +
      '<div id="explorer-diagram"><ol class="flow" aria-label="' + esc(X.title) + '">' + nodes + "</ol>" +
      '<div class="explorer-detail" id="explorer-detail" aria-live="polite">' + explorerDetail(X.nodes[0]) + "</div></div>" +
      '<div class="explorer-text" id="explorer-text" hidden>' + textVersion + "</div>" +
      "</div></div></section>"
    );
  }
  function explorerDetail(n, compact) {
    function list(a) {
      return "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    }
    var left =
      (compact ? "" : "<h3>" + esc(n.name) + "</h3>") +
      '<p class="resp">' + esc(n.responsibility) + "</p>" +
      '<div class="kv"><div class="io"><div><h4>Inputs</h4><p>' + esc(n.inputs) + "</p></div><div><h4>Outputs</h4><p>" + esc(n.outputs) + "</p></div></div>" +
      '<div><h4>Technologies</h4><ul class="chips">' + n.tech.map(function (t) { return '<li class="chip">' + esc(t) + "</li>"; }).join("") + "</ul></div>" +
      "<div><h4>Scalability &amp; cost trade-offs</h4><p>" + esc(n.tradeoffs) + "</p></div></div>";
    var right =
      '<div class="kv" style="margin-top:0"><div><h4>Common failure scenarios</h4>' + list(n.failures) + "</div>" +
      "<div><h4>Recovery strategy</h4><p>" + esc(n.recovery) + "</p></div>" +
      "<div><h4>Security &amp; data quality</h4><p>" + esc(n.security) + "</p></div></div>";
    return compact ? left + right : "<div>" + left + "</div><div>" + right + "</div>";
  }

  // ── Simulator ─────────────────────────────────────────────────────────────
  var SIM_SCENARIOS = [
    { id: "ingest_fail", name: "Failed ingestion job", desc: "Daily load times out midway through writing." },
    { id: "duplicate", name: "Duplicate events", desc: "Pub/Sub redelivers messages after a worker restart." },
    { id: "schema", name: "Schema mismatch", desc: "Upstream renames a column without notice." },
    { id: "delay", name: "Delayed upstream", desc: "Upstream export lands two hours late." },
  ];
  var SIM_GUARDS = [
    { id: "retries", name: "Retries with backoff", desc: "Failed tasks retry automatically." },
    { id: "idempotent", name: "Idempotent writes", desc: "Partition overwrite / MERGE, dedup on event_id." },
    { id: "contract", name: "Schema contract", desc: "Incoming schema checked before load." },
    { id: "sensor", name: "Dependency sensors", desc: "Tasks wait for upstream success markers." },
    { id: "recon", name: "Reconciliation checks", desc: "Row counts, null rates and uniqueness gate publishing." },
  ];

  function renderSimulator() {
    var scen = SIM_SCENARIOS.map(function (s, i) {
      return '<label class="opt"><input type="radio" name="sim-scenario" value="' + s.id + '"' + (i === 0 ? " checked" : "") +
        "><span>" + esc(s.name) + "<small>" + esc(s.desc) + "</small></span></label>";
    }).join("");
    var guards = SIM_GUARDS.map(function (g) {
      return '<label class="opt"><input type="checkbox" name="sim-guard" value="' + g.id + '" checked><span>' + esc(g.name) +
        "<small>" + esc(g.desc) + "</small></span></label>";
    }).join("");
    return (
      '<section class="section" id="simulator" aria-labelledby="sim-h"><div class="container">' +
      sectionHead(
        "Hands-on",
        "Pipeline failure simulator",
        "Pick a failure and toggle safeguards to see how a daily batch pipeline behaves. A deterministic, illustrative model of 1,000 source rows."
      ).replace('class="section-title"', 'class="section-title" id="sim-h"') +
      '<div class="card sim"><form class="sim-controls" id="sim-form" onsubmit="return false">' +
      '<span class="badge badge-sim">Simulation — not connected to any live system</span>' +
      "<fieldset><legend>1 · Failure scenario</legend>" + scen + "</fieldset>" +
      "<fieldset><legend>2 · Safeguards</legend>" + guards +
      '<div class="sim-presets"><button type="button" class="btn btn-sm" data-preset="all">All on</button><button type="button" class="btn btn-sm" data-preset="none">All off</button></div>' +
      "</fieldset></form>" +
      '<div class="sim-output" id="sim-output" aria-live="polite"></div></div></div></section>'
    );
  }

  function simulate(scenario, g) {
    var N = 1000;
    var log = [];
    var notes = [];
    function L(t, st, txt) {
      log.push({ t: t, st: st, txt: txt });
    }
    // ctx describes the state after the load stage.
    var ctx = { loaded: false, rows: 0, dupes: 0, nulls: 0, at: "", ds: "06:30", sla: "07:00", quarantined: false };

    if (scenario === "ingest_fail") {
      L("02:00", "info", "Daily load for yesterday’s partition starts — 1,000 source rows expected.");
      var partial = g.idempotent ? 0 : 400;
      L("02:07", "fail", g.idempotent
        ? "Load job times out. The write is atomic (partition overwrite), so no partial rows are committed."
        : "Load times out after appending 400 rows — the partial write stays in the table.");
      if (g.retries) {
        L("02:08", "warn", "Retry 1 scheduled with exponential backoff (60 s).");
        if (g.idempotent) {
          L("02:10", "ok", "Retry overwrites the partition: 1,000 rows.");
          ctx.rows = N;
        } else {
          L("02:10", "warn", "Retry appends 1,000 rows on top of the 400 partial rows.");
          ctx.rows = N + partial;
          ctx.dupes = partial;
        }
        ctx.loaded = true;
        ctx.at = "02:10";
        notes.push(g.idempotent
          ? "Retries recovered the transient failure, and idempotent writes made the retry safe."
          : "Retries without idempotency turn a transient failure into duplicated revenue.");
      } else {
        L("02:07", "fail", "No retries — task marked failed and the task-failure alert pages on-call.");
        ctx.rows = partial;
        ctx.at = "02:07";
        notes.push("Without retries, a transient timeout becomes a manual incident.");
      }
    } else if (scenario === "duplicate") {
      ctx.ds = "09:30";
      ctx.sla = null;
      L("09:00", "info", "Streaming consumer writes 1,000 order events from Pub/Sub.");
      L("09:14", "warn", "Worker restart exceeds the ack deadline — 37 already-written messages are redelivered (at-least-once delivery).");
      if (g.idempotent) {
        L("09:15", "ok", "Dedup on event_id drops the 37 redeliveries.");
        ctx.rows = N;
        notes.push("Idempotent writes keyed on event_id make at-least-once delivery behave like exactly-once in the table.");
      } else {
        L("09:15", "warn", "Redelivered events are appended — 1,037 rows.");
        ctx.rows = N + 37;
        ctx.dupes = 37;
        notes.push("Pub/Sub guarantees at-least-once delivery; without dedup, duplicates are inevitable.");
      }
      ctx.loaded = true;
      ctx.at = "09:20";
      if (g.retries) notes.push("Retries don’t matter here — nothing failed. Duplicates come from redelivery, not errors.");
    } else if (scenario === "schema") {
      L("03:00", "warn", "Upstream renamed amount → amount_usd and added currency overnight, without notice.");
      if (g.contract) {
        L("03:01", "ok", "Contract check: additive column currency accepted.");
        L("03:01", "fail", "Contract check: amount missing / amount_usd unknown — breaking change. Batch quarantined; owner alerted with the schema diff.");
        ctx.quarantined = true;
        ctx.at = "03:01";
        notes.push("The contract stopped a breaking change at the boundary. Fix: map amount_usd → amount, then replay the quarantined batch.");
      } else {
        L("03:02", "warn", "Load with field addition allowed ‘succeeds’: new columns added, amount is NULL for all 1,000 rows.");
        ctx.loaded = true;
        ctx.rows = N;
        ctx.nulls = N;
        ctx.at = "03:05";
        notes.push("A rename looks like ‘drop + add’ to a permissive loader — the job succeeds while the data is wrong.");
        if (g.retries) notes.push("Retries don’t help: the load didn’t fail, and a deterministic error wouldn’t fix itself anyway.");
      }
    } else if (scenario === "delay") {
      L("04:00", "warn", "Upstream export, normally done by 04:00, is running late (lands at 06:10).");
      if (g.sensor) {
        L("05:00", "info", "Sensor waits for the upstream success marker (timeout 08:00).");
        L("06:10", "ok", "Upstream marker appears; load starts.");
        L("06:18", "ok", "1,000 rows loaded.");
        ctx.loaded = true;
        ctx.rows = N;
        ctx.at = "06:18";
        notes.push("The sensor turned a late upstream into a late (but correct) load instead of a wrong one.");
      } else if (g.recon && g.retries) {
        L("05:00", "warn", "Job starts on schedule; upstream partition is empty — 0 rows loaded.");
        L("05:01", "fail", "Volume check: 0 rows vs ~1,000 expected — task fails, publish blocked.");
        L("05:31", "warn", "Retry 1 (backoff 30 min): partition still empty.");
        L("06:31", "ok", "Retry 2 (backoff 60 min): upstream landed at 06:10 — 1,000 rows loaded.");
        ctx.loaded = true;
        ctx.rows = N;
        ctx.at = "06:35";
        ctx.ds = "06:40";
        notes.push("Without a sensor, a volume check plus retries still recovered — but by accident of backoff timing, not by design.");
      } else {
        L("05:00", "warn", "Job starts on schedule against an empty upstream partition.");
        L("05:02", "ok", "Job ‘succeeds’ — 0 rows loaded.");
        ctx.loaded = true;
        ctx.rows = 0;
        ctx.at = "05:02";
        notes.push("Schedules assume upstream is on time. A dependency sensor encodes the real dependency.");
        if (g.retries) notes.push("Retries never trigger: nothing errored.");
      }
    }

    // ── Shared tail: reconciliation, downstream, verdict ──
    var wrong = ctx.loaded && (ctx.rows !== N || ctx.dupes > 0 || ctx.nulls > 0);
    var blocked = ctx.quarantined;
    if (ctx.loaded && g.recon) {
      if (wrong) {
        var why = ctx.dupes ? ctx.rows.toLocaleString() + " rows vs 1,000 in source (" + ctx.dupes + " duplicate keys)"
          : ctx.nulls ? "amount null rate 100% vs 0.2% baseline"
          : ctx.rows.toLocaleString() + " rows vs ~1,000 expected";
        L(ctx.at, "fail", "Reconciliation failed: " + why + ". Publish blocked; alert raised with run ID.");
        blocked = true;
        notes.push("Reconciliation is the safety net: it caught what the earlier stages let through.");
      } else {
        L(ctx.at, "ok", "Reconciliation passed: counts match source; uniqueness and null rates within limits.");
      }
    } else if (ctx.loaded && wrong) {
      L(ctx.at, "info", "No reconciliation — the run reports success.");
    }

    if (!ctx.loaded && !ctx.quarantined) {
      if (g.sensor) {
        L(ctx.ds, "warn", "Downstream models wait on the success marker and do not run on incomplete data. SLA alert at 07:00.");
      } else {
        L(ctx.ds, "fail", "Downstream models run on schedule against " + ctx.rows + " rows — dashboards show incomplete figures.");
      }
    } else if (blocked) {
      L(ctx.ds, "warn", "Downstream refresh skipped; dashboards keep the previous data, flagged as stale.");
    } else if (wrong) {
      L(ctx.ds, "fail", "Dashboards refresh with incorrect figures.");
    } else {
      L(ctx.ds, "ok", "Downstream models refresh; dashboards are current.");
    }

    var v;
    if (ctx.loaded && !wrong) {
      v = ctx.sla && ctx.at > ctx.sla
        ? { kind: "warn", title: "Correct, but SLA missed", body: "Data is right but arrived after the 07:00 SLA." }
        : { kind: "ok", title: "Correct data" + (ctx.sla ? ", within SLA" : ""), body: "Consumers see complete, accurate data with no manual intervention." };
    } else if (blocked) {
      v = { kind: "warn", title: "Bad data stopped before consumers", body: "Nothing wrong was published. An engineer has an alert with context to fix and replay." };
    } else if (!ctx.loaded && g.sensor) {
      v = { kind: "warn", title: "Data late — nothing wrong published", body: "The failure is visible and contained; a rerun is needed before the SLA." };
    } else if (!ctx.loaded) {
      v = { kind: "bad", title: "Incomplete data published", body: "The task alert fired, but downstream had already refreshed with partial data." };
    } else {
      v = { kind: "bad", title: "Silent data corruption", body: "Every job reported success. Consumers see wrong numbers until someone notices." };
    }

    return {
      log: log,
      notes: notes,
      verdict: v,
      metrics: [
        { label: "Rows in target", value: ctx.loaded ? ctx.rows.toLocaleString() : ctx.quarantined ? "0 (quarantined)" : ctx.rows.toLocaleString(), bad: ctx.rows !== N },
        { label: "Duplicates", value: ctx.dupes, bad: ctx.dupes > 0 },
        { label: "Null amounts", value: ctx.nulls.toLocaleString(), bad: ctx.nulls > 0 },
        { label: "Published", value: blocked || (!ctx.loaded && g.sensor) || ctx.quarantined ? "Held" : ctx.loaded || !g.sensor ? "Yes" : "No", bad: v.kind === "bad" },
      ],
    };
  }

  function runSimulator() {
    // Query within the section: it is detached from the page in recruiter mode.
    var form = sections.simulator.querySelector("#sim-form");
    var scenario = form.querySelector('input[name="sim-scenario"]:checked').value;
    var g = {};
    $$('input[name="sim-guard"]', form).forEach(function (i) {
      g[i.value] = i.checked;
    });
    var r = simulate(scenario, g);
    var out = sections.simulator.querySelector("#sim-output");
    out.innerHTML =
      '<div class="verdict ' + r.verdict.kind + '"><h3>' + esc(r.verdict.title) + "</h3><p>" + esc(r.verdict.body) + "</p></div>" +
      '<div class="metrics">' + r.metrics.map(function (m) {
        return '<div class="metric ' + (m.bad ? "bad" : "ok") + '"><span>' + esc(m.label) + "</span><strong>" + esc(m.value) + "</strong></div>";
      }).join("") + "</div>" +
      '<div><h4 class="sim-h">Run timeline</h4><ol class="timeline-log">' + r.log.map(function (l) {
        return '<li class="' + l.st + '"><time>' + l.t + '</time><span class="dot" aria-hidden="true"></span><span><span class="sr-only">' + l.st + ": </span>" + esc(l.txt) + "</span></li>";
      }).join("") + "</ol></div>" +
      '<div class="sim-explain"><h4 class="sim-h">Why</h4><ul>' + r.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></div>";
  }

  function renderDecisions() {
    var topics = ["All"].concat(
      S.decisions.map(function (d) { return d.topic; }).filter(function (t, i, a) { return a.indexOf(t) === i; })
    );
    var filters = topics.map(function (t, i) {
      return '<button type="button" class="filter" data-topic="' + esc(t) + '" aria-pressed="' + (i === 0) + '">' + esc(t) + "</button>";
    }).join("");
    var items = S.decisions.map(function (d) {
      return (
        '<details class="decision" data-topic="' + esc(d.topic) + '" id="dec-' + d.id + '">' +
        '<summary><span class="topic">' + esc(d.topic) + "</span><h3>" + esc(d.title) + "</h3>" + ICON.chev + "</summary>" +
        '<div class="decision-body">' +
        "<div><h4>Context</h4><p>" + esc(d.context) + "</p></div>" +
        "<div><h4>Constraints</h4><p>" + esc(d.constraints) + "</p></div>" +
        '<div class="full"><h4>Alternatives considered</h4><ul>' + d.alternatives.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div>" +
        '<div class="full chosen"><h4>Selected approach</h4><p>' + esc(d.decision) + "</p></div>" +
        "<div><h4>Trade-offs</h4><p>" + esc(d.tradeoffs) + "</p></div>" +
        "<div><h4>Failure modes</h4><p>" + esc(d.failures) + "</p></div>" +
        '<div class="full"><h4>When I’d decide differently</h4><p>' + esc(d.otherwise) + "</p></div>" +
        "</div></details>"
      );
    }).join("");
    return (
      '<section class="section" id="decisions" aria-labelledby="dec-h"><div class="container">' +
      sectionHead(
        "How I think about systems",
        "Engineering decisions",
        "Illustrative scenarios — not historical claims — showing how I weigh context, constraints and failure modes. Each ends with when I’d choose differently."
      ).replace('class="section-title"', 'class="section-title" id="dec-h"') +
      '<div class="filters" role="group" aria-label="Filter decisions by topic">' + filters + "</div>" +
      '<div class="decisions">' + items + "</div></div></section>"
    );
  }

  function renderCode() {
    var tabs = S.code.map(function (c, i) {
      return '<button type="button" class="filter" data-code="' + c.id + '" aria-pressed="' + (i === 0) + '">' + esc(c.title) + "</button>";
    }).join("");
    return (
      '<section class="section" id="code" aria-labelledby="code-h"><div class="container">' +
      sectionHead(
        "Implementation",
        "Code samples",
        "Illustrative code written for this portfolio to show patterns I use. It is not employer source code."
      ).replace('class="section-title"', 'class="section-title" id="code-h"') +
      '<div class="code-tabs" role="group" aria-label="Choose a code sample">' + tabs + "</div>" +
      '<div id="code-slot">' + codeBlock(S.code[0]) + "</div></div></section>"
    );
  }

  function renderExperience() {
    var roles = only(S.experience).map(function (e) {
      var when = esc(e.start || "") + (e.start ? " – " : "") + esc(e.end);
      var proj = (e.projects || []).filter(function (id) { return projectsById[id] && visible(projectsById[id]); })
        .map(function (id) { return '<a href="#/work/' + id + '">Case study: ' + esc(projectsById[id].title) + " →</a>"; }).join("");
      return (
        '<article class="role' + flagged(e) + '" id="exp-' + e.id + '">' +
        '<div class="role-when"><span class="org">' + esc(e.org) + "</span>" + when + badge(e.endConfirm) + "</div>" +
        "<div><h3>" + esc(e.title) + "</h3>" +
        (e.relationship ? '<p class="client">' + esc(e.relationship) + "</p>" : "") +
        badge(e.confirm) +
        '<p class="summary">' + esc(e.summary) + "</p>" +
        '<ul class="points">' + only(e.points).map(function (p) { return '<li class="' + flagged(p).trim() + '">' + esc(textOf(p)) + badge(p.confirm) + "</li>"; }).join("") + "</ul>" +
        '<div class="role-foot"><ul class="chips">' + e.tech.map(function (t) { return '<li class="chip">' + esc(t) + "</li>"; }).join("") + "</ul>" + proj + "</div>" +
        "</div></article>"
      );
    }).join("");
    return (
      '<section class="section" id="experience" aria-labelledby="exp-h"><div class="container">' +
      sectionHead("Career", "Professional experience", null).replace('class="section-title"', 'class="section-title" id="exp-h"') +
      '<div class="timeline">' + roles + "</div></div></section>"
    );
  }

  function renderSkills() {
    var groups = S.skills.map(function (g) {
      var items = only(g.items).map(function (s) {
        var ev = (s.evidence || []).map(evidenceLink).filter(Boolean)
          .map(function (l) { return '<a href="' + l.href + '">' + esc(l.label) + "</a>"; }).join("");
        return (
          '<li class="skill' + flagged(s) + '"><div class="skill-row"><span class="skill-name">' + esc(s.name) + "</span>" + levelBadge(s.level) + "</div>" +
          (s.note ? '<span class="skill-note">' + esc(s.note) + "</span>" : "") +
          (ev ? '<span class="skill-ev">' + ev + "</span>" : "") + badge(s.confirm) + "</li>"
        );
      }).join("");
      return '<div class="card skill-group"><h3>' + esc(g.group) + '</h3><ul class="skill-list">' + items + "</ul></div>";
    }).join("");
    var learning = S.learning.map(function (l) {
      return "<li><strong>" + esc(l.area) + "</strong><span>" + esc(l.detail) + "</span></li>";
    }).join("");
    return (
      '<section class="section" id="skills" aria-labelledby="skills-h"><div class="container">' +
      sectionHead(
        "Skills & evidence",
        "Technical skills",
        "Every skill is labelled by how I’ve used it and linked to evidence where it exists. No proficiency percentages."
      ).replace('class="section-title"', 'class="section-title" id="skills-h"') +
      '<div class="legend"><span>Legend:</span>' + levelBadge("production") + "<span>delivered professional work</span>" +
      levelBadge("applied") + "<span>prototypes, internal tooling, coursework</span>" + levelBadge("learning") + "<span>currently studying</span></div>" +
      '<div class="skills-grid">' + groups + "</div>" +
      '<div class="card learning"><span class="eyebrow">Currently learning</span><ul>' + learning + "</ul></div>" +
      "</div></section>"
    );
  }

  function renderCredentials() {
    var E = S.education;
    var certs = S.certifications.filter(visible).map(function (c) {
      return (
        '<li class="' + flagged(c).trim() + '"><strong>' + esc(c.name) + "</strong><span>" + esc(c.issuer) + (c.earned ? " · Earned " + esc(c.earned) : "") + "</span>" +
        (c.verifyUrl ? '<a href="' + esc(c.verifyUrl) + '" target="_blank" rel="noopener">Verify credential</a>' : "") +
        badge(c.confirm || c.statusConfirm) + "</li>"
      );
    }).join("");
    var rec = S.recognition.map(function (r) {
      return "<li><strong>" + esc(r.title) + "</strong><span>" + esc(r.detail) + "</span></li>";
    }).join("");
    return (
      '<section class="section" id="credentials" aria-labelledby="cred-h"><div class="container">' +
      sectionHead("Background", "Education, certifications & recognition", null).replace('class="section-title"', 'class="section-title" id="cred-h"') +
      '<div class="creds">' +
      '<div class="card"><h3>Education</h3><ul class="cred-list"><li><strong>' + esc(E.degree) + "</strong><span>" + esc(E.school) + "</span><span>" + esc(E.years) + " · " + esc(E.grade) + "</span></li></ul></div>" +
      '<div class="card"><h3>Certifications</h3><ul class="cred-list">' + certs + "</ul></div>" +
      '<div class="card"><h3>Recognition</h3><ul class="cred-list">' + rec + "</ul></div>" +
      "</div></div></section>"
    );
  }

  function renderContact() {
    var L = S.links;
    function row(href, label, value, icon, ext) {
      return '<a class="contact-row" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + "><div><span>" + label + "</span><strong>" + esc(value) + "</strong></div>" + icon + "</a>";
    }
    var medium = [L.medium, L.mediumAlt].filter(Boolean).map(function (url) {
      return row(url, "Writing · Medium", url.replace("https://", ""), ICON.ext, true);
    }).join("");
    return (
      '<section class="section" id="contact" aria-labelledby="contact-h"><div class="container contact"><div>' +
      sectionHead(
        "Contact",
        "Let’s talk",
        "I’m interested in Senior Data Engineer, AI/ML Engineer and Agent Engineer roles. The quickest way to reach me is email or LinkedIn."
      ).replace('class="section-title"', 'class="section-title" id="contact-h"') +
      '<div class="hero-cta" style="margin-top:0"><a class="btn btn-primary" href="mailto:' + esc(L.email) + '">' + ICON.mail + " Email me</a>" +
      '<a class="btn" href="' + esc(L.resume) + '" download="' + esc(L.resumeFileName) + '">' + ICON.download + " Download résumé</a></div></div>" +
      '<div class="contact-actions">' +
      row("mailto:" + L.email, "Email", L.email, ICON.mail) +
      row(L.linkedin, "LinkedIn", "linkedin.com/in/dhanya-vangalapudi", ICON.ext, true) +
      row(L.github, "GitHub", "github.com/dhanya777", ICON.ext, true) +
      medium +
      '<button type="button" class="btn btn-sm btn-ghost" id="copy-email" style="justify-self:start">Copy email address</button>' +
      "</div></div></section>"
    );
  }

  function renderFooter() {
    $("#footer").innerHTML =
      "<span>© " + new Date().getFullYear() + " " + esc(S.profile.name) + "</span>" +
      '<nav aria-label="Footer"><a href="' + esc(S.links.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="' + esc(S.links.github) + '" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="' + esc(S.links.resume) + '" download="' + esc(S.links.resumeFileName) + '">Résumé</a><a href="#top">Back to top ↑</a></nav>';
  }

  // ════════════════════════════════════════════════════════════════════════
  //  Modes, navigation and layout
  // ════════════════════════════════════════════════════════════════════════
  var ORDER = {
    recruiter: ["top", "strengths", "experience", "work", "technical", "skills", "credentials", "contact"],
    engineer: ["top", "work", "architecture", "simulator", "decisions", "code", "experience", "skills", "credentials", "contact"],
  };
  var NAV = {
    recruiter: [["strengths", "Strengths"], ["experience", "Experience"], ["work", "Projects"], ["skills", "Skills"], ["contact", "Contact"]],
    engineer: [["work", "Projects"], ["architecture", "Architecture"], ["simulator", "Simulator"], ["decisions", "Decisions"], ["code", "Code"], ["experience", "Experience"], ["contact", "Contact"]],
  };
  var sections = {};
  var homeView = $("#home-view");
  var caseView = $("#case-view");

  function buildSections() {
    var html = {
      top: renderHero(),
      strengths: renderStrengths(),
      work: renderWork(),
      technical: renderTeaser(),
      architecture: renderExplorer(),
      simulator: renderSimulator(),
      decisions: renderDecisions(),
      code: renderCode(),
      experience: renderExperience(),
      skills: renderSkills(),
      credentials: renderCredentials(),
      contact: renderContact(),
    };
    Object.keys(html).forEach(function (k) {
      sections[k] = el(html[k]);
    });
  }

  function mode() {
    return root.dataset.mode === "engineer" ? "engineer" : "recruiter";
  }

  function setMode(m, opts) {
    root.dataset.mode = m;
    store("mode", m);
    $$("[data-set-mode]").forEach(function (b) {
      if (b.closest(".mode-switch")) b.setAttribute("aria-pressed", String(b.dataset.setMode === m));
    });
    layout();
    if (!opts || !opts.silent) announce(m === "engineer" ? "Technical view: architecture, decisions and code shown first." : "Recruiter view: summary, experience and projects shown first.");
  }

  function layout() {
    var m = mode();
    homeView.textContent = "";
    ORDER[m].forEach(function (id) {
      homeView.appendChild(sections[id]);
    });
    $("#nav-list").innerHTML = NAV[m].map(function (n) {
      return '<li><a href="#' + n[0] + '">' + n[1] + "</a></li>";
    }).join("");
    observeSections();
  }

  var live = el('<div class="sr-only" aria-live="polite"></div>');
  document.body.appendChild(live);
  function announce(msg) {
    live.textContent = msg;
  }

  // Active nav link + subtle reveal.
  var sectionObserver;
  function observeSections() {
    if (!("IntersectionObserver" in window)) return;
    if (sectionObserver) sectionObserver.disconnect();
    sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $$("#nav-list a").forEach(function (a) {
            a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id));
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("#home-view > section").forEach(function (s) {
      sectionObserver.observe(s);
    });
  }

  // ════════════════════════════════════════════════════════════════════════
  //  Case study view
  // ════════════════════════════════════════════════════════════════════════
  var TABS = [
    ["overview", "Overview"],
    ["architecture", "Architecture"],
    ["implementation", "Implementation"],
    ["reliability", "Reliability"],
    ["results", "Results"],
  ];

  function list(items) {
    return '<ul class="list">' + only(items).map(function (x) { return "<li>" + esc(textOf(x)) + badge(x.confirm) + "</li>"; }).join("") + "</ul>";
  }
  function block(title, body) {
    return '<div class="block"><h2>' + esc(title) + "</h2>" + body + "</div>";
  }

  function panel(p, tab) {
    if (tab === "overview") {
      return (
        block("Problem & context", "<p>" + esc(p.problem) + "</p>") +
        block("My role & contribution", "<p>" + esc(p.role) + "</p>") +
        block("Requirements & constraints", list(p.requirements))
      );
    }
    if (tab === "architecture") {
      return (
        block("Architecture", flowDiagram(p.architecture, p.id)) +
        block("Technology choices", '<div class="choice-list">' + p.choices.map(function (c) {
          return '<div class="card choice"><strong>' + esc(c.tech) + "</strong><p>" + esc(c.why) + "</p></div>";
        }).join("") + "</div>")
      );
    }
    if (tab === "implementation") {
      return (
        block("Implementation details", list(p.implementation)) +
        (p.code || []).map(function (id) { return codeById[id] ? block("Representative code", codeBlock(codeById[id])) : ""; }).join("")
      );
    }
    if (tab === "reliability") {
      var rows = p.reliability.map(function (r) { return "<tr><td>" + esc(r.failure) + "</td><td>" + esc(r.handling) + "</td></tr>"; }).join("");
      return (
        block("Data quality & testing", list(p.quality)) +
        block("Failure handling", '<table class="fail-table"><thead><tr><th scope="col">Failure</th><th scope="col">How it’s handled</th></tr></thead><tbody>' + rows + "</tbody></table>") +
        (p.security || p.limitations
          ? '<div class="two-col">' +
            (p.security ? block("Security & confidentiality", list(p.security)) : "") +
            (p.limitations ? block("Limitations", list(p.limitations)) : "") + "</div>"
          : "")
      );
    }
    return (
      block("Verified outcomes", list(p.outcomes)) +
      '<div class="two-col">' + block("Engineering trade-offs", list(p.tradeoffs)) + block("Lessons learned", list(p.lessons)) + "</div>"
    );
  }

  function showCase(id, tab) {
    var p = projectsById[id];
    if (!p || !visible(p)) {
      location.replace("#work");
      return;
    }
    tab = TABS.some(function (t) { return t[0] === tab; }) ? tab : "overview";
    var list_ = only(S.projects);
    var idx = list_.indexOf(p);
    var prev = list_[idx - 1],
      next = list_[idx + 1];
    var facts = only(p.facts).map(function (f) {
      return "<div><strong>" + esc(f.value) + "</strong><span>" + esc(f.label) + "</span>" + badge(f.confirm) + "</div>";
    }).join("");

    caseView.innerHTML =
      '<article class="case container" aria-labelledby="case-title">' +
      '<a class="crumb" href="#work">' + ICON.back + " All case studies</a>" +
      '<header class="case-head"><div class="case-meta"><span class="eyebrow">' + esc(p.kicker) + "</span>" +
      '<span class="badge ' + LEVEL[p.status].cls + '">' + esc(p.statusLabel) + "</span></div>" +
      badge(p.confirmStatus) +
      '<h1 id="case-title" tabindex="-1">' + esc(p.title) + '</h1><p class="lede">' + esc(p.summary) + "</p>" +
      '<ul class="chips">' + p.stack.map(function (t) { return '<li class="chip">' + esc(t) + "</li>"; }).join("") + "</ul></header>" +
      (facts ? '<div class="case-facts">' + facts + "</div>" : "") +
      '<div class="tabs" role="tablist" aria-label="Case study sections">' +
      TABS.map(function (t) {
        var sel = t[0] === tab;
        return '<button type="button" role="tab" class="tab" id="tab-' + t[0] + '" aria-controls="panel" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '" data-tab="' + t[0] + '">' + t[1] + "</button>";
      }).join("") + "</div>" +
      '<div class="tab-panel" id="panel" role="tabpanel" tabindex="0" aria-labelledby="tab-' + tab + '">' + panel(p, tab) + "</div>" +
      '<nav class="case-nav" aria-label="More case studies">' +
      (prev ? '<a href="#/work/' + prev.id + '"><span>← Previous</span><strong>' + esc(prev.title) + "</strong></a>" : "") +
      (next ? '<a class="next" href="#/work/' + next.id + '"><span>Next →</span><strong>' + esc(next.title) + "</strong></a>" : "") +
      "</nav></article>";

    caseView.dataset.project = id;
    caseView.dataset.tab = tab;
    homeView.hidden = true;
    caseView.hidden = false;
    document.title = p.title + " — " + S.profile.name;
  }

  function selectTab(tab, focus) {
    var p = projectsById[caseView.dataset.project];
    caseView.dataset.tab = tab;
    $$(".tab", caseView).forEach(function (b) {
      var sel = b.dataset.tab === tab;
      b.setAttribute("aria-selected", String(sel));
      b.tabIndex = sel ? 0 : -1;
      if (sel && focus) b.focus();
    });
    var pnl = $("#panel", caseView);
    pnl.setAttribute("aria-labelledby", "tab-" + tab);
    pnl.innerHTML = panel(p, tab);
    history.replaceState(null, "", "#/work/" + p.id + "/" + tab);
    var tabs = $(".tabs", caseView);
    if (tabs.getBoundingClientRect().top <= parseInt(getComputedStyle(root).getPropertyValue("--header-h"), 10) + 1) {
      window.scrollTo({ top: window.scrollY + tabs.getBoundingClientRect().top - 64, behavior: "auto" });
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  //  Router
  // ════════════════════════════════════════════════════════════════════════
  var lastHomeScroll = 0;
  function route() {
    var h = decodeURIComponent(location.hash);
    var m = h.match(/^#\/work\/([\w-]+)(?:\/(\w+))?/);
    if (m) {
      if (caseView.hidden) lastHomeScroll = window.scrollY;
      var sameProject = !caseView.hidden && caseView.dataset.project === m[1];
      showCase(m[1], m[2]);
      if (!sameProject) {
        window.scrollTo(0, 0);
        var t = $("#case-title");
        if (t) t.focus({ preventScroll: true });
      }
      return;
    }
    var wasCase = !caseView.hidden;
    caseView.hidden = true;
    homeView.hidden = false;
    document.title = S.meta.title;
    var id = h.slice(1);
    if (id && !document.getElementById(id)) {
      // A section that only exists in the other mode — switch to it.
      var other = mode() === "engineer" ? "recruiter" : "engineer";
      if (ORDER[other].indexOf(id) !== -1) setMode(other);
    }
    var target = id && document.getElementById(id);
    if (target) {
      if (target.tagName === "DETAILS") target.open = true;
      target.scrollIntoView({ block: "start" });
    } else if (wasCase) {
      window.scrollTo(0, lastHomeScroll);
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  //  Events
  // ════════════════════════════════════════════════════════════════════════
  function bind() {
    document.addEventListener("click", function (e) {
      var t = e.target;

      var modeBtn = t.closest("[data-set-mode]");
      if (modeBtn) {
        setMode(modeBtn.dataset.setMode);
        var scrollTo = modeBtn.dataset.scroll;
        if (scrollTo) location.hash = "#" + scrollTo;
        else if (!caseView.hidden) location.hash = "#top";
        return;
      }

      // Same-hash clicks don't fire hashchange; handle them so nav always scrolls.
      var a = t.closest('a[href^="#"]');
      if (a) {
        $("#primary-nav").classList.remove("open");
        $("#menu-toggle").setAttribute("aria-expanded", "false");
        if (a.getAttribute("href") === location.hash) {
          e.preventDefault();
          route();
        }
      }

      var explore = t.closest("[data-explore]");
      if (explore) {
        var n = S.explorer.nodes[+explore.dataset.explore];
        $$("[data-explore]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === explore)); });
        $("#explorer-detail").innerHTML = explorerDetail(n);
        return;
      }

      var flow = t.closest("[data-flow]");
      if (flow) {
        var proj = projectsById[flow.dataset.flow];
        var node = proj.architecture[+flow.dataset.idx];
        $$('[data-flow="' + flow.dataset.flow + '"]').forEach(function (b) { b.setAttribute("aria-pressed", String(b === flow)); });
        $("#note-" + proj.id).innerHTML = "<strong>" + esc(node.label) + ":</strong> " + esc(node.note);
        return;
      }

      if (t.id === "explorer-mode") {
        var text = $("#explorer-text"),
          diagram = $("#explorer-diagram");
        var showText = text.hidden;
        text.hidden = !showText;
        diagram.hidden = showText;
        t.textContent = showText ? "View as diagram" : "View as text";
        t.setAttribute("aria-expanded", String(showText));
        return;
      }

      var tab = t.closest("[data-tab]");
      if (tab) {
        selectTab(tab.dataset.tab, false);
        return;
      }

      var filter = t.closest("[data-topic]");
      if (filter && filter.classList.contains("filter")) {
        var topic = filter.dataset.topic;
        $$("#decisions .filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b === filter)); });
        $$("#decisions .decision").forEach(function (d) { d.hidden = topic !== "All" && d.dataset.topic !== topic; });
        return;
      }

      var codeTab = t.closest("[data-code]");
      if (codeTab) {
        $$("[data-code]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === codeTab)); });
        $("#code-slot").innerHTML = codeBlock(codeById[codeTab.dataset.code]);
        return;
      }

      var copy = t.closest("[data-copy]");
      if (copy) {
        copyText(codeById[copy.dataset.copy].body, copy, "Copied");
        return;
      }
      if (t.id === "copy-email") {
        copyText(S.links.email, t, "Email copied");
        return;
      }

      var preset = t.closest("[data-preset]");
      if (preset) {
        $$('input[name="sim-guard"]').forEach(function (i) { i.checked = preset.dataset.preset === "all"; });
        runSimulator();
      }
    });

    document.addEventListener("change", function (e) {
      if (e.target.closest("#sim-form")) runSimulator();
    });

    // Arrow-key navigation within the case-study tablist.
    document.addEventListener("keydown", function (e) {
      var tab = e.target.closest && e.target.closest('[role="tab"]');
      if (!tab) return;
      var tabs = $$('[role="tab"]', caseView);
      var i = tabs.indexOf(tab);
      var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      next = (next + tabs.length) % tabs.length;
      selectTab(tabs[next].dataset.tab, true);
    });

    $("#theme-toggle").addEventListener("click", function () {
      var t = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = t;
      store("theme", t);
      syncThemeButton();
    });

    $("#menu-toggle").addEventListener("click", function () {
      var nav = $("#primary-nav");
      var open = nav.classList.toggle("open");
      this.setAttribute("aria-expanded", String(open));
      this.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && $("#primary-nav").classList.contains("open")) {
        $("#primary-nav").classList.remove("open");
        $("#menu-toggle").setAttribute("aria-expanded", "false");
        $("#menu-toggle").focus();
      }
    });

    var header = $("#site-header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });

    window.addEventListener("hashchange", route);
  }

  function syncThemeButton() {
    var light = root.dataset.theme === "light";
    $("#theme-toggle").setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    $('meta[name="theme-color"]').setAttribute("content", light ? "#f6f7f9" : "#0b0d12");
  }

  function copyText(text, btn, done) {
    var original = btn.textContent;
    function ok() {
      btn.textContent = done;
      setTimeout(function () { btn.textContent = original; }, 1600);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      ta.remove();
    }
  }

  function reviewBanner() {
    if (!REVIEW) return;
    var count = 0;
    (function walk(o) {
      if (Array.isArray(o)) o.forEach(walk);
      else if (o && typeof o === "object") Object.keys(o).forEach(function (k) {
        if (/onfirm/.test(k) && o[k]) count++;
        else walk(o[k]);
      });
    })(S);
    var b = $("#review-banner");
    b.innerHTML = "<span><b>Review mode</b> · " + count + " items need confirmation. Unconfirmed items are hidden on the live site.</span>" +
      '<button type="button" class="btn btn-sm" aria-label="Dismiss review banner">Hide</button>';
    b.hidden = false;
    b.querySelector("button").addEventListener("click", function () { b.hidden = true; });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  buildSections();
  renderFooter();
  bind();
  setMode(mode(), { silent: true });
  syncThemeButton();
  runSimulator();
  reviewBanner();
  route();
})();
