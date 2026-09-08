/**
 * DDC Planning Runtime
 * Deterministic walker for Delali Development Cycle planning mode.
 * The model proposes artifact payloads; only this runtime advances stage.
 */

export type DdcStatus =
  | "completed"
  | "needs_clarification"
  | "awaiting_approval"
  | "blocked";

export type SiteType =
  | "auto"
  | "ecommerce"
  | "marketing_agency"
  | "chat_agent"
  | "web_app"
  | "saas"
  | "b2b"
  | "mobile"
  | "directory"
  | "gallery_portfolio"
  | "other";

export const STAGES = [
  "created",
  "intake",
  "pal_parse",
  "pal_ambiguity",
  "pal_latent",
  "pal_expand",
  "pal_compile",
  "intent",
  "evidence",
  "jtbd",
  "npao",
  "documentation",
  "architecture",
  "gtm",
  "design_system",
  "quality_plan",
  "scaffolding",
  "scripts",
  "connecting",
  "deploying",
  "testing",
  "refining",
  "maintaining",
  "completed",
] as const;

export type Stage = (typeof STAGES)[number];

const BUILD_STAGES: Stage[] = [
  "scaffolding",
  "scripts",
  "connecting",
  "deploying",
  "testing",
  "refining",
  "maintaining",
  "completed",
];

const SIDE_EFFECT_STAGES: Stage[] = ["connecting", "deploying"];

export const STAGE_TEACHING: Record<Stage, string> = {
  created: "We open a new run so nothing is lost if the chat ends.",
  intake:
    "Intake writes down what you asked for. If we skip it, we build the wrong thing.",
  pal_parse:
    "Parse splits what you said from what we guessed. Guesses must be labeled.",
  pal_ambiguity:
    "We look for holes: who logs in, who pays, who owns the data. We ask one real question, not a quiz.",
  pal_latent:
    "Latent intent is the job under the request. You want a site. You hired a result.",
  pal_expand:
    "Expand fills screens, data, risks, and cost without making you design the database.",
  pal_compile:
    "Compile turns the thinking into a package the rest of the pipeline can run.",
  intent:
    "The intent spec is the fence. It says what v1 is and what it is not.",
  evidence:
    "Evidence looks at real leading sites in your field so quality is measured, not hoped.",
  jtbd:
    "Jobs to be done name the situation, the action, and the outcome. Features follow jobs.",
  npao:
    "Now, Next, Later, Out of scope. This stops us from building a mall when you needed a shop.",
  documentation:
    "Stories, map of pages, flows, PRD, and specs. This is the blueprint a stranger could build from.",
  architecture:
    "Architecture is how the pieces connect: hosting, database, secrets, failure, scale.",
  gtm:
    "Go-to-market is who it is for, what we say (Attention, Interest, Desire, Action), and where we say it.",
  design_system:
    "Taste rules: type, color, motion. Generic AI-looking sites fail this gate.",
  quality_plan:
    "We score the plan before code. If the plan is weak, building faster only fails faster.",
  scaffolding:
    "Folders, configs, and empty homes for code. Still no production.",
  scripts: "The real logic: accounts, payments, the core job, tests.",
  connecting: "Plug in login, email, payments. Secrets stay off the page and out of git.",
  deploying: "Preview, then production. Needs your yes. We must be able to roll back.",
  testing: "Click the path a customer takes. If it breaks, we are not done.",
  refining: "Compare to the best sites in your field. Close the gap on beauty, SEO, and trust.",
  maintaining:
    "Backups, watching errors, small improvements. Launch is the start of the life cycle.",
  completed: "This run is finished. Start a new run to change the product.",
};

export type WafPillar =
  | "operational_excellence"
  | "security"
  | "reliability"
  | "performance_efficiency"
  | "cost_optimization"
  | "sustainability";

export type GateResult = "pending" | "pass" | "fail" | "waived";

export interface ArtifactRef {
  type: string;
  version: string;
  status: "draft" | "review" | "approved" | "superseded";
  confidence: number;
}

export interface DdcRun {
  run_id: string;
  framework: "ddc-planning-harness";
  version: "1.0.0";
  education_mode: boolean;
  gtm: boolean;
  site_type: SiteType;
  stage: Stage;
  build_eligible: boolean;
  prompt: string;
  artifacts: Record<string, ArtifactRef>;
  open_question: string | null;
  approvals: string[];
  waf: Record<WafPillar, GateResult>;
  quality: Record<string, number>;
  next_action: string;
  status: DdcStatus | "in_progress";
}

export interface IntakeInput {
  prompt: string;
  site_type?: SiteType;
  education_mode?: boolean;
  gtm?: boolean;
  uploads?: string[];
  links?: string[];
}

export interface StageSubmission {
  artifact_type: string;
  version: string;
  confidence: number;
  payload_ok: boolean;
  blocking_question?: string;
  needs_approval?: boolean;
  waf?: Partial<Record<WafPillar, GateResult>>;
  quality?: Record<string, number>;
}

const QUALITY_KEYS = [
  "contract",
  "taste",
  "usefulness",
  "payments",
  "a11y",
  "security",
  "reliability",
  "performance",
  "ops",
  "scale_honesty",
] as const;

