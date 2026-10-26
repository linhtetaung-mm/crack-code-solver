import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  Fingerprint,
  Code2,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import CrackCode from "./crack-code/CrackCode";
import AdvancedSolver from "./crack-code/AdvanceCodeSolver";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"game" | "solver">("game");
  const help = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.title = "Crack Code — Breach the system";
  }, []);

  return (
    <div className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="./" aria-label="Crack Code home">
          <span className="brand-mark">
            <Braces size={23} />
          </span>
          <span>
            CRACK<span className="accent">CODE</span>
            <small>LOGIC IS YOUR ONLY EXPLOIT.</small>
          </span>
        </a>
        <nav className="mode-switch" aria-label="Application mode">
          <button
            className={activeTab === "game" ? "active" : ""}
            aria-pressed={activeTab === "game"}
            onClick={() => setActiveTab("game")}
          >
            <Terminal size={15} /> The game <span>01</span>
          </button>
          <button
            className={activeTab === "solver" ? "active" : ""}
            aria-pressed={activeTab === "solver"}
            onClick={() => setActiveTab("solver")}
          >
            <Fingerprint size={15} /> The solver <span>02</span>
          </button>
        </nav>
        <button
          className="guide-button"
          onClick={() => help.current?.showModal()}
        >
          <BookOpen size={15} />
          <span>Field guide</span>
          <ArrowUpRight size={14} />
        </button>
      </header>

      <main>
        <section className="hero" aria-label="Introduction">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> A LOGIC PUZZLE. AN UNAUTHORIZED
              MINDSET.
            </div>
            <h1>
              BREAK THE CODE.
              <br />
              <span>BEND THE SYSTEM.</span>
            </h1>
            <p>
              No brute force. No shortcuts. Just you, a hidden sequence,
              <br className="desktop-break" /> and the beautiful art of figuring
              it out.
            </p>
            <div className="hero-tags">
              <span>
                <ShieldCheck size={13} /> Pure deduction
              </span>
              <i />
              <span>3–10 digit challenges</span>
              <i />
              <span>Unlimited attempts</span>
            </div>
          </div>
          <div className="cipher-art" aria-hidden="true">
            <div className="matrix-streams">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} style={{ animationDelay: `${i * -1.7}s` }}>
                  {"010011101001101001010110".slice(i % 5)}
                  <br />
                  {"110101001101010011010010".slice(i % 4)}
                </span>
              ))}
            </div>
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <span className="art-coordinate top">ENCRYPTED SIGNAL // 0x4F</span>
            <div className="cipher-blocks">
              {["0", "4", "?", "7"].map((n, i) => (
                <div key={i} className={n === "?" ? "unknown" : ""}>
                  {n}
                  <span>{`0${i + 1}`}</span>
                </div>
              ))}
            </div>
            <span className="art-coordinate bottom">
              <span className="live-dot" /> AWAITING HUMAN INTELLIGENCE
            </span>
            <span className="art-cross cross-one">+</span>
            <span className="art-cross cross-two">+</span>
          </div>
        </section>
        <div hidden={activeTab !== "game"}>
          <CrackCode />
        </div>
        <div hidden={activeTab !== "solver"}>
          <AdvancedSolver />
        </div>
      </main>

      <footer className="footer">
        <span>
          <span className="live-dot" /> ALL SYSTEMS OPERATIONAL <i>/</i> LOCAL
          SIMULATION
        </span>
        <a
          href="https://github.com/linhtetaung-mm/crack-code-solver"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 size={14} /> Built for curious minds <ArrowUpRight size={13} />
        </a>
        <span>
          CRACK CODE <span className="accent">//</span> V.02
        </span>
      </footer>
      <dialog
        ref={help}
        aria-labelledby="field-guide-title"
        className="guide-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) help.current?.close();
        }}
      >
        <div className="panel-heading">
          <span id="field-guide-title">
            <BookOpen size={15} /> FIELD GUIDE
          </span>
          <button
            className="icon-button"
            aria-label="Close field guide"
            onClick={() => help.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <div className="guide-content">
          <div className="eyebrow accent">YOUR MISSION</div>
          <h2>Think like a codebreaker.</h2>
          <p>
            Find the hidden sequence in as few attempts as possible. Every digit
            is 0–9. Repeated digits and leading zeroes are allowed.
          </p>
          <h3>Read the signal</h3>
          <p>
            Each attempt gives you totals, not clues for individual positions.
            Each occurrence of a digit can match only once.
          </p>
          <ul className="guide-signals">
            <li>
              <b className="signal green">● Exact</b> Right digit, right
              position.
            </li>
            <li>
              <b className="signal red">◆ Misplaced</b> Right digit, wrong
              position.
            </li>
            <li>
              <b className="signal gray">— Absent</b> No remaining match in the
              code.
            </li>
          </ul>
          <h3>Work the pattern</h3>
          <p>
            Try different digits first. Then rearrange your matches and compare
            the feedback. Typing moves to the next digit; press Enter to submit
            a sequence. Arrow keys adjust a focused digit.
          </p>
          <h3>Bring your own puzzle</h3>
          <p>
            Open The solver, choose your code length, and enter the exact,
            misplaced, and absent totals for each suggested guess. It will find
            a sequence consistent with your feedback. Large puzzles can take
            longer to analyze.
          </p>
          <button
            className="primary-button"
            onClick={() => help.current?.close()}
          >
            I'm in. Let's crack it. <ArrowUpRight size={17} />
          </button>
        </div>
      </dialog>
    </div>
  );
}
export default App;
