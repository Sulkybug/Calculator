import { useEffect, useState, useRef, createRef } from "react";
import "./App.css";
import numbers from "./ButtonsContent/Numbers";
import operators from "./ButtonsContent/Operators";
import { handlePercentage } from "./Functions/handlePercentage ";
import { checkSymbols } from "./Functions/checkSymbols ";

function App() {
  const [screen, setScreen] = useState("0");
  const [result, setResult] = useState("");

  const buttonNumRef = useRef(numbers.map(() => createRef()));
  const buttonOpRef = useRef(operators.map(() => createRef()));
  const buttonDeleteRef = useRef(null);
  const buttonResultRef = useRef(null);

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
  //keyDown utility
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key == "Enter") {
        buttonResultRef.current.click();
      }

      if (key >= "0" && key <= "9") {
        const indexNum = numbers.findIndex((num) => num.num.toString() === key);

        if (indexNum !== -1 && buttonNumRef.current[indexNum].current) {
          buttonNumRef.current[indexNum].current.click();
        }
      }
      if (
        key == "/" ||
        key == "+" ||
        key == "-" ||
        key == "*" ||
        key == "." ||
        key == "%"
      ) {
        if (key == "*") {
          buttonOpRef.current[3].current.click();
        } else {
          const indexOp = operators.findIndex(
            (symbol) => symbol.symbol === key
          );
          if (indexOp !== -1 && buttonOpRef.current[indexOp].current) {
            buttonOpRef.current[indexOp].current.click();
          }
        }
      }
      if (key == "Backspace") {
        buttonDeleteRef.current.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="outputScreen">
        <p className="operation">{screen}</p>
        <p className="result">{result}</p>
      </div>

      <div className="container">
        {operators.map((value, indexOp) => (
          <button
            key={value.name}
            onClick={handleClickOp}
            className={`operatorsKeys ${value.name}`}
            data-value={value.symbol}
            ref={buttonOpRef.current[indexOp]}
          >
            {value.symbol}
          </button>
        ))}

        {numbers.map((number, indexNum) => (
          <button
            key={number.num}
            onClick={handleClick}
            data-value={number.num}
            className={number.name}
            ref={buttonNumRef.current[indexNum]}
          >
            {number.num}
          </button>
        ))}
        <button className="operatorsKeys clear" onClick={clearScreen}>
          C
        </button>
        <button
          className="operatorsKeys delete"
          onClick={handleDelete}
          ref={buttonDeleteRef}
        >
          ⌫
        </button>
        <button
          className="resultButton"
          onClick={handleResult}
          ref={buttonResultRef}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
