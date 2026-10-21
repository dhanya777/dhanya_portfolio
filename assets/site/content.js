/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to update the portfolio.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every section of the site is rendered from this object. You should not need
 *  to touch app.js or index.html to change profile facts, projects, skills,
 *  certifications or links.
 *
 *  THE `confirm` FIELD
 *  Any item may carry `confirm: "what needs checking"`. Such items are:
 *    • HIDDEN on the live site, so nothing unverified is ever published;
 *    • SHOWN with an amber "Needs confirmation" badge in review mode
 *      (automatically on localhost, or by adding ?review to the URL).
 *  Once you have verified the fact, update the item and delete its `confirm`
 *  line — it will then appear on the live site.
 *
 *  Evidence levels used for skills and projects:
 *    "production" — used in professional, delivered work
 *    "applied"    — prototypes, internal tooling, coursework or personal work
 *    "learning"   — actively studying; not claimed as delivered work
 */
// Résumé improvement percentages stay hidden until you can say how each was measured.
var METRIC_NOTE = "Résumé metric. Publish once you can say how it was measured (remove this confirm line).";

window.SITE = {
  meta: {
    title: "Dhanya Vangalapudi — Senior Data Engineer · Cloud Data Platforms · AI/ML Engineering",
    description:
      "Data engineer building reliable pipelines, cloud data platforms on Google Cloud, and AI-assisted data products. Case studies, reference architectures and engineering decisions.",
    url: "https://dhanya777.github.io/dhanya_portfolio/",
  },

  profile: {
    name: "Dhanya Vangalapudi",
    initials: "DV",
    role: "Senior Data Engineer",
    positioning: "Senior Data Engineer · Cloud Data Platforms · AI/ML Engineering",
    // Used to show "Data engineering since <month year>" (first full-time role).
    careerStart: "June 2022",
    location: "Bangalore, India",
    headline: "I build reliable data platforms and production-ready AI systems.",
    subhead:
      "Data engineering, cloud architecture and intelligent data products — designed for reliability, scalability and maintainability.",
    intro: [
      "I’m a data engineer who builds pipelines, cloud data platforms and data products that teams can trust. My work spans Python, SQL, Google Cloud, ETL/ELT, data modelling, data quality and the day-to-day reality of keeping production workflows healthy.",
      "I like hard problems that make systems easier to operate: migrations that reconcile to the row, orchestration that fails loudly instead of silently, and automation that removes repetitive work. I’m now extending that foundation into AI/ML engineering — LLM-assisted tooling, retrieval and agentic systems — applying the same standards of validation and observability.",
    ],
    heroStack: ["Python", "SQL", "BigQuery", "Dataflow / Beam", "Pub/Sub", "Airflow", "Dataform", "Vertex AI · Gemini"],
  },

  links: {
    email: "dhanyav026@gmail.com",
    linkedin: "https://www.linkedin.com/in/dhanya-vangalapudi",
    github: "https://github.com/dhanya777",
    // Relative path so it works under the GitHub Pages base path.
    resume: "resume/DhanyaResume.pdf",
    resumeFileName: "Dhanya_Vangalapudi_Resume.pdf",
    medium: "https://medium.com/@dhanyav026",
    mediumAlt: "https://medium.com/@vangalapudi.dhanya",
  },

  highlights: [
    {
      title: "Cloud data pipeline engineering",
      body: "Batch and streaming ingestion on GCP — Data Fusion, Dataflow/Beam, Pub/Sub and Cloud Storage landing into BigQuery.",
      evidence: [{ label: "Production pipelines", project: "platform" }, { label: "CDC migration", project: "cdc" }],
    },
    {
      title: "Production ETL/ELT and transformation",
      body: "SQL-first transformation in Dataform and BigQuery, orchestrated with Airflow — including custom operators.",
      evidence: [{ label: "Airflow + Dataform", project: "platform" }],
    },
    {
      title: "Data quality, validation and reliability",
      body: "Migration reconciliation, audit metadata, schema-drift handling and alerting, plus production troubleshooting.",
      evidence: [{ label: "Schema drift & CDC", project: "cdc" }, { label: "Failure simulator", section: "simulator" }],
    },
    {
      title: "SQL and Python engineering",
      body: "Reusable Python modules and operators, set-based SQL, MERGE-based idempotent loads and BigQuery cost/performance tuning.",
      evidence: [{ label: "Code samples", section: "code" }],
    },
    {
      title: "AI-assisted engineering and ML",
      body: "Gemini on Vertex AI for SQL-to-Dataform migration with validation gates; BigQuery ML forecasting for anomaly detection.",
      evidence: [{ label: "AI migration", project: "ai-dataform" }, { label: "Anomaly detection", project: "anomaly" }],
    },
  ],

  // ── Experience ────────────────────────────────────────────────────────────
  experience: [
    {
      id: "insight-global",
      org: "Insight Global",
      client: "The Home Depot",
      relationship: "Client: The Home Depot (via Insight Global) · Bangalore",
      title: "Data Engineer",
      start: "Jun 2025",
      end: "Present",
      summary: "Data quality, reconciliation, ETL and ML-based monitoring on Google Cloud for a large retail client.",
      points: [
        "Built a proof of concept for anomaly detection on weekly installation-sales KPIs using BigQuery ML (ARIMA_PLUS), Dataform and Cloud Functions, flagging irregular KPI shifts and data-quality issues.",
        "Implemented reconciliation logic between two services reporting datasets, reducing mismatch rates and improving reporting accuracy.",
        "Partnered with business stakeholders to troubleshoot metric deviations and keep metric definitions consistent across dashboards and data products.",
        "Designed and optimised end-to-end ETL pipelines for high-volume retail and services data, improving freshness and reliability of enterprise dashboards.",
      ],
      tech: ["BigQuery", "BigQuery ML", "Dataform", "Cloud Functions", "SQL", "Python"],
      projects: ["anomaly"],
    },
    {
      id: "newscorp",
      org: "News Corp",
      title: "Data Engineer",
      start: "Nov 2023",
      end: "Jun 2025",
      summary:
        "Ingestion, orchestration and transformation engineering on Google Cloud, plus AI-assisted migration tooling.",
      points: [
        "Designed and deployed 16+ Cloud Data Fusion pipelines ingesting Salesforce data and database file extracts.",
        "Built a custom Airflow operator for Cloud Storage file composition that works around the 32-object compose limit with an iterative merge strategy.",
        { text: "GCS compose operator reduced file-processing time by ~40%.", confirm: METRIC_NOTE },
        "Built an Airflow operator that compiles a Dataform repository and invokes the resulting workflow in a single task.",
        { text: "Dataform operator reduced DAG complexity by ~50%.", confirm: METRIC_NOTE },
        "Automated migration of 400+ SQL scripts from a Git repository to Dataform using Vertex AI prompt management and Gemini 1.5 Flash, with compile and validation checks.",
        { text: "Reduced SQL-to-Dataform migration time by ~70%.", confirm: METRIC_NOTE },
        "Designed feed-registry and audit-metadata tables to track pipeline runs; validated migrated data and resolved production pipeline failures.",
        "Created a shared Python module used across Airflow DAGs that standardised common tasks and sped up failure diagnosis.",
        { text: "Shared Python module reduced debugging time by ~60%.", confirm: METRIC_NOTE },
        "Presented internal talks on the evolution of data architecture and on IoT initiatives.",
      ],
      tech: ["Cloud Data Fusion", "Airflow", "Dataform", "BigQuery", "Cloud Storage", "Python", "Vertex AI", "Gemini"],
      projects: ["platform", "ai-dataform"],
    },
    {
      id: "searce",
      org: "Searce",
      title: "Data Engineer",
      start: "Jun 2022",
      end: "Nov 2023",
      summary: "Client-facing Google Cloud data engineering: migrations, CDC, streaming and alerting.",
      points: [
        "Designed and implemented an end-to-end SQL Server → BigQuery migration with Change Data Capture synchronising incremental changes hourly, handling five schema-drift scenarios.",
        "Built a fully automated migration that moved ~5 TB from Snowflake to BigQuery within a two-week window, including extraction, validation and error handling.",
        { text: "Snowflake migration completed with zero data loss; SQL Server migration cut migration cost by ~30%.", confirm: METRIC_NOTE },
        "Built a real-time IoT ingestion path with Pub/Sub and Dataflow streaming into BigQuery.",
        "Implemented an automated email-alerting mechanism driven by BigQuery checks and an SMTP server.",
        { text: "Alerting improved incident response time by ~50%.", confirm: METRIC_NOTE },
        "Developed data models and schemas in BigQuery and Cloud SQL; tuned SQL and Apache Beam code for performance.",
        "Co-created a Data Mesh implementation workshop on GCP, later presented to Google Cloud leadership.",
      ],
      tech: ["BigQuery", "Dataflow", "Apache Beam", "Pub/Sub", "Cloud Storage", "Cloud SQL", "Python", "SQL"],
      projects: ["cdc"],
    },
  ],

  education: {
    degree: "B.Tech, Production Engineering",
    school: "National Institute of Technology Calicut",
    years: "2018 – 2022",
    grade: "GPA 8.43 / 10",
  },

  // `earned` comes from the résumé. Add `verifyUrl` (Credly / Google Cloud
  // credential link) and `status` once confirmed — never guess either.
  certifications: [
    {
      name: "Professional Data Engineer",
      issuer: "Google Cloud",
      earned: "Dec 2022",
      verifyUrl: "",
      statusConfirm: "Résumé lists validity Dec 2022 – Dec 2024. Confirm renewal status and add the Credly / credential URL.",
    },
    {
      name: "Professional Cloud Database Engineer",
      issuer: "Google Cloud",
      earned: "Apr 2023",
      verifyUrl: "",
      statusConfirm: "Résumé lists validity Apr 2023 – Apr 2025. Confirm renewal status and add the credential URL.",
    },
    {
      name: "Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      earned: "Jul 2024",
      verifyUrl: "",
      statusConfirm: "Résumé lists validity Jul 2024 – Jul 2026. Confirm renewal status and add the credential URL.",
    },
    {
      name: "Certified Scrum Product Owner (CSPO)",
      issuer: "Scrum Alliance",
      earned: "",
      verifyUrl: "",
      confirm: "No evidence of CSPO in the repository or résumé. Add date and verification link only if held.",
    },
  ],

  recognition: [
    { title: "Employee Spotlight Award", detail: "FY’24" },
    { title: "Star Performer of the Month", detail: "April 2024" },
    { title: "“Most Entrepreneurial Team”", detail: "Climate Data Hackathon — climate-resilient agriculture" },
  ],

  // ── Skills ────────────────────────────────────────────────────────────────
  // evidence: project ids, "exp:<experience id>", or section ids (code, decisions, simulator)
  skills: [
    {
      group: "Programming & data processing",
      items: [
        { name: "Python", level: "production", evidence: ["platform", "code"], note: "Airflow operators, shared pipeline modules, migration automation." },
        { name: "SQL", level: "production", evidence: ["cdc", "code"], note: "BigQuery SQL, MERGE-based upserts, reconciliation queries, Dataform SQLX." },
        { name: "Pandas & NumPy", level: "applied", evidence: [], note: "Exploratory analysis and ML coursework (academic projects)." },
        { name: "Apache Spark / PySpark", level: "production", evidence: [], note: "Used in production data processing." },
      ],
    },
    {
      group: "Cloud & data platforms",
      items: [
        { name: "Google Cloud Platform", level: "production", evidence: ["exp:searce", "exp:newscorp"] },
        { name: "BigQuery", level: "production", evidence: ["cdc", "platform", "anomaly"], note: "Warehouse design, partitioning/clustering, MERGE, BigQuery ML." },
        { name: "Cloud Storage", level: "production", evidence: ["platform", "cdc"] },
        { name: "Pub/Sub", level: "production", evidence: ["cdc", "exp:searce"], note: "Streaming IoT ingestion; change-event transport." },
        { name: "Dataflow & Apache Beam", level: "production", evidence: ["cdc", "exp:searce"] },
        { name: "Cloud Data Fusion", level: "production", evidence: ["platform"], note: "16+ ingestion pipelines." },
        { name: "Cloud SQL", level: "production", evidence: ["exp:searce"] },
        { name: "Cloud Run & Cloud Functions", level: "production", evidence: ["anomaly"], note: "Cloud Functions in the anomaly-detection workflow." },
        { name: "Dataproc", level: "production", evidence: [] },
        { name: "Snowflake", level: "production", evidence: ["exp:searce"], note: "Source platform in a ~5 TB migration to BigQuery." },
      ],
    },
    {
      group: "Data engineering",
      items: [
        { name: "ETL / ELT pipelines", level: "production", evidence: ["platform", "cdc"] },
        { name: "Data & dimensional modelling", level: "production", evidence: ["decisions", "exp:searce"] },
        { name: "Incremental ingestion & CDC", level: "production", evidence: ["cdc"] },
        { name: "Database migration & schema evolution", level: "production", evidence: ["cdc", "ai-dataform"], note: "SQL Server, Snowflake → BigQuery; five schema-drift scenarios." },
        { name: "Data validation & quality checks", level: "production", evidence: ["platform", "cdc", "simulator"] },
        { name: "Data reconciliation & metric validation", level: "production", evidence: ["exp:insight-global", "decisions"] },
        { name: "Performance tuning & troubleshooting", level: "production", evidence: ["exp:searce", "decisions"] },
      ],
    },
    {
      group: "Orchestration & transformation",
      items: [
        { name: "Airflow / Cloud Composer", level: "production", evidence: ["platform", "code"], note: "Custom operators for GCS compose and Dataform compile + invoke." },
        { name: "Dataform", level: "production", evidence: ["platform", "ai-dataform", "anomaly"] },
        { name: "Workflow automation & scheduling", level: "production", evidence: ["platform"] },
      ],
    },
    {
      group: "Engineering practices",
      items: [
        { name: "Git & CI/CD", level: "production", evidence: ["ai-dataform"] },
        { name: "Docker", level: "production", evidence: [] },
        { name: "New Relic monitoring & SMTP alerting", level: "production", evidence: ["exp:searce"] },
        { name: "Looker dashboards", level: "production", evidence: [] },
      ],
    },
    {
      group: "AI / ML engineering",
      items: [
        { name: "BigQuery ML (ARIMA_PLUS) anomaly detection", level: "applied", evidence: ["anomaly", "code"], note: "Proof of concept at Insight Global." },
        { name: "Vertex AI & Gemini", level: "production", evidence: ["ai-dataform"], note: "Used to migrate 400+ SQL scripts with validation gates." },
        { name: "LLM application development", level: "applied", evidence: ["ai-dataform"], note: "Prompt management, structured generation, output validation." },
        { name: "RAG & retrieval", level: "learning", evidence: ["decisions"], note: "Studying chunking, hybrid retrieval and evaluation." },
        { name: "Agents, tool calling & evaluation", level: "learning", evidence: [], note: "Studying tool-use loops, structured outputs and eval harnesses." },
      ],
    },
  ],

  // ── Reference architecture for the interactive explorer ────────────────────
  explorer: {
    title: "Reference architecture — a GCP batch + streaming data platform",
    label: "Reference architecture",
    note: "Representative of the systems I build. Not a diagram of any specific employer’s deployment.",
    nodes: [
      {
        id: "sources", name: "Source systems", short: "OLTP · SaaS · files · events",
        responsibility: "Systems of record that produce the data: transactional databases, SaaS APIs (e.g. Salesforce), file drops from partners and device or application event streams.",
        inputs: "Business activity", outputs: "Rows, change logs, files, events",
        tech: ["SQL Server / Cloud SQL", "Salesforce", "SFTP / file extracts", "IoT devices"],
        failures: ["API rate limits and timeouts", "Late or missing file drops", "Unannounced schema changes", "Source-side backfills that rewrite history"],
        recovery: "Treat every source as unreliable: agree data contracts, capture extraction watermarks so any window can be re-pulled, and alert on freshness rather than only on job failure.",
        tradeoffs: "Extracting from read replicas or change logs protects the OLTP system; querying production directly is simpler but risks contention.",
        security: "Least-privilege service accounts, credentials in Secret Manager, PII identified at the source boundary.",
      },
      {
        id: "ingest", name: "Ingestion", short: "Batch extract · CDC · streaming",
        responsibility: "Moves data off the source reliably: scheduled batch extracts, change data capture for databases, and streaming consumers for events.",
        inputs: "Source tables, APIs, files, events", outputs: "Raw files in GCS, messages on Pub/Sub",
        tech: ["Cloud Data Fusion", "Dataflow / Apache Beam", "Python extractors", "CDC"],
        failures: ["Partial extracts after a mid-run failure", "Duplicate events from at-least-once delivery", "Watermark drift skipping a window"],
        recovery: "Retries with exponential backoff; idempotent writes keyed on (source, window) so re-runs overwrite rather than append; watermarks committed only after a successful load.",
        tradeoffs: "Managed tools (Data Fusion) are faster to deliver and easier to hand over; code-first Beam gives finer control over ordering, windowing and cost.",
        security: "Encrypt in transit, keep raw PII in restricted buckets, and log who/what extracted each batch.",
      },
      {
        id: "land", name: "Landing & messaging", short: "Cloud Storage · Pub/Sub",
        responsibility: "Durable buffer between ingestion and processing. GCS holds immutable raw files; Pub/Sub decouples event producers from consumers.",
        inputs: "Raw extracts, change events", outputs: "Replayable raw data",
        tech: ["Cloud Storage", "Pub/Sub", "Dead-letter topics"],
        failures: ["Small-file explosion slowing loads", "Poison messages blocking a subscription", "Unbounded retention cost"],
        recovery: "Compose small objects before load; route poison messages to a dead-letter topic with alerting; keep raw data immutable so any downstream table can be rebuilt.",
        tradeoffs: "Keeping raw data longer enables replays and audits but costs storage — use lifecycle rules to move older objects to colder classes.",
        security: "Bucket-level IAM, retention locks where required, CMEK if mandated.",
      },
      {
        id: "transform", name: "Transformation", short: "Dataflow · Dataform · SQL",
        responsibility: "Cleans, conforms and models data: deduplication, type casting, SCD handling and business logic, producing staging → core → mart layers.",
        inputs: "Raw / staging tables", outputs: "Modelled, tested tables",
        tech: ["Dataform (SQLX)", "BigQuery SQL", "Dataflow", "Airflow / Composer"],
        failures: ["Logic regressions after a change", "Late data missing from an already-built partition", "Dependency order mistakes"],
        recovery: "Version-controlled SQL with assertions; incremental models that reprocess a look-back window; DAG dependencies and sensors instead of fixed schedules.",
        tradeoffs: "ELT in BigQuery is simple and scales well; heavy row-level or streaming logic belongs in Dataflow. Incremental models save cost but need careful late-data handling.",
        security: "Column-level masking and policy tags applied in modelled layers; no PII in marts unless required.",
      },
      {
        id: "warehouse", name: "BigQuery warehouse", short: "Partitioned · clustered · modelled",
        responsibility: "The analytical store and system of reference for downstream consumers, organised by layer with clear ownership.",
        inputs: "Transformed data", outputs: "Query-ready datasets",
        tech: ["BigQuery", "Partitioning & clustering", "MERGE", "Authorised views"],
        failures: ["Runaway query cost", "Concurrent DML conflicts", "Silent duplication from non-idempotent loads"],
        recovery: "MERGE on business keys, partition-scoped rewrites, time travel for point-in-time recovery, and cost controls (max bytes billed, reservations).",
        tradeoffs: "Partitioning by event date favours time-bounded queries; clustering on high-cardinality filter columns trims scans. Over-partitioning creates overhead.",
        security: "Dataset-level IAM, row-level security and policy tags; audit logs on sensitive datasets.",
      },
      {
        id: "quality", name: "Validation & monitoring", short: "Assertions · reconciliation · alerts",
        responsibility: "Proves the data is right and on time: freshness, volume, schema, uniqueness and reconciliation checks, plus audit metadata for every run.",
        inputs: "Pipeline metadata, table statistics", outputs: "Pass/fail signals, alerts, audit trail",
        tech: ["Dataform assertions", "Audit / feed-registry tables", "Cloud Monitoring", "Email / chat alerts", "BigQuery ML anomaly detection"],
        failures: ["Alert fatigue from noisy thresholds", "Checks that pass on empty data", "Monitoring that itself silently stops"],
        recovery: "Severity tiers (block vs warn), checks on expected volume not just nulls, heartbeat alerts for the monitoring jobs, and runbooks linked from alerts.",
        tradeoffs: "Blocking checks protect consumers but delay data; warn-only checks keep data flowing but need owners who act on them.",
        security: "Alerts reference IDs, not row contents, so no sensitive data leaks into chat or email.",
      },
      {
        id: "consumers", name: "Downstream consumers", short: "BI · ML · applications",
        responsibility: "Dashboards, analysts, ML features and applications that rely on modelled data — the people the platform exists for.",
        inputs: "Marts, views, features", outputs: "Decisions, reports, models",
        tech: ["Looker / BI tools", "Vertex AI", "APIs", "Reverse ETL"],
        failures: ["Dashboards showing stale data without warning", "Breaking changes to shared tables", "Unclear metric definitions"],
        recovery: "Publish freshness alongside data, version breaking changes behind views, and document metric definitions next to the model.",
        tradeoffs: "Wide, denormalised marts are fast for BI but duplicate logic; a semantic layer centralises definitions at the cost of another component.",
        security: "Consumers read through authorised views or curated datasets — never raw.",
      },
    ],
  },

  // ── Case studies ──────────────────────────────────────────────────────────
  // Architecture nodes: { id, label, tech, note }. Rendered as a flow diagram.
  projects: [
    {
      id: "platform",
      title: "Production ingestion & orchestration on Google Cloud",
      kicker: "Cloud data engineering",
      status: "production",
      statusLabel: "Production · News Corp",
      summary:
        "Ingestion of Salesforce and database-file feeds through 16+ Data Fusion pipelines, orchestrated by Airflow with custom operators and transformed in Dataform — with audit metadata to make every run traceable.",
      stack: ["Cloud Data Fusion", "Cloud Storage", "Airflow", "Dataform", "BigQuery", "Python"],
      facts: [
        { value: "16+", label: "Data Fusion pipelines designed and deployed" },
        { value: "2", label: "custom Airflow operators built" },
      ],
      problem:
        "Multiple business feeds — Salesforce objects and database file extracts — needed to land in BigQuery on a schedule, be transformed consistently, and be traceable when something went wrong. Orchestration had gaps: file assembly before load and Dataform compile/execute steps were handled as separate, fragile tasks.",
      role:
        "Designed and built the ingestion pipelines, wrote the custom Airflow operators and shared Python modules, designed the feed-registry and audit tables, and supported the pipelines in production (validation, failure triage and fixes).",
      requirements: [
        "Each feed must be re-runnable for a given load window without creating duplicates.",
        "Every run must be traceable: which feed, which files, how many rows, success or failure.",
        "Transformations versioned in Git and executed as part of the same orchestrated flow.",
        "Failures should surface to engineers quickly, with enough context to triage.",
      ],
      architecture: [
        { id: "a1", label: "Salesforce · DB file extracts", tech: "Sources", note: "SaaS objects and scheduled file extracts from source databases." },
        { id: "a2", label: "Cloud Data Fusion", tech: "Ingestion", note: "16+ pipelines, one per feed family, parameterised by load window." },
        { id: "a3", label: "Cloud Storage", tech: "Landing", note: "Raw files; a custom operator composes many small objects before load." },
        { id: "a4", label: "BigQuery staging", tech: "Warehouse", note: "Typed staging tables loaded per window." },
        { id: "a5", label: "Dataform", tech: "Transform", note: "SQLX models compiled and invoked from Airflow in a single operator." },
        { id: "a6", label: "Audit & feed registry", tech: "Observability", note: "Registry of feeds plus per-run audit rows used for validation and triage." },
      ],
      choices: [
        { tech: "Cloud Data Fusion", why: "Visual, managed pipelines with built-in Salesforce and database connectors — fast to deliver many similar feeds and easy for the team to operate." },
        { tech: "Airflow (Composer)", why: "Dependency-aware scheduling, retries and a single place to observe the end-to-end flow." },
        { tech: "Dataform", why: "SQL transformations in Git with dependency graphs and assertions, native to BigQuery." },
        { tech: "Custom operators", why: "Encapsulate repeated multi-step logic (compose files; compile + invoke Dataform) so DAGs stay small and consistent." },
      ],
      implementation: [
        "Parameterised Data Fusion pipelines by feed and load window so one design served many feeds.",
        "GCS compose operator: Cloud Storage composes at most 32 objects per request, so the operator merges iteratively (compose batches of 32, then compose the results) into load-sized files — fewer load jobs and simpler retries.",
        "Dataform operator: merges the provider’s compile and invoke operators into one class, so a task compiles the repository at a known commit and executes exactly that compilation result.",
        "Feed-registry table defines each feed (source, schedule, owner, expected cadence); audit table records each run (window, files, row counts, status, timestamps).",
        "Shared Python modules for repeated patterns (naming, paths, metadata writes) to reduce copy-paste across DAGs.",
      ],
      quality: [
        "Row-count reconciliation between extracted files and loaded staging tables, recorded in the audit table.",
        "Dataform assertions for uniqueness and not-null keys on modelled tables.",
        "Validation checks during migrations to confirm the migrated data matched the source before cut-over.",
      ],
      reliability: [
        { failure: "Data Fusion run fails mid-window", handling: "Window-scoped loads are re-run whole; the audit table shows the failed window so it is retried, not skipped." },
        { failure: "Small-file explosion slows loads", handling: "Compose operator consolidates objects before load, merging iteratively to stay within the 32-object compose limit." },
        { failure: "Dataform compile succeeds but invocation runs stale code", handling: "Compile and invoke are coupled in one operator, so the invocation always uses the compilation it just created." },
        { failure: "Feed silently stops arriving", handling: "Feed registry defines expected cadence, so missing runs are detectable rather than invisible." },
      ],
      tradeoffs: [
        "Managed Data Fusion over hand-written extractors: faster delivery and easier handover, at the cost of less fine-grained control and per-instance cost.",
        "Merging compile + invoke into one operator reduces flexibility to re-run only the invocation, in exchange for guaranteed consistency.",
      ],
      outcomes: [
        "16+ production ingestion pipelines delivered against project deadlines.",
        "Reusable operators and modules adopted across DAGs, reducing repeated code.",
        { text: "Résumé figures: ~40% faster file processing (compose operator), ~50% less DAG complexity (Dataform operator), ~60% less debugging time (shared module), ~30% better Data Fusion processing efficiency.", confirm: METRIC_NOTE },
      ],
      lessons: [
        "Audit metadata is as important as the pipeline — most production incidents are diagnosed from it.",
        "Standardise the boring parts (naming, metadata, file handling) early; it pays off once there are dozens of feeds.",
      ],
      code: ["dataform-operator"],
    },
    {
      id: "anomaly",
      title: "Weekly anomaly detection with BigQuery ML",
      kicker: "ML in the warehouse",
      status: "applied",
      statusLabel: "Proof of concept · Insight Global (Home Depot client)",
      summary:
        "Proof of concept for forecast-based anomaly detection over weekly installation-sales KPIs: BigQuery ML ARIMA_PLUS, orchestrated with Dataform, with Cloud Functions raising alerts when actuals fall outside the expected band.",
      stack: ["BigQuery ML", "ARIMA_PLUS", "Dataform", "Cloud Functions", "BigQuery"],
      facts: [
        { value: "Weekly", label: "cadence aligned to the business reporting cycle" },
        { value: "In-warehouse", label: "training and scoring — no data leaves BigQuery" },
      ],
      problem:
        "Business teams track weekly installation-sales measures across many segments. Manual review cannot reliably spot unusual movements across every series, and a fixed threshold either misses real issues or fires on normal seasonality.",
      role:
        "Designed and built the proof of concept end to end: input preparation, ARIMA_PLUS model configuration, anomaly scoring, Dataform orchestration and alert delivery.",
      requirements: [
        "Account for trend and seasonality per series rather than using static thresholds.",
        "Run on the weekly cadence after source data is complete.",
        "Keep everything in BigQuery to avoid moving sensitive sales data.",
        "Alerts must be actionable: which measure, which segment, expected vs actual.",
      ],
      architecture: [
        { id: "b1", label: "Weekly sales measures", tech: "Input", note: "One row per (week, series id, measure) — the time-series input." },
        { id: "b2", label: "Prep & completeness check", tech: "Dataform", note: "Fills calendar gaps, filters incomplete weeks, enforces one value per series per week." },
        { id: "b3", label: "ARIMA_PLUS model", tech: "BigQuery ML", note: "Multi-series model (time_series_id_col) with holiday effects and automatic seasonality." },
        { id: "b4", label: "ML.DETECT_ANOMALIES", tech: "BigQuery ML", note: "Scores the latest week against the forecast interval at a chosen probability threshold." },
        { id: "b5", label: "Anomaly results table", tech: "BigQuery", note: "Expected value, bounds, probability and flag per series — kept for history and tuning." },
        { id: "b6", label: "Alert delivery", tech: "Cloud Functions", note: "Summarised alert listing only flagged series, with expected vs actual." },
      ],
      choices: [
        { tech: "BigQuery ML ARIMA_PLUS", why: "Handles trend, seasonality, holidays and many series at once with SQL — no separate serving infrastructure." },
        { tech: "Dataform", why: "The prep, train and score steps form a dependency graph with assertions, versioned alongside other models." },
        { tech: "Probability threshold, not fixed bands", why: "Adapts to each series’ variance; tuned to balance missed anomalies against alert fatigue." },
      ],
      implementation: [
        "Input model builds a contiguous weekly series per segment and measure; incomplete weeks are excluded so a partial week is not mistaken for a drop.",
        "ARIMA_PLUS trained across series using time_series_id_col, with holiday region set so known seasonal peaks are expected rather than flagged.",
        "ML.DETECT_ANOMALIES scores new actuals with an anomaly_prob_threshold; results persisted with expected value and lower/upper bounds.",
        "Retraining cadence separated from scoring so models are refreshed deliberately, not on every run.",
        "Alert step selects flagged rows only and formats a concise summary for the business owner.",
      ],
      quality: [
        "Assertions: one row per series per week, no null measures in scored weeks, minimum history length per series.",
        "Model evaluation with ML.ARIMA_EVALUATE (AIC, variance, seasonal periods) to sanity-check fits.",
        "Back-testing thresholds against past weeks with known business events before enabling alerts.",
      ],
      reliability: [
        { failure: "Upstream week arrives late or partial", handling: "Completeness check blocks scoring; no alert is better than a false ‘sales collapsed’ alert." },
        { failure: "Model training fails or a series has too little history", handling: "Series below minimum history are excluded and reported; the previous model continues to score." },
        { failure: "Structural break (e.g. new product line)", handling: "Expected spike of anomalies triggers review; model retrained after the change is confirmed." },
        { failure: "Alert job fails silently", handling: "Run status recorded; a missing weekly run is itself alertable." },
      ],
      tradeoffs: [
        "ARIMA_PLUS in BigQuery vs. a custom model on Vertex AI: far simpler to operate and govern, less flexible for exogenous features.",
        "Lower threshold catches more issues but increases noise — tuned with business owners rather than set once.",
      ],
      outcomes: [
        "Proof of concept showing automated, explainable detection of irregular KPI shifts and data-quality issues (expected vs actual, with bounds) as an alternative to manual weekly review.",
      ],
      lessons: [
        "Most anomaly ‘false positives’ are data-completeness problems — validate inputs before blaming the model.",
        "Show the expected range in the alert; it makes alerts trustworthy to non-technical readers.",
      ],
      code: ["bqml-anomaly"],
    },
    {
      id: "ai-dataform",
      title: "AI-assisted SQL → Dataform migration with Gemini",
      kicker: "LLM-assisted engineering",
      status: "production",
      statusLabel: "Implemented internal tooling · News Corp",
      summary:
        "Used Gemini 1.5 Flash via Vertex AI prompt management to convert 400+ SQL scripts from a Git repository into Dataform SQLX — with compilation, structural checks and human review gating every output.",
      stack: ["Vertex AI", "Gemini 1.5 Flash", "Prompt management", "Dataform", "Python", "Git"],
      facts: [
        { value: "400+", label: "SQL scripts migrated to Dataform" },
        { value: "100%", label: "of generated files compiled and reviewed before merge" , confirm: "Confirm that every generated file went through compile + review before stating this." },
      ],
      problem:
        "Hundreds of SQL transformation scripts had to move from a plain Git repository into Dataform. Manual conversion — adding config blocks, replacing hard-coded table names with ref(), declaring dependencies and sources — was slow, repetitive and error-prone.",
      role:
        "Designed and built the automation: prompt design, generation pipeline, validation checks and the review workflow.",
      requirements: [
        "Output must be valid SQLX that compiles in the target Dataform repository.",
        "Business logic must be preserved exactly — the model may restructure, not rewrite, the query.",
        "Proprietary SQL stays within the organisation’s Google Cloud project.",
        "Engineers stay accountable: nothing merges without review.",
      ],
      architecture: [
        { id: "c1", label: "Legacy SQL in Git", tech: "Input", note: "Source scripts plus metadata (target table, schedule, dependencies)." },
        { id: "c2", label: "Prompt template", tech: "Vertex AI prompt mgmt", note: "Versioned prompt with conversion rules and few-shot examples of correct SQLX." },
        { id: "c3", label: "Gemini 1.5 Flash", tech: "Vertex AI", note: "Generates SQLX: config block, ref()/resolve() references, declarations." },
        { id: "c4", label: "Automated checks", tech: "Python · Dataform CLI", note: "dataform compile, reference resolution, dependency graph and diff of SQL body vs original." },
        { id: "c5", label: "Human review", tech: "Pull request", note: "Engineer reviews diffs; failed checks are fixed or regenerated." },
        { id: "c6", label: "Dataform repository", tech: "Output", note: "Merged models, executed and compared against legacy outputs." },
      ],
      choices: [
        { tech: "Gemini 1.5 Flash", why: "Fast and inexpensive for many similar, well-specified transformations; quality was sufficient with good examples and validation." },
        { tech: "Vertex AI prompt management", why: "Prompts versioned and reused consistently instead of living in ad-hoc scripts; runs inside the company’s GCP boundary." },
        { tech: "Deterministic checks around the model", why: "The compiler and diffs, not the model, decide whether output is acceptable." },
      ],
      implementation: [
        "Pre-processing extracted table references and metadata so the prompt received explicit context rather than relying on the model to infer it.",
        "Prompt specified strict output rules: SQLX only, config block fields, replace fully-qualified names with ref(), never alter predicates or joins.",
        "Batch generation over the repository with retries for transient API errors and per-file status tracking.",
        "Validation: compile the generated repository; verify every ref() resolves; normalise and diff SQL bodies against the originals to catch logic changes.",
        "Files failing checks were regenerated with error feedback or fixed manually; all changes went through pull-request review.",
      ],
      quality: [
        "Compilation is a hard gate — no uncompiled SQLX merges.",
        "Normalised SQL diff flags any change to filters, joins or aggregations for close review.",
        "Post-migration, model outputs compared with legacy outputs (row counts / aggregates) before switching consumers.",
      ],
      reliability: [
        { failure: "Model hallucinates a table or column", handling: "Unresolved ref() or compile error blocks the file; regenerated with the error message as feedback." },
        { failure: "Subtle logic change (e.g. dropped filter)", handling: "Normalised diff against the original highlights it for reviewers." },
        { failure: "API quota / transient errors", handling: "Retries with backoff and resumable per-file status." },
        { failure: "Prompt drift across runs", handling: "Prompt version recorded with each generated file." },
      ],
      tradeoffs: [
        "A fast, cheaper model plus strong validation beat a larger model with weaker checks for this well-structured task.",
        "LLM output is a draft, not an answer — validation and review time were planned in from the start.",
      ],
      limitations: [
        "LLMs can produce plausible but wrong SQL; correctness comes from compilation, diffs, data comparison and review.",
        "Complex scripts (dynamic SQL, procedural logic) needed manual conversion.",
        "Effectiveness depends on clean metadata about dependencies.",
      ],
      security: [
        "Ran within the organisation’s Google Cloud project via Vertex AI; no code sent to consumer AI tools.",
        "Only SQL text and metadata were sent to the model — never table data.",
      ],
      outcomes: [
        "400+ SQL scripts migrated into Dataform with consistent structure and dependency declarations.",
        { text: "Migration time reduced by ~70% compared with manual conversion.", confirm: METRIC_NOTE },
      ],
      lessons: [
        "Put deterministic tools around the model; they turn a probabilistic generator into a dependable pipeline.",
        "Explicit context (pre-extracted references) improved output more than prompt wording.",
      ],
      code: ["ai-validate"],
    },
    {
      id: "cdc",
      title: "SQL Server → BigQuery migration with CDC and schema-drift handling",
      kicker: "Reliable data synchronisation",
      status: "production",
      statusLabel: "Production · Searce client engagement",
      summary:
        "End-to-end migration of SQL Server databases to BigQuery with change data capture syncing hourly, resilient to five schema-drift scenarios — plus a ~5 TB Snowflake → BigQuery migration completed within two weeks.",
      stack: ["SQL Server", "CDC", "Dataflow / Beam", "Cloud Storage", "Pub/Sub", "BigQuery", "Python"],
      facts: [
        { value: "Hourly", label: "incremental sync via CDC" },
        { value: "5", label: "schema-drift scenarios handled" },
        { value: "~5 TB", label: "Snowflake → BigQuery in two weeks (separate project)" },
      ],
      problem:
        "A client needed its SQL Server data in BigQuery for analytics, with ongoing changes kept in sync — not a one-off copy. Source schemas evolved while the migration was running, so the pipeline had to absorb changes without breaking or silently losing data.",
      role:
        "Designed and implemented the end-to-end solution: initial load, CDC-based incremental sync, schema-drift handling, and validation.",
      requirements: [
        "Initial full load followed by incremental sync of inserts, updates and deletes.",
        "Correct final state despite retries, duplicates and out-of-order delivery.",
        "Survive schema changes in the source without manual intervention for common cases.",
        "Reconcile BigQuery against the source to prove correctness.",
      ],
      architecture: [
        { id: "d1", label: "SQL Server", tech: "Source", note: "CDC enabled on source tables; change tables capture insert/update/delete with LSN ordering." },
        { id: "d2", label: "Change extraction", tech: "Python · Dataflow", note: "Reads changes since the last committed LSN watermark each hour." },
        { id: "d3", label: "GCS / Pub/Sub", tech: "Landing", note: "Durable, replayable change batches." },
        { id: "d4", label: "BigQuery change log", tech: "Staging", note: "Append-only log of every change, with operation and sequence." },
        { id: "d5", label: "MERGE into target", tech: "BigQuery", note: "Dedup by key keeping the latest sequence; apply upserts and deletes idempotently." },
        { id: "d6", label: "Reconciliation", tech: "Validation", note: "Row counts and aggregates compared with source per table." },
      ],
      choices: [
        { tech: "Native SQL Server CDC", why: "Captures deletes and every intermediate change with ordering — timestamp columns miss deletes and are often unreliable." },
        { tech: "Append-only change log + MERGE", why: "Separates capture from apply, so the target can be rebuilt or re-applied safely." },
        { tech: "Hourly micro-batch", why: "Met freshness needs at a fraction of the cost and complexity of continuous streaming." },
      ],
      implementation: [
        "Initial snapshot loaded per table, recording the LSN at snapshot time so CDC starts exactly where the snapshot ends.",
        "Each hourly run extracts changes after the stored watermark and commits the new watermark only after a successful apply.",
        "MERGE uses ROW_NUMBER() over the primary key ordered by LSN/sequence to keep the latest change; deletes applied as deletes (or soft deletes where history was needed).",
        "Schema-drift handling for five scenarios: added column, dropped column, renamed column, widened type, and nullability change — detected by comparing source metadata with the BigQuery schema before apply.",
        "Additive changes applied automatically; breaking changes (rename, incompatible type) routed to a holding path with an alert rather than failing silently.",
      ],
      quality: [
        "Per-table reconciliation of row counts and key aggregates against the source after each sync window.",
        "Uniqueness assertion on primary keys in target tables.",
        "Watermark continuity check — no gaps between consecutive runs.",
      ],
      reliability: [
        { failure: "Run fails after partial load", handling: "Watermark not advanced; next run re-reads the same changes and MERGE makes the replay idempotent." },
        { failure: "Duplicate change events", handling: "Dedup on (key, sequence) before MERGE." },
        { failure: "Out-of-order arrival", handling: "Ordering by LSN/sequence, not by arrival time." },
        { failure: "Column renamed upstream", handling: "Detected by schema diff; apply paused for that table with an alert; mapping applied then backfilled from the change log." },
        { failure: "CDC retention expires before catch-up", handling: "Monitor lag against retention; fall back to a re-snapshot for that table." },
      ],
      tradeoffs: [
        "Hourly micro-batch over streaming: lower cost and simpler operations; acceptable latency for analytics.",
        "Hard deletes keep the target identical to source; soft deletes preserve history but every consumer must filter.",
      ],
      outcomes: [
        "Ongoing hourly sync of SQL Server data into BigQuery, resilient to five schema-drift scenarios.",
        "Separate engagement: ~5 TB migrated from Snowflake to BigQuery within a two-week window via a fully automated script.",
        { text: "Résumé figures: ~30% lower migration cost and ~25% better performance (SQL Server); zero data loss (Snowflake).", confirm: METRIC_NOTE },
      ],
      lessons: [
        "Commit the watermark last. Almost every CDC correctness bug comes from advancing it too early.",
        "Decide the schema-change policy (auto-apply vs block) with consumers before the first change happens.",
      ],
      code: ["merge-cdc", "partition-ddl"],
    },
  ],

  // ── Code samples ──────────────────────────────────────────────────────────
  // Illustrative code written for this portfolio. Not employer source code.
  code: [
    {
      id: "merge-cdc",
      title: "Idempotent CDC apply with MERGE",
      lang: "SQL · BigQuery",
      context: "Keeps the latest change per key, applies deletes, and is safe to re-run for the same window.",
      body: `MERGE \`core.customers\` AS t
USING (
  SELECT * EXCEPT (rn)
  FROM (
    SELECT c.*,
           ROW_NUMBER() OVER (
             PARTITION BY customer_id
             ORDER BY change_lsn DESC, change_seq DESC
           ) AS rn
    FROM \`staging.customers_changes\` AS c
    WHERE change_lsn >  @last_applied_lsn
      AND change_lsn <= @window_end_lsn
  )
  WHERE rn = 1
) AS s
ON t.customer_id = s.customer_id
WHEN MATCHED AND s.op = 'D' THEN
  DELETE
WHEN MATCHED AND s.change_lsn > t.change_lsn THEN
  UPDATE SET name = s.name, email = s.email, tier = s.tier,
             change_lsn = s.change_lsn, updated_at = CURRENT_TIMESTAMP()
WHEN NOT MATCHED AND s.op != 'D' THEN
  INSERT (customer_id, name, email, tier, change_lsn, updated_at)
  VALUES (s.customer_id, s.name, s.email, s.tier, s.change_lsn, CURRENT_TIMESTAMP());

-- The watermark (@window_end_lsn) is committed to the audit table
-- only after this statement succeeds.`,
    },
    {
      id: "partition-ddl",
      title: "Partitioned, clustered fact table with guardrails",
      lang: "SQL · BigQuery DDL",
      context: "Partition on the date most queries filter by; cluster on high-cardinality filter columns; require a partition filter.",
      body: `CREATE TABLE IF NOT EXISTS \`core.fct_orders\` (
  order_id      STRING    NOT NULL,
  customer_id   STRING    NOT NULL,
  store_id      STRING,
  order_ts      TIMESTAMP NOT NULL,
  amount        NUMERIC,
  _loaded_at    TIMESTAMP NOT NULL,
  _source_file  STRING
)
PARTITION BY DATE(order_ts)
CLUSTER BY customer_id, store_id
OPTIONS (
  require_partition_filter = TRUE,
  partition_expiration_days = NULL,
  description = "One row per order. Grain: order_id."
);`,
    },
    {
      id: "bqml-anomaly",
      title: "ARIMA_PLUS training and weekly anomaly scoring",
      lang: "SQL · BigQuery ML",
      context: "Multi-series model with holiday effects; scores only complete weeks and keeps bounds for explainable alerts.",
      body: `CREATE OR REPLACE MODEL \`ml.weekly_measure_arima\`
OPTIONS (
  model_type                = 'ARIMA_PLUS',
  time_series_timestamp_col = 'week_start',
  time_series_data_col      = 'measure_value',
  time_series_id_col        = 'series_id',
  data_frequency            = 'WEEKLY',
  holiday_region            = 'US',
  auto_arima                = TRUE
) AS
SELECT week_start, series_id, measure_value
FROM \`mart.weekly_measures\`
WHERE is_complete_week
  AND week_start < DATE_TRUNC(CURRENT_DATE(), WEEK);

-- Weekly scoring of the latest complete week
SELECT series_id, week_start, measure_value,
       lower_bound, upper_bound, anomaly_probability
FROM ML.DETECT_ANOMALIES(
  MODEL \`ml.weekly_measure_arima\`,
  STRUCT(0.95 AS anomaly_prob_threshold),
  (SELECT week_start, series_id, measure_value
   FROM \`mart.weekly_measures\`
   WHERE week_start = @latest_complete_week)
)
WHERE is_anomaly;`,
    },
    {
      id: "dataform-operator",
      title: "Airflow operator: compile + invoke Dataform in one task",
      lang: "Python · Airflow",
      context: "Pattern behind a custom operator: the invocation always runs the compilation result created in the same task.",
      body: `from airflow.models import BaseOperator
from airflow.providers.google.cloud.hooks.dataform import DataformHook


class DataformCompileAndRunOperator(BaseOperator):
    """Compile a Dataform repo at a git ref, then invoke that exact result."""

    template_fields = ("git_commitish", "included_tags")

    def __init__(self, *, project_id, region, repository_id,
                 git_commitish="main", included_tags=None,
                 gcp_conn_id="google_cloud_default", **kwargs):
        super().__init__(**kwargs)
        self.project_id, self.region = project_id, region
        self.repository_id = repository_id
        self.git_commitish = git_commitish
        self.included_tags = included_tags or []
        self.gcp_conn_id = gcp_conn_id

    def execute(self, context):
        hook = DataformHook(gcp_conn_id=self.gcp_conn_id)
        compilation = hook.create_compilation_result(
            project_id=self.project_id, region=self.region,
            repository_id=self.repository_id,
            compilation_result={"git_commitish": self.git_commitish},
        )
        if compilation.compilation_errors:
            raise ValueError(f"Dataform compile failed: {compilation.compilation_errors}")

        invocation = hook.create_workflow_invocation(
            project_id=self.project_id, region=self.region,
            repository_id=self.repository_id,
            workflow_invocation={
                "compilation_result": compilation.name,
                "invocation_config": {"included_tags": self.included_tags},
            },
        )
        invocation_id = invocation.name.split("/")[-1]
        hook.wait_for_workflow_invocation(
            workflow_invocation_id=invocation_id,
            project_id=self.project_id, region=self.region,
            repository_id=self.repository_id,
        )
        return invocation_id`,
    },
    {
      id: "ai-validate",
      title: "Validation gate for AI-generated SQLX",
      lang: "Python",
      context: "The model proposes; deterministic checks decide. Fails closed on compile errors, unresolved refs or logic drift.",
      body: `import json, re, subprocess
from pathlib import Path

def normalise(sql: str) -> str:
    """Reduce SQL / SQLX to comparable logic: no config, comments, refs or qualifiers."""
    sql = re.sub(r"config\\s*\\{.*?\\}", "", sql, flags=re.S)
    sql = re.sub(r"--.*?$|/\\*.*?\\*/", "", sql, flags=re.S | re.M)
    sql = re.sub(r"\\$\\{\\s*ref\\(\\s*['\\"]([\\w-]+)['\\"]\\s*\\)\\s*\\}", r"\\1", sql)
    sql = re.sub(r"\`?[\\w-]+\\.[\\w-]+\\.([\\w-]+)\`?", r"\\1", sql)  # project.dataset.table -> table
    return re.sub(r"\\s+", " ", sql).strip().lower()

def validate(original: Path, generated: Path, repo: Path) -> list[str]:
    problems = []
    result = subprocess.run(["dataform", "compile", "--json"], cwd=repo,
                            capture_output=True, text=True)
    if result.returncode != 0:
        return [f"compile failed: {result.stderr[:500]}"]
    graph = json.loads(result.stdout)
    if graph.get("graphErrors", {}).get("compilationErrors"):
        problems.append("compilation errors in graph")

    if normalise(original.read_text()) != normalise(generated.read_text()):
        problems.append("logic drift: normalised SQL differs — needs human review")
    return problems   # empty list == eligible for PR review, never auto-merge`,
    },
  ],

  // ── Engineering decisions ─────────────────────────────────────────────────
  // Hypothetical scenarios that show reasoning. Not claims of past results.
  decisions: [
    {
      id: "batch-stream", topic: "Ingestion", title: "Batch vs streaming ingestion",
      context: "Order events feed a daily sales dashboard and, separately, a fraud-flag service that product wants ‘as real-time as possible’.",
      constraints: "Small team, cost-sensitive, events already published to Pub/Sub.",
      alternatives: ["Stream everything with Dataflow", "Hourly/daily batch everything", "Split by consumer latency need"],
      decision: "Split: Pub/Sub → BigQuery subscription (or Storage Write API) for low-latency raw data; batch ELT for modelled dashboard tables.",
      tradeoffs: "Two paths to operate, but each is the simplest thing that meets its SLA. Streaming costs only where latency is actually valuable.",
      failures: "Streaming path: duplicates and late events — dedup on event_id in models. Batch path: late-arriving events — reprocess a look-back window.",
      otherwise: "If the only consumer were the daily dashboard, a daily batch load from GCS would be cheaper and simpler.",
    },
    {
      id: "full-incr", topic: "Loading", title: "Full refresh vs incremental loads",
      context: "A 2 TB orders table grows ~5 GB/day; a 20k-row product dimension changes a few rows daily.",
      constraints: "Daily SLA by 07:00; BigQuery on-demand pricing.",
      alternatives: ["Full refresh both", "Incremental both", "Incremental facts, full-refresh small dimensions"],
      decision: "Incremental MERGE for orders by partition with a 3-day look-back; full refresh for the product dimension.",
      tradeoffs: "Incremental saves ~99% of scanned bytes on the fact table but adds state (watermarks) and late-data logic. Full refresh of a small table is cheap and removes a class of bugs.",
      failures: "Watermark advanced on a failed run → missed data. Mitigation: commit watermark after success; periodic full reconciliation.",
      otherwise: "If the source can’t provide reliable change markers, full refresh — or CDC — beats a fragile incremental.",
    },
    {
      id: "cdc-ts", topic: "Extraction", title: "CDC vs timestamp-based extraction",
      context: "Syncing an OLTP database where rows are updated and occasionally hard-deleted.",
      constraints: "DBA allows enabling CDC on a read replica; some tables lack reliable updated_at.",
      alternatives: ["WHERE updated_at > watermark", "Log-based CDC", "Nightly full snapshot + diff"],
      decision: "Log-based CDC for tables with deletes or unreliable timestamps; timestamp extraction for append-only tables.",
      tradeoffs: "CDC captures deletes and every intermediate change with ordering, but needs DB configuration, retention monitoring and more infrastructure.",
      failures: "CDC retention expires during an outage → gap. Mitigation: lag alerting and a re-snapshot runbook.",
      otherwise: "If the team can’t touch DB configuration and tables are small, nightly snapshot + diff is robust and simple.",
    },
    {
      id: "scd", topic: "Modelling", title: "Slowly changing dimensions",
      context: "Analysts need revenue by customer tier as it was at the time of each order, and also by current tier.",
      constraints: "Tier changes a few times a year per customer; 10M customers.",
      alternatives: ["SCD Type 1 (overwrite)", "SCD Type 2 (versioned rows)", "Snapshot table per day"],
      decision: "SCD Type 2 with valid_from/valid_to and is_current; facts join on the version valid at order time; a current-view for ‘as-is’ reporting.",
      tradeoffs: "Correct history and both views of truth, at the cost of more complex joins and MERGE logic.",
      failures: "Overlapping validity windows from out-of-order updates. Mitigation: build versions ordered by source change sequence; uniqueness assertion on (key, valid_from).",
      otherwise: "If nobody needs historical attribution, Type 1 is simpler and cheaper.",
    },
    {
      id: "partition", topic: "BigQuery", title: "Partitioning and clustering",
      context: "Event table queried mostly for the last 30 days, filtered by account_id and event_type.",
      constraints: "On-demand pricing; analysts write ad-hoc SQL.",
      alternatives: ["No partitioning", "Partition by ingestion time", "Partition by event date, cluster by account_id, event_type"],
      decision: "Partition by DATE(event_ts), cluster by account_id, event_type, require partition filter.",
      tradeoffs: "Big scan reductions and predictable cost; requiring a partition filter annoys some ad-hoc users but prevents accidental full scans.",
      failures: "Late events land in old partitions — incremental models must reprocess a look-back window.",
      otherwise: "For a small table (<1 GB), partitioning adds overhead with little benefit; clustering alone may suffice.",
    },
    {
      id: "idempotency", topic: "Reliability", title: "Retry handling and idempotency",
      context: "A daily load task sometimes times out halfway; Airflow retries it.",
      constraints: "Retries are automatic; consumers query the table continuously.",
      alternatives: ["Append and hope", "Delete-then-insert for the window", "MERGE / partition overwrite keyed on the window"],
      decision: "Write each run to a scoped target: overwrite the date partition (WRITE_TRUNCATE on partition decorator) or MERGE on business key.",
      tradeoffs: "Slightly more complex writes, but any number of retries yields the same result.",
      failures: "Non-idempotent appends double-count revenue silently. See the simulator below.",
      otherwise: "Truly append-only immutable logs can append — if deduplicated on a unique event_id downstream.",
    },
    {
      id: "schema", topic: "Contracts", title: "Schema evolution and backward compatibility",
      context: "An upstream team renames a column and adds two others without notice.",
      constraints: "Several downstream dashboards depend on the table.",
      alternatives: ["Auto-accept all changes", "Fail the pipeline on any change", "Auto-accept additive; block breaking"],
      decision: "Additive changes flow through automatically; renames/type narrowing are quarantined with an alert and a mapping decision.",
      tradeoffs: "Some delay on breaking changes, but no silent nulls in reports.",
      failures: "A rename treated as ‘drop + add’ yields an all-null column. Contracts and null-rate checks catch it.",
      otherwise: "In exploratory raw zones, accepting all changes is fine — enforce contracts at the modelled layer.",
    },
    {
      id: "dq", topic: "Quality", title: "Data quality and reconciliation",
      context: "A migration must prove BigQuery matches the source before cut-over.",
      constraints: "Billions of rows; the source cannot sustain heavy queries.",
      alternatives: ["Spot checks", "Full row-by-row diff", "Tiered: counts → aggregates → sampled hashes"],
      decision: "Tiered reconciliation: per-partition row counts, column aggregates (sum/min/max/distinct), then hashed samples for drill-down.",
      tradeoffs: "Strong confidence at modest cost; doesn’t prove every row unless the hash pass is exhaustive.",
      failures: "Type/collation differences produce false mismatches — normalise before hashing.",
      otherwise: "For regulated data, an exhaustive hash comparison may be required despite the cost.",
    },
    {
      id: "observability", topic: "Operations", title: "Pipeline observability",
      context: "Pipelines ‘succeed’ but dashboards are occasionally empty.",
      constraints: "On-call is a rotation of generalists.",
      alternatives: ["Task-failure alerts only", "Add data-level checks", "Full observability: run metadata, freshness, volume, lineage"],
      decision: "Audit table per run (window, rows in/out, status), freshness and volume checks per critical table, alerts with runbook links.",
      tradeoffs: "More moving parts, but issues are found by engineers before stakeholders.",
      failures: "Monitoring job dies quietly — add a heartbeat alert on the checks themselves.",
      otherwise: "For a handful of low-stakes tables, task alerts plus a freshness check may be enough.",
    },
    {
      id: "cost", topic: "Cost", title: "Cost vs performance",
      context: "A dashboard runs a 3 TB query every 5 minutes.",
      constraints: "Users want sub-minute freshness; finance flags the bill.",
      alternatives: ["Bigger reservation", "Materialised views / incremental aggregates", "Reduce refresh frequency"],
      decision: "Pre-aggregate into an incrementally maintained summary table (or materialised view) and align refresh with how often data actually changes.",
      tradeoffs: "One more model to maintain; orders-of-magnitude fewer bytes scanned.",
      failures: "Summary drifts from detail — schedule a reconciliation between the two.",
      otherwise: "If query patterns are unpredictable, capacity-based pricing may be simpler than optimising each query.",
    },
    {
      id: "rag", topic: "AI systems", title: "RAG quality vs latency and model cost",
      context: "An internal assistant answers questions over pipeline runbooks and data docs.",
      constraints: "Answers must cite sources; p95 latency under ~3 s; modest budget.",
      alternatives: ["Large model, naive top-k", "Small model + hybrid retrieval + reranker", "Fine-tune a model"],
      decision: "Hybrid (keyword + vector) retrieval, rerank top candidates, smaller model for answer generation with mandatory citations; evaluate with a fixed question set.",
      tradeoffs: "Reranking adds latency but improves grounding more than a bigger model does; the eval set makes changes measurable.",
      failures: "Stale documents and confident wrong answers — re-index on doc change, refuse when retrieval confidence is low.",
      otherwise: "If the corpus is tiny and stable, putting it directly in context can beat building retrieval.",
    },
  ],

  // ── Learning ──────────────────────────────────────────────────────────────
  learning: [
    { area: "Retrieval-augmented generation", detail: "Chunking strategies, hybrid search, reranking and grounded citations." },
    { area: "Agent engineering", detail: "Tool calling, structured outputs, guardrails and permissioned actions." },
    { area: "LLM evaluation", detail: "Golden datasets, regression evals and observability for LLM-backed features." },
  ],
};
