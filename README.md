# E.ROBOT

## Run

Install Node.js, Python, the MetaTrader5 Python package, and a supported MT5 terminal. From this directory:

```sh
EXECUTOR_PATH=./executor.py node bridge.js
```

Open `http://127.0.0.1:8787/` for the control panel. The UI starts in SIMULATION mode. Changing to LIVE requires an explicit confirmation; LIVE requires the bridge and an MT5 terminal. The executor currently supports MT5 only. This is a prototype, not a production-ready trading system.

## Architecture and security

The browser is a control panel. In LIVE mode, it sends connection and command requests to the loopback bridge; the Python executor is the only component that calls the MetaTrader5 API. The bridge binds to `127.0.0.1` and checks browser origins. Do not expose it to a network or treat loopback origin checking as user authentication. Do not deploy this prototype with real credentials without a security review.

The UI clears the password field after connection submission, and the bridge does not log passwords. Application-level clearing cannot guarantee erasure of every transient copy in browser, Node, Python, or MT5 library memory.

The executor's CLOSE_ALL command attempts to cancel pending E.ROBOT orders and close E.ROBOT positions when the executor can communicate with MT5. **It cannot receive a command when the bridge or its stdin connection is unavailable.** Therefore this implementation cannot guarantee an independent kill-switch while the bridge is disconnected; the UI Close All button is not an emergency-control channel. Verify a separate broker/terminal emergency procedure before any live use.

## Demo-first protocol

Use an MT5 demo account for at least four weeks. Independently backtest the quality formula, verify symbol mapping and broker stop/volume rules, test partial fills and terminal failures, verify the close procedure, and confirm daily-loss accounting and reset at broker-server midnight. Do not move to a live account until these tests and an independent code review are complete.

**Warning:** Live trading can lose money. This prototype does not guarantee execution, pricing, connectivity, or risk limits. The quality score and SIMULATION results are not predictions or evidence of profitability.
```
