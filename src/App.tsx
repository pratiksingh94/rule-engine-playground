import { useState } from 'react';
import { RuleInput } from './components/RuleInput';
import Parser from './engine/ast';
import { runRule } from './engine/evaluate';
import { lexer } from './engine/lexer';
import { type Variable, VariablesPanel } from './components/VariablesPanel';
import parseVariables from './utils/parseVariables';
import { ResultDisplay } from './components/ResultDisplay';

function App() {
  const [variables, setVariables] = useState<Variable[]>([]);

  const [result, setResult] = useState<{ matched: boolean; output: Record<string, unknown> } | null>(null)

  const handleRun = (rule: string) => {
    const input = parseVariables(variables);
    const tokens = lexer(rule);
    const parser = new Parser(tokens);
    const ast = parser.parseRule();

    const result = runRule(ast, { ...input });
    setResult(result);
  }

  return (
    <main className='w-full max-w-2xl mx-auto flex flex-col gap-8'>
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Mini Rule Engine Playground</h1>
        <p className="text-text-muted">Define rules, run them ig</p>
      </header>

      <RuleInput onRun={handleRun}/>
      <VariablesPanel variables={variables} onChange={setVariables}/>

      {result && <ResultDisplay matched={result.matched} output={result.output}/>}
    </main>
  )
}

export default App