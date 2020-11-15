import { mergeSort, merge } from "./mergeSort";
import { isSorted, randomArray } from "./etc";

it('should sort an array with merge sort', async () => {
  const arr: number[] = [0, 23, 1, 5, 2, 1, 6, 78, 21, 5, 32];
  const sorted = await mergeSort(arr, 0, 0, () => { })
  expect(isSorted(sorted)).toBeTruthy()
})


it('should merge two lists', async () => {
  const arr1: number[] = [4, 2];
  const arr2: number[] = [0, 5, 7];
  const merged = await merge(arr1, arr2, 0, 0, () => { })
  expect(isSorted(merged)).toBeTruthy()
})

it('mass test', async () => {
  for (let i = 0; i < 10; i++) {
    const arr = randomArray(10, 100);
    const sorted = await mergeSort(arr, 0, arr.length-1, () => { });
    
    sorted.forEach(e => {
      expect(typeof (e)).toBe('number');
    })

    expect(isSorted(sorted)).toBeTruthy();
  }
}) 