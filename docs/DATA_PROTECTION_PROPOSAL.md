# Data Protection & Privacy Programme Proposal

**Document:** DP-001  
**Version:** 1.0  
**Date:** 2026-07-03  
**Status:** Draft for review  
**Scope:** Commercial endurance coaching platform (Intervals.icu → sync pipeline → athlete data mirror → AI coaching layer)  
**Primary standards basis:** GDPR (EU 2016/679) + **ISO/IEC 27701:2019** (PIMS) on **ISO/IEC 27001:2022** (ISMS)  
**Agent briefing (operational extract):** [`AGENT_BRIEFING.md`](AGENT_BRIEFING.md)

---

## 1. Executive summary

This proposal defines how the coaching platform moves from **personal-use hygiene** to **standards-grade** data protection suitable for a **commercial EU coaching company**.

### Recommended certification path

| Layer | Standard | Role |
|-------|----------|------|
| Legal | **GDPR** + national implementation (e.g. Danish DPA guidance) | Binding obligation |
| Privacy management | **ISO/IEC 27701:2019** | Privacy Information Management System (PIMS) — maps GDPR to auditable controls |
| Security management | **ISO/IEC 27001:2022** | Information Security Management System (ISMS) — required foundation for 27701 |
| Risk assessment | **ISO/IEC 29134:2017** | DPIA methodology |
| Principles reference | **ISO/IEC 29100:2011** | Privacy framework vocabulary |

SOC 2 Type II is **not** the primary target here. ISO 27701 is the European-aligned analogue: it extends ISO 27001 with privacy controls directly mappable to GDPR Articles 5–32. Many enterprises accept ISO 27701 certification as evidence of privacy governance; GDPR compliance remains a separate legal obligation.

### Target outcome

Within three implementation phases (see §10), the company will operate:

1. A **Privacy Information Management System (PIMS)** with documented policies, roles, and evidence.
2. A **technical privacy profile** in the data pipeline (field allowlists, retention enforcement, location reduction).
3. **Contractual coverage** for athletes (controller) and subprocessors (Intervals.icu, GitHub, LLM vendors).
4. An **audit evidence pack** sufficient to engage a certification body for ISO 27001 + ISO 27701 Stage 1.

### Current maturity (baseline)

| Domain | Score | Notes |
|--------|-------|-------|
| Engineering hygiene | **Good** | API secrets in GitHub Secrets; `athlete_id` redacted; explicit-allow athlete extraction in sync.py |
| Data minimization | **Weak** | Full wellness passthrough (v3.85+); 3-year history; GPS polylines |
| Transparency & lawful basis | **Absent** | No privacy notice, consent records, or RoPA |
| Subprocessor governance | **Absent** | No register, DPAs, or transfer assessments |
| Retention & erasure | **Partial** | 14-day `intervals.json` only; no global retention policy |
| Access control | **At risk** | Public GitHub raw URLs documented as access method |
| AI/LLM governance | **Absent** | No documented model policy, retention, or training opt-out |

---

## 2. Regulatory and standards framework

### 2.1 GDPR roles

For commercial coaching:

| Party | Role | Responsibility |
|-------|------|----------------|
| **Coaching company** | **Data controller** | Determines purposes and means of processing athlete data |
| **Athlete** | Data subject | Rights under Arts. 15–22 |
| **Intervals.icu** | Processor (to coach) / Independent controller (for their platform) | Training data host; DPA required for coach-side API use |
| **GitHub (Microsoft)** | Subprocessor | Repository storage, Actions execution |
| **LLM provider** (e.g. OpenAI, Anthropic) | Subprocessor | Inference on athlete health/training data |
| **Garmin / device vendors** | Independent controllers | Upstream; athlete authorises via Intervals |

### 2.2 Lawful basis matrix

