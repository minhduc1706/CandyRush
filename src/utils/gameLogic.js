import { increaseScore } from "../features/candies/candiesActions";
import blank from "../images/blank.png";
import { WIDTH, CANDYCOLORS } from "../constants/constants";

export const checkForColumns = (num, candies, dispatch) => {
  for (let i = 0; i < WIDTH * WIDTH - (num - 1) * WIDTH; i++) {
    const columnIndices = [];

    for (let j = 0; j < num; j++) {
      columnIndices.push(i + j * WIDTH);
    }

    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;

    if (columnIndices.every((index) => candies[index].color === decidedColor)) {
      for (let index of columnIndices) {
        candies[index].color = blank;
      }
      dispatch(increaseScore(num * 10));
    }
  }
};

export const checkForRows = (num, candies, dispatch) => {
  for (let i = 0; i < WIDTH * WIDTH; i++) {
    if (i % WIDTH > WIDTH - num) continue;

    const rowIndices = [];
    for (let j = 0; j < num; j++) {
      rowIndices.push(i + j);
    }

    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;

    if (rowIndices.every((index) => candies[index].color === decidedColor)) {
      for (let index of rowIndices) {
        candies[index].color = blank;
      }
      dispatch(increaseScore(num * 10));
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
