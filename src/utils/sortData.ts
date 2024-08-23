import data from "../constants/russian_output.json";
interface MassItem {
  line: string;
}
export const sortData = () => {
  const typedData: MassItem[] = data as MassItem[];
  const newArr = typedData.filter((item) => {
    if (item.line.length === 5) {
      return item;
    } else {
      return null;
    }
  });
  return newArr;
};
