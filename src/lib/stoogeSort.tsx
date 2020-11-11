import { swap, sleep, random } from "./etc";

const STOOGE_SORT = "Stooge Sort";

async function stoogeSort(arr: number[], s: number, e: number, updateState: Function) {
  let sum = 1;
  if (arr[e - 1] < arr[s]) {
    swap(arr, e - 1, s)
    updateState(arr, e - 1, s)
    if(random(1)>0.95){
      await sleep(1)
    }
  }

  if ((e - s) > 2) {
    const t = Math.floor((e - s) / 3)
    sum += await stoogeSort(arr, s, e - t, updateState)
    sum += await stoogeSort(arr, s + t, e, updateState)
    sum += await stoogeSort(arr, s, e - t, updateState)
  }
  return sum;
}

export {
  stoogeSort,
  STOOGE_SORT
}