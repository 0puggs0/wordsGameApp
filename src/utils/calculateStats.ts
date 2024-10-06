import { UserData } from "../interfaces/getUser";

export const calculateStats = (data: UserData | undefined) => {
  let count = 0;
  let bool = false;
  const statsData = data?.stats.reduce(
    (acc, cur) => {
      if (!cur.isWin) {
        bool = true;
      }
      if (cur.isWin) {
        if (!bool) {
          acc.currentStreak++;
        }
        count++;
        acc.maxStreak = Math.max(count, acc.maxStreak);
        acc.percentOfWins = (count / Object.keys(data?.stats).length) * 100;
        return acc;
      }

      count = 0;

      return acc;
    },
    { currentStreak: 0, maxStreak: 0, percentOfWins: 0 }
  );
  return statsData;
};
