---
artifact_type: data-model
project_id: salesgency
version: v5.0.0
status: approved
owner: eng
reviewers: [eng, data]
well_architected_review: pass
upstream: [ia@v5.0.0, architecture@v2.0.0]
confidence: 1.0
---

# 12. SalesGency Data Model & Schema Contracts

## 1. Entity-Relationship Overview

```mermaid
erDiagram
    PRODUCT ||--o{ CHECKOUT_SESSION : references
    PRODUCT ||--o{ ENTITLEMENT : grants
    CUSTOMER ||--o{ CHECKOUT_SESSION : initiates
    CUSTOMER ||--o{ ENTITLEMENT : holds
    CUSTOMER ||--o{ SUBSCRIPTION : maintains
    SKILL ||--o{ WORKFLOW_GRAPH : generates

    PRODUCT {
        string slug PK
        string name
        number amount_cents
        string stripe_price_id
        string stripe_product_id
        string category
        string tax_code
        string download_url
    }

    CUSTOMER {
        string id PK
        string email
        string stripe_customer_id
        datetime created_at
    }

    CHECKOUT_SESSION {
        string session_id PK
        string customer_email
        string product_slug
        number amount_total
        string status
        datetime created_at
    }

    ENTITLEMENT {
        string id PK
        string customer_id FK
        string product_slug FK
        boolean active
        datetime expires_at
    }
```

---

## 2. JSON Catalog Schema (`data/products.json`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ProductCatalog",
  "type": "array",
  "items": {
    "type": "object",
    "required": ["slug", "name", "price", "stripe_price_id", "category", "tax_code"],
    "properties": {
      "slug": { "type": "string" },
      "name": { "type": "string" },
      "price": { "type": "number" },
      "stripe_price_id": { "type": "string" },
      "stripe_product_id": { "type": "string" },
      "category": { "type": "string", "enum": ["free", "entry", "skill", "pilot", "sprint", "retainer", "subscription"] },
      "tax_code": { "type": "string", "default": "txcd_10000000" },
      "description": { "type": "string" },
      "download_url": { "type": "string" }
    }
  }
}
```

---

## 3. n8n Workflow Node Schema

```json
{
  "type": "object",
  "required": ["name", "nodes", "connections"],
  "properties": {
    "name": { "type": "string" },
    "nodes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "name", "type", "position", "parameters"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "type": { "type": "string" },
          "typeVersion": { "type": "number" },
          "position": { "type": "array", "items": { "type": "number" }, "minItems": 2, "maxItems": 2 },
          "parameters": { "type": "object" }
        }
      }
    },
    "connections": { "type": "object" }
  }
}
```
