interface Props {
  isOpen: boolean;
  onClose: () => void;
}


export function GuideModal({ isOpen, onClose }: Props) {
  if(!isOpen) return;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-bg-panel border border-border rounded-lg p-6 w-[700px] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rule Engine Guide</h2>

          <button onClick={onClose} className="text-text-muted hover:text-text cursor-pointer">x</button>
        </div>

        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-medium mb-2">What is this?</h3>
            <p className="text-text-muted">Define rules and test them against input data.</p>
          </section>

          <section>
            <h3 className="font-medium mb-2">Syntax</h3>
            <pre className="bg-bg-primary p-3 rounded-md text-text-muted text-xs overflow-x-auto">
              IF condition THEN action, action... <br/>
              IF condition AND condition THEN action, action... <br/>
              IF condition OR condition THEN action
            </pre>
          </section>

          <section>
            <h3 className="font-medium mb-2">Examples</h3>
            <ul className="space-y-2 text-text-muted">
              <li><code className="text-accent">IF age {">"} 18 THEN access = "allowed"</code> - Simple check</li>
              <li><code className="text-accent">IF country == "IN" AND age {">"}= 18 THEN eligible = true</code> - Multiple AND</li>
              <li><code className="text-accent">IF country == "US" OR country == "UK" THEN english = true</code> - Multiple OR</li>
              <li><code className="text-accent">IF email CONTAINS "@hackclub.com" THEN hcb = true</code> - String contains</li>
              <li><code className="text-accent">IF age BETWEEN 18 and 65 THEN canWork = true</code> - Range check</li>
            </ul>
          </section>

          <section>
            <h3 className="font-medium mb-2">Operators</h3>
            <div className="grid grid-cols-2 gap-2 text-text-muted">
              <div><code className="text-accent">==</code> equal <div className="text-text-muted mt-1">IF age == 18</div></div>

              <div><code className="text-accent">!=</code> not equal <div className="text-text-muted mt-1">IF status != "active"</div></div>

              <div><code className="text-accent">{">"}</code> greater than <div className="text-text-muted mt-1">IF score {">"} 100</div></div>

              <div><code className="text-accent">{"<"}</code> less than <div className="text-text-muted mt-1">IF age {"<"} 65</div></div>

              <div><code className="text-accent">{">"}=</code> greater or equal <div className="text-text-muted mt-1">IF age {">"}= 18</div></div>

              <div><code className="text-accent">{"<"}=</code> less or equal <div className="text-text-muted mt-1">IF age {"<"}= 65</div></div>

              <div><code className="text-accent">CONTAINS</code> string contains <div className="text-text-muted mt-1">IF emails CONTAINS "@co"</div></div>

              <div><code className="text-accent">STARTSWITH</code> prefix check <div className="text-text-muted mt-1">IF phone STARTSWITH "+91"</div></div>

              <div><code className="text-accent">ENDSWITH</code> suffix check <div className="text-text-muted mt-1">IF domains ENDSWITH ".com"</div></div>

              <div><code className="text-accent">BETWEEN</code> range (a AND b) <div className="text-text-muted mt-1">IF age BETWEEN 18 AND 65</div></div>
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">Tokens (for errors)</h3>
            <div className="text-text-muted  space-y-1">
              <p>These appear in error messages:</p>
              <ul className="mt-2 grid grid-cols-2 gap-1">
                <li><code className="text-accent">IF</code> - rule start</li>
                <li><code className="text-accent">THEN</code> - condition end, action start</li>
                <li><code className="text-accent">IDENT</code> - variable nae</li>
                <li><code className="text-accent">OP</code> - operators ({">"}, ==, etc)</li>
                <li><code className="text-accent">NUMBER</code> - number literal</li>
                <li><code className="text-accent">STRING</code> - string literal</li>
                <li><code className="text-accent">LPAREN</code> - opening parenthesis</li>
                <li><code className="text-accent">RPAREN</code> - closing parenthesis</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}