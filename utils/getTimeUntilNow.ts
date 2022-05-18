function msTotoDecomposedDate(milliseconds: number) {
  const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)) % 365);
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return {
    seconds,
    minutes,
    hours,
    days,
    years,
  };
}

export function getTimeUntilNow(date: string) {
  const currentDateInMS = new Date(Date.now()).getTime();
  const dateInMS = new Date(date).getTime();
  const difference = currentDateInMS - dateInMS;

  return msTotoDecomposedDate(difference);
}
export function getMaxTimeUnit(date: string) {
  const { seconds, minutes, hours, days, years } = getTimeUntilNow(date);
  if (years) return years + " y";
  if (days) return days + " d";
  if (hours) return hours + " h";
  if (minutes) return minutes + " m";
  return seconds + " s";
}
