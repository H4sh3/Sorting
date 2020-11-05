import { swap } from './etc'

function bubbleSort(arr: number[]) {
  for (let n: number = arr.length; n > 1; --n) {
    for (let i: number = 0; i < n - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
        arr = swap(arr, i, i + 1)
      }
    }
  }
  return arr;
}

export {
  bubbleSort
}