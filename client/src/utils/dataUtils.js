export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const string = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  return string;
};

export const formatTemperature = (temp) => `${(Number(temp) * 9) / 5 + 32}°F`;
