import { useState } from 'react';
import { RuleInput } from './components/RuleInput';
import Parser from './engine/ast';
import { runRule } from './engine/evaluate';
import { lexer } from './engine/lexer';
import { type Variable, VariablesPanel } from './components/VariablesPanel';
import parseVariables from './utils/parseVariables';

function App() {
  const [variables, setVariables] = useState<Variable[]>([]);

  const handleRun = (rule: string) => {
    const input = parseVariables(variables);
    const tokens = lexer(rule);
    const parser = new Parser(tokens);
    const ast = parser.parseRule();

    const result = runRule(ast, { ...input });
    console.log(result)
  }

  return (
    <main className='w-full max-w-2xl mx-auto flex flex-col gap-8'>
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Mini Rule Engine Playground</h1>
        <p className="text-text-muted">Define rules, run them ig</p>
      </header>

      <RuleInput onRun={handleRun}/>
      <VariablesPanel variables={variables} onChange={setVariables}/>
    </main>
  )
}

export default App