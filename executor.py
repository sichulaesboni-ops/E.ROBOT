import sys
import json
import MetaTrader5 as mt5

def init_mt5():
    if not mt5.initialize():
        return {"error": "MT5 Initialization failed"}
    return {"status": "ready"}

def get_quality(symbol, timeframe):
    # 1. Fetch closed bars only
    rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, 200)
    if rates is None: return {"error": "No data"}
    
    # 2. Calculate Trend & Momentum (Simplified mock logic for reference)
    # In production, calculate EMA50 vs EMA200 slope here.
    score = 94 # Mock score
    return {"score": score, "direction": "BUY", "isStrong": score >= 80}

def main():
    print(json.dumps(init_mt5()))
    sys.stdout.flush()
    
    for line in sys.stdin:
        try:
            cmd = json.loads(line)
            action = cmd.get("action")
            
            if action == "GET_QUALITY":
                result = get_quality(cmd["symbol"], cmd["timeframe"])
                print(json.dumps(result))
                sys.stdout.flush()
                
            elif action == "OPEN_ORDER":
                # Real order execution logic goes here
                # mt5.order_send(...)
                pass
                
        except Exception as e:
            print(json.dumps({"error": str(e)}))
            sys.stdout.flush()

if __name__ == "__main__":
    main()
