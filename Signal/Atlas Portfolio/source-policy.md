# Data sources

Use a CSV export from the `entity_readiness_baseline` Data Table (`DWg0YxdKbQcNcwtv`) for the complete current table. Use execution data from workflow `EirKWJBySSXugv3a` for the latest run and report outcome.

Use only `GET /api/v1/executions/{executionId}?includeData=true` for execution analysis. If the public Data Table API is unavailable, do not fall back to undocumented `/rest` endpoints. Ask for a CSV export instead.
