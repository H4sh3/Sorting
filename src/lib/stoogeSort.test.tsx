import { stoogeSort } from './stoogeSort';
import { isSorted } from './etc';

it('should sort array with stoogeSort', async () => {
  const arr = [5, 2, 1, 0, 0, 0, 4,23,21,51,6,3,2,1,7,83,4,53,23,423,65,4,2,7,675,675,435,853,2, 2, 10, 25,1];
  await stoogeSort(arr, 0, arr.length, () => { });
  expect(isSorted(arr)).toBeTruthy();
})