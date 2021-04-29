import { sleep } from "./etc"

const MERGE_SORT: string = 'Merge Sort'

async function mergeSort(arr: number[], start: number, end: number, updateState: Function) {
  if (arr.length <= 1) {
    return arr
  }

  let left: number[] = []
  let right: number[] = []

  // split array in half
  arr.forEach((e: number, index: number) => {
    if (index < Math.floor(arr.length / 2)) {
      left.push(e)
    } else {
      right.push(e)
    }
  });

  left = await mergeSort(left, start, Math.floor(end / 2), updateState)
  right = await mergeSort(right, Math.floor(end / 2), end, updateState)

  //await sleep(15)
  updateState(left, start, Math.floor(end / 2), 0)
  updateState(right, Math.floor(end / 2), end, 0)

  return await merge(left, right, start, end, updateState)
}

async function merge(left: number[], right: number[], start: number, end: number, updateState: Function): Promise<number[]> {
  let res: number[] = [];
  let comparisons: number = 0
  while (left.length > 0 && right.length > 0) {
    comparisons += 1
    if (left[0] <= right[0]) {
      const el = left.shift();
      if (el !== undefined) {
        res.push(el)
      }
    } else {
      const el = right.shift();
      if (el !== undefined) {
        res.push(el)
      }
    }
  }

  // add rest to result
  if (left.length > 0) {
    res = [...res, ...left]
  }

  if (right.length > 0) {
    res = [...res, ...right]
  }

  await sleep(15)
  updateState(res, start, end, comparisons)

  return res;
}

export {
  mergeSort,
  merge,
  MERGE_SORT
}