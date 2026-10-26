import {
  ChevronDown,
  ChevronUp,
  Crosshair,
  Radio,
  ShieldCheck,
} from "lucide-react";
import type { Feedback } from "./puzzle";

export function LevelSelector({
  level,
  onChange,
}: {
  level: number;
  onChange: (level: number) => void;
}) {
  return (
    <div className="level-selector" role="group" aria-label="Code length">
      {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <button
          type="button"
          key={n}
          aria-pressed={level === n}
          onClick={() => onChange(n)}
          className={level === n ? "selected" : ""}
        >
          {n}
          <span>
            {n === 3
              ? "EASY"
              : n === 4
                ? "CLASSIC"
                : n === 10
                  ? "EXPERT"
                  : "DIGITS"}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Signals({ result }: { result: Feedback }) {
  return (
    <div
      className="signals"
      aria-label={`${result.greens} exact, ${result.reds} misplaced, ${result.nulls} absent`}
    >
      <span className="signal green">● {result.greens}</span>
      <span className="signal red">◆ {result.reds}</span>
      <span className="signal gray">— {result.nulls}</span>
    </div>
  );
}

export function DigitDial({
  digits,
  onChange,
  disabled = false,
}: {
  digits: number[];
  onChange: (digits: number[]) => void;
  disabled?: boolean;
}) {
  const update = (index: number, value: number) =>
    onChange(
      digits.map((digit, i) => (i === index ? (value + 10) % 10 : digit)),
    );
  return (
    <div className={`digit-dial ${digits.length > 6 ? "compact" : ""}`}>
      {digits.map((digit, index) => (
        <div className="digit-column" key={index}>
          <span className="digit-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Increase digit ${index + 1}`}
            onClick={() => update(index, digit + 1)}
          >
            <ChevronUp size={16} />
          </button>
          <input
            aria-label={`Digit ${index + 1}`}
            disabled={disabled}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            value={digit}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const value = e.target.value.slice(-1);
              if (/^\d$/.test(value)) {
                update(index, Number(value));
                const next = e.currentTarget
                  .closest(".digit-column")
                  ?.nextElementSibling?.querySelector("input");
                next?.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                update(index, digit + (e.key === "ArrowUp" ? 1 : -1));
              }
              if (e.key === "ArrowLeft" || e.key === "Backspace")
                e.currentTarget
                  .closest(".digit-column")
                  ?.previousElementSibling?.querySelector("input")
                  ?.focus();
              if (e.key === "ArrowRight")
                e.currentTarget
                  .closest(".digit-column")
                  ?.nextElementSibling?.querySelector("input")
                  ?.focus();
            }}
          />
          <button
            type="button"
            disabled={disabled}
            aria-label={`Decrease digit ${index + 1}`}
            onClick={() => update(index, digit - 1)}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function MissionBriefing() {
  return (
    <aside className="panel briefing">
      <div className="panel-heading">
        <span>
          <Radio size={14} /> MISSION BRIEFING
        </span>
        <span className="small-tag">READ ME</span>
      </div>
      <div className="briefing-content">
        <div className="brief-icon">
          <Crosshair size={26} />
        </div>
        <h3>
          The system has a secret.
          <br /> Find its weakness.
        </h3>
        <p>
          Every attempt sends a signal. Read the feedback, connect the dots, and
          uncover the hidden code.
        </p>
        <div className="signal-key">
          <div>
            <span className="signal green">●</span>
            <span>
              Exact match<small>Right digit. Right place.</small>
            </span>
            <b>01</b>
          </div>
          <div>
            <span className="signal red">◆</span>
            <span>
              Misplaced<small>Right digit. Wrong place.</small>
            </span>
            <b>02</b>
          </div>
          <div>
            <span className="signal gray">—</span>
            <span>
              Absent<small>No match in the sequence.</small>
            </span>
            <b>03</b>
          </div>
        </div>
        <div className="brief-note">
          <ShieldCheck size={15} />
          <span>
            No timer. No pressure.
            <br />
            <strong>Just your next breakthrough.</strong>
          </span>
        </div>
      </div>
    </aside>
  );
}
