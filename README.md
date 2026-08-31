# car-av-picker

Tell it your budget and what you care about. It tells you what to buy.

A car audio system planner for people who don't know what "91 dB @ 1W/1m" means and
shouldn't have to. Set a few sliders — budget, sound quality, loudness, electrical
headroom — and get a complete build that actually works together.

> **Status: early development.** The API serves an in-memory catalog. The
> recommendation engine and frontend are not built yet. See the roadmap.

---

## How it works

```
        sliders: budget · SQ · SPL · max amperage
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
  recommended options              "Give me a list"
  per category                     one optimal build,
  (you pick)                       generated for you
```

**Guided mode** narrows each category to the parts worth considering for your goals
and budget, and you choose between them.

**"Give me a list"** skips the choosing — it generates the best complete build it can
for your constraints, ranked on price-to-performance.

Either way the result is a full parts list that fits the budget, stays within your
electrical capacity, and passes compatibility checks.

## Why

Car audio specs are hard to compare and easy to get wrong. Two speakers rated 40 W
and 180 W are far closer in real-world loudness than the numbers suggest. Mounting
depth — the spec nobody prints on the front of the box — decides whether a speaker
physically fits your door. Impedance decides whether your amplifier survives.

Most shoppers don't want a spec sheet. They want to know what to buy for $800.

## How recommendations work

Every product gets two scores **derived from its specs**, not hand-assigned:

| Score | Driven by |
|---|---|
| **SPL** | sensitivity, RMS power handling, cone area |
| **SQ** | frequency response width, driver type, component vs coaxial construction |

Because the scores come from a formula, the app can explain itself — *"scored 8.4 for
SQ: component set, 45 Hz–21 kHz, silk dome tweeter"* — rather than asking you to trust
a number.

Budget is split across categories using **goal-weighted allocation profiles**. An
SQ-leaning build sends more to the front stage; an SPL-leaning build sends more to the
subwoofer and amplifier. The slider interpolates between them.

Current draw is computed from amplifier specs, so the amperage limit is a real
constraint on what can be recommended — not a suggestion.

## Tech stack

| | |
|---|---|
| Language | TypeScript (strict) |
| API | Express |
| Frontend | React + Vite *(planned)* |
| Database | PostgreSQL *(planned)* |
| Structure | npm workspaces monorepo |

Written by hand rather than generated — the project is a vehicle for learning
idiomatic TypeScript and REST API design.

## Getting started

**Prerequisites:** Node.js 20+, npm 10+

```bash
git clone https://github.com/thoma-sH/car-av-picker.git
cd car-av-picker
npm install
npm run dev --workspace apps/api
```

The API starts on `http://localhost:3000`. Verify with:

```bash
curl http://localhost:3000/api/health
# {"ok":true}
```

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Liveness check |
| `GET` | `/api/products` | List products, with optional filters |
| `GET` | `/api/products/:slug` | One product by slug. `404` if not found. |

Filters are query parameters and combine freely:

```
/api/products?category=speaker
/api/products?brand=JBL
/api/products?category=speaker&brand=JBL
```

An empty result is `200` with `[]`, not `404` — a missing *resource* is a 404, an
empty *collection* is a valid answer to a valid question.

## Project structure

```
car-av-picker/
├── apps/
│   └── api/                    Express API
│       └── src/
│           ├── index.ts        entry point, mounts routers
│           ├── routes/         one router per resource
│           └── data/           types + in-memory catalog
├── packages/                   shared libraries (empty for now)
├── tsconfig.base.json          compiler settings all workspaces inherit
└── package.json                workspace manifest
```

Products are modelled as a **discriminated union** — `Speaker | Amplifier`, keyed on a
`category` field — so each variant carries only the specs that make sense for it and a
speaker can't accidentally have an amplifier's channel count.
- [ ] Compatibility rules (fitment, impedance, power, channel count)
- [ ] React frontend
- [ ] PostgreSQL, replacing the in-memory array
- [ ] Accounts and saved builds
