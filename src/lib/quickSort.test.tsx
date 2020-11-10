import { partition, quickSort } from "./quickSort";
import { isSorted } from "./etc";


it('should return partition', async () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const p = await partition(arr, 0, arr.length, () => { })
  expect(p).toBe(6)
})

it('should sort quickly', async () => {
  const arr = [3, 4, 6, 1, 78, 223, 156, 22, 1, 23, 2];
  const sorted = await quickSort(arr, 0, arr.length, () => { })
  expect(isSorted(sorted)).toBeTruthy()
})