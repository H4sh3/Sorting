import { sleep } from "./etc";

const STOOGE_SORT = "Stooge Sort";

async function stoogeSort(arr: number[], s: number, e: number, updateState: Function) {
  if (arr[e - 1] < arr[s]) {
    const tmp: number = arr[s];
    arr[s] = arr[e - 1]
    arr[e - 1] = tmp
    updateState(arr, s, e - 1)
    await sleep(1)
  }

  if ((e - s) > 2) {
    const t = Math.floor((e - s) / 3)
    await stoogeSort(arr, s, e - t, updateState)
    await stoogeSort(arr, s + t, e, updateState)
    await stoogeSort(arr, s, e - t, updateState)
  }
}

export {
  stoogeSort,
  STOOGE_SORT
}