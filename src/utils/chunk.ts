export const chunk = (array: any[], chunkSize: number) => {
  const result: any[] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const ch = array.slice(i, i + chunkSize);
    result.push(ch);
  }

  return result;
};
