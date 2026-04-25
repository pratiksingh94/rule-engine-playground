import type { Variable } from "../components/VariablesPanel";

export default function parseVariables(variables: Variable[]): Record<string, string | number | boolean> {
  const input: Record<string, string | number | boolean> = {};

  for(const v of variables) {
    if(!v.name) continue;
    if(v.type === "number") {
      input[v.name] = Number(v.value);
    } else if(v.type === "boolean") {
      input[v.name] = v.value === "true";
    } else {
      input[v.name] = v.value;
    }
  }

  return input;
}