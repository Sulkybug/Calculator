export const handlePercentage = (screen, setScreen) => {
  const sanitizedExpression = screen.replace(/x/g, "*");
  const expression = sanitizedExpression.split(/([+\-*/])/);

  expression[expression.length - 1] = expression[expression.length - 1].replace(
    "%",
    ""
  );

  let LastoperationIndex = -1;
  for (let i = expression.length - 1; i >= 0; i--) {
    if (["+", "-", "*", "/"].includes(expression[i])) {
      LastoperationIndex = i;
      break;
    }
  }

  let operation = [...expression];
  operation.splice(LastoperationIndex, 2);
  let operationStr = operation.join("");
  let operationResult = eval(operationStr);

  const percentageValue = parseFloat(expression[LastoperationIndex + 1]) / 100;
  let result = operationResult * percentageValue;
  setScreen(
    `${operationStr.replace(/\*/g, "x")}${
      expression[LastoperationIndex]
    }${result}`
  );
};
