import { getRandomInt, randomArray, swap } from './etc'

it('should generate random number in range', () => {
  const upperBound: number = 5;
  const n = getRandomInt(upperBound)
  expect(n).toBeLessThanOrEqual(upperBound)
})

it('should generate array of n random numbers', () => {
  const n: number = 20;
  const max: number = 5;
  const arr: number[] = randomArray(n, max);

  expect(arr.length).toBe(n);
  for (let n of arr) {
    expect(n).toBeLessThanOrEqual(max)
  }
})

it('should swap two elements in an array', () => {
  let arr: number[] = [0, 1, 2, 3, 4];
  arr = swap(arr, 0, 1)
  expect(arr[0]).toBe(1)
  expect(arr[1]).toBe(0)

  arr = swap(arr, 2, 4)
  expect(arr[2]).toBe(4)
  expect(arr[4]).toBe(2)
})