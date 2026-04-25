import { useState } from "react";

interface Props {
  onRun: (rule: string) => void;
}

export function RuleInput({ onRun }: Props) {
  const [rule, setRule] = useState("");

  return (
    <section className="flex flex-col gap-3">
      <label htmlFor="rule-input" className="text-sm text-text-muted">
        Rule
      </label>
      <textarea
      id="rule-input"
      value={rule}
      onChange={e => setRule(e.target.value)}
      placeholder='IF age > 18 THEN occupation = "unc"'
      className="w-full h-40 p-4 bg-bg-panel border border-border rounded-md text-text placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm leading-relaxed resize-y"

      />

      <button
      onClick={() => onRun(rule)}
      className="self-start px-6 py-2.5 bg-accent text-bg-primary font-medium rounded-md hover:bg-accent/90 transition-colors cursor-pointer"
      >Run</button>
    </section>
  )
}