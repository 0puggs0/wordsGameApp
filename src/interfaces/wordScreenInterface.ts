export interface WordItem {
  symbol: string;
  backgroundColor: Array<string>;
  borderBackgroundColor: Array<string>;
  textColor: string;
}
export interface KeyboardItem {
  id: number;
  key: number;
  letter: string;
  backgroundColor: string;
  color: string;
  disabled: boolean;
}