| Processing activity | Lawful basis (GDPR Art. 6) | Special category (Art. 9) |
|--------------------|---------------------------|---------------------------|
| Deliver paid coaching services | **Art. 6(1)(b)** contract | — |
| Training load / performance analysis | Art. 6(1)(b) contract | Art. 9(2)(a) **explicit consent** OR Art. 9(2)(h) health/social care (narrow; legal advice needed) |
| HRV, sleep, weight, vitals, injury | Art. 6(1)(b) + consent | **Art. 9(2)(a) explicit consent** (recommended) |
| Menstrual cycle tracking | Art. 6(1)(a) consent | **Art. 9(2)(a) explicit consent** (mandatory) |
| Blood glucose, blood pressure | Art. 6(1)(a) consent | **Art. 9(2)(a) explicit consent** (mandatory) |
| AI coaching via LLM | Art. 6(1)(b) + Art. 6(1)(a) consent | Consent for health fields sent to LLM |
| Marketing / testimonials | Art. 6(1)(a) consent | Separate, granular consent |
| Anonymised aggregate analytics | Art. 6(1)(f) legitimate interest | N/A if truly anonymised |

**Recommendation:** Use **explicit consent** (Art. 9(2)(a)) for all health-category fields, recorded at onboarding with versioned consent text. Contract alone is insufficient for menstrual, glucose, and BP data.

### 2.3 ISO/IEC 27701 control domains (summary mapping)

ISO 27701 adds privacy controls to ISO 27001 Annex A. Key domains for this platform:

| ISO 27701 area | Platform application |
|----------------|---------------------|
| **PIMS governance** | DPO/privacy lead, policy approval, management review |
| **Privacy roles** | Controller obligations, processor agreements |
| **Consent & choice** | Onboarding consent UI, wellness tier opt-in |
| **Purpose limitation** | Privacy profiles limit exported fields to coaching purpose |
| **Data minimization** | Field allowlists, GPS blurring, age bands |
| **Retention** | Automated expiry in sync pipeline + git history policy |
| **Data subject rights** | Access/export/erasure runbook |
| **Privacy by design** | Default-private repos, privacy-first sync defaults |
| **Subprocessors** | Register + DPA + transfer impact assessment |
| **Privacy incidents** | 72-hour breach notification procedure |
| **DPIA** | Required before commercial launch (Art. 35 GDPR) |

---

## 3. Data inventory & classification

Classification follows ISO 27001 asset handling tiers adapted for health data.

### 3.1 Legend

| Class | Definition | Handling |
|-------|------------|----------|
| **P0 — Public** | Non-personal protocol docs | Public repo OK |
| **P1 — Internal** | Aggregated, non-identifying analytics | Internal systems only |
| **P2 — Personal** | Identifies or relates to an individual | Encrypt in transit; access-controlled storage |
| **P3 — Sensitive personal (Art. 9)** | Health, sex life, biometric inference | Explicit consent; strict minimization; no public exposure |
| **P4 — Credentials** | API keys, tokens | Secrets manager only; never in JSON mirror |

### 3.2 `latest.json` field inventory

#### `athlete_profile`

| Field | Class | Coaching need | Default export (proposed) | Retention |
|-------|-------|---------------|---------------------------|-----------|
| `date_of_birth` | P2 | Low — age suffices | **Suppress** → export `age_band` only | Duration of contract + 30 days |
| `age` | P2 | Medium | `age_band` (e.g. 40–44) | Same |
| `height_m` | P2/P3 | Medium (W/kg) | Allow in `standard` profile | Same |
| `sex` | P2/P3 | Medium (physiology) | Allow with consent | Same |
| `location` | P2 | Low | **City + country only**; drop state if identifying | Same |
| `timezone` | P2 | High (scheduling) | Allow | Same |
| `platform_activated` | P2 | Low | Allow | Same |
| `years_on_platform` | P1 | Medium | Allow | Same |

#### `athlete_notes` (`icu_notes` passthrough)

| Field | Class | Notes |
|-------|-------|-------|
| Free text | P2/P3 | May contain health disclosures athlete typed voluntarily. **Scan not required**; treat as confidential. Athlete can redact in Intervals. |

#### `current_status.current_metrics` (today's wellness)

