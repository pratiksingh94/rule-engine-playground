import type { AssignmentNode, ASTNode, RuleNode, Token } from "../types";

class Parser {
  private tokens: Token[];
  private i = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek() {
    return this.tokens[this.i];
  }

  private consume() {
    return this.tokens[this.i++]
  }

  private consumeType<T extends Token["type"]>(type: T): Extract<Token, { type: T}> {
    const token = this.consume();

    if(token.type !== type) {
      throw new Error(`Expected ${type}, got ${token.type}`);
    }

    return token as Extract<Token, { type: T }>
  }

  parsePrimary(): ASTNode {
    const token = this.consume();

    if(token.type === "NUMBER") {
      return { type: "NUMBER", value: token.value }
    }
    if(token.type === "STRING") {
      return { type: "STRING", value: token.value }
    }
    if(token.type === "BOOLEAN") {
      return { type: "BOOLEAN", value: token.value }
    }
    if(token.type === "IDENT") {
      return { type: "IDENT", name: token.value }
    }
    if(token.type === "LPAREN") {
      const expr = this.parseExpression();
      this.consumeType("RPAREN")
      return expr;
    }

    throw new Error("Unexpeted token in primary")
  }

  
  parseBinary(): ASTNode {
    let left = this.parsePrimary();

    while(this.peek()?.type === "OP") {
      const token = this.consume();

      if(token.type !== "OP") {
        throw new Error("Expected operator");
      }

      const op = token.value;
      const right = this.parsePrimary();

      left = {
        type: "BINARY",
        operator: op,
        left,
        right
      }
    }
    
    return left;
  }


  parseAnd(): ASTNode {
    let left = this.parseBinary();

    while(this.peek()?.type === "AND") {
      this.consume();
      const right = this.parseBinary();

      left = {
        type: "LOGICAL",
        operator: "AND",
        left,
        right
      }
    }

    return left;
  }


  parseExpression(): ASTNode {
    let left = this.parseAnd();

    while(this.peek()?.type === "OR") {
      this.consume();
      const right = this.parseAnd();

      left = {
        type: "LOGICAL",
        operator: "OR",
        left,
        right
      }
    }

    return left;
  }

  parseRule(): RuleNode {
    this.consumeType("IF");
    const condition = this.parseExpression();
    
    this.consumeType("THEN");
    const action = this.parseAssignment();

    return {
      type: "RULE",
      condition,
      action
    }
  }

  parseAssignment(): AssignmentNode {
    const ident = this.consumeType("IDENT");

    this.consumeType("EQUALS");
    const  value = this.parseExpression();

    return {
      type: "ASSIGNMENT",
      target: ident.value,
      value
    }
  }
}


export default Parser