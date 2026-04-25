import Parser from "../engine/ast";
import { runRule } from "../engine/evaluate";
import { lexer } from "../engine/lexer";

export default function parseRule(ruleText: string, input: Record<string, string | number | boolean>) {
  const tokens = lexer(ruleText);
  const parser = new Parser(tokens);
  const ast = parser.parseRule();

  return runRule(ast, input);
}