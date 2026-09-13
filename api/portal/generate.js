/**
 * POST /api/portal/generate
 * Body: { engine, crm, sequencer, dataProvider, company, website, icp, email }
 * Builds a personalized automation package: n8n workflow JSON (tokens replaced),
 * a personalized PLAYBOOK.md, and a CONFIG-CHECKLIST.md — zipped and returned
 * as base64 for instant download in the portal.
 */
const { TEMPLATES, ENGINE_META } = require('./templates');

/* ---------- minimal CRC32 + stored ZIP writer (no dependencies) ---------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function zipFiles(files) {
  // files: [{ name, data: Buffer }]
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const f of files) {
    const nameBuf = Buffer.from(f.name, 'utf8');
    const crc = crc32(f.data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    lh.writeUInt16LE(0x0800, 6); // UTF-8
    lh.writeUInt16LE(0, 8);      // stored
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(f.data.length, 18);
    lh.writeUInt32LE(f.data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    chunks.push(lh, nameBuf, f.data);
    central.push({ nameBuf, crc, size: f.data.length, offset });
    offset += 30 + nameBuf.length + f.data.length;
  }
  const centralStart = offset;
  const centralChunks = [];
  for (const c of central) {
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(0, 10);
    ch.writeUInt32LE(c.crc, 16);
    ch.writeUInt32LE(c.size, 20);
    ch.writeUInt32LE(c.size, 24);
    ch.writeUInt16LE(c.nameBuf.length, 28);
    ch.writeUInt32LE(c.offset, 42);
    centralChunks.push(ch, c.nameBuf);
    offset += 46 + c.nameBuf.length;
  }
  const centralSize = offset - centralStart;
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(central.length, 8);
  end.writeUInt16LE(central.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(centralStart, 16);
  return Buffer.concat([...chunks, ...centralChunks, end]);
}

/* ---------- token replacement ---------- */
function fill(str, ctx) {
  return String(str)
    .replace(/\{\{COMPANY\}\}/g, ctx.company)
    .replace(/\{\{WEBSITE\}\}/g, ctx.website)
    .replace(/\{\{ICP\}\}/g, ctx.icp)
    .replace(/\{\{CRM\}\}/g, ctx.crm)
    .replace(/\{\{SEQUENCER\}\}/g, ctx.sequencer)
    .replace(/\{\{DATA_PROVIDER\}\}/g, ctx.dataProvider)
    .replace(/\{\{EMAIL\}\}/g, ctx.email);
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'package';
}

function playbook(ctx, meta) {
  return `# ${meta.label} — Setup Playbook
Built for **${ctx.company}** (${ctx.website}) by Salesgency Package Portal.

## What you got
${meta.blurb}

Your stack, as you described it:
- CRM: **${ctx.crm}**
- Sequencer: **${ctx.sequencer}**
- Data provider: **${ctx.dataProvider}**
- ICP: ${ctx.icp}

## Setup (about 45 minutes)
1. **Import the workflow.** In n8n: Workflows → Import from file → select \`${meta.file}\`.
2. **Add credentials.**
   - ${ctx.crm}: create an API credential in n8n and attach it to the "${ctx.crm}" nodes.
   - ${ctx.dataProvider}: add your API key to the "${ctx.dataProvider}" HTTP nodes (see CONFIG-CHECKLIST.md for exact URLs to replace).
   - ${ctx.sequencer}: add your API key to the enrollment node.
   - Slack: connect your workspace for the alert nodes (or swap in email).
3. **Review the approval gates.** Every node that sends anything external is marked \`awaiting_approval\`. Keep a human in the loop until reply rates are stable.
4. **Test with 5 records.** Run once manually, inspect the output, then activate the schedule.
5. **Activate.** Toggle the workflow Active in n8n. It now runs on its own.

## Tuning
- Reply rate under 2%? Shorten copy, sharpen the pain hypothesis, check your sending domain (SPF/DKIM/DMARC).
- Too much volume? Lower the daily cap in the trigger/config node.
- Wrong ICP? Edit the Signal Config node — everything downstream reads from it.

## Need it done for you?
A Build Session ($1,000, 4 hours, credited toward a Sprint) gets this installed and tuned with you live: https://salesgency-6136.vercel.app/build-session.html

---
Built ${new Date().toISOString().slice(0, 10)} · ${ctx.email} · Salesgency (d/b/a Diamitani Industries)
`;
}