| Field | Class | Profile: `core` | Profile: `standard` | Profile: `extended` |
|-------|-------|-----------------|---------------------|---------------------|
| `weight_kg` | P3 | ✓ | ✓ | ✓ |
| `resting_hr`, `hrv` | P3 | ✓ | ✓ | ✓ |
| `sleep_hours` | P3 | ✓ | ✓ | ✓ |
| `sleep_quality`, `sleep_score` | P3 | ✗ | ✓ | ✓ |
| `fatigue`, `soreness`, `stress`, `mood`, `motivation` | P3 | ✓ | ✓ | ✓ |
| `injury` | P3 | ✓ | ✓ | ✓ |
| `hydration` | P3 | ✗ | ✓ | ✓ |
| `spO2`, `blood_glucose` | P3 | ✗ | ✗ | ✓ (explicit consent) |
| `systolic`, `diastolic` | P3 | ✗ | ✗ | ✓ (explicit consent) |
| `lactate`, `respiration`, `baevsky_si` | P3 | ✗ | ✗ | ✓ (explicit consent) |
| `body_fat_pct`, `abdomen_cm` | P3 | ✗ | ✗ | ✓ (explicit consent) |
| `kcal_consumed`, macros | P3 | ✗ | ✓ | ✓ |
| `menstrual_phase*` | P3 | ✗ | ✗ | ✓ (explicit consent) |
| `steps`, `hydration_volume_l` | P2/P3 | ✗ | ✓ | ✓ |

**Default for new commercial athletes:** `standard`. `extended` only after separate consent checkbox.

#### `wellness_data[]` (historical, ~28 days in sync window)

Same field rules as `current_metrics`. **Proposed retention:** 90 days in mirror, then roll off (align with `history.json` daily tier).

#### `recent_activities[]`

| Field / block | Class | Proposed control |
|---------------|-------|------------------|
| Activity `name` | P2 | Allow (coaching context); optional `ANONYMIZE_ACTIVITY_NAMES=true` |
| `description` | P2/P3 | Allow; athlete responsible for content |
| Power, HR, pace, zones | P2/P3 | Allow |
| `avg_temp`, weather, wind | P2 | Allow |
| `dfa_summary` | P3 | Allow when `has_dfa` |
| Start/end location (if present) | P2 | **Suppress** or round to ~1 km grid |

#### `intervals.json` (14-day retention — keep)

| Field | Class | Notes |
|-------|-------|-------|
| Per-interval HR, power, DFA | P3 | Retain 14-day cap ✓ |
| `dfa` block detail | P3 | Retain 14-day cap ✓ |

#### `history.json`

| Tier | Class | Proposed retention |
|------|-------|-------------------|
| 90-day daily (HRV, RHR, weight, zones) | P3 | 90 days |
| 180-day weekly | P2/P3 | 180 days |
| 1–3 year monthly | P2 | 36 months max; drop weight from monthly after 12 months |
| FTP timeline | P2 | 36 months |

#### `routes.json`

| Field | Class | Proposed control |
|-------|-------|------------------|
| `polyline` (lat/lon @ 500 m) | P2 | **Blur to 3 decimal places (~100 m)** or export climb segments without coordinates |
| `terrain_summary` aggregates | P1/P2 | Allow (no precise home location) |

#### `metadata`

| Field | Class | Control |
|-------|-------|---------|
| `athlete_id` | P2 | Keep `REDACTED` ✓ |
| `last_updated`, `version` | P1 | Allow |

### 3.3 Credentials (never in mirror)

| Asset | Class | Storage |
|-------|-------|---------|
| `INTERVALS_KEY` | P4 | GitHub Encrypted Secrets / vault |
| `GITHUB_TOKEN` | P4 | GitHub Encrypted Secrets |
| `ATHLETE_ID` | P4 | Secrets (internal ID; not exported) |
| `icu_api_key` (raw API) | P4 | Blocked by explicit-allow pattern ✓ |

---

## 4. Gap analysis (ISO 27701 → action)

