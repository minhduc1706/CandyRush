import { increaseScore } from "../features/candies/candiesActions";
import blank from "../images/blank.png";
import { WIDTH, CANDYCOLORS } from "../constants/constants";

export const checkForColumns = (minNum, candies, dispatch) => {
  for (let i = 0; i < WIDTH * WIDTH - (minNum - 1) * WIDTH; i++) {
    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;

    const columnIndices = [i];

    for (let j = 1; j < WIDTH; j++) {
      const nextIndex = i + j * WIDTH;

      if (candies[nextIndex].color === decidedColor) {
        columnIndices.push(nextIndex);
      } else {
        break;
      }
    }

    if (columnIndices.length >= minNum) {
      for (let index of columnIndices) {
        candies[index].color = blank;
      }
      dispatch(increaseScore(minNum * 10));
    }
  }
};

export const checkForRows = (minNum, candies, dispatch) => {
  for (let i = 0; i < WIDTH * WIDTH; i++) {
    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;
    if (i % WIDTH > WIDTH - minNum) continue;

    const rowIndices = [i];
    for (let j = 1; j < minNum; j++) {
      const nextIndex = i + j;

      if (candies[nextIndex].color === decidedColor) {
        rowIndices.push(nextIndex);
      } else {
        break;
      }
    }

    if (rowIndices.length >= minNum) {
      for (let index of rowIndices) {
        candies[index].color = blank;
      }
      dispatch(increaseScore(minNum * 10));
    }
  }
};

export const moveIntoSquareBelow = (currentCandies) => {
  for (let i = 0; i < WIDTH * WIDTH - WIDTH; i++) {
    const isFirstRow = i < WIDTH;

    if (isFirstRow && currentCandies[i].color === blank) {
      const randomColor =
        CANDYCOLORS[Math.floor(Math.random() * CANDYCOLORS.length)];
      currentCandies[i].color = randomColor;
    }

    if (currentCandies[i + WIDTH].color === blank) {
      currentCandies[i + WIDTH].color = currentCandies[i].color;
      currentCandies[i].color = blank;
    }
  }
};