function nextStage(stage: Stage): Stage {
  const i = STAGES.indexOf(stage);
  return STAGES[Math.min(i + 1, STAGES.length - 1)];
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ddc_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function createRun(input: IntakeInput): DdcRun {
  const prompt = input.prompt.trim();
  if (!prompt) {
    throw new Error("Intake requires a prompt.");
  }
  return {
    run_id: newId(),
    framework: "ddc-planning-harness",
    version: "1.0.0",
    education_mode: input.education_mode ?? true,
    gtm: input.gtm ?? true,
    site_type: input.site_type ?? "auto",
    stage: "intake",
    build_eligible: false,
    prompt,
    artifacts: {},
    open_question: null,
    approvals: [],
    waf: {
      operational_excellence: "pending",
      security: "pending",
      reliability: "pending",
      performance_efficiency: "pending",
      cost_optimization: "pending",
      sustainability: "pending",
    },
    quality: {},
    next_action: "Write immutable intake/v1 from the prompt.",
    status: "in_progress",
  };
}

export function teach(run: DdcRun): string | null {
  if (!run.education_mode) return null;
  return STAGE_TEACHING[run.stage];
}

export function canEnter(run: DdcRun, target: Stage): { ok: boolean; reason?: string } {
  if (BUILD_STAGES.includes(target) && !run.build_eligible) {
    return { ok: false, reason: "Build stages are locked until Quality Plan passes." };
  }
  if (SIDE_EFFECT_STAGES.includes(target) && !run.approvals.includes(target)) {
    return { ok: false, reason: `${target} requires explicit approval.` };
  }
  return { ok: true };
}

function qualityUnlocksBuild(quality: Record<string, number>): boolean {
  return QUALITY_KEYS.every((k) => (quality[k] ?? 0) >= 4);
}

export function submitStage(run: DdcRun, submission: StageSubmission): DdcRun {
  const copy: DdcRun = {
    ...run,
    artifacts: { ...run.artifacts },
    waf: { ...run.waf },
    quality: { ...run.quality, ...submission.quality },
    approvals: [...run.approvals],
  };

  if (submission.blocking_question) {
    copy.status = "needs_clarification";
    copy.open_question = submission.blocking_question;
    copy.next_action = "Answer the single open question, then resubmit this stage.";
    return copy;
  }

  if (submission.needs_approval) {
    copy.status = "awaiting_approval";
    copy.next_action = `Approve side effect for ${copy.stage} before continuing.`;
    return copy;
  }

  if (!submission.payload_ok) {
    copy.status = "blocked";
    copy.next_action = `Fix ${copy.stage} artifact until the exit gate passes.`;
    return copy;
  }

  copy.artifacts[submission.artifact_type] = {
    type: submission.artifact_type,
    version: submission.version,
    status: "draft",
    confidence: submission.confidence,
  };
  copy.open_question = null;
  copy.status = "in_progress";

  if (submission.waf) {
    copy.waf = { ...copy.waf, ...submission.waf };
  }

  if (copy.stage === "quality_plan") {
    copy.build_eligible = qualityUnlocksBuild(copy.quality);
    if (!copy.build_eligible) {
      copy.status = "blocked";
      copy.next_action =
        "Raise every quality dimension to 4/5 or record a written waiver.";
      return copy;
    }
  }

  if (copy.stage === "architecture") {
    const wafFail = Object.values(copy.waf).some((v) => v === "pending" || v === "fail");
    if (wafFail) {
      copy.status = "blocked";
      copy.next_action = "Answer all six Well-Architected pillars before leaving architecture.";
      return copy;
    }
  }

  const target = nextStage(copy.stage);
  const allowed = canEnter(copy, target);
  if (!allowed.ok) {
    copy.status = "blocked";
    copy.next_action = allowed.reason ?? "Cannot advance.";
    return copy;
  }

  copy.stage = target;
  if (target === "completed") {
    copy.status = "completed";
    copy.next_action = "Run closed. Start a new run to change the product.";
  } else {
    copy.next_action = `Execute stage ${target}. ${STAGE_TEACHING[target]}`;
  }
  return copy;
}

export function answerQuestion(run: DdcRun, answer: string): DdcRun {
  if (run.status !== "needs_clarification") return run;
  return {
    ...run,
    status: "in_progress",
    open_question: null,
    prompt: `${run.prompt}\n\nClarification: ${answer.trim()}`,
    next_action: `Resubmit ${run.stage} with the clarification applied.`,
  };
}

export function approve(run: DdcRun, stage: Stage): DdcRun {
  if (run.approvals.includes(stage)) return run;
  return {
    ...run,
    approvals: [...run.approvals, stage],
    status: "in_progress",
    next_action: `Approval recorded for ${stage}. Resubmit or advance.`,
  };
}

export function setEducation(run: DdcRun, on: boolean): DdcRun {
  return { ...run, education_mode: on };
}

/** Planning-only stages an agent may auto-walk without extra approval. */
export function isPlanningStage(stage: Stage): boolean {
  return !BUILD_STAGES.includes(stage);
}
