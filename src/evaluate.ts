// this is a random file i made to experiment and learn with hardcoded thinghs here!!



function evaluate(rule, input) {
  return rule.conditions.every(cond => {
    const actual = input[cond.field];

    if(cond.operator === ">") return actual  > cond.value;
    
    if(cond.operator === "<") return actual < cond.value;

    if(cond.operator === "==") return actual === cond.value

    return false;
  })
}

export function run(rule,input) {
  if(evaluate(rule, input)) {
    return rule.result;
  }

  return null;
}