| Control area | Current | Target | Priority |
|--------------|---------|--------|----------|
| RoPA (Art. 30) | None | `docs/compliance/ROPA.md` maintained quarterly | P0 |
| Privacy notice | None | Athlete-facing notice + cookie/tracking if web | P0 |
| Consent management | None | Versioned consent at onboarding; wellness tier | P0 |
| DPIA (Art. 35) | None | Complete before first paying athlete | P0 |
| Private data repos | Optional public URLs | **Private repos mandatory** for commercial | P0 |
| Field minimization | Full export | Privacy profiles in sync.py | P0 |
| Retention enforcement | Partial | Configurable caps all files | P1 |
| DSR runbook | None | Access, erasure, portability procedures | P1 |
| Subprocessor register | None | `docs/compliance/SUBPROCESSORS.md` | P1 |
| LLM DPA + config | Unknown | Enterprise API, ZDR, no training | P1 |
| Incident response | None | 72h breach procedure | P1 |
| Access reviews | None | Quarterly repo/access audit | P2 |
| Penetration test | None | Annual for coaching portal (when built) | P2 |
| ISO 27001 ISMS | None | Full ISMS documentation | P2 |
| Certification audit | None | Stage 1 → Stage 2 | P3 |

---

## 5. Target architecture

### 5.1 Principle: separate protocol from athlete data

```
┌─────────────────────────────────────────────────────────────────┐
│  PUBLIC (P0)                                                    │
│  github.com/[org]/section-11  →  SECTION_11.md, sync.py, docs   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PRIVATE PER ATHLETE (P2/P3)                                    │
│  github.com/[org]/athlete-[uuid]  (private repo)                │
│    latest.json / history.json / intervals.json / routes.json    │
│    DOSSIER.md (coach contract scope only)                       │
│    .privacy-profile.json (consent + field tier record)          │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     Intervals.icu API   GitHub Actions    LLM (subprocessor)
     (processor)        (subprocessor)    API only, ZDR
```

### 5.2 Remove public URL fetch for commercial athletes

`SECTION_11.md` currently documents raw `raw.githubusercontent.com` URLs as a Tier-1 access method. For commercial operation:

- **Deprecate** public URL fetch for athlete mirrors.
- **Permit** only: (1) private GitHub connector with OAuth-scoped access, (2) coach portal backend with authenticated API, (3) local agent on athlete-controlled device.
- Publish a **Section 11 v12.0** privacy addendum codifying this.

### 5.3 Coach portal (recommended for commercial scale)

Self-serve GitHub-per-athlete does not scale for access control and DSR. Medium-term target:

| Component | Function |
|-----------|----------|
| **Athlete portal** | Onboarding, consent, privacy profile selection, DSR requests |
| **Sync worker** | Runs sync.py per athlete; secrets in vault (not per-repo secrets) |
| **Coach dashboard** | Role-based access; audit log of data views |
| **LLM gateway** | Single integration point; logs redacted; enforces model policy |

---

## 6. Technical implementation — `sync.py` privacy module

Proposed **sync.py v4.0** privacy release (can ship incrementally as v3.105+).

### 6.1 Privacy profile configuration

```json
// .privacy-profile.json (committed in athlete repo, set at onboarding)
{
  "profile_version": "1.0",
  "privacy_tier": "standard",
  "consent": {
    "gdpr_privacy_notice_version": "2026-07-01",
    "health_data_explicit_consent": true,
    "extended_vitals_consent": false,
    "menstrual_tracking_consent": false,
    "llm_processing_consent": true,
    "consent_recorded_at": "2026-07-01T10:00:00Z",
    "consent_method": "athlete_portal"
  },
  "export": {
    "include_athlete_notes": true,
    "anonymize_activity_names": false,
    "location_precision": "city_country",
    "gps_precision_decimals": 2,
    "age_representation": "band"
  },
  "retention": {
    "intervals_days": 14,
    "wellness_days": 90,
    "history_max_years": 3,
    "history_weight_months": 12
  }
}
```

