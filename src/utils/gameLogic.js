import blank from "../images/blank.png"; 
const WIDTH = 8; // Kích thước của bảng game

/**
 * Kiểm tra và xử lý các cột có ít nhất 'num' viên kẹo cùng màu liên tiếp.
 * @param {number} num - Số lượng viên kẹo liên tiếp cần kiểm tra.
 * @param {Array} candies - Mảng chứa thông tin về các viên kẹo trên bảng.
 */
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

/**
 * Kiểm tra và xử lý các hàng có ít nhất 'num' viên kẹo cùng màu liên tiếp.
 * @param {number} num - Số lượng viên kẹo liên tiếp cần kiểm tra.
 * @param {Array} candies - Mảng chứa thông tin về các viên kẹo trên bảng.
 */
export const checkForRows = (num, candies) => {
  for (let i = 0; i < WIDTH * WIDTH; i++) {
    // Kiểm tra nếu 'i' nằm trong một hàng hợp lệ
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
