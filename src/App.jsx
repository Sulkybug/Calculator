import { useEffect, useState } from "react";
import "./App.css";
import numbers from "./Numbers";
import operators from "./Operators";

function App() {
  const [screen, setScreen] = useState("0");
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    let value = e.currentTarget.getAttribute("data-value");
    if (checkSymbols(2) && screen[screen.length - 1] == 0) {
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
    if (screen != "0" && screen.length >= 1) {
      if (checkSymbols(1)) {
      } else {
        setScreen(screen + op);
      }
    } else if (screen == "0" && screen.length == 1) {
      setScreen(screen + op);
    }
  };

  const checkSymbols = (num) => {
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

  useEffect(() => {
    if (screen == 0 && screen.length == 1) {
      setResult("");
    } else {
      let specialChars = /[\s~"x`!@#$^&*(){}\[\];:"'<,>?\/\\|_+=-]/g;
      if (
        specialChars.test(screen) &&
        screen.includes("%", screen.length - 1)
      ) {
        percentage();
      } else if (screen.includes("%", screen.length - 1)) {
        setScreen(`${eval(screen.replace("%", "/100"))}`);
      } else if (checkSymbols(1)) {
        setResult(
          "=" + screen.replace(/[\s~"x`!@#$%^&*(){}\[\];:"'<,>?\/\\|_+=-]/g, "")
        );
      } else if (isNaN(Number(screen))) {
        setResult("=" + eval(screen.replace("x", "*")));
      } else if (!isNaN(Number(screen))) {
        setResult("=" + eval(screen.replace("x", "*")));
      } else {
        setResult(
          "=" + screen.replace(/[\s~"x`!@#$%^&*(){}\[\];:"'<,>?\/\\|_+=-]/g, "")
        );
      }
    }
  }, [screen]);

  const percentage = () => {
    let symbolsArr = [];
    for (let i = 0; i < operators.length; i++) {
      if (screen.includes(operators[i].symbol) && operators[i].symbol != "%") {
        let arrScreen = screen.replace("%", "");
        symbolsArr.push(operators[i].symbol);
        arrScreen = arrScreen.replace(
          /[\s~"x`!@#$^&*(){}\[\];:"'<,>?\/\\|_+=-]/g,
          "."
        );
        arrScreen = arrScreen.split(".");
        console.log(arrScreen);
        console.log(symbolsArr);
        let result =
          (Number(arrScreen[arrScreen.length - 2]) *
            Number(arrScreen.length - 1)) /
          100;
        let screenResult = "";
        let counter = 0;
        for (let j = 0; j < arrScreen.length; j++) {
          if (counter < symbolsArr.length - 1) {
            screenResult += `${arrScreen[j]}${symbolsArr[counter]}`;
            counter++;
          } else {
            screenResult += `${arrScreen[j]}`;
          }
        }
        setScreen(`${screenResult}${result.toString()}`);
      }
    }
  };

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
