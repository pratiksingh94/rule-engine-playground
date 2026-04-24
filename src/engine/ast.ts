import type { ASTNode, Token } from "../types";

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
      this.consume();
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
}


export default Parser