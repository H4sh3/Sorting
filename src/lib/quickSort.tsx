import { swap, sleep } from "./etc";

function partition(items: number[], low: number, high: number, updateState: Function = () => { }) {
  const pivot = items[Math.floor((high + low) / 2)]
  let i: number = low;
  let j: number = high;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
      updateState(items)
    }
  }
  return i;
}

async function quickSort(items: number[], low: number, high: number, updateState: Function = () => { }) {
  let index: number;
  if (items.length > 1) {
    index = partition(items, low, high);
    if (low < index - 1) {
      await quickSort(items, low, index - 1, updateState);
    }
    if (index < high) {
      await quickSort(items, index, high, updateState);
    }
  }
  await sleep(25)
  updateState(items)
  return items;
}
// first call to quick sort
export {
  quickSort,
  partition
}