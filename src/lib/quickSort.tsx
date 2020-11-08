import { swap, sleep } from "./etc";

function partition(items: number[], left: number, right: number, updateState: Function = () => { }) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      items = swap(items, i, j); //sawpping two elements
      i++;
      j--;
      updateState(items)
    }
  }
  return i;
}

async function quickSort(items: number[], left: number, right: number, updateState: Function = () => { }) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      await quickSort(items, left, index - 1, updateState);
    }
    if (index < right) { //more elements on the right side of the pivot
      await quickSort(items, index, right, updateState);
    }
  }
  await sleep(25)
  updateState(items)
  return items;
}
// first call to quick sort
export {
  quickSort
}