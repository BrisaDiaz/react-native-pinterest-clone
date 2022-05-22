const distributeItemsByNum = (dataList: any[], columns: number) => {
  const lastColumIndex = columns - 1;

  let masonry: Array<unknown[]> = [];
  let currentColumnIndex = 0;

  while (dataList.length) {
    if (!masonry[currentColumnIndex]) {
      masonry[currentColumnIndex] = [dataList.splice(0, 1)[0]];
    } else {
      masonry[currentColumnIndex]?.push(dataList.splice(0, 1)[0]);
    }

    if (lastColumIndex === currentColumnIndex) {
      currentColumnIndex = 0;
    } else {
      currentColumnIndex++;
    }
  }

  return masonry;
};
export default distributeItemsByNum;
