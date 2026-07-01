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
  const canvasRef = useRef(null);
  const pxRef = useRef(null);
  const chgRef = useRef(null);
  const exitRef = useRef(null);

  const topItems = useRef(COMPANIES.slice(0, 15).map(makeTicker)).current;
  const botItems = useRef(COMPANIES.slice(15).map(makeTicker)).current;

  // opening: hold on the green arrow, then zoom out into the market view
  useEffect(() => {
    const t = setTimeout(() => setPhase("market"), 2100);
    return () => clearTimeout(t);
  }, []);

  // live scrolling line chart, green up / red down
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const N = 100;
    const prices = [];
    let p = 1000;
    let trend = 0.4;
    for (let i = 0; i < N; i++) {
      p += (Math.random() - 0.5) * 10;
      prices.push(p);
    }

    let frame = 0;
    function draw() {
      if (Math.random() < 0.03) trend = (Math.random() - 0.5) * 1.6;
      p += (Math.random() - 0.5) * 12 + trend;
      prices.push(p);
      prices.shift();

      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const pad = 14;
      const xstep = W / (N - 1);
      const y = (v) => pad + (H - 2 * pad) * (1 - (v - min) / (max - min || 1));

      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const gy = pad + ((H - 2 * pad) * g) / 4;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      ctx.lineWidth = 2.2;
      ctx.lineJoin = "round";
      for (let i = 1; i < N; i++) {
        ctx.beginPath();
        ctx.moveTo((i - 1) * xstep, y(prices[i - 1]));
        ctx.lineTo(i * xstep, y(prices[i]));
        ctx.strokeStyle = prices[i] >= prices[i - 1] ? "#34d399" : "#f43f5e";
        ctx.stroke();
      }

      const lastUp = prices[N - 1] >= prices[N - 2];
      const lx = (N - 1) * xstep;
      const ly = y(prices[N - 1]);
      ctx.fillStyle = lastUp ? "#34d399" : "#f43f5e";
      ctx.beginPath();
      ctx.arc(lx, ly, 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(lx, ly, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (frame % 6 === 0 && pxRef.current && chgRef.current) {
        pxRef.current.textContent = prices[N - 1].toFixed(2);
        const pct = ((prices[N - 1] - prices[N - 2]) / prices[N - 2]) * 100;
        chgRef.current.textContent =
          (lastUp ? "▲ " : "▼ ") + Math.abs(pct).toFixed(2) + "%";
        chgRef.current.className = "readout-chg " + (lastUp ? "up" : "down");
      }
      frame++;
    }

    const id = setInterval(draw, 55);
    return () => clearInterval(id);
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
      {phase === "arrow" && (
        <div className="arrow-intro" aria-hidden="true">
          <svg className="arrow-svg" viewBox="0 0 240 240" fill="none">
            <polyline
              className="arrow-line"
              points="20,190 70,150 105,172 150,110 195,70"
              stroke="#34d399"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon
              className="arrow-head"
              points="150,55 210,50 205,112"
              fill="#34d399"
            />
          </svg>
        </div>
      )}

      <div className="strip-wrap top">
        <Strip items={topItems} />
      </div>

      <div className={`intro-center ${phase === "market" ? "in" : ""}`}>
        <div className="intro-badge">
          <span className="live-dot" /> MARKETS OPEN
        </div>
        <h1 className="intro-name">
          Rishith <span className="intro-grad">Gudepu.</span>
        </h1>
        <p className="intro-sub">Finance · Markets · AI</p>

        <div className="chart-wrap">
          <canvas ref={canvasRef} className="live-chart" />
          <div className="readout">
            <span className="readout-px" ref={pxRef}>1000.00</span>
            <span className="readout-chg up" ref={chgRef}>▲ 0.00%</span>
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
  );
}
