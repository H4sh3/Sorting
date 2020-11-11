import { swap, sleep } from "./etc";

const QUICK_SORT = "Quick Sort";

async function partition(arr: number[], low: number, high: number, updateState: Function) {
  const pivot = arr[Math.floor((high + low) / 2)]
  let index: number = low;
  let j: number = high;
  let comparisons = 0;
  while (index <= j) {
    while (arr[index] < pivot) {
      index++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    comparisons++;
    if (index <= j) {
      swap(arr, index, j);
      index++;
      j--;
      updateState(arr, low, high)
      await sleep(15)
    }
  }
  return { index, comparisons };
}

async function quickSort(arr: number[], low: number, high: number, updateState: Function) {
  let sum = 0;
  if (arr.length > 1) {
    const { index, comparisons } = await partition(arr, low, high, updateState);
    sum += comparisons
    if (low < index - 1) {
      sum += await quickSort(arr, low, index - 1, updateState);
    }
    if (index < high) {
      sum += await quickSort(arr, index, high, updateState);
    }
  }
  return sum;
}

export {
  QUICK_SORT,
  quickSort,
  partition
}