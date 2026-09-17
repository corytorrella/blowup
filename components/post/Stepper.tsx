const STEPS = ["Company", "Format", "Capture", "Flashpoint", "Review"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-12 flex items-center gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const state = step === current ? "current" : step < current ? "done" : "upcoming";
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`data-num flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                  state === "upcoming"
                    ? "border-void-line text-paper-faint"
                    : "border-hazard text-hazard"
                } ${state === "done" ? "bg-hazard text-void" : ""}`}
              >
                {step}
              </span>
              <span className={`label hidden text-[10px] tracking-label sm:block ${state === "upcoming" ? "text-paper-faint" : "text-paper"}`}>
                {label}
              </span>
            </div>
            {step < STEPS.length && <span className="h-px flex-1 bg-void-line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
