import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  ChevronLeft,
  Fingerprint,
  RotateCcw,
  Terminal,
  X,
} from "lucide-react";
import type { Feedback, Step } from "./puzzle";
import { LevelSelector, MissionBriefing, Signals } from "./ProtocolUI";

export default function AdvancedSolver() {
  const [level, setLevel] = useState(4);
  const [guess, setGuess] = useState<number[] | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [feedback, setFeedback] = useState<Feedback>({
    greens: 0,
    reds: 0,
    nulls: 0,
  });
  const [solved, setSolved] = useState(false);
  const [computing, setComputing] = useState(false);
  const [error, setError] = useState("");
  const worker = useRef<Worker | null>(null);
  useEffect(() => () => worker.current?.terminate(), []);
  const cancel = () => {
    worker.current?.terminate();
    worker.current = null;
    setComputing(false);
  };
  const reset = () => {
    cancel();
    setGuess(Array(level).fill(0));
    setSteps([]);
    setSolved(false);
    setError("");
    setFeedback({ greens: 0, reds: 0, nulls: 0 });
  };
  const process = () => {
    if (!guess || computing || solved) return;
    if (
      Object.values(feedback).some(
        (n) => !Number.isInteger(n) || n < 0 || n > level,
      ) ||
      feedback.greens + feedback.reds + feedback.nulls !== level
    ) {
      setError(
        `Feedback must contain whole numbers from 0 to ${level}, totaling ${level}.`,
      );
      return;
    }
    setError("");
    const history = [
      { guess: [...guess], feedback: { ...feedback } },
      ...steps,
    ];
    if (feedback.greens === level) {
      setSolved(true);
      setSteps(history);
      return;
    }
    setComputing(true);
    worker.current = new Worker(
      new URL("./puzzle.worker.ts", import.meta.url),
      { type: "module" },
    );
    worker.current.onmessage = (event: MessageEvent<number[] | null>) => {
      if (event.data) {
        setGuess(event.data);
        setSteps(history);
        setFeedback({ greens: 0, reds: 0, nulls: 0 });
      } else
        setError(
          "Conflicting signals. No code matches this feedback and your previous entries. Check the counts and try again.",
        );
      cancel();
    };
    worker.current.onerror = () => {
      setError("Analysis was interrupted. Please try again.");
      cancel();
    };
    worker.current.postMessage({ level, history });
  };
  return (
    <section className="workspace" aria-label="Advanced code solver">
      <div className="panel main-panel">
        <div className="panel-heading">
          <span>
            <Fingerprint size={15} /> DEDUCTION ENGINE
          </span>
          <span className="panel-status">
            <span className="live-dot" />{" "}
            {computing ? "ANALYZING" : solved ? "RESOLVED" : "ONLINE"}
          </span>
        </div>
        {!guess ? (
          <div className="setup-content">
            <div className="section-kicker">02 / REVERSE THE ENCRYPTION</div>
            <div className="section-title">
              <h2>A second mind. On your side.</h2>
              <span className="outline-icon">
                <BrainCircuit size={22} />
              </span>
            </div>
            <p className="muted">
              Bring a puzzle. Feed the signals. Find a consistent code.
            </p>
            <LevelSelector level={level} onChange={setLevel} />
            <div className="config-summary">
              <div>
                <span>CODE LENGTH</span>
                <strong>
                  {String(level).padStart(2, "0")} <small>digits</small>
                </strong>
              </div>
              <div>
                <span>METHOD</span>
                <strong className="method-label">Logical elimination</strong>
              </div>
            </div>
            <button className="primary-button" onClick={reset}>
              <span>
                <BrainCircuit size={17} /> Initialize solver
              </span>
              <ArrowUpRight size={20} />
            </button>
            <div className="under-button">
              <span>Your feedback guides every next move.</span>
              <span>HUMAN + MACHINE</span>
            </div>
            <div className="terminal-snippet">
              <span>› solver.init</span>
              <p>
                A million possibilities. One consistent answer.
                <br />
                Ready to connect the dots
                <span className="blinking-cursor">_</span>
              </p>
              <span className="terminal-watermark">&gt;_</span>
            </div>
          </div>
        ) : (
          <div className="play-content">
            <div className="play-toolbar">
              <button
                className="text-button"
                onClick={() => {
                  cancel();
                  setGuess(null);
                }}
              >
                <ChevronLeft size={14} /> Configure
              </button>
              <span>{level}-DIGIT ANALYSIS</span>
              <button className="text-button" onClick={reset}>
                <RotateCcw size={13} /> Reset
              </button>
            </div>
            <div className="terminal-title">
              <span className="target-icon">
                <BrainCircuit size={25} />
              </span>
              <div className="section-kicker">
                {solved ? "CODE CONFIRMED" : "SUGGESTED SEQUENCE"}
              </div>
              <h2>{solved ? "Mystery resolved." : "Test this sequence."}</h2>
              <p className="muted">
                {solved
                  ? "Your feedback confirms the hidden code."
                  : "Try this guess in your puzzle, then report its feedback."}
              </p>
            </div>
            <div className={`solver-code ${level > 6 ? "compact" : ""}`}>
              {guess.map((n, i) => (
                <span key={i}>{n}</span>
              ))}
            </div>
            {!solved && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  process();
                }}
              >
                <div className="feedback-inputs">
                  {(["greens", "reds", "nulls"] as const).map((key, i) => (
                    <label key={key}>
                      <span className={["green", "red", "gray"][i]}>
                        {["● EXACT", "◆ MISPLACED", "— ABSENT"][i]}
                      </span>
                      <input
                        aria-label={
                          [
                            "Exact matches",
                            "Misplaced digits",
                            "Absent digits",
                          ][i]
                        }
                        type="number"
                        min={0}
                        max={level}
                        step={1}
                        disabled={computing}
                        value={feedback[key]}
                        onChange={(e) =>
                          setFeedback({
                            ...feedback,
                            [key]: Number(e.target.value),
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
                <p className="feedback-total">
                  FEEDBACK TOTAL{" "}
                  <strong
                    className={
                      feedback.greens + feedback.reds + feedback.nulls === level
                        ? "accent"
                        : ""
                    }
                  >
                    {feedback.greens + feedback.reds + feedback.nulls} / {level}
                  </strong>
                </p>
                {error && (
                  <p role="alert" className="error-message">
                    {error}
                  </p>
                )}
                <button
                  className="primary-button"
                  disabled={computing}
                  type="submit"
                >
                  <span>
                    <BrainCircuit size={17} />{" "}
                    {computing
                      ? "Tracing the possibilities…"
                      : "Analyze feedback"}
                  </span>
                  <ArrowRight size={19} />
                </button>
                {computing && (
                  <button
                    className="text-button cancel-button"
                    type="button"
                    onClick={cancel}
                  >
                    <X size={13} /> Cancel analysis
                  </button>
                )}
              </form>
            )}
            {solved && (
              <button className="primary-button" onClick={reset}>
                Solve another code <ArrowUpRight size={19} />
              </button>
            )}
          </div>
        )}
      </div>
      {!guess ? (
        <MissionBriefing />
      ) : (
        <aside className="panel history-panel">
          <div className="panel-heading">
            <span>
              <Terminal size={14} /> SIGNAL HISTORY
            </span>
            <span className="small-tag">{steps.length} ENTRIES</span>
          </div>
          <div className="history-key">
            <span>SEQUENCE</span>
            <span>EXACT / SHIFT / OUT</span>
          </div>
          <div className="history-scroll" aria-live="polite">
            {steps.length ? (
              steps.map((step, i) => (
                <div className="history-row" key={steps.length - i}>
                  <span className="attempt-index">
                    {String(steps.length - i).padStart(2, "0")}
                  </span>
                  <strong>{step.guess.join("")}</strong>
                  <Signals result={step.feedback} />
                </div>
              ))
            ) : (
              <div className="empty-log">
                <BrainCircuit size={32} />
                <h3>Give the engine a signal.</h3>
                <p>
                  Your feedback builds a trail.
                  <br />
                  Each clue narrows the possibilities.
                </p>
              </div>
            )}
          </div>
          <div className="log-footer">
            <span className="live-dot" /> EVERY SIGNAL COUNTS.
          </div>
        </aside>
      )}
    </section>
  );
}
