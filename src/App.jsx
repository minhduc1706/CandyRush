import "./App.css";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import redCandy from "./images/red-candy.png";
import purpleCandy from "./images/purple-candy.png";
import blank from "./images/blank.png";
import { useRef, useState } from "react";
import { useEffect } from "react";

const WIDTH = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  yellowCandy,
  redCandy,
  purpleCandy,
];

function App() {
  const [candies, setCandies] = useState([]);
  const currentCandies = useRef([]);

  const checkForColumns = (num) => {
    for (let i = 0; i < WIDTH * WIDTH - (num - 1) * WIDTH; i++) {
      const columns = [];

      for (let j = 0; j < num; j++) {
        columns.push(i + j * WIDTH);
      }

      const decidedColor = currentCandies.current[i].color;

      if (
        columns.every(
          (square) => currentCandies.current[square].color === decidedColor
        )
      ) {
        for (let j = 0; j < columns.length; j++) {
          currentCandies.current[columns[j]].color = blank;
        }
      }
    }
  };

  const checkForRows = (num) => {
    for (let i = 0; i < WIDTH * WIDTH; i++) {

      if (i % WIDTH > WIDTH - num) continue;


      const rows = [];
      for (let j = 0; j < num; j++) {
        rows.push(i + j);
      }

      const decidedColor = currentCandies.current[i].color;

      if (
        rows.every(
          (square) => currentCandies.current[square].color === decidedColor
        )
      ) {
        for (let j = 0; j < rows.length; j++) {
          currentCandies.current[rows[j]].color = blank;
        }
      }
    }
  };

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push({ color: randomColor });
    }
    setCandies(randomCandies);
    currentCandies.current = randomCandies;
  };

  useEffect(() => {
    createBoard();

    const timer = setInterval(() => {
      checkForColumns(3);
      checkForRows(3);
      setCandies([...currentCandies.current]);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[650px] p-5 mx-auto my-auto">
      <div className="w-[604px] h-[620px] flex flex-wrap p-5 border-2 border-dashed bg-transparent relative">
        {candies.map((candy, index) => (
          <div
            className="relative w-[70px] h-[70px] cursor-pointer"
            key={index}
          >
            <img src={candy.color} alt={candy.color} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
