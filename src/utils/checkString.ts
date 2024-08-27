import { WordItem } from "../interfaces/wordScreenInterface";

export const checkString = (
  data: string,
  word: Array<WordItem[]>,
  currentRow: number
) => {
  const newArr = [];
  const currentWord = [...word];
  const input = currentWord[currentRow].map((item) => item.symbol).join("");
  const correctCounts: any = {};

  for (let i = 0; i < input.length; i++) {
    if (input[i] === data[i]) {
      newArr.push({ index: i, color: "green", symbol: input[i] });
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
      correctCounts[input[i]] = (correctCounts[input[i]] || 0) + 1;
    }
  }
  return newArr;
};
