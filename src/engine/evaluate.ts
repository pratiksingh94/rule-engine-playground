import type { ASTNode, BinaryNode, LogicalNode, RuleNode } from "../types";

function evaluate(node: ASTNode, data: any): any {
  switch(node.type) {
    case "NUMBER":
    case "STRING":
    case "BOOLEAN":
      return node.value;
    
    case "NULL":
      return null;
    
    case "IDENT":
      const value = data[node.name];
      if(value === undefined) {
        throw new Error(`Variable '${node.name}' not found in input`);
      }
      return value;
    
    case "BINARY": {
      const left = evaluate(node.left, data);
      const right = evaluate(node.right, data);

      const leftType = typeof left;
      const rightType = typeof right;
      if(leftType !== rightType && left !== null && right !== null) {
        throw new Error(`Type mismatch: cannot compare ${leftType} with ${rightType} using '${node.operator}'`)
      }

      switch(node.operator) {
        case "==":
          return left === right;
        case "!=":
          return left !== right;
        case "<":
          return left < right;
        case ">":
          return left > right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;

        default:
          throw new Error(`Unknown operator ${(node as BinaryNode).operator}`)
      }
    }
    
    case "LOGICAL": {
      const left = evaluate(node.left, data);

      if(node.operator === "AND") {
        return left && evaluate(node.right, data)
      }
      if(node.operator === "OR") {
        return left || evaluate(node.right, data);
      }

      throw new Error(`Unknown logical operator: ${(node as LogicalNode).operator}`)
    }

    default:
      throw new Error(`Cannot evaluate node type ${(node as any).type}`)
  }
}



export function runRule(rule: RuleNode, data: any): { matched: boolean; output: Record<string, unknown> } {
  const result = {}
  const matched = evaluate(rule.condition, data);

  if(matched) {
    for (const action of rule.actions) {
      const value = evaluate(action.value, result);
      result[action.target] = value;
    }
  }

  return { matched, output: result }
}