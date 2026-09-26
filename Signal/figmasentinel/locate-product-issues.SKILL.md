---
name: locate-product-issues
description: Map classified Figma Reddit mentions onto product-area issue domains and name clusters so product owners can see where pain and delight sit. Use after classify-figma-sentiment. Do not use for harvesting or writing GTM copy.
icon: map-pin
color: Orange
related_server_ids: [reddit]
---

# Locate product issues

## When to use
After a mention has sentiment and entities.

## Domains (controlled vocabulary)
pricing_credits, performance_stability, collab_permissions, auto_layout_constraints, variables_tokens, components_variants, prototyping, dev_mode_handoff, mcp_code_connect, figma_make, figma_sites, figma_slides, figjam, plugins_community, ai_features, learning_curve, enterprise_sso, offline_desktop, file_org, accessibility, other

Do not invent a new domain in a report. If needed, file it as other and note a taxonomy proposal.

## Steps
1. Assign 1 to 3 domains with confidence 0 to 1.
2. Cluster same-domain mentions in the window. Name the cluster with a noun phrase ("Dev Mode inspect panel lag"), not a slogan.
3. Mark weak-n if the cluster has fewer than 3 mentions. Still persist; do not headline it as a trend.
4. Delight clusters are allowed (love on auto_layout is still an issue-domain location).

## Output
Per mention: domain[], confidence.
Per window: clusters with label, domain, count, avg_sentiment, mention_ids, weak_n.
