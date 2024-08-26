import "./App.css";
import { useEffect } from "react";
import { setCandies, updateCandies } from "./features/candies/candiesActions";
import { useDispatch, useSelector } from "react-redux";
import {
  checkForColumns,
  checkForRows,
  moveIntoSquareBelow,
} from "./utils/gameLogic";
import { CANDYCOLORS, WIDTH } from "./constants/constants";

function App() {
  const dispatch = useDispatch();
  const candies = useSelector((state) => state.candies);
  const currentCandies = useSelector((state) => state.currentCandies);
  const score = useSelector((state) => state.score);

  const handleGameLogic = () => {
    const updatedCandies = [...candies];
    checkForColumns(3, updatedCandies, dispatch);
    checkForRows(3, updatedCandies, dispatch);
    dispatch(updateCandies(updatedCandies));
    moveIntoSquareBelow(updatedCandies);
  };

  const createBoard = () => {
    const randomCandies = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor =
        CANDYCOLORS[Math.floor(Math.random() * CANDYCOLORS.length)];
      randomCandies.push({ color: randomColor });
    }
    dispatch(setCandies(randomCandies));
  };

  useEffect(() => {
    createBoard();
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGameLogic();
    }, 100);

    return () => clearInterval(intervalId);
  }, [candies]);

  return (
    <div className="max-w-[650px] p-5 mx-auto my-auto">
      <div className="text-2xl p-5 mb-3 bg-orange-400 text-white rounded-md border-white">
        <span>Score: </span> <strong>{score}</strong>
      </div>
      <div className="w-[604px] h-[620px] flex flex-wrap p-5 border-2 border-dashed bg-transparent relative">
        {currentCandies.map((candy, index) => (
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
