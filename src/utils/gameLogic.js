import blank from "../images/blank.png"; 
const WIDTH = 8;

export const checkForColumns = (num, candies) => {
  for (let i = 0; i < WIDTH * WIDTH - (num - 1) * WIDTH; i++) {
    const columnIndices = [];

    for (let j = 0; j < num; j++) {
      columnIndices.push(i + j * WIDTH);
    }

    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;

    if (columnIndices.every(index => candies[index].color === decidedColor)) {
      for (let index of columnIndices) {
        candies[index].color = blank;
      }
    }
  }
};


export const checkForRows = (num, candies) => {
  for (let i = 0; i < WIDTH * WIDTH; i++) {
    if (i % WIDTH > WIDTH - num) continue;

    const rowIndices = [];
    for (let j = 0; j < num; j++) {
      rowIndices.push(i + j);
    }

    const decidedColor = candies[i].color;
    if (decidedColor === blank) continue;

    if (rowIndices.every(index => candies[index].color === decidedColor)) {
      for (let index of rowIndices) {
        candies[index].color = blank;
      }
    }
  }
};
