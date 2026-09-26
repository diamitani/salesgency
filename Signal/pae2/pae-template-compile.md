# How to compile PAE core + adapters

```text
pae-core.template.json
  + hubspot.adapter.json
  + amplemarket.adapter.json
  + intake
  = workflow.json
```

## Merge order

1. Deep-copy `pae-core.template.json`.
2. Set `name` to `PAE — {company slug}`.
3. Apply CRM adapter (`compiler.replace`, `set_node_auth`, `set_json_body`).
4. Apply data / sequence adapter the same way.
5. Apply LLM adapter when you have one (still `https://pae.local/replace/llm-*` until then).
6. Inject intake into remaining `{{compiled.*}}` tokens.
7. If trigger is `csv`, rewire `Set — Run Limits` → `Normalize — Company Input` and disable `Data — Find Companies`.
8. Leave `Sequence — Enroll` disabled unless `send_armed: true`.
9. Strip any `Authorization` header values. Auth is credentials only.
10. Validate: every `https://pae.local/replace/` URL is gone, JSON parses, node names in `connections` exist.

## Do not copy from the old template

- Client HubSpot properties (`zoominfo___most_recent_workflow_date`, `factors_abm__workflow_date`)
- Hardcoded Amplemarket bearer tokens
- Internal sticky notes

## First stack this pair produces

HubSpot (exclude + upsert) + Amplemarket (companies/people/email + optional enroll) + core research/copy/approval path.
