import { swap, sleep } from "./etc";

const QUICK_SORT = "Quick Sort";

async function partition(arr: number[], low: number, high: number, updateState: Function) {
  const pivot = arr[Math.floor((high + low) / 2)]
  let i: number = low;
  let j: number = high;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
      updateState(arr, low, high)
      await sleep(15)
    }
  }
  return i;
}

async function quickSort(arr: number[], low: number, high: number, updateState: Function) {
  let index: number;
  if (arr.length > 1) {
    index = await partition(arr, low, high, updateState);
    if (low < index - 1) {
      await quickSort(arr, low, index - 1, updateState);
    }
    if (index < high) {
      await quickSort(arr, index, high, updateState);
    }
  }
  return arr;
}

export {
  QUICK_SORT,
  quickSort,
  partition
}