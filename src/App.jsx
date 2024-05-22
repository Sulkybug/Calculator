import { useEffect, useState } from "react";
import "./App.css";
import numbers from "./ButtonsContent/Numbers";
import operators from "./ButtonsContent/Operators";
import { handlePercentage } from "./Functions/handlePercentage ";
import { checkSymbols } from "./Functions/checkSymbols ";

function App() {
  const [screen, setScreen] = useState("0");
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    let value = e.currentTarget.getAttribute("data-value");
    if (checkSymbols(screen, operators, 2) && screen[screen.length - 1] == 0) {
      setScreen(screen);
    } else {
      if (screen.length == 1 && screen[0] == 0) {
        setScreen(screen.slice(1, -1) + value);
      } else {
        setScreen(screen + value);
      }
    }
  };

  const handleClickOp = (e) => {
    let op = e.currentTarget.getAttribute("data-value");
    const expression = screen.split(/([+\-x/])/);
    if (expression[expression.length - 1].includes(".") && op == ".") {
    } else if (screen != "0" && screen.length >= 1) {
      if (checkSymbols(screen, operators, 1)) {
      } else {
        setScreen(screen + op);
      }
    } else if (screen == "0" && screen.length == 1) {
      setScreen(screen + op);
    }
  };

  useEffect(() => {
    if (screen == 0 && screen.length == 1) {
      setResult("");
    } else {
      let specialChars = /([+\-*/x])/g;
      if (
        specialChars.test(screen) &&
        screen.includes("%", screen.length - 1)
      ) {
        handlePercentage(screen, setScreen);
      } else if (screen.includes("%", screen.length - 1)) {
        setScreen(`${eval(screen.replace("%", "/100"))}`);
      } else if (checkSymbols(screen, operators, 1)) {
        setResult("=" + screen.replace(/([+\-*/x])/g, ""));
      } else if (isNaN(Number(screen))) {
        setResult("=" + eval(screen.replace(/x/g, "*")));
      } else if (!isNaN(Number(screen))) {
        setResult("=" + eval(screen.replace(/x/g, "*")));
      } else {
        setResult("=" + screen.replace(/([+\-*/x])/g, ""));
      }
    }
  }, [screen]);

  const handleResult = () => {
    if (screen == 0) {
    } else if (screen != result.slice(1)) {
      setScreen(`${result.slice(1)}`);
    }
  };

  const clearScreen = () => {
    setScreen("0");
  };

  const handleDelete = () => {
    if (screen.length == 1) {
      setScreen("0");
    } else {
      setScreen(screen.slice(0, -1));
    }
  };

  return (
    <>
      <div className="outputScreen">
        <p className="operation">{screen}</p>
        <p className="result">{result}</p>
      </div>

      <div className="container">
        {operators.map((value) => (
          <button
            key={value.name}
            onClick={handleClickOp}
            className={`operatorsKeys ${value.name}`}
            data-value={value.symbol}
          >
            {value.symbol}
          </button>
        ))}

        {numbers.map((number) => (
          <button
            key={number.num}
            onClick={handleClick}
            data-value={number.num}
            className={number.name}
          >
            {number.num}
          </button>
        ))}
        <button className="operatorsKeys clear" onClick={clearScreen}>
          C
        </button>
        <button className="operatorsKeys delete" onClick={handleDelete}>
          ⌫
        </button>
        <button className="resultButton" onClick={handleResult}>
          =
        </button>
      </div>
    </>
  );
}

export default App;
