import { bubbleSort } from './bubbleSort';
import { isSorted } from './etc';

it('should sort array with bubbleSort', async () => {
  const unsorted = [5, 2, 1, 0, 0, 0, 4, 2, 10, 25];
  const sorted = await bubbleSort(unsorted, () => { });
  expect(isSorted(sorted)).toBeTruthy();
})