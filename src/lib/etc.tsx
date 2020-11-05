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

export {
  getRandomInt,
  randomArray,
  swap
}