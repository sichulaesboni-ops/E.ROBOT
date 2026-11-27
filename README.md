# E.ROBOT — MT5 Trend Trading Terminal

Three-component system: a browser control panel, a zero-dependency Node bridge, and a Python MT5 executor.

## Requirements
- Node.js 18+ (no npm packages needed)
- Python 3.9+ with `pip install MetaTrader5`
- MetaTrader 5 terminal installed and logged into a **demo** account

## Run
1. `python -m pip install MetaTrader5`
2. `node bridge.js`  → listens on `http://127.0.0.1:8787`
3. Open `index.html` in any modern browser (or serve it, e.g. `python -m http.server 8080`)
4. Enter your MT5 broker server, login, password → click **CONNECT E.ROBOT**
5. Click **CHECK E.ROBOT QUALITY** → gauge updates
6. If quality ≥ threshold, **START** or **OPEN** unlock

## Files
- `index.html` — UI, state machine, gauge, trade history
- `bridge.js` — HTTP API, spawns executor, dedupes requests
- `executor.py` — MT5 connection, quality algorithm, order execution, kill-switch

## ⚠️ Safety
- **The UI is a control panel, not a vault.** It never stores real broker credentials in production — the password field is in-memory only for the session.
- **Demo first.** Run this on an MT5 **demo** account for at least **4 weeks** before considering live.
- **Bridge is local-only** (`127.0.0.1:8787`). Do not expose it to the internet.
- **Kill switch** — `CLOSE_ALL` closes E.ROBOT positions and cancels pending orders on the executor side, even if the UI disconnects.
- **Max daily loss** — enforced by `executor.py`, not the UI. The UI can be bypassed; the executor cannot (as long as it's running).
- The quality score is **advisory**, not a guarantee. Markets are risky. Test thoroughly.

## State Machine
