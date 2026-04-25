export type Variable = {
  name: string;
  type: "string" | "number" | "boolean";
  value: string;
}

interface Props {
  variables: Variable[];
  onChange: (variables: Variable[]) => void;
}

export function VariablesPanel({ variables, onChange }: Props) {
  const addVariable = () => {
    onChange([...variables, { name: '', type: "string", value: "" }]);
  }

  const updateVariable = (index: number, field: keyof Variable, newValue: string) => {
    const updated = [...variables];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  }

  const removeVariable = (index: number) => {
    onChange(variables.filter((_, i) => i !== index))
  }


  return (
    <section className="flex flex-col gap-3">
      <label className="text-sm text-text-muted">Variables (input)</label>

      {variables.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
          type="text"
          value={v.name}
          onChange={e => updateVariable(i, "name", e.target.value)}
          placeholder="name"
          className="w-24 p-2 bg-bg-panel border border-border text-sm text-text rounded placeholder:text-text-muted focus:outline-none focus:border-accent"
          />

          <select
          value={v.type}
          onChange={e => updateVariable(i, "type", e.target.value)}
          className="p-2 bg-bg-panel border border-border rounded text-sm text-text focus:outline-none focus:border-accent"
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
          </select>

          <input
          type="text"
          value={v.value}
          onChange={e => updateVariable(i, "value", e.target.value)}
          placeholder="value"
          className="flex-1 p-2 bg-bg-panel border border-border rounded text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent"
          />

          <button
          onClick={() => removeVariable(i)}
          className="px-3 py-2 cursor-pointer text-text-muted hover:text-text transition-colors"
          >
            x
          </button>
        </div>
      ))}

      <button
      onClick={addVariable}
      className="self-start px-4 py-2 text-sm text-text-muted hover:text-text transition-colors cursor-pointer"
      >
        + Add Variable
      </button>
    </section>
  )
}