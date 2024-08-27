import "./App.css";
import { useEffect, useState } from "react";
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
  const [candyDragged, setCandyDragged] = useState(null);
  const [candyToReplace, setCandyToReplace] = useState(null);

  const handleGameLogic = () => {
    const updatedCandies = [...candies];
    checkForColumns(3, updatedCandies, dispatch);
    checkForRows(3, updatedCandies, dispatch);
    dispatch(updateCandies(updatedCandies));
    moveIntoSquareBelow(updatedCandies);
  };

  const dragStart = (e) => {
    setCandyDragged(e.target);
  };

  const dragDrop = (e) => {
    setCandyToReplace(e.target);
  };

  const dragEnd = () => {
    const candyDraggedIndex = parseInt(candyDragged.getAttribute("data-index"));
    const candyToReplaceIndex = parseInt(
      candyToReplace.getAttribute("data-index")
    );

  const rowStart = Math.floor(candyDraggedIndex / WIDTH) * WIDTH;
  const rowEnd = rowStart + WIDTH - 1;

    const validMoves = [
      candyDraggedIndex - 1,
      candyDraggedIndex - WIDTH,
      candyDraggedIndex + WIDTH,
    ];

    if (candyDraggedIndex !== rowEnd) {
      validMoves.push(candyDraggedIndex + 1);
    }

    console.log(candyDraggedIndex, candyToReplaceIndex);
    const validMove = validMoves.includes(candyToReplaceIndex)

    if (validMove) {
      const updatedCandies = [...candies];
      updatedCandies[candyToReplaceIndex] = candies[candyDraggedIndex];
      updatedCandies[candyDraggedIndex] = candies[candyToReplaceIndex];
  
      dispatch(updateCandies(updatedCandies));
  
      checkForColumns(3, updatedCandies, dispatch);
      checkForRows(3, updatedCandies, dispatch);
      moveIntoSquareBelow(updatedCandies);
  
      setCandyDragged(null);
      setCandyToReplace(null);
    } else {
      setCandyDragged(null);
      setCandyToReplace(null);
    }


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
            data-index={index}
            data-src={candy.color}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault}
            onDragLeave={(e) => e.preventDefault}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          >
            <img src={candy.color} alt={candy.color} className="w-full pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
