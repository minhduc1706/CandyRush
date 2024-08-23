import "./App.css";
import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import yellowCandy from "./images/yellow-candy.png";
import redCandy from "./images/red-candy.png";
import purpleCandy from "./images/purple-candy.png";
import { useEffect } from "react";
import { setCandies, updateCandies } from "./features/candies/candiesActions";
import { useDispatch, useSelector } from "react-redux";
import { checkForColumns, checkForRows } from "./utils/gameLogic";

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
  const dispatch = useDispatch();
  const candies = useSelector((state) => state.candies);
  const currentCandies = useSelector((state) => state.currentCandies);

  const handleGameLogic = () => {
    const updatedCandies = [...currentCandies];
    checkForColumns(3, updatedCandies);
    checkForRows(3, updatedCandies);
    dispatch(updateCandies(updatedCandies));
  };

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandies.push({ color: randomColor });
    }
    dispatch(setCandies(randomCandies));
  };

  useEffect(() => {
    createBoard();
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleGameLogic();
    }, 100);

    return () => clearInterval(timer);
  }, [currentCandies, dispatch]);

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
