import { randomInt, randomArray, swap, getPivot, isSorted } from './etc'

it('should generate random number in range', () => {
  const upperBound: number = 5;
  const n = randomInt(upperBound)
  expect(n).toBeLessThanOrEqual(upperBound)
})

it('should generate array of n random numbers', () => {
  const n: number = 500;
  const max: number = 5;
  const arr: number[] = randomArray(n, max);

  expect(arr.length).toBe(n);
  for (let n of arr) {
    expect(typeof n).toBe('number');
    expect(n).toBeLessThanOrEqual(max);
  }
})

it('should swap two elements in an array', () => {
  let arr: number[] = [0, 1, 2, 3, 4];
  swap(arr, 0, 1)
  expect(arr[0]).toBe(1)
  expect(arr[1]).toBe(0)

  swap(arr, 2, 4)
  expect(arr[2]).toBe(4)
  expect(arr[4]).toBe(2)
})

it('should return pivot element of array', () => {
  const arr1 = [1, 2, 3, 4, 5, 6, 7]
  let piv = getPivot(arr1, 0, arr1.length)
  expect(piv).toBe(3)

  const arr2 = [1, 2, 3, 4, 5, 6]
  piv = getPivot(arr2, 0, arr2.length)
  expect(piv).toBe(3)


  piv = getPivot(arr2, 2, arr2.length)
  expect(piv).toBe(4)
})

it('should check if arr is sorted', () => {
  const sorted = [2, 3, 4, 5, 6]
  expect(isSorted(sorted)).toBeTruthy()

  const unsorted = [2, 3, 4, 5, 6, 1]
  expect(isSorted(unsorted)).toBeFalsy()
})