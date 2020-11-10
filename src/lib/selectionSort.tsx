import { swap, sleep } from "./etc";

const SELECTION_SORT = "Selection Sort";

async function selectionSort(arr: number[], updateState: Function) {
  for (let startIndex = 0; startIndex < arr.length; startIndex++) {
    let smallest: number = Infinity;
    let smallestIndex: number = startIndex;
    for (let i = startIndex; i < arr.length; i++) {
      if (arr[i] < smallest) {
        smallest = arr[i];
        smallestIndex = i;
      }
    }
    swap(arr, startIndex, smallestIndex)
    updateState(arr, startIndex, arr.length)
    await sleep(9)
  }
  return arr;
}

export {
  selectionSort,
  SELECTION_SORT
}