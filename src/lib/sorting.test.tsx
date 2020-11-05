import { bubbleSort } from './sorting';

it('should sort array with bubbleSort', () => {
  const unsorted = [5, 2, 1, 0, 0, 0, 4, 2, 10, 25]
  const sorted = bubbleSort(unsorted)
  console.log(sorted)
})