# Mini Rule Engine Playground

Define rules in format `IF condition THEN action` and test them against input variables

## Syntax
```
IF condition THEN action
IF condition AND condition THEN action
IF condition OR condition THEN action
IF condition THEN action1, action2
```

## Examples

```
IF age > 18 THEN access = "allowed"
IF country == "IN" AND age >= 18 THEN eligible = true
IF email CONTAINS "@hackclub.com" THEN hcb = true
IF age BETWEEN 18 AND 65 THEN canWork = true
```

## Operators
| Operator | Description |
|---------|------------|
| `==` | equal |
| `!=` | not equal |
| `>` | greater than |
| `<` | less than |
| `>=` | greater or equal |
| `<=` | less or equal |
| `CONTAINS` | string contains |
| `STARTSWITH` | string starts with prefix |
| `ENDSWITH` | string ends with prefix |
| `BETWEEN` | range check (age BETWEEN x AND y) |

## Features
- Multiple rules with single or run-all
- Variable input with type support (string, number, bool)
- Template library for quick start
- Errror display
- Result display with match status
- Keyboard shortcuts
- Smol guide
- Import/Export rules

## Keyboard shorcuts
- `CTRL + Enter` Run all rules
- `?` Open guide modal
- `Escape` close modal (template/guide)

# Run locally

```bash
git clone https://github.com/pratiksingh94/rule-engine-playground.git

cd rule-engine-playground

pnpm install

pnpm run dev

```