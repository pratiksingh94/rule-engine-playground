interface Props {
  matched: boolean;
  output: Record<string, unknown>;
}

export function ResultDisplay({ matched, output }: Props) {
  const hasOutput = Object.keys(output).length > 0;

  return (
    <section className="flex flex-col gap-2">
      <label className="text-sm text-text-muted">Result</label>
      <div className="p-4 bg-bg-panel border border-border rounded-md font-mono text-sm">
        <div className="text-text-muted mb-2">
          Matched: <span className={matched ? "text-green-400" : "text-red-400"}>
            {matched ? "true" : "false"}
          </span>
        </div>

        <pre className="text-text overflow-x-auto bg-black/60 rounded-xl p-5">
          {hasOutput ? JSON.stringify(output, null, 2) : "No output"}
        </pre>
      </div>
    </section>
  )
}