# INCHARA HOLIDAYS — AGENT SKILLS SETUP & OPERATION GUIDE
**Version**: 1.0.0  
**Date**: November 9, 2026  
**Audience**: AI Agents, Engineers, and Project Collaborators  

---

## 1. Skill Discovery Mechanism in Antigravity

Antigravity uses an automatic, hierarchical file-system discovery engine to detect skills, rules, and customizations.

### Discovery Traversal Order
1. **Workspace Root Discovery**: The agent inspects `.agents/skills/<skill-name>/SKILL.md` (or `.agent/`, `_agents/`, `_agent/`) starting from the current working directory up to the repository root containing `.git`.
2. **Directory Rules**: Looks for `AGENTS.md` and `GEMINI.md` in the current directory and all ancestor directories up to the repository root.
3. **Global Configuration**: Evaluates `~/.gemini/config/skills/` and `~/.gemini/config/plugins/`.
4. **Built-in Plugins & Core Skills**: Default system skills mounted directly by the Antigravity runtime.

---

## 2. Skill File Structure & Required Metadata

Every native Antigravity skill must be housed in its own dedicated directory under `.agents/skills/`:

```
.agents/skills/<skill-name>/
├── SKILL.md            # Mandatory: Main instruction runbook with YAML frontmatter
├── scripts/            # Optional: Shell/PowerShell/Node executable scripts
├── examples/           # Optional: Code snippets or sample payloads
├── resources/          # Optional: Templates, design tokens, or schemas
└── references/         # Optional: Bulky reference manuals for progressive reading
```

### Mandatory Frontmatter Format in `SKILL.md`:
```yaml
---
name: lowercase-hyphenated-name
description: >-
  Actionable description written in the third person. Explicitly state WHAT the skill
  does and WHEN the agent should activate it.
---
```

> [!IMPORTANT]
> The `description` field is the primary signal used by Antigravity to dynamically index and activate the skill via **progressive disclosure**. Keep it descriptive, objective, and trigger-oriented.

---

## 3. How to Refresh & Verify Active Skills

### Automatic Context Injection
- When an Antigravity conversation turn begins, the platform parses all `SKILL.md` frontmatter blocks across discovered directories.
- The available skills appear in the system prompt under `<skills>`.
- The agent only reads the full body of a `SKILL.md` when the user's request matches its description, preserving token context.

### Verifying Discovered Skills
To verify the state of local skills in this repository:
1. **File Tree Verification**:
   ```powershell
   Get-ChildItem -Path .agents\skills -Recurse -Filter "SKILL.md"
   ```
2. **Frontmatter Linter**: Ensure every `SKILL.md` begins with `---` on Line 1, contains `name:`, contains `description:`, and ends the YAML block with `---`.
3. **Conversation Restart / Refresh**: In Antigravity IDE, closing and reopening the workspace folder or restarting a conversation immediately triggers a complete re-indexing of all `.agents/` customizations.

---

## 4. How to Add Future Skills Safely

To establish a new skill without introducing regressions:
1. **Check for Existing Coverage**: Consult `docs/engineering/AGENT_SKILLS_CATALOG.md` to confirm the capability is not already covered by an existing skill.
2. **Create New Skill Directory**:
   ```
   .agents/skills/<new-skill-name>/SKILL.md
   ```
3. **Draft Actionable Runbooks**: Avoid generic advice; include specific project paths, commands, and validation checks.
4. **Enforce Boundary Gates**: If the skill involves destructive actions or future phases (e.g., live payments, database migrations), place a prominent `[!CAUTION]` gate requiring owner approval.
5. **Update Catalog & Setup Docs**: Register the new skill in `docs/engineering/AGENT_SKILLS_CATALOG.md`.

---

## 5. Preventing Duplicate & Conflicting Instructions

- **Single Canonical Rule File**: The root `AGENTS.md` explicitly points to `.agents/AGENTS.md`. Do not maintain divergent instruction sets in multiple root files.
- **Deduplication by Resolved Path**: Antigravity deduplicates rules by their canonical file path. Placing all project skills under `.agents/skills/` ensures single-instance loading.
- **Prefix Isolation**: Use project-specific skill names (e.g., `inchara-project-guardrails`, `inchara-content-reconciliation`) to avoid shadowing global or built-in system skills.

---

## 6. Antigravity Version-Specific Characteristics

- **Windows Path Handling**: Node/TypeScript tools running on Windows should use forward slashes (`/`) for web imports and escaped backslashes (`\\`) in PowerShell scripts.
- **Rule File Size Cap**: Each individual rule file is capped at 24,000 bytes (24 KB). Keep `SKILL.md` files focused, modular, and use `references/` for extensive documentation.
- **Rules Budget**: Always-on rules share a 20,000-token budget. Project skills use progressive disclosure, ensuring they do not consume context tokens until activated.
