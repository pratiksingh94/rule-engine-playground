export type TokenMap = {
  LPAREN: {};
  RPAREN: {};
  AND: {};
  OR: {};
  IDENT: { value: string };
  OP: { value: ">" | "<" | "==" | "!=" | ">=" | "<=" | "CONTAINS" | "STARTSWITH" | "ENDSWITH" };
  NUMBER: { value: number };
  STRING: { value: string };
  BOOLEAN: { value: boolean };
  NULL: {};
  IF: {};
  THEN: {};
  EQUALS: {};
  COMMA: {};
  BETWEEN: {};
}

export type Token = {
  [K in keyof TokenMap]: { type: K } & TokenMap[K]
}[keyof TokenMap]



export type LiteralNode = 
  | { type: "NUMBER"; value: number }
  | { type: "STRING"; value: string }
  | { type: "BOOLEAN"; value: boolean }
  | { type: "NULL" };

export type IdentifierNode = {
  type: "IDENT";
  name: string;
}

export type BinaryNode = {
  type: "BINARY";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "CONTAINS" | "STARTSWITH" | "ENDSWITH";
  left: ASTNode;
  right: ASTNode;
}

export type LogicalNode = {
  type: "LOGICAL";
  operator: "AND" | "OR";
  left: ASTNode;
  right: ASTNode;
}

export type BetweenNode = {
  type: "BETWEEN";
  value: ASTNode;
  min: ASTNode;
  max: ASTNode;
}


export type RuleNode = {
  type: "RULE";
  condition: ASTNode;
  actions: AssignmentNode[];
}

export type AssignmentNode = {
  type: "ASSIGNMENT",
  target: string;
  value: ASTNode;
}


export type ASTNode = LiteralNode | IdentifierNode | BinaryNode | LogicalNode | BetweenNode;





export type Rule = {
  id: string;
  text: string;
}


interface TemplateVariable {
  name: string;
  type: "string" | "number" | "boolean";
  value: string;
}


export interface Template {
  name: string;
  rule: string;
  description: string;
  variables: TemplateVariable[];
}