import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  Crosshair,
  LockKeyhole,
  RotateCcw,
  Terminal,
  UnlockKeyhole,
} from "lucide-react";
import { scoreGuess } from "./puzzle";
import type { Feedback } from "./puzzle";
import {
  DigitDial,
  LevelSelector,
  MissionBriefing,
  Signals,
} from "./ProtocolUI";

interface GuessEntry {
  digits: number[];
  result: Feedback;
}

export default function CrackCode() {
  const [level, setLevel] = useState(4);
  const [secret, setSecret] = useState<number[] | null>(null);
  const [digits, setDigits] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<GuessEntry[]>([]);
  const won = guesses[0]?.result.greens === level;
  const start = () => {
    setSecret(
      Array.from({ length: level }, () => Math.floor(Math.random() * 10)),
    );
    setDigits(Array(level).fill(0));
    setGuesses([]);
  };
  const submit = () => {
    if (!secret || won) return;
    setGuesses((previous) => [
      { digits: [...digits], result: scoreGuess(secret, digits) },
      ...previous,
    ]);
  };

  return (
    <section className="workspace" aria-label="Crack Code game">
      <div className="panel main-panel">
        <div className="panel-heading">
          <span>
            <Terminal size={15} />{" "}
            {secret ? "BREACH TERMINAL" : "INITIALIZE SESSION"}
          </span>
          <span className="panel-status">
            <span className="live-dot" />{" "}
            {won ? "ACCESS GRANTED" : secret ? "CONNECTED" : "STANDBY"}
          </span>
        </div>
        {!secret ? (
          <div className="setup-content">
            <div className="section-kicker">01 / CONFIGURE YOUR CHALLENGE</div>
            <div className="section-title">
              <h2>Choose your encryption.</h2>
              <span className="outline-icon">
                <LockKeyhole size={21} />
              </span>
            </div>
            <p className="muted">
              More digits. More possibilities. Same rules.
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
                <span>POSSIBLE COMBINATIONS</span>
                <strong>
                  {(10 ** level).toLocaleString()}
                  <span className="blinking-cursor">_</span>
                </strong>
              </div>
            </div>
            <button className="primary-button" onClick={start}>
              <span>
                <Crosshair size={17} /> Initiate breach
              </span>
              <ArrowUpRight size={20} />
            </button>
            <div className="under-button">
              <span>
                <LockKeyhole size={11} /> A new code is generated every session.
              </span>
              <span>READY WHEN YOU ARE</span>
            </div>
            <div className="terminal-snippet">
              <span>› system.init</span>
              <p>
                Deduction engine online.
                <br />
                Waiting for a codebreaker
                <span className="blinking-cursor">_</span>
              </p>
              <span className="terminal-watermark">&gt;_</span>
            </div>
          </div>
        ) : (
          <div className="play-content">
            <div className="play-toolbar">
              <button className="text-button" onClick={() => setSecret(null)}>
                <ChevronLeft size={14} /> Configure
              </button>
              <span>{level}-DIGIT ENCRYPTION</span>
              <button className="text-button" onClick={start}>
                <RotateCcw size={13} /> Restart
              </button>
            </div>
            <div className="terminal-title">
              <span className={`target-icon ${won ? "success" : ""}`}>
                {won ? <UnlockKeyhole size={25} /> : <LockKeyhole size={25} />}
              </span>
              <div className="section-kicker">
                {won
                  ? "SEQUENCE VERIFIED"
                  : `ATTEMPT ${String(guesses.length + 1).padStart(2, "0")}`}
              </div>
              <h2>{won ? "You’re in." : "Find a way through."}</h2>
              <p className="muted">
                {won
                  ? `System breached in ${guesses.length} ${guesses.length === 1 ? "attempt" : "attempts"}. Nicely decoded.`
                  : "Adjust the digits. Submit your sequence. Follow the signal."}
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <DigitDial digits={digits} onChange={setDigits} disabled={won} />
              {!won && (
                <>
                  <button type="submit" className="primary-button">
                    <span>
                      <Terminal size={17} /> Execute sequence
                    </span>
                    <ArrowRight size={19} />
                  </button>
                  <p className="keyboard-hint">
                    TYPE TO ENTER DIGITS <span>↵</span> ENTER TO EXECUTE
                  </p>
                </>
              )}
            </form>
            {won && (
              <button className="primary-button" onClick={start}>
                <span>
                  <Check size={17} /> Run another breach
                </span>
                <ArrowUpRight size={19} />
              </button>
            )}
            <div className="session-stats">
              <div>
                <span>ATTEMPTS</span>
                <strong>{String(guesses.length).padStart(2, "0")}</strong>
              </div>
              <div>
                <span>BEST EXACT MATCH</span>
                <strong className="accent">
                  {Math.max(0, ...guesses.map((g) => g.result.greens))}
                  <small> / {level}</small>
                </strong>
              </div>
              <div>
                <span>STATUS</span>
                <strong className={won ? "accent" : ""}>
                  {won ? "UNLOCKED" : "ENCRYPTED"}
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>
      {!secret ? (
        <MissionBriefing />
      ) : (
        <aside className="panel history-panel">
          <div className="panel-heading">
            <span>
              <Terminal size={14} /> ATTEMPT LOG
            </span>
            <span className="small-tag">
              {String(guesses.length).padStart(2, "0")} ENTRIES
            </span>
          </div>
          <div className="history-key">
            <span>SEQUENCE</span>
            <span>
              <i className="green">● EXACT</i> <i className="red">◆ SHIFT</i>{" "}
              <i>— OUT</i>
            </span>
          </div>
          <div className="history-scroll" aria-live="polite">
            {guesses.length ? (
              guesses.map((entry, i) => (
                <div
                  className={`history-row ${entry.result.greens === level ? "winning-row" : ""}`}
                  key={guesses.length - i}
                >
                  <span className="attempt-index">
                    {String(guesses.length - i).padStart(2, "0")}
                  </span>
                  <strong>{entry.digits.join("")}</strong>
                  <Signals result={entry.result} />
                </div>
              ))
            ) : (
              <div className="empty-log">
                <Terminal size={30} />
                <h3>Your story starts here.</h3>
                <p>
                  Execute your first sequence.
                  <br />
                  Every attempt brings you closer.
                </p>
                <span>
                  AWAITING INPUT<span className="blinking-cursor">_</span>
                </span>
              </div>
            )}
          </div>
          <div className="log-footer">
            <span className="live-dot" /> SIGNALS ARE TOTALS, NOT DIGIT
            POSITIONS.
          </div>
        </aside>
      )}
    </section>
  );
}
