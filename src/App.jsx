import { useState } from "react";
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
  ["Research & Awards", "research"],
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

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="page">
      {!entered && <Intro onEnter={() => setEntered(true)} />}
      <div className="glow glow-1" />
      <div className="glow glow-2" />

      <header className="nav">
        <a href="#top" className="brand">
          {profile.name}
        </a>
        <nav className="nav-links">
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="container" id="top">
        {/* HERO */}
        <section className="hero">
          <div className="badge">
            <span className="ring" />
            {profile.badge}
          </div>
          <h1 className="name">
            {profile.name.split(" ")[0]}{" "}
            <span className="grad">{profile.name.split(" ").slice(1).join(" ")}.</span>
          </h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="hero-bio">{profile.hero}</p>

          <div className="cta-row">
            <a href="#research" className="btn btn-primary">
              View research
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
            <a href={`mailto:${profile.links.email}`} className="btn btn-ghost">
              Email
            </a>
          </div>
          <p className="loc">{profile.location}</p>
        </section>

        <hr className="rule" />

        {/* ABOUT */}
        <section id="about" className="block">
          <SectionLabel>About</SectionLabel>
          <div className="about-grid">
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
          </div>
        </section>

        <hr className="rule" />

        {/* EDUCATION */}
        <section id="education" className="block">
          <SectionLabel>Education</SectionLabel>
          <div className="edu edu-standalone">
            {education.map((e, i) => (
              <div className="edu-row" key={i}>
                <div>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-loc">{e.location}</p>
                </div>
                <span className="dates">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* EXPERIENCE */}
        <section id="experience" className="block">
          <SectionLabel>Experience</SectionLabel>
          <div className="list">
            {experience.map((x, i) => (
              <div className="item" key={i}>
                <div className="item-head">
                  <h3>
                    {x.role} <span className="at">· {x.org}</span>
                  </h3>
                  <span className="dates">{x.dates}</span>
                </div>
                <p className="item-blurb">{x.blurb}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* PROJECTS */}
        <section id="projects" className="block">
          <SectionLabel>Projects</SectionLabel>
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
                <p className="item-blurb">{p.blurb}</p>
              </a>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* RESEARCH */}
        <section id="research" className="block">
          <SectionLabel>Research</SectionLabel>
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

        <hr className="rule" />

        {/* CONTACT */}
        <section id="contact" className="block contact">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="contact-h">Let's build something.</h2>
          <div className="cta-row">
            <a href={`mailto:${profile.links.email}`} className="btn btn-primary">
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
        </section>

        <footer className="foot">
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </footer>
      </main>
    </div>
  );
}
