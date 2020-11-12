import { swap, sleep } from './etc';

const QUICK_SORT = 'Quick Sort';

async function partition(arr: number[], start: number, end: number, updateState: Function) {
  // Use last element as the pivot
  const pivotValue = arr[end];
  let index: number = start;
  let sum: number = 0;
  for (let i = start; i < end; i++) {
    sum++;
    if (arr[i] < pivotValue) {
      swap(arr, i, index)
      index++;
      updateState(arr, start, end)
      await sleep(5)
    }
  }

  swap(arr, index, end)
  return { index, sum };
};

async function quickSort(arr: number[], start: number, end: number, updateState: Function) {
  let comparisons = 0;
  if (start >= end) {
    // Base case or terminating case
    return 0;
  }

  let { index, sum } = await partition(arr, start, end, updateState);

  sum += await quickSort(arr, start, index - 1, updateState);
  sum += await quickSort(arr, index + 1, end, updateState);

  comparisons += sum
  return comparisons
}

export {
  QUICK_SORT,
  quickSort,
  partition
}