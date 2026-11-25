Method Path Body / Query Purpose
GET /health — Liveness probe
POST /connect {server, login, password} Authenticate to MT5
GET /quality ?symbol=XAUUSD&timeframe=H1 Score 0–100
POST /command {action:"START"\|"STOP"\|"OPEN"\|"CLOSE_ALL", payload, requestId} Execution
GET /state — Positions, daily P/L, connection status
