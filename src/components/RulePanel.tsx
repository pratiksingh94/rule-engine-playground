import type { Rule } from "../types";
import generateID from "../utils/generateId";

interface Props {
  rules: Rule[];
  onChange: (rule: Rule[]) => void;
  onRunSingle: (ruleID: string) => void;
  onOpenTemplates: () => void;
}


export function RulesPanel({ rules, onChange, onRunSingle, onOpenTemplates }: Props) {
  const addRule = () => {
    onChange([...rules, { id: generateID(), text: "" }])
  }

  const updateRule = (id: string, text: string) => {
    onChange(rules.map(r => r.id === id ? { ...r, text } : r));
  }

  const removeRule = (id: string) => {
    onChange(rules.filter(r => r.id !== id));
  }


  return (
    <section className="flex flex-col gap-3">
      <label className="text-sm text-text-muted">Rules</label>

      {rules.map((rule, i) => (
        <div key={rule.id} className="flex gap-2 items-start">
          <span className="text-text-muted text-sm mt-2 w-6">{i + 1}</span>
          <textarea
          value={rule.text}
          onChange={e => updateRule(rule.id, e.target.value)}
          placeholder='IF age > 18 THEN dude = "unc"'
          className="flex-1 p-3 bg-bg-panel border border-border rounded-md text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent resize-y min-h-[80px]"
          />

          <div className="flex flex-col gap-1">
            <button
            onClick={() => onRunSingle(rule.id)}
            className="px-3 py-1 text-xs bg-accent text-bg-primary rounded hover:bg-accent/90 transition-colors cursor-pointer"
            >
              Run
            </button>

            <button
            onClick={() => removeRule(rule.id)}
            className="px-3 py-1 text-text-muted hover:text-text transition-colors cursor-pointer"
            >x</button>
          </div>
        </div>
      ))}

      <button
      onClick={addRule}
      className="self-start px-4 py-2 text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
      >+ Add rule</button>
      <button
      onClick={onOpenTemplates}
      className="self-start px-4 py-2 text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
      >
        + Add from Template
      </button>
    </section>
  )
}