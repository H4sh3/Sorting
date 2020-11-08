function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomArray(n: number, max: number): number[] {
  const arr: number[] = [];
  for (let i: number = 0; i < n; i++) {
    arr.push(getRandomInt(max));
  }
  return arr;
}

function swap(arr: number[], i1: number, i2: number) {
  const tmp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = tmp
  return arr
}

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function getPivot(arr: number[], low: number, high: number) {
  return arr[Math.floor((low+high) / 2) - 1]
}

function isSorted(arr: number[]) {
  for (let i: number = 0; i < arr.length - 1; i++) {
    const e1 = arr[i]
    const e2 = arr[i + 1]
    if (e2 < e1) {
      return false
    }
    i++;
  }
  return true
}

export {
  getRandomInt,
  randomArray,
  swap,
  sleep,
  getPivot,
  isSorted
}