// ============================================================
//  ALL YOUR CONTENT LIVES HERE. Edit this file to update the
//  site — no other file needs to change.
// ============================================================

export const profile = {
  name: "Rishith Gudepu",
  badge: "IMSA '28",
  tagline: "",
  hero:
    "A student who likes analyzing financial markets, training models, and loves to find solutions to problems in finance and artificial intelligence.",
  location: "Greater Chicago Area",
  links: {
    linkedin: "https://www.linkedin.com/in/rishith-gudepu-20346b396",
    email: "rishithgudepu22@gmail.com",
    github: "", // optional: add your GitHub URL
  },
};

export const about = [
  "Hi, I'm Rishith. I'm a student at the Illinois Mathematics and Science Academy who spends most of his time creating and building things, whether that's a new research project or a machine learning model dedicated to analyzing and predicting athlete statistics and performance.",
];

export const skills = [
  "Leadership",
  "Research",
  "Collaboration",
  "Matplotlib",
  "Deep Learning",
  "Machine Learning",
  "Financial Regression",
  "Python",
  "Data Analysis",
];

export const education = [
  {
    school: "Illinois Mathematics and Science Academy (IMSA)",
    location: "Aurora, Illinois",
    dates: "Aug 2025 – Present",
  },
  {
    school: "Neuqua Valley High School",
    location: "Naperville, Illinois",
    dates: "Aug 2024 – June 2025",
  },
];

export const experience = [
  {
    role: "Student Researcher",
    org: "University of Chicago",
    blurb:
      "Innovating with machine learning and statistics in economics and medicine.",
    dates: "June 2026 – Present",
  },
  {
    role: "Student Researcher",
    org: "University of Illinois Urbana-Champaign",
    blurb:
      "Discovering the risks and benefits of the private equity and private credit market.",
    dates: "June 2026 – Present",
  },
  {
    role: "Financial Software & AI Intern",
    org: "Thoughtwave Software and Solutions",
    blurb:
      "Developing and innovating financial solutions, commercial lending, and AP invoice processing systems.",
    dates: "March 2026 – Present",
  },
  {
    role: "Business Operations Intern",
    org: "Vivantal",
    blurb:
      "Organizing internal business processes, analyzing operational data, and assisting with team financial budgets.",
    dates: "December 2025 – Present",
  },
  {
    role: "Equities & Investments Intern",
    org: "Hydra Fund",
    blurb:
      "Researching and analyzing investment banking trends, portfolio allocations, and private equity trends in global markets.",
    dates: "April 2026 – Present",
  },
  {
    role: "Program Coordinator",
    org: "Finance Compass",
    blurb:
      "Fostering the next generation by teaching the youth about financial literacy and stability.",
    dates: "November 2025 – Present",
  },
  {
    role: "Chief Technology Officer",
    org: "LevelUp",
    blurb:
      "Managing the development of LLMs and technical operations for over 19,000 users from 31+ countries.",
    dates: "February 2025 – Present",
  },
  {
    role: "Co-Founder",
    org: "Site Architects",
    blurb:
      "Developing web applications for client specifications while growing the business to a multi-thousand dollar revenue model.",
    dates: "May 2025 – Present",
  },
  {
    role: "Community Ambassador",
    org: "Illinois Department of Public Health (IDPH)",
    blurb:
      "Fostering my community's growth by spreading financial knowledge and financial basics.",
    dates: "June 2026 – Present",
  },
  {
    role: "Co-Founder",
    org: "RSN Tutoring",
    blurb:
      "Fostering the growth of my community by teaching the youth about mathematics and the sciences.",
    dates: "December 2022 – Present",
  },
  {
    role: "Instructor",
    org: "Y.K. Martial Arts",
    blurb:
      "Fostering the growth of my community by teaching the youth about martial arts and Taekwondo.",
    dates: "June 2022 – Present",
  },
];

