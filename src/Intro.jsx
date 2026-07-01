import { useEffect, useRef, useState } from "react";

const SYMBOLS = [
  "AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "JPM", "GS", "BRK.B",
  "V", "MA", "BAC", "WFC", "MS", "BLK", "SPY", "QQQ", "XOM", "CVX",
  "UNH", "JNJ", "PG", "KO", "PEP", "DIS", "NFLX", "AMD", "INTC", "ORCL",
  "CRM", "ADBE", "PYPL", "COIN", "HOOD", "C", "SCHW", "AXP", "BX", "AVGO",
  "COST", "WMT", "HD", "MCD", "NKE", "LLY", "ABBV", "TMO", "DE", "CAT",
  "BA", "GE", "F", "GM", "T", "VZ", "PFE", "MRK", "CVS", "SBUX",
];

const CELLS = 96; // grid size

function makeCell(i) {
  const symbol = SYMBOLS[i % SYMBOLS.length];
  const price = 20 + Math.random() * 900;
  const change = (Math.random() * 8 - 4); // -4% .. +4%
  return { symbol, price, change };
}

export default function Intro({ onEnter }) {
  const [cells, setCells] = useState(() =>
    Array.from({ length: CELLS }, (_, i) => makeCell(i))
  );
  const [leaving, setLeaving] = useState(false);
  const raf = useRef(null);

  // Tick a random subset of cells on an interval to fake a live board.
  useEffect(() => {
    const id = setInterval(() => {
      setCells((prev) =>
        prev.map((c) => {
          if (Math.random() > 0.28) return c;
          const drift = Math.random() * 2 - 1;
          const change = Math.max(-6, Math.min(6, c.change + drift));
          const price = Math.max(1, c.price * (1 + drift / 100));
          return { ...c, price, change };
        })
      );
    }, 700);
    return () => clearInterval(id);
  }, []);

  function enter() {
    if (leaving) return;
    setLeaving(true);
    // let the exit animation play, then unmount
    raf.current = setTimeout(onEnter, 900);
  }

  useEffect(() => () => clearTimeout(raf.current), []);

  // allow Enter / Space / any click to proceed
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving]);

  return (
    <div
      className={`intro ${leaving ? "intro-leaving" : ""}`}
      role="button"
      tabIndex={0}
      onClick={enter}
      aria-label="Enter site"
    >
      <div className="wall" aria-hidden="true">
        {cells.map((c, i) => {
          const up = c.change >= 0;
          const mag = Math.min(1, Math.abs(c.change) / 6);
          const bg = up
            ? `rgba(34, 197, 94, ${0.08 + mag * 0.5})`
            : `rgba(244, 63, 94, ${0.08 + mag * 0.5})`;
          return (
            <div
              className="cell"
              key={i}
              style={{ background: bg, animationDelay: `${(i % 12) * 0.05}s` }}
            >
              <span className="cell-sym">{c.symbol}</span>
              <span className="cell-price">
                {c.price.toFixed(2)}
              </span>
              <span className={`cell-chg ${up ? "up" : "down"}`}>
                {up ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="wall-fade" aria-hidden="true" />

      <div className="intro-center">
        <div className="intro-badge">
          <span className="live-dot" /> MARKETS OPEN
        </div>
        <h1 className="intro-name">
          Rishith <span className="intro-grad">Gudepu.</span>
        </h1>
        <p className="intro-sub">Finance · Markets · AI</p>
        <button className="enter-btn" onClick={enter}>
          Enter the floor →
        </button>
        <p className="intro-hint">click anywhere · or press Enter</p>
      </div>
    </div>
  );
}
