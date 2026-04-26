import { useState } from 'react';
import { type Variable, VariablesPanel } from './components/VariablesPanel';
import parseVariables from './utils/parseVariables';
import { ResultDisplay } from './components/ResultDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { Rule, Template } from './types';
import parseRule from './utils/parseRule';
import { RulesPanel } from './components/RulePanel';
import { TemplateModal } from './components/TemplatesModal';

function App() {
  const [rules, setRules] = useState<Rule[]>([{ id: '1', text: "" }]);
  const [variables, setVariables] = useState<Variable[]>([]);

  const [results, setResults] = useState<Array<{ruleIndex: number, matched: boolean; output: Record<string, unknown> }>>([])

  const [error, setError] = useState<string | null>(null);

  const [showTemplates, setShowTemplates] = useState(false);

  const handleRunAll = () => {
    setError(null);
    setResults([]);

    try {
      if(rules.length === 0 || rules.every(r => !r.text.trim())) {
        throw new Error("At least one rule is required")
      }

      const input = parseVariables(variables);
      const parsedResult: Array<{ ruleIndex: number; matched: boolean; output: Record<string, unknown> }> = [];

      for(let i = 0; i < rules.length; i++) {
        if(!rules[i].text.trim()) continue;
        
        const result = parseRule(rules[i].text, input);
        parsedResult.push({ ruleIndex: i + 1, matched: result.matched, output: result.output })
      }

      setResults(parsedResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }


  const handleRunSingle = (ruleID: string) => {
    setError(null);
    setResults([]);

    try {
      const rule = rules.find(r => r.id === ruleID);
      if(!rule || !rule.text.trim()) {
        throw new Error("Rule is empty");
      }

      const input = parseVariables(variables);
      const result = parseRule(rule.text, input);
      const ruleIndex = rules.findIndex(r => r.id === ruleID) + 1;
      setResults([{ ruleIndex, matched: result.matched, output: result.output }])
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }


  const handleClearAll = () => {
    setRules([])
    setVariables([]);
    setResults([]);
    setError(null);
  }

  const handleAddFromTemplate = (template: Template) => {
    setError(null);
    setResults([]);
    setRules([{ id: Date.now().toString(), text: template.rule }])
    setVariables([...template.variables])
  }

  return (
    <main className='w-full max-w-2xl mx-auto flex flex-col gap-8'>
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Mini Rule Engine Playground</h1>
        <p className="text-text-muted">Define rules, run them ig</p>
      </header>

      <RulesPanel rules={rules} onChange={setRules} onRunSingle={handleRunSingle} onOpenTemplates={() => setShowTemplates(true)}/>
      <VariablesPanel variables={variables} onChange={setVariables}/>

      <div className="flex gap-3">
        <button onClick={handleRunAll} className='px-6 py-2.5 bg-accent text-bg-primary font-medium rounded-md hover:bg-accent/90 transition-colors cursor-pointer'>
          Run All Rules
        </button>

        <button onClick={handleClearAll} className='px-6 py-2.5 border border-border text-text-muted font-medium rounded-md hover:border-text-muted hover:text-text transition-colors cursor-pointer'>
          Clear All
        </button>
      </div>

      {error && <ErrorDisplay error={error}/>}
      {results.map((result, i) => (
        <ResultDisplay key={i} ruleIndex={result.ruleIndex} matched={result.matched} output={result.output}/>
      ))}

      <TemplateModal isOpen={showTemplates} onClose={() => setShowTemplates(false)} onSelect={handleAddFromTemplate}/>
    </main>
  )
}

export default App