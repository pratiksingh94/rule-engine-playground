import type { Template } from "../types";

const templates: Template[] = [
  {
    name: "Age check",
    rule: 'IF age >= 18 THEN access = "allowed"',
    description: "Check if age meets minimum requirement",
    variables: [
      { name: "age", type: "number", value: "18" }
    ]
  },
  {
    name: "Country check",
    rule: 'IF country == "IN" THEN region = "asia"',
    description: "Check country and assign region",
    variables: [
      { name: 'country', type: 'string', value: 'IN' }
    ]
  },
  {
    name: "String contains",
    rule: 'IF email CONTAINS "@company.com" THEN internal = true',
    description: "Check if string contains a substring",
    variables: [
      { name: "email", type: "string", value: "test@company.com" }
    ]
  },
  {
    name: "Range check",
    rule: "IF age BETWEEN 18 AND 65 THEN canWork = true",
    description: "Check if value is within a range",
    variables: [
      { name: "age", type: "number", value: "25" }
    ]
  },
  {
    name: "Multiple AND",
    rule: 'IF age >= 18 AND country == "NK" THEN doomed = true',
    description: "Check multiple conditions with AND",
    variables: [
      { name: "age", type: "number", value: "25" },
      { name: "country", type: "string", value: "NK" }
    ]
  },
  {
    name: "Multiple OR",
    rule: 'IF country == "US" OR country == "UK" THEN english = true',
    description: "Check multiple conditions with OR",
    variables: [
      { name: "country", type: "string", value: "US" }
    ]
  },
  {
    name: "String starts with",
    rule: 'IF phone STARTSWITH "+91" THEN region = "india"',
    description: "Check if strinng starts with prefix",
    variables: [
      { name: "phone", type: "string", value: "+91 1234567890"}
    ]
  },
  {
    name: "String ends with",
    rule: 'IF domain ENDSWITH ".com" THEN isCommercial = true',
    description: "Check if string ends with a suffix",
    variables: [
      { name: "email", type: "string", value: "test@example.com" }
    ]
  },
  {
    name: "Not equal",
    rule: 'IF status != "inactive" THEN isActive = true',
    description: "Check if value is not equal to something",
    variables: [
      { name: "status", type: "string", value: "active" }
    ]
  },
  {
    name: "Greater than",
    rule: 'IF score > 100 THEN grade = "A"',
    description: "Check if value is greater than",
    variables: [
      { name: "score", type: "number", value: "95" }
    ]
  }
]



interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export function TemplateModal({ isOpen, onClose, onSelect }: Props) {
  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-bg-panel border border-border rounded-lg p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rule Templates</h2>

          <button onClick={onClose} className="text-text-muted hover:text-text cursor-pointer">x</button>
        </div>

        <div className="grid gap-3">
          {templates.map((te, i) => (
            <button
            key={i}
            onClick={() => {
              onSelect(te);
              onClose()
            }}
            className="text-left p-3 bg-bg-primary border border-border rounded-md hover:border-accent transition-colors cursor-pointer"
            >
              <div className="text-sm font-medium">{te.name}</div>
              <div className="text-xs text-text-muted mt-1">{te.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}