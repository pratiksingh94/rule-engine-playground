interface Props {
  error: string;
}

export function ErrorDisplay({ error }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <label className="text-sm text-red-400">Error</label>
      <div className="p-4 bg-bg-panel border border-red-900/50 rounded-md text-sm text-red-300">
        {error}
      </div>
    </section>
  )
}