import { partition, quickSort } from "./quickSort";
import { isSorted, randomArray } from "./etc";


it('should return partition', async () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const p = await partition(arr, 0, arr.length, () => { })
  expect(p).toBe(6)
})

it('should sort quickly', async () => {
  const arr = [3, 4, 6, 1, 78, 223, 156, 22, 1, 23, 2];
  await quickSort(arr, 0, arr.length, () => { })
  expect(isSorted(arr)).toBeTruthy()
})

it('mass test', async () => {

  for(let i = 0;i < 5;i++){
    const arr = randomArray(150,100);   
    await quickSort(arr, 0, arr.length, () => { })
    expect(arr).toBeTruthy()
  }
})