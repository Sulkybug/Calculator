export const checkSymbols = (screen, operators, num) => {
  let result = "";
  for (let i = 0; i < operators.length; i++) {
    if (screen.includes(operators[i].symbol, screen.length - num)) {
      result = true;
      break;
    } else {
      result = false;
    }
  }
  return result;
};
