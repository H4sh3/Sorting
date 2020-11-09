import { swap, sleep } from './etc'

const BUBBLE_SORT = "Bubble Sort";

async function bubbleSort(arr: number[], updateState: Function) {
  for (let n: number = arr.length; n > 1; --n) {
    for (let i: number = 0; i < n - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
      }
    }
    updateState(arr, 0, n)
    await sleep(10);
  }
  return arr;
}

export {
  bubbleSort,
  BUBBLE_SORT
}