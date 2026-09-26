# PAE n8n Engineer — agent scaffold

Drop this folder at `agents/pae-n8n-engineer/` (hosted PAL) or `.claude/skills/pae-n8n-engineer/` (Claude Code / Codex).

```text
pae-n8n-engineer/
  README.md
  soul.md                         ← rename from pae-n8n-engineer.soul.md
  agent.yaml                      ← rename from pae-n8n-engineer.agent.yaml
  skills/
    pae-n8n-engineer/
      SKILL.md                    ← pae-n8n-engineer.SKILL.md
      intake.md                   ← pae-n8n-engineer.intake.md
  templates/
    pae-core.template.json
    adapters/
      hubspot.adapter.json
      amplemarket.adapter.json
  scripts/
    compile_pae.py
    validate_workflow.py
  schemas/
    intake.schema.json
    ack.schema.json
  prompts/
    research.system_prompt.md
    email.system_prompt.md
  mcp/
    allowlist.yaml
  knowledge/
    pae-template-compile.md
    PAE-Workflow-Steps.md
  evals/
    cases.yaml
  pae-output/                     ← compiler writes here
```

## Install

1. Assemble the tree above from the files in this project.
2. Claude Code: copy to `.claude/skills/pae-n8n-engineer/` with `SKILL.md` at that root **or** keep the nested `skills/` layout and point the skill `description` at compile/edit.
3. Hosted PAL: register `agent.yaml`, seed `soul.md`.

## Local compile (no LLM)

```bash
python scripts/compile_pae.py \
  --intake examples/intake.sample.json \
  --core templates/pae-core.template.json \
  --adapter templates/adapters/hubspot.adapter.json \
  --adapter templates/adapters/amplemarket.adapter.json \
  --out pae-output

python scripts/validate_workflow.py pae-output/workflow.json
```

Then n8n → Import from File → attach credentials from `CREDENTIALS.md` → run `limit=1`.

## Agent vs script

| Path | Use |
|---|---|
| Skill + soul | Conversational intake, prompt writing, docs lookup, edit mode |
| `compile_pae.py` | Deterministic URL/body merge once intake is complete |

The script does not invent HTTP paths. Unknown tools stay as `https://pae.local/replace/*` and fail validation until an adapter exists.
