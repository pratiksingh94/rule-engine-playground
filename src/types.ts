export type TokenMap = {
  LPAREN: {};
  RPAREN: {};
  AND: {};
  OR: {};
  IDENT: { value: string };
  OP: { value: ">" | "<" | "==" | "!=" | ">=" | "<=" };
  NUMBER: { value: number };
  STRING: { value: string };
  BOOLEAN: { value: boolean };
  NULL: {};
  IF: {};
  THEN: {};
  EQUALS: {};
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
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
  left: ASTNode;
  right: ASTNode;
}

export type LogicalNode = {
  type: "LOGICAL";
  operator: "AND" | "OR";
  left: ASTNode;
  right: ASTNode;
}

export type RuleNode = {
  type: "RULE";
  condition: ASTNode;
  action: AssignmentNode;
}

export type AssignmentNode = {
  type: "ASSIGNMENT",
  target: string;
  value: ASTNode;
}


export type ASTNode = LiteralNode | IdentifierNode | BinaryNode | LogicalNode;