Environment override for CI: `PRIVACY_TIER=standard|core|extended`.

### 6.2 Field allowlist implementation

Add module `privacy.py` (or section in sync.py):

```python
WELLNESS_FIELDS = {
    "core": {"weight_kg", "resting_hr", "hrv_rmssd", "sleep_hours",
             "fatigue", "soreness", "stress", "mood", "motivation", "injury"},
    "standard": CORE | {"sleep_quality", "sleep_score", "hydration",
                        "kcal_consumed", "carbohydrates_g", "protein_g", "fat_g",
                        "steps", "hydration_volume_l"},
    "extended": STANDARD | {"spO2", "blood_glucose", "systolic", "diastolic",
                            "lactate", "respiration", "baevsky_si",
                            "body_fat_pct", "abdomen_cm",
                            "menstrual_phase", "menstrual_phase_predicted"},
}
```

`_format_wellness()` and `current_metrics` builder filter through `filter_fields(row, tier)`.

**Hard gate:** If `extended` field requested but `consent.extended_vitals_consent` is false → omit field and emit `privacy_warnings[]` in metadata (coach-visible, not athlete-facing alarm).

### 6.3 Age and location reduction

```python
def redact_athlete_profile(profile: dict, export_cfg: dict) -> dict:
    if export_cfg.get("age_representation") == "band":
        profile.pop("date_of_birth", None)
        if profile.get("age") is not None:
            profile["age_band"] = age_to_band(profile.pop("age"))
    if export_cfg.get("location_precision") == "city_country":
        profile["location"] = city_country_only(profile.get("location"))
    return profile
```

### 6.4 GPS blurring in `routes.json`

```python
def blur_coord(value: float, decimals: int = 2) -> float:
    return round(value, decimals)  # 2 ≈ 1.1 km at equator
```

Apply to all polyline lat/lon before write. Document precision in `routes.json` metadata: `"location_precision": "approximate"`.

### 6.5 Retention enforcement

| File | Mechanism |
|------|-----------|
| `intervals.json` | Existing 14-day prune ✓ |
| `wellness_data` in `latest.json` | Trim to `retention.wellness_days` on each sync |
| `history.json` | Cap tiers; strip `weight` from monthly rows older than `history_weight_months` |
| Git history | **Git filter-repo** runbook for erasure requests; prefer athlete-repo-per-person to limit blast radius |

### 6.6 Metadata additions

Add to `latest.json` → `metadata`:

```json
{
  "privacy": {
    "profile_tier": "standard",
    "consent_version": "2026-07-01",
    "fields_suppressed": ["date_of_birth", "blood_glucose"],
    "location_precision": "city_country",
    "data_controller": "Your Coaching Co ApS",
    "dpo_contact": "privacy@yourcoaching.dk"
  }
}
```

### 6.7 LLM-safe export (optional)

`sync.py --export-coaching-bundle` produces a minimized JSON for LLM context:

- Drops raw `wellness_data` history (today + 7-day summary only)
- Drops GPS polylines
- Includes `privacy.data_controller` header for model system prompt

---

## 7. Organisational controls (PIMS)

### 7.1 Required policies (ISO 27701 documentation set)

| Document | ID | Owner |
|----------|-----|-------|
| Information Security Policy | ISP-001 | CEO / CISO |
| Privacy Policy (internal) | PP-001 | DPO |
| Athlete Privacy Notice (external) | APN-001 | DPO |
| Data Retention & Deletion Policy | DRD-001 | DPO |
| Data Subject Rights Procedure | DSR-001 | DPO |
| Incident Response / Breach Notification | IRP-001 | DPO + CTO |
| Subprocessor Management Policy | SUB-001 | DPO |
| Access Control Policy | ACP-001 | CTO |
| Acceptable Use Policy | AUP-001 | HR |
| DPIA Template & Register | DPIA-001 | DPO |
| Records of Processing Activities | ROPA-001 | DPO |
| LLM / AI Processing Policy | AIP-001 | DPO + CTO |

