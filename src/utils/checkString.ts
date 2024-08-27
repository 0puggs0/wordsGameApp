import { KeyboardItem, WordItem } from "../interfaces/wordScreenInterface";

export const checkString = (
  data: string,
  word: Array<WordItem[]>,
  currentRow: number,
  russianKeyboardData: KeyboardItem[],
  setRussianKeyboardData: (keyboard: KeyboardItem[]) => void
) => {
  const newArr = [];
  const currentKeyboard = [...russianKeyboardData];
  const currentWord = [...word];
  const input = currentWord[currentRow].map((item) => item.symbol).join("");
  const correctCounts: any = {};

  for (let i = 0; i < input.length; i++) {
    if (input[i] === data[i]) {
      newArr.push({ index: i, color: "green", symbol: input[i] });
      currentKeyboard.forEach((item) => {
        if (item.letter === input[i]) {
          item.backgroundColor = "#02C39A";
        }
      });
      if (correctCounts[input[i]]) {
        correctCounts[input[i]]++;
      } else {
        correctCounts[input[i]] = 1;
      }
    }
  }
  for (let i = 0; i < input.length; i++) {
    if (
      input[i] !== data[i] &&
      data.includes(input[i]) &&
      (!correctCounts[input[i]] ||
        correctCounts[input[i]] < data.split(input[i]).length - 1)
    ) {
      newArr.push({ index: i, color: "yellow", symbol: input[i] });
      currentKeyboard.forEach((item) => {
        if (item.letter === input[i]) {
          item.backgroundColor = "#D9B952";
        }
      });
      correctCounts[input[i]] = (correctCounts[input[i]] || 0) + 1;
    }
  }
  setRussianKeyboardData(currentKeyboard);

  return newArr;
};
