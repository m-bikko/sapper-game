import { displayPartsToString } from "typescript";
import { createBox } from "./box";
import { generateRandom } from "./getRandom";

export let matrix = [];

function addBombs(bombCount) {
  let currentBombCount = bombCount;

  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  while (currentBombCount) {
    const x = generateRandom(0, matrixWidth - 1);
    const y = generateRandom(0, matrixHeight - 1);

    const matrixElem = matrix[y][x];

    if (!matrixElem) {
      matrix[y][x] = 1;
      currentBombCount--;
    }
  }
}

export function getAllNeighbors(coordinates) {
  const { x, y } = coordinates;

  const n_1 = matrix[y - 1]?.[x];
  const n_2 = matrix[y - 1]?.[x + 1];
  const n_3 = matrix[y]?.[x + 1];
  const n_4 = matrix[y + 1]?.[x + 1];
  const n_5 = matrix[y + 1]?.[x];
  const n_6 = matrix[y + 1]?.[x - 1];
  const n_7 = matrix[y]?.[x - 1];
  const n_8 = matrix[y - 1]?.[x - 1];

  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(
    (item) => typeof item !== "undefined"
  );
}

let startT = new Date().getTime();


export const openAllBoxes = () => {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      }
    });
  });
  let endT = new Date().getTime();
  let elapsedTime = endT - startT;
  var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  var formattedTime = ("0" + hours).slice(-2) + ":" +
                      ("0" + minutes).slice(-2) + ":" +
                      ("0" + seconds).slice(-2);
  let timer =  document.getElementById("timerDisplay");
  timer.textContent = formattedTime;
};


export function createMatrix(width = 8, height = 8, bombCount = 10) {
  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  addBombs(bombCount);

  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newBox = createBox(Boolean(matrixElem), { x, y });
      matrix[y][x] = newBox;
    });
  });
}
