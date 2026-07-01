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
  const [phase, setPhase] = useState("matrix"); // "matrix" -> "market"
  const [leaving, setLeaving] = useState(false);
  const exitRef = useRef(null);
  const matrixRef = useRef(null);
  const canvasRef = useRef(null);
  const pxRef = useRef(null);
  const chgRef = useRef(null);

  const topItems = useRef(COMPANIES.slice(0, 15).map(makeTicker)).current;
  const botItems = useRef(COMPANIES.slice(15).map(makeTicker)).current;

  // opening sequence: matrix rain first, then crossfade into the market screen
  useEffect(() => {
    const t = setTimeout(() => setPhase("market"), 2700);
    return () => clearTimeout(t);
  }, []);

  // matrix rain: falling green market glyphs, then it fades into the market
  useEffect(() => {
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const fontSize = 16;
    const chars = "0123456789$€£¥%↑↓ABCDEFGHIJKLMNPRSTVXYZ";
    let cols = Math.ceil(W / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -60);

    const onResize = () => {
      setSize();
      cols = Math.ceil(W / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };
    window.addEventListener("resize", onResize);

    const id = setInterval(() => {
      // translucent black to fade previous glyphs into trails
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px "SFMono-Regular", Menlo, monospace`;
      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // bright leading glyph
        ctx.fillStyle = "#d8ffe9";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y);
        // green trailing glyph
        ctx.fillStyle = "#34d399";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y - fontSize);
        if (y > H && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i]++;
      }
    }, 45);

    // stop the rain shortly after it has faded out
    const stop = setTimeout(() => clearInterval(id), 3500);

    return () => {
      clearInterval(id);
      clearTimeout(stop);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // the stock chart: after the zoom-out it "forms" by drawing itself left ->
  // right, then goes live and keeps scrolling (green up / red down)
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

    const N = 120;
    const pad = 16;
    const xstep = W / (N - 1);

    // pre-build a good-looking, gently trending series
    const series = [];
    let p = 1000;
    let trend = 0.5;
    for (let i = 0; i < N; i++) {
      if (Math.random() < 0.05) trend = (Math.random() - 0.4) * 1.8;
      p += (Math.random() - 0.5) * 12 + trend;
      series.push(p);
    }

    function render(count) {
      const view = series.slice(0, count);
      if (view.length < 2) return;
      const min = Math.min(...view);
      const max = Math.max(...view);
      const y = (v) => pad + (H - 2 * pad) * (1 - (v - min) / (max - min || 1));

      ctx.clearRect(0, 0, W, H);

      // gridlines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const gy = pad + ((H - 2 * pad) * g) / 4;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // soft area fill under the curve
      const lastX = (view.length - 1) * xstep;
      ctx.beginPath();
      ctx.moveTo(0, y(view[0]));
      for (let i = 1; i < view.length; i++) ctx.lineTo(i * xstep, y(view[i]));
      ctx.lineTo(lastX, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(52,211,153,0.18)");
      grad.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // the line, colored per segment
      ctx.lineWidth = 2.4;
      ctx.lineJoin = "round";
      for (let i = 1; i < view.length; i++) {
        ctx.beginPath();
        ctx.moveTo((i - 1) * xstep, y(view[i - 1]));
        ctx.lineTo(i * xstep, y(view[i]));
        ctx.strokeStyle = view[i] >= view[i - 1] ? "#34d399" : "#f43f5e";
        ctx.stroke();
      }

      // leading dot with glow
      const lastUp = view[view.length - 1] >= view[view.length - 2];
      const ly = y(view[view.length - 1]);
      ctx.fillStyle = lastUp ? "#34d399" : "#f43f5e";
      ctx.beginPath();
      ctx.arc(lastX, ly, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.arc(lastX, ly, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // readout
      if (pxRef.current && chgRef.current) {
        pxRef.current.textContent = view[view.length - 1].toFixed(2);
        const pct =
          ((view[view.length - 1] - view[view.length - 2]) /
            view[view.length - 2]) *
          100;
        chgRef.current.textContent =
          (lastUp ? "▲ " : "▼ ") + Math.abs(pct).toFixed(2) + "%";
        chgRef.current.className = "readout-chg " + (lastUp ? "up" : "down");
      }
    }

    let raf = 0;
    let formStart = 0;
    let liveId = 0;

    function form(ts) {
      if (!formStart) formStart = ts;
      const t = Math.min(1, (ts - formStart) / 1300); // ~1.3s to draw in
      const ease = 1 - Math.pow(1 - t, 3);
      render(Math.max(2, Math.floor(ease * N)));
      if (t < 1) {
        raf = requestAnimationFrame(form);
      } else {
        // go live: push a new tick, scroll the window
        liveId = setInterval(() => {
          if (Math.random() < 0.04) trend = (Math.random() - 0.45) * 1.8;
          p += (Math.random() - 0.5) * 12 + trend;
          series.push(p);
          series.shift();
          render(N);
        }, 60);
      }
    }

    // start forming right after the matrix rain hands off to the market
    const startTimer = setTimeout(() => {
      raf = requestAnimationFrame(form);
    }, 2900);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      clearInterval(liveId);
    };
  }, []);

  function enter() {
    if (leaving || phase !== "market") return;
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
      {/* opener: matrix rain, then it crossfades into the market screen */}
      <canvas
        ref={matrixRef}
        className={`matrix-rain ${phase === "market" ? "gone" : ""}`}
        aria-hidden="true"
      />

      <div className={`intro-stage ${phase === "market" ? "in" : ""}`}>
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
    </div>
  );
}
