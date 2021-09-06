module.exports = function solveSudoku(matrix) {
  const cellNumber = 9;
  const blockSize = 3;

  const findEmpty = (matrix) => {
    for (let x = 0; x < cellNumber; x++) {
      for (let y = 0; y < cellNumber; y++) {
        if (matrix[x][y] === 0) return [x, y];
      }
    }
    return null
  }

  const validate = (num, pos, matrix) => {
    const [x, y] = pos;

    for (let i = 0; i < cellNumber; i++) {
      if (matrix[i][y] === num && i !== x) {
        return false;
      }
    }
    for (let i = 0; i < cellNumber; i++) {
      if (matrix[x][i] === num && i !== y) {
        return false;
      }
    }

    const blockRow = Math.floor(x / blockSize) * blockSize;
    const blockColl =  Math.floor(y / blockSize) * blockSize;

    for (let i = blockRow; i < blockRow + blockSize; i++){
      for (let j = blockColl; j < blockColl + blockSize; j++) {
        if (matrix[i][j] === num && i !== x && j !==y) {
          return false;
        }
      }
    }
    return true;
  }

  const solve = () => {
      const currentPos = findEmpty(matrix);

      if (currentPos === null) {
        return true;
      }

      for (let i = 1; i < cellNumber+1; i++) {
        const currentNum = i;
        const isValid = validate(currentNum, currentPos, matrix);

        if (isValid) {
          const [r, c] = currentPos;
          matrix[r][c] = currentNum;

          if (solve()) {
            return true;
          } else {
            matrix[r][c] = 0;
        }
      }
      
    }
    return false;
  }
  solve ();
	return matrix;
}
