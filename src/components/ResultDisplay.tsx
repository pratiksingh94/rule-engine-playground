interface Props {
  ruleIndex: number;
  matched: boolean;
  output: Record<string, unknown>;
}

export function ResultDisplay({ ruleIndex, matched, output }: Props) {

  return (
    <section className="flex flex-col gap-2">
      <label className="text-sm text-text-muted">Rule {ruleIndex} Result</label>
      <div className="p-4 bg-bg-panel border border-border rounded-md text-sm">
        <div className="text-text-muted mb-2">
          Matched: <span className={matched ? "text-green-400" : "text-red-400"}>
            {matched ? "true" : "false"}
          </span>
        </div>

        {matched && (
          <pre className="text-text overflow-x-auto">
            {JSON.stringify(output, null, 2)}
          </pre>
        )}
      </div>
    </section>
  )
}