Store under `docs/compliance/` in a **private** compliance repo (not the public protocol repo).

### 7.2 Roles

| Role | Responsibility | Minimum commercial setup |
|------|----------------|--------------------------|
| **Data Protection Lead / DPO** | GDPR accountability, DPIA, DSR, breach | Appointed DPO or external DPO service (mandatory if core activity = health monitoring at scale — legal review) |
| **Information Security Manager** | ISO 27001 ISMS | Founder/CTO initially |
| **Privacy Champion (coaching)** | Ensures coaches don't exfiltrate data | Senior coach |
| **Subprocessor Owner** | Vendor reviews | CTO |

### 7.3 Athlete onboarding checklist

- [ ] Privacy notice presented (version logged)
- [ ] Coaching contract signed (Art. 6(1)(b))
- [ ] Explicit health data consent (Art. 9(2)(a)) — separate checkbox
- [ ] Privacy tier selected (`core` / `standard` / `extended`)
- [ ] Extended vitals consent (if tier = extended)
- [ ] Menstrual tracking consent (if applicable)
- [ ] LLM processing consent (provider named)
- [ ] Private repo created / portal account provisioned
- [ ] Intervals.icu connection authorised by athlete
- [ ] Entry added to RoPA

### 7.4 Data Subject Rights (DSR) runbook summary

| Right | Art. | SLA | Method |
|-------|------|-----|--------|
| Access | 15 | 30 days | Export repo + portal data |
| Rectification | 16 | 30 days | Athlete updates Intervals; re-sync |
| Erasure | 17 | 30 days | Delete private repo, vault secrets, LLM log deletion request, RoPA update |
| Restriction | 18 | 30 days | Suspend sync; retain legal minimum |
| Portability | 20 | 30 days | JSON export (same schema as mirror) |
| Object | 21 | 30 days | Stop LLM processing; human-only coaching |

---

## 8. Subprocessor register (initial)

Maintain live document at `docs/compliance/SUBPROCESSORS.md`. Seed:

| Subprocessor | Purpose | Data shared | Location | DPA | Transfer mechanism |
|--------------|---------|-------------|----------|-----|-------------------|
| Intervals.icu | Training/wellness API source | All synced fields | EU (verify) | Required | N/A (source) |
| GitHub, Inc. | Repo storage, Actions | Full mirror | US | GitHub DPA | SCCs / EU Data Boundary (verify current terms) |
| Microsoft Azure | GitHub backend | As above | EU/US | Microsoft DPA | SCCs |
| OpenAI / Anthropic (TBD) | LLM inference | Coaching subset | US | Enterprise DPA | SCCs + ZDR |
| Garmin Connect | Device data (via Intervals) | Activity streams | US | Athlete's own account | Athlete is controller of device link |

**Action:** Verify each vendor's current DPA, EU hosting options, and whether **EU Data Boundary** or **SCCs** apply. Prefer LLM vendors offering **EU region inference** where available.

### 8.1 LLM policy (AIP-001 essentials)

| Requirement | Setting |
|-------------|---------|
| API tier | Enterprise / business with DPA |
| Training on data | **Off** (contractual + config) |
| Log retention | Zero or minimum (ZDR where offered) |
| Prompt content | Use `--export-coaching-bundle` minimized set |
| System prompt | Include "confidential health data — do not store or reproduce" |
| Model change control | Document model version in coaching audit log |
| Human review | Coach reviews AI recommendations before race/health-critical advice (disclaimer) |

---

## 9. DPIA summary (ISO 29134)

A full DPIA must be completed before commercial launch. Summary of likely outcomes:

### 9.1 Necessity & proportionality

| Processing | Necessary? | Proportionality measure |
|------------|------------|-------------------------|
| HRV/RHR for readiness | Yes — core coaching | `core` tier default |
| Menstrual tracking | Optional | Opt-in only; never required for service |
| Blood glucose / BP | Optional | Opt-in only; coach training required |
| GPS polylines | Low necessity | Blur or omit |
| 3-year history | Medium | Justified for periodisation; cap weight in old tiers |
| LLM inference | Yes for product | Minimized bundle; ZDR API |