export const projects = [
  {
    name: "LANDER",
    role: "Co-Founder",
    blurb:
      "Screening ACL tear risk in athletes, using data and modeling to flag injury risk before it happens.",
    url: "https://landeracl.com",
  },
  {
    name: "Hydra Fund",
    role: "Co-Founder",
    blurb:
      "Building and developing the world's first AI-native fund that covers five sectors of finance with intense detail and precision.",
    url: "https://www.hydrafund.ch",
  },
];

// Your name is highlighted automatically in author lists (matches "R. Gudepu").
export const research = [
  {
    title:
      "DriftScore: An Anchor-Relative Metric for Detecting Quality Drift in Multi-Turn Multimodal Generation",
    year: "2026",
    authors: "R. Gudepu, S. Loke, N. Movva, N. Mburu",
    venue: "ACM EvalMG @ SIGIR 2026 (Accepted)",
    abstract:
      "Iterative multimodal generation degrades output quality in ways standard No-Reference Image Quality Assessment metrics fail to track. We propose DriftScore, an anchor-relative, trajectory-aware metric that measures quality drift against the original generation.",
    tags: ["Multimodal", "NR-IQA", "Deep Learning"],
    url: "https://openreview.net/forum?id=S6a4Gg4Z7J",
  },
  {
    title:
      "KineticsRecon: Cross-Phase Reconstruction with Learned Temporal Sampling for Accelerated Breast DCE-MRI",
    year: "2026",
    authors: "R. Gudepu, S. Loke, N. Movva, N. Mburu, S. Bestavemula, M. Hota",
    venue: "MICCAI 2026 · RIME Workshop",
    abstract:
      "An end-to-end multi-phase reconstruction pipeline for accelerated breast DCE-MRI that integrates a temporal backbone, a cross-phase attention module, and a jointly optimized, learned Cartesian sampling pattern. Benchmarked on the large-scale MAMA-MIA dataset, the framework drastically improves reconstruction quality over zero-filled baselines while establishing a notable negative result: adding an auxiliary pharmacokinetic loss based on the Tofts model does not improve image-domain metrics.",
    tags: ["DCE-MRI", "Pharmacokinetics", "Deep Learning"],
    url: "https://openreview.net/forum?id=eKmzFIrlKo",
  },
  {
    title:
      "When Does Prompt-Perturbation Uncertainty Catch Interactive-Segmentation Failures? An Empirical Study on SAM/MedSAM",
    year: "2026",
    authors: "R. Gudepu, S. Loke, N. Movva, N. Mburu, S. Bestavemula, M. Hota",
    venue: "MICCAI 2026 · UNSURE Workshop",
    abstract:
      "Evaluates Prompt-Perturbation Uncertainty (PPU) as a label-free reliability signal for foundation segmenters (SAM and MedSAM) by measuring mask disagreement across jittered prompts. Across six dataset-model evaluation cells, PPU is highly effective at flagging catastrophic failures in generic SAM models, whereas medical fine-tuning in MedSAM calibrates standard softmax-entropy enough to edge out PPU at critical thresholds.",
    tags: ["Segmentation", "MedSAM", "Medical Imaging"],
    url: "https://openreview.net/forum?id=cLehr9EUAP",
  },
  {
    title: "Causal Representation Learning for Regime Detection",
    year: "2026",
    authors: "R. Gudepu, S. Loke, N. Movva, N. Mburu",
    venue: "",
    abstract:
      "Introduces CausalRegime, an unsupervised framework for market regime detection that integrates a causal directed acyclic graph (DAG) prior, Invariant Risk Minimisation (IRM), and temperature-annealed posteriors to produce sharp, stable, and economically informative regime assignments. Evaluated on synthetic benchmarks and real-world financial data across multiple asset classes, the model significantly outperforms traditional baselines and deep alternatives, isolating distinct bull, neutral, and bear market states without ground-truth labels.",
    tags: ["Machine Learning", "Financial Time Series", "Portfolio Allocation"],
    url: "",
  },
];