function checklist(ctx, meta) {
  const lines = [
    `# Config Checklist — ${meta.label}`,
    `Company: ${ctx.company} · ${ctx.website}`,
    ``,
    `Fill these in before activating the workflow in n8n:`,
    ``,
    `## Credentials`,
    `- [ ] ${ctx.crm} API key / OAuth connected in n8n`,
  ];
  if (ctx.dataProvider !== 'Neither yet') lines.push(`- [ ] ${ctx.dataProvider} API key added to HTTP nodes`);
  if (ctx.sequencer !== 'Not yet') lines.push(`- [ ] ${ctx.sequencer} API key added to enrollment node`);
  lines.push(
    `- [ ] Slack workspace connected (or replace alert nodes with email)`,
    ``,
    `## URLs to replace (search the workflow JSON for ".example")`,
    `- [ ] ${ctx.dataProvider} signal/pull endpoint`,
    `- [ ] ${ctx.dataProvider} enrich endpoint`,
  );
  if (ctx.sequencer !== 'Not yet') lines.push(`- [ ] ${ctx.sequencer} enroll endpoint`);
  lines.push(
    `- [ ] ${ctx.crm} deals/contacts endpoint`,
    ``,
    `## Before first live run`,
    `- [ ] Approval gates reviewed — nothing external sends without human OK`,
    `- [ ] Tested with 5 records, output inspected`,
    `- [ ] Sending domain has SPF, DKIM, DMARC (for outbound engines)`,
    `- [ ] Exclusion list loaded (competitors, open deals, do-not-contact)`,
  );
  return lines.join('\n');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const b = req.body || {};
    const engine = String(b.engine || '').toLowerCase();
    if (!TEMPLATES[engine]) return res.status(400).json({ error: 'Unknown engine.' });

    const ctx = {
      engine,
      crm: String(b.crm || 'your CRM').slice(0, 60),
      sequencer: String(b.sequencer || 'your sequencer').slice(0, 60),
      dataProvider: String(b.dataProvider || 'your data provider').slice(0, 60),
      company: String(b.company || 'Your Company').slice(0, 80),
      website: String(b.website || '').slice(0, 120),
      icp: String(b.icp || 'your ideal customer').slice(0, 200),
      email: String(b.email || '').slice(0, 120),
    };
    if (!ctx.email || !ctx.email.includes('@')) {
      return res.status(400).json({ error: 'A valid email is required for your receipt.' });
    }

    const meta = ENGINE_META[engine];
    const workflow = TEMPLATES[engine]();
    const workflowJson = fill(JSON.stringify(workflow, null, 2), ctx);
    const fileSlug = slug(ctx.company);

    const zip = zipFiles([
      { name: `${fileSlug}-${meta.file}`, data: Buffer.from(workflowJson, 'utf8') },
      { name: 'PLAYBOOK.md', data: Buffer.from(fill(playbook(ctx, meta), ctx), 'utf8') },
      { name: 'CONFIG-CHECKLIST.md', data: Buffer.from(fill(checklist(ctx, meta), ctx), 'utf8') },
    ]);

    const filename = `${fileSlug}-automation-package.zip`;
    return res.status(200).json({
      status: 'success',
      filename,
      engine: meta.label,
      company: ctx.company,
      zipBase64: zip.toString('base64'),
      builtAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Portal Generate Error]', err);
    return res.status(500).json({ error: 'Package build failed. Try again.' });
  }
};