### 9.2 Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Public repo exposure | Medium (today) | Critical | Private repos; deprecate URL fetch |
| LLM log leakage | Medium | High | ZDR, minimized prompts, DPA |
| Git history erasure failure | Medium | High | Per-athlete repos; erasure runbook |
| Coach downloads athlete data | Medium | Medium | Access logging; AUP; DLP policy |
| Intervals breach (upstream) | Low | High | Monitor vendor status; contractual notice |
| Incorrect AI health advice | Medium | High | Human-in-loop; disclaimers; not medical device positioning |

### 9.3 DPIA conclusion (provisional)

Processing is **acceptable** provided Phase 0 controls (private repos, consent, minimization defaults) ship **before** first commercial athlete.

---

## 10. Implementation roadmap

Phases are ordered by dependency. Durations are expressed as workstreams, not calendar estimates.

### Phase 0 — Launch blockers (before first paying athlete)

| # | Deliverable | Owner | Evidence |
|---|-------------|-------|----------|
| 0.1 | Athlete Privacy Notice v1 | DPO | Published URL/PDF |
| 0.2 | Consent flow (health + LLM) | Product | Consent logs |
| 0.3 | RoPA v1 | DPO | `ROPA-001` |
| 0.4 | DPIA completed | DPO | Signed DPIA |
| 0.5 | Private repos mandatory | Eng | Repo visibility audit |
| 0.6 | Subprocessor DPAs executed | Legal | Signed DPAs |
| 0.7 | LLM enterprise config | Eng | Config screenshot + DPA |
| 0.8 | `PRIVACY_TIER=standard` default in sync | Eng | PR merged |
| 0.9 | Deprecate public URL fetch in SECTION_11 | Eng | Protocol v12.0 PR |
| 0.10 | Incident response v1 | DPO | `IRP-001` |

**Exit criteria:** One internal pilot athlete onboarded end-to-end with full consent trail.

### Phase 1 — Technical privacy hardening

| # | Deliverable |
|---|-------------|
| 1.1 | `.privacy-profile.json` schema + validation |
| 1.2 | Field allowlists (`core` / `standard` / `extended`) |
| 1.3 | Age band + location reduction |
| 1.4 | GPS blurring in `routes.json` |
| 1.5 | Wellness/history retention enforcement |
| 1.6 | `metadata.privacy` block in exports |
| 1.7 | `--export-coaching-bundle` for LLM |
| 1.8 | DSR export script (`scripts/dsr-export.sh`) |
| 1.9 | Erasure runbook tested on pilot repo |

**Exit criteria:** Privacy profile changes produce auditable diff in `metadata.privacy.fields_suppressed`.

### Phase 2 — PIMS / ISMS documentation

| # | Deliverable |
|---|-------------|
| 2.1 | Full policy set (§7.1) approved by management |
| 2.2 | Risk register (ISO 27001) |
| 2.3 | Asset register |
| 2.4 | Access review procedure + first review |
| 2.5 | Vendor review schedule |
| 2.6 | Staff privacy/security training |
| 2.7 | Coach portal MVP (auth, consent, private data access) |

**Exit criteria:** Internal audit against ISO 27701 checklist ≥ 80% conforming.

### Phase 3 — Certification readiness

| # | Deliverable |
|---|-------------|
| 3.1 | ISO 27001 ISMS operational 3+ months (evidence) |
| 3.2 | Internal audit + management review |
| 3.3 | External ISO 27001 Stage 1 |
| 3.4 | ISO 27701 extension audit |
| 3.5 | Annual penetration test (if portal public-facing) |
| 3.6 | SOC 2 optional (only if US enterprise clients demand it) |

**Exit criteria:** Certification body Stage 1 report with no major nonconformities.

---

## 11. SECTION_11.md protocol amendments (proposed v12.0)

Add new subsection under Data Mirror Integration:

### 11A.x Commercial Privacy Requirements

1. Athlete data mirrors containing P2/P3 data **must** be stored in private, access-controlled repositories.
2. URL fetch from public endpoints is **deprecated** for commercial coaching; use authenticated connector or coach portal API.
3. AI systems **must** read `metadata.privacy` before processing and **must not** request fields outside the athlete's consent tier.
4. AI systems **must not** reproduce `date_of_birth`, precise GPS, or suppressed fields even if present in chat history.
5. Coaches **must** use `--export-coaching-bundle` or equivalent minimized export when invoking external LLMs.

---

## 12. Evidence pack for auditors

Maintain continuous evidence:

| Evidence type | Location | Frequency |
|---------------|----------|-----------|
| Consent records | CRM / portal DB | Per athlete |
| RoPA | Compliance repo | Quarterly review |
| Access reviews | Compliance repo | Quarterly |
| Sync logs (no PII) | GitHub Actions | Per run |
| Policy version history | Compliance repo | On change |
| Subprocessor reviews | Compliance repo | Annual |
| DPIA reviews | Compliance repo | Annual or on change |
| Training completion | HR records | Annual |
| Incident log | Compliance repo | As needed |
| DSR request log | Compliance repo | Per request |

---

## 13. Cost and resource drivers (non-calendar)

| Investment | Driver |
|------------|--------|
| External DPO (fractional) | Required for accountability; scales with athlete count |
| Legal review (DPA, contracts) | One-time + per major vendor |
| ISO certification audit | Certification body fees + consultant optional |
| Coach portal development | Scales past ~20 athletes on manual GitHub |
| LLM enterprise tier | Higher API cost; mandatory for ZDR/DPA |
| GitHub Teams / Enterprise | Private repos, audit log, SAML SSO |

---

## 14. Decision log (recommended approvals)

| Decision | Recommendation | Approver |
|----------|----------------|----------|
| Primary standard | ISO 27701 + GDPR | Board |
| Default privacy tier | `standard` | DPO + Product |
| Public URL fetch | Deprecate for commercial | DPO + Eng |
| Extended vitals | Opt-in only | DPO |
| LLM vendor | Enterprise with EU DPA + ZDR | CTO + DPO |
| Per-athlete private repo | Yes (interim); portal medium-term | CTO |
| Certification target | ISO 27001 then 27701 | Board |

---

## 15. Next steps

1. **Review this proposal** — confirm company legal name, DPO appointment, and LLM vendor.
2. **Approve Phase 0 scope** — block commercial onboarding until complete.
3. **Deploy agent briefing** — load [`AGENT_BRIEFING.md`](AGENT_BRIEFING.md) into pipeline system instructions for all coaching agents.
4. **Open implementation epic** — sync.py privacy module (§6) + SECTION_11 v12.0 (§11).
5. **Commission DPIA** — use ISO 29134 template; reference §9 of this document.
6. **Schedule internal audit** — ISO 27701 checklist self-assessment at end of Phase 1.

---

## Appendix A — Age band mapping

| Age | `age_band` |
|-----|------------|
| 18–24 | 18-24 |
| 25–29 | 25-29 |
| … | 5-year bands |
| 65+ | 65+ |

## Appendix B — ISO 27701 ↔ GDPR quick reference

| ISO 27701 clause theme | GDPR Articles |
|------------------------|---------------|
| Conditions for consent | Art. 7 |
| Privacy notice | Arts. 12–14 |
| Rights of data subjects | Arts. 15–22 |
| Privacy by design | Art. 25 |
| Records of processing | Art. 30 |
| Security of processing | Art. 32 |
| Breach notification | Arts. 33–34 |
| DPIA | Art. 35 |
| Subprocessors | Art. 28 |
| Transfers | Arts. 44–49 |

## Appendix C — Document history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-03 | Cursor Agent | Initial proposal |

---

*This document is a technical and governance proposal. It does not constitute legal advice. Engage qualified EU privacy counsel before commercial launch.*
