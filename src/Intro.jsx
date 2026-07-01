import { useEffect, useRef, useState } from "react";

// symbol -> company domain (used to pull a brand logo)
const COMPANIES = [
  ["AAPL", "apple.com"], ["MSFT", "microsoft.com"], ["NVDA", "nvidia.com"],
  ["AMZN", "amazon.com"], ["GOOGL", "google.com"], ["META", "meta.com"],
  ["TSLA", "tesla.com"], ["JPM", "jpmorganchase.com"], ["GS", "goldmansachs.com"],
  ["V", "visa.com"], ["MA", "mastercard.com"], ["BAC", "bankofamerica.com"],
  ["MS", "morganstanley.com"], ["BLK", "blackrock.com"], ["XOM", "exxonmobil.com"],
  ["UNH", "unitedhealthgroup.com"], ["LLY", "lilly.com"], ["AVGO", "broadcom.com"],
  ["COST", "costco.com"], ["HD", "homedepot.com"], ["NFLX", "netflix.com"],
  ["AMD", "amd.com"], ["ORCL", "oracle.com"], ["CRM", "salesforce.com"],
  ["COIN", "coinbase.com"], ["SCHW", "schwab.com"], ["BX", "blackstone.com"],
  ["DIS", "disney.com"], ["KO", "coca-cola.com"], ["NKE", "nike.com"],
];

function makeTicker([sym, domain]) {
  const price = 20 + Math.random() * 900;
  const change = Math.random() * 6 - 3;
  return { sym, domain, price, change };
}

function logoUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

function Strip({ items }) {
  const row = [...items, ...items];
  return (
    <div className="ticker-strip">
      <div className="ticker-track">
        {row.map((t, i) => {
          const up = t.change >= 0;
          return (
            <span className="ticker-item" key={i}>
              <img
                className="tk-logo"
                src={logoUrl(t.domain)}
                alt=""
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="tk-sym">{t.sym}</span>
              <span className="tk-px">{t.price.toFixed(2)}</span>
              <span className={`tk-chg ${up ? "up" : "down"}`}>
                {up ? "▲" : "▼"} {Math.abs(t.change).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Intro({ onEnter }) {
  const [phase, setPhase] = useState("arrow"); // "arrow" -> "market"
  const [leaving, setLeaving] = useState(false);
  const exitRef = useRef(null);
  const arrowRef = useRef(null);
  const pxRef = useRef(null);
  const chgRef = useRef(null);

  const topItems = useRef(COMPANIES.slice(0, 15).map(makeTicker)).current;
  const botItems = useRef(COMPANIES.slice(15).map(makeTicker)).current;

  // opening: hold on the green arrow, then the camera zooms out into the market
  useEffect(() => {
    const t = setTimeout(() => setPhase("market"), 2800);
    return () => clearTimeout(t);
  }, []);

  // once the zoom-out settles, the arrow comes alive: it drifts up and down
  // in real time following a simulated price — green + tilted up while rising,
  // red + tilted down while falling. driven per-frame via refs (no re-renders).
  useEffect(() => {
    const svg = arrowRef.current;
    if (!svg) return;

    const GREEN = "#34d399";
    const RED = "#f43f5e";
    const CENTER = 592;

    let price = CENTER;
    let vel = 0; // price velocity
    let slope = 0.4; // smoothed direction
    let rot = -12; // current tilt
    let frame = 0;
    let raf = 0;

    const loop = () => {
      // smooth mean-reverting random walk
      vel += (Math.random() - 0.5) * 1.25;
      vel *= 0.93;
      price += vel;
      price += (CENTER - price) * 0.012; // gentle pull back on-screen

      slope = slope * 0.9 + vel * 0.1;
      const up = slope >= 0;

      // tilt: point up-right (~-12°) when rising, swing down-right (~90°) falling
      const target = up ? -12 : 90;
      rot += (target - rot) * 0.12;

      // vertical travel: higher price -> higher on screen
      const y = Math.max(-88, Math.min(88, -(price - CENTER) * 2.4));

      svg.style.transform = `translateY(${y}px) rotate(${rot}deg)`;
      svg.style.color = up ? GREEN : RED;
      svg.style.filter = up
        ? "drop-shadow(0 0 26px rgba(52,211,153,0.55))"
        : "drop-shadow(0 0 26px rgba(244,63,94,0.5))";

      if (frame % 6 === 0 && pxRef.current && chgRef.current) {
        pxRef.current.textContent = price.toFixed(2);
        const pct = (vel / price) * 100;
        chgRef.current.textContent =
          (up ? "▲ " : "▼ ") + Math.abs(pct).toFixed(2) + "%";
        chgRef.current.style.color = up ? GREEN : RED;
      }
      frame++;
      raf = requestAnimationFrame(loop);
    };

    const start = setTimeout(() => {
      raf = requestAnimationFrame(loop);
    }, 2600);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, []);

  function enter() {
    if (leaving || phase === "arrow") return;
    setLeaving(true);
    exitRef.current = setTimeout(onEnter, 900);
  }
  useEffect(() => () => clearTimeout(exitRef.current), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving, phase]);

  return (
    <div
      className={`intro ${leaving ? "intro-leaving" : ""}`}
      role="button"
      tabIndex={0}
      onClick={enter}
      aria-label="Enter site"
    >
      {/* one stage that the "camera" zooms out of: starts deep inside the
          arrow, then scales down so the tapes + chart slide into frame */}
      <div className="intro-stage">
        <div className="strip-wrap top">
          <Strip items={topItems} />
        </div>

        <div className="intro-center">
          <div className="intro-badge">
            <span className="live-dot" /> MARKETS OPEN
          </div>
          <h1 className="intro-name">
            Rishith <span className="intro-grad">Gudepu.</span>
          </h1>
          <p className="intro-sub">Finance · Markets · AI</p>

          {/* the camera's focal point: one straight arrow that stays put and
              reacts like a live ticker — flips up (green) / down (red) */}
          <div className="hero-arrow">
            <svg
              ref={arrowRef}
              className="arrow-svg"
              viewBox="0 0 240 240"
              fill="none"
              aria-hidden="true"
            >
              <line
                className="arrow-shaft"
                x1="44"
                y1="198"
                x2="176"
                y2="66"
                stroke="currentColor"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <polygon
                className="arrow-head"
                points="210,32 146,50 192,96"
                fill="currentColor"
              />
            </svg>
            <div className="arrow-readout">
              <span className="ar-px" ref={pxRef}>592.40</span>
              <span className="ar-chg up" ref={chgRef}>▲ 0.42%</span>
            </div>
          </div>

          <button className="enter-btn" onClick={enter}>
            Enter the floor →
          </button>
          <p className="intro-hint">click anywhere · or press Enter</p>
        </div>

        <div className="strip-wrap bottom">
          <Strip items={botItems} />
        </div>
      </div>
    </div>
  );
}
