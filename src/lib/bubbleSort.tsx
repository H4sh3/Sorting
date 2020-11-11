import { swap, sleep } from './etc'

const BUBBLE_SORT = "Bubble Sort";

async function bubbleSort(arr: number[], updateState: Function) {
  let counter: number = 0;
  for (let n: number = arr.length; n > 1; --n) {
    for (let i: number = 0; i < n - 1; ++i) {
      counter += 1
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
      }
    }
    updateState(arr, 0, n, counter)
    await sleep(10);
  }
  return counter;
}

export {
  bubbleSort,
  BUBBLE_SORT
}