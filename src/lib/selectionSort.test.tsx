import { selectionSort } from './selectionSort';
import { isSorted } from './etc';

it('should sort array with selectionSort', async () => {
  const unsorted = [5, 2, 1, 0, 0, 0, 4, 2, 10, 25];
  const sorted = await selectionSort(unsorted, () => { });
  expect(isSorted(sorted)).toBeTruthy();
})