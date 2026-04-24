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
  NULL: {}
}

export type Token = {
  [K in keyof TokenMap]: { type: K } & TokenMap[K]
}[keyof TokenMap]