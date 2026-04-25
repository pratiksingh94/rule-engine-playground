import type { Token, TokenMap } from "../types";


// god knows what i wrote here, it just works finally i dont wanna touch it T___T
function createToken<K extends keyof TokenMap>(type: K, ...args: keyof TokenMap[K] extends never ? [] : [TokenMap[K]]): { type: K } & TokenMap[K] {
  return { type, ...(args[0] || {}) } as any;
}



export function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while(i < input.length) {
    const char = input[i];
    
    if(/\s/.test(char)) {
      i++
      continue;
    }

    // parantheses
    if(char === "(") {
      tokens.push(createToken("LPAREN"));
      i++
      continue
    }
    if(char === ")") {
      tokens.push(createToken("RPAREN"))
      i++
      continue
    }



    // operators
    if(input.slice(i, i + 2) === "==") {
      tokens.push(createToken("OP", { value: "==" }))
      i += 2;
      continue;
    }
    if(input.slice(i, i + 2) === "!=") {
      tokens.push(createToken("OP", { value: "!=" }))
      i += 2
      continue
    }
    if(input.slice(i, i + 2) === ">=") {
      tokens.push(createToken("OP", { value: ">=" }))
      i += 2
      continue
    }
    if(input.slice(i, i + 2) === "<=") {
      tokens.push(createToken("OP", { value: "<="}))
      i += 2
      continue
    }
    if(char === ">" || char === "<") {
      tokens.push(createToken("OP", { value: char }))
      i++
      continue
    }
    if(char === "=") {
      tokens.push(createToken("EQUALS"));
      i++;
      continue;
    }

    // strings
    //TODO: ESCAPE HANDLING
    if(char === '"' || char === "'") {
      const quote = char;
      i++;
      let value = ""

      while(i < input.length && input[i] !== quote) {
        if(input[i] === "\\" && i + 1 < input.length) {
          value += input[i + 1];
          i += 2;
          continue
        }

        value += input[i]
        i++
      }

      if(input[i] !== quote) {
        throw new Error(`Unterminated string: missing closing quote (")`)
      }

      i++;
      tokens.push(createToken("STRING", { value }))
      continue
    }

    

    // numbers
    if(/[0-9]/.test(char)) {
      let value = "";
      while(i < input.length && /[0-9]/.test(input[i])) {
        value += input[i];
        i++
      }
      
      tokens.push(createToken("NUMBER", { value: Number(value) }))
      continue;
    }



    // keywords and indetifiers
    if(/[a-zA-Z]/.test(char)) {
      let value = "";
      while(i < input.length && /[a-zA-Z0-9]/.test(input[i])) {
        value += input[i];
        i++;
      }

      const upper = value.toUpperCase()
      if(upper === "AND") {
        tokens.push(createToken("AND"))
      } else if(upper === "OR") {
        tokens.push(createToken("OR"))
      } else if (upper === "TRUE" || upper === "FALSE") {
        tokens.push(createToken("BOOLEAN", { value: upper === "TRUE" }))
      } else if(upper === "NULL") {
        tokens.push(createToken("NULL"))
      } else if(upper === "IF") {
        tokens.push(createToken("IF"));
      } else if(upper === "THEN") {
        tokens.push(createToken("THEN"));
      } else {
        tokens.push(createToken("IDENT", { value }))
      }

      continue;
    }

    throw new Error(`Unexpected character '${char}' at position ${i}`);
  }

  return tokens
}