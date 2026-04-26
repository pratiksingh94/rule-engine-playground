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
    const token = this.tokens[this.i];
    if(!token) {
      throw new Error(`Unexpected end of rule`);
    }

    this.i++
    return token;
  }

  private consumeType<T extends Token["type"]>(type: T): Extract<Token, { type: T}> {
    const token = this.tokens[this.i];
    if(!token) {
      throw new Error(`Expected '${type}' but reached end of rule`);
    }
    this.i++;

    if(token.type !== type) {
      throw new Error(`Expected '${type}', got '${token.type}'`)
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
      if(!this.peek()) {
        throw new Error(`Missing closing paranthesis for expression starting at position ${this.i - 1}`);
      }

      const next = this.consume();
      if(next.type !== "RPAREN") {
        throw new Error(`Expected closing paranthesis ')', got '${next.type}'`);
      }

      return expr;
    }

    throw new Error(`Unexpected token '${token.type}' in expression`);
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

    while(this.peek()?.type === "AND" || this.peek()?.type === "BETWEEN") {
      if(this.peek()?.type === "BETWEEN") {
        this.consume();
        const min = this.parseBinary();

        this.consumeType("AND")
        const max = this.parseBinary();

        left = {
          type: "BETWEEN",
          value: left,
          min,
          max
        }
        continue;
      }

      this.consume();
      const right = this.parseBinary();

      left = {
        type: "LOGICAL",
        operator: "AND",
        left,
        right
      }
    }

    return left
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
    if(this.peek()?.type !== "IF") {
      throw new Error("Rule must start with 'IF' keyword");
    }
    this.consumeType("IF");
    const condition = this.parseExpression();

    if(this.peek()?.type !== "THEN") {
      if(!this.peek()) {
        throw new Error(`Expected 'THEN' after condition but reached end of rule`);
      }
      throw new Error(`Expected 'THEN' after condition, got '${this.peek()?.type}'`)
    }
    this.consumeType("THEN");
    const actions: AssignmentNode[] = [];

    while(this.peek()) {
      if(this.peek()?.type !== "IDENT") {
        if(this.peek()?.type === "COMMA") {
          this.consume();
          continue;
        }
        throw new Error(`Expected variable name, got '${this.peek()?.type}'`)
      }

      actions.push(this.parseAssignment());

      if(!this.peek() || this.peek()?.type === "COMMA") {
        if(this.peek()?.type === "COMMA") {
          this.consume();
          continue;
        }

        break;
      }
      if(this.peek()?.type !== "COMMA") {
        break;
      }
    }

    if(this.peek()?.type === "COMMA") {
      throw new Error(`Unexpected comma after last assignment`)
    }

    if(this.peek()) {
      throw new Error(`Unexpected token '${this.peek().type}' after rule definition`);
    }

    return {
      type: "RULE",
      condition,
      actions
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