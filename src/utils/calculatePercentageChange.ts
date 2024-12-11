import { roundNumber } from "./roundNumber";

export const calculatePercentageChange = (
    current: number | null,
    previous: number | null
  ): { value: number; levelUp: boolean; levelDown: boolean } => {
    if (current === null || previous === null || previous === 0) {
      return { value: 0, levelUp: false, levelDown: false };
    }
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(roundNumber(change)),
      levelUp: change > 0,
      levelDown: change < 0,
    };
  };