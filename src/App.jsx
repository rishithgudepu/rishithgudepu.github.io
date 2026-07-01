import { useState, useEffect } from "react";
import Intro from "./Intro.jsx";
import {
  profile,
  about,
  skills,
  education,
  experience,
  projects,
  research,
} from "./data.js";

const nav = [
  ["About", "about"],
  ["Education", "education"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Research", "research"],
  ["Contact", "contact"],
];

// Bold + highlight the site owner's surname inside an author string.
function Authors({ text }) {
  const parts = text.split(/(R\. Gudepu)/g);
  return (
    <span className="authors">
      {parts.map((p, i) =>
        p === "R. Gudepu" ? (
          <strong key={i} className="me">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}

function SectionLabel({ n, children }) {
  return (
    <p className="section-label">
      <span className="sec-num">{String(n).padStart(2, "0")}</span>
      <span className="sec-text">{children}</span>
    </p>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState("about");

  // active-section highlight for the sidebar nav
  useEffect(() => {
    if (!entered) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    nav.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [entered]);

  const first = profile.name.split(" ")[0];
  const last = profile.name.split(" ").slice(1).join(" ");
  const RADIUS = 40; // vmin

  return (
    <div className="page">
      {!entered && <Intro onEnter={() => setEntered(true)} />}
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      {/* ============ RADIAL HUB ============ */}
      <section className="hub" id="top">
        <div className="hub-rings" aria-hidden="true">
          <span className="hub-ring r1" />
          <span className="hub-ring r2" />
          <span className="hub-ring r3" />
        </div>

        <div className="hub-center">
          <div className="badge">
            <span className="ring" />
            {profile.badge}
          </div>
          <h1 className="hub-name">
            {first} <span className="grad">{last}.</span>
          </h1>
          <p className="hub-role">Finance · Markets · AI</p>
          <p className="hub-about">{profile.hero}</p>
          <a href="#about" className="scroll-hint">
            Explore <span className="sh-arrow">↓</span>
          </a>
        </div>

        <nav className="hub-links">
          {nav.map(([label, id], i) => {
            const a = ((-90 + i * 60) * Math.PI) / 180;
            const x = (RADIUS * Math.cos(a)).toFixed(2);
            const y = (RADIUS * Math.sin(a)).toFixed(2);
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`hub-link ${active === id ? "active" : ""}`}
                style={{ "--x": x, "--y": y }}
              >
                <span className="hl-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="hl-pill">{label}</span>
              </a>
            );
          })}
        </nav>
      </section>

      {/* ============ CONTENT ============ */}
      <div className="shell">
        <main className="main">
          {/* ABOUT */}
          <section id="about" className="block">
            <SectionLabel n={1}>About</SectionLabel>
            <div className="about-text">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="chips">
              {skills.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" className="block">
            <SectionLabel n={2}>Education</SectionLabel>
            <div className="ledger">
              {education.map((e, i) => (
                <div className="ledger-row" key={i}>
                  <span className="ledger-date">{e.dates}</span>
                  <div className="ledger-body">
                    <p className="ledger-title">{e.school}</p>
                    <p className="ledger-sub">{e.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="block">
            <SectionLabel n={3}>Experience</SectionLabel>
            <div className="ledger">
              {experience.map((x, i) => (
                <div className="ledger-row" key={i}>
                  <span className="ledger-date">{x.dates}</span>
                  <div className="ledger-body">
                    <p className="ledger-title">
                      {x.role} <span className="at">· {x.org}</span>
                    </p>
                    <p className="ledger-blurb">{x.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="block">
            <SectionLabel n={4}>Projects</SectionLabel>
            <div className="proj-grid">
              {projects.map((p, i) => (
                <a
                  key={i}
                  className="proj-card"
                  href={p.url || "#"}
                  target={p.url ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <div className="proj-top">
                    <h3>{p.name}</h3>
                    {p.url && <span className="arrow">↗</span>}
                  </div>
                  <p className="proj-role">{p.role}</p>
                  <p className="proj-blurb">{p.blurb}</p>
                </a>
              ))}
            </div>
          </section>

          {/* RESEARCH */}
          <section id="research" className="block">
            <SectionLabel n={5}>Research</SectionLabel>
            <div className="research-list">
              {research.map((r, i) => (
                <article className="paper" key={i}>
                  <div className="paper-head">
                    <h3 className="paper-title">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noreferrer">
                          {r.title}
                        </a>
                      ) : (
                        r.title
                      )}
                    </h3>
                    {r.year && <span className="year-pill">{r.year}</span>}
                  </div>
                  <p className="paper-authors">
                    <Authors text={r.authors} />
                  </p>
                  {r.venue && <p className="paper-venue">{r.venue}</p>}
                  <p className="paper-abstract">{r.abstract}</p>
                  <div className="tag-row">
                    {r.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="block contact">
            <SectionLabel n={6}>Contact</SectionLabel>
            <h2 className="contact-h">Let's build something.</h2>
            <p className="contact-sub">
              Open to research, internships, and interesting problems in
              finance, markets, and AI.
            </p>
            <div className="cta-row">
              <a
                href={`mailto:${profile.links.email}`}
                className="btn btn-primary"
              >
                {profile.links.email}
              </a>
              {profile.links.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>

            <footer className="foot">
              © {new Date().getFullYear()} {profile.name} · Built from scratch.
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
