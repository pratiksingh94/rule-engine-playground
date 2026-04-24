import { useState } from 'react'
// import { run } from './evaluate';
import { lexer } from './engine/lexer';
import Parser from './engine/ast';

function App() {

  // const ruleHmmm = {
  //   conditions: [
  //     {
  //       field: "age", operator: ">", value: 2
  //     },
  //     {
  //       field: "country", operator: "==", value: "Pangea"
  //     }
  //   ],
  //   result: { accessed: "yesn't" }
  // }

  // const input = {
  //   age: 21,
  //   country: "Pangea"
  // }

  const [rule, setRule] = useState('');

  const handleRun = () => {
    const tkns = lexer(rule);
    const parser = new Parser(tkns);

    const ast = parser.parseExpression();
    console.log(ast)
  }
  return (
    <main className='w-full max-w-2xl mx-auto flex flex-col gap-8'>
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Mini Rule Engine Playground</h1>
        <p className="text-text-muted">Define rules, run them ig</p>
      </header>

      <section className='flex flex-col gap-3'>
        <label htmlFor='rule-input' className='text-sm text-text-muted'>Rule</label>
        <textarea
        id='rule-input'
        value={rule}
        onChange={e => setRule(e.target.value)}
        placeholder='IF age > 41 AND occupation IS "rapper" THEN thingy = "41 year old rapper"'
        className='w-full h-40 p-4 bg-bg-panel border border-border rounded-md text-text placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm leading-relaxed resize-y'
        />
      </section>

      <button
      onClick={handleRun}
      className='self-start px-6 py-2.5 bg-accent text-bg-primary font-medium rounded-md hover:bg-accent/90 transition-colors cursor-pointer'
      >Run</button>
    </main>
  )
}

export default App
