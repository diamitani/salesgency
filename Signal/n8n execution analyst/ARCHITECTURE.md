# ARCHITECTURE — n8n Execution Analyst

```mermaid
flowchart TD
    U["User input<br/>workflow ID · URL · or 'find the country data one'"] --> R{Resolver}

    R -->|exact ID| WF["GET /workflows/{id}"]
    R -->|full URL| PARSE["Parse ID from URL"] --> WF
    R -->|name / description| SEARCH["GET /workflows?limit=100&cursor=...<br/>(paginate all pages, fuzzy match)"]
    SEARCH -->|1 match| WF
    SEARCH -->|multiple| PICK["Return ranked matches<br/>→ user picks"] --> WF

    WF --> EX["GET /executions?workflowId={id}<br/>&status=&limit="]
    EX --> DETAIL["GET /executions/{id}?includeData=true<br/>extract runData[node][0].error + timings"]

    DETAIL --> ANALYZE["Analyzer<br/>• failing node + error message<br/>• first-failure timestamp<br/>• success/error counts + rate<br/>• per-node timing"]

    ANALYZE --> OUT{Output layer}
    OUT -->|"'make a spreadsheet'"| XLSX[".xlsx / .csv export"]
    OUT -->|"'show me'"| TABLE["Inline table"]
    OUT -->|"'what happened'"| PROSE["Plain-English summary"]

    ANALYZE -.optional persist.-> STORE[("Execution history store<br/>for trend analysis")]

    SCAN["Scheduled Health Scan<br/>(stretch) — all workflows"] -.-> EX
    SCAN -.failures/stalls.-> ALERT["Slack / Teams alert"]

    style R fill:#fff6e9,stroke:#e8c98f
    style ANALYZE fill:#eaf3ec,stroke:#9cc7aa
    style OUT fill:#f4f7fb,stroke:#c9d6e5
    style ALERT fill:#fdeaea,stroke:#e9a4a4
    style SCAN fill:#eef1f6,stroke:#c9d6e5
```

## Key Design Decisions
- **Read-only in v1** — analysis never edits/deploys workflows. Keeps it safe to run against production.
- **Resolver is the entry point** — supports the "paste anything or just describe it" UX. URL parsing + fuzzy name search over cursor-paginated workflow list.
- **Per-node error extraction** — the value is in `data.resultData.runData.[nodeName][0].error`, exactly where the Onspring 1119 error was found.
- **Output is user-driven** — same analysis, rendered as spreadsheet / table / prose on demand.
- **Health scan is the prevention layer** — turns reactive diagnosis into proactive detection; directly addresses the silent-failure root cause from the Onspring incident.
