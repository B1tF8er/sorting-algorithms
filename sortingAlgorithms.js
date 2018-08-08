(function sortingAlgorithmsModule(totalItems) {
    /**
     * Names of the algorithms
     */
    const names = {
        BubbleSort: 'Bubble sort',
        InsertionSort: 'Insertion sort',
        SelectionSort: 'Selection sort',
        MergeSort: 'Merge sort',
        QuickSort: 'Quick sort'
    };

    /**
     * Types of algorithms
     */
    const types = {
        Linear: 'Linear',
        Divide: 'Divide and conquer'
    };

    /**
     * LINEAR
     * Worst case performance: O(n^2) - not good for large unsorted data sets
     * Average case performance: O(n^2) - not good for large unsorted data sets
     * Best case performance: O(n) - good for small and nearly sorted data sets
     * Space required: O(n) - no space allocations needed because it operates in the input array
     */
    let bubbleSort = (function bubbleSortModule() {
        function sort(items) {
            var swapped;

            do {
                swapped = false;
                for (var i = 0; i < items.length - 1; i++) {
                    if (items[i] > items[i + 1]) {
                        var temp = items[i];
                        items[i] = items[i + 1];
                        items[i + 1] = temp;
                        swapped = true;
                    }
                }
            } while (swapped);

            return items;
        }

        const API = {
            name: names.BubbleSort,
            sort: sort,
            type: types.Linear
        };

        return API;
    })();

    /**
     * LINEAR
     * Worst case performance: O(n^2) - not good for large unsorted data sets
     * Average case performance: O(n^2) - not good for large unsorted data sets
     * Best case performance: O(n) - good for small and nearly sorted data sets
     * Space required: O(n) - no space allocations needed because it operates in the input array
     */
    let insertionSort = (function insertionSortModule() {
        function swap(array, i, j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        function sort(items) {

            for (var i = 0; i < items.length; i++) {
                var min = i;
                for (var j = i + 1; j < items.length; j++) {
                    if (items[j] < items[min]) {
                        min = j;
                    }
                }
                if (i !== min) {
                    swap(items, i, min);
                }
            }

            return items;
        }

        const API = {
            name: names.InsertionSort,
            sort: sort,
            type: types.Linear
        };

        return API;
    })();

    /**
     * LINEAR
     * Worst case performance: O(n^2) - not good for large unsorted data sets
     * Average case performance: O(n^2) - not good for large unsorted data sets, better than bubble worse than insertion
     * Best case performance: O(n^2) - not good for large unsorted data sets
     * Space required: O(n) - no space allocations needed because it operates in the input array
     */
    let selectionSort = (function selectionSortModule() {
        function sort(items) {
            for (var i = 0; i < items.length; i++) {
                var temp = items[i];
                var j = i - 1;
                while (j >= 0 && items[j] > temp) {
                    items[j + 1] = items[j];
                    j--;
                }
                items[j + 1] = temp;
            }

            return items;
        }

        const API = {
            name: names.SelectionSort,
            sort: sort,
            type: types.Linear
        };

        return API;
    })();

    /**
     * DIVIDE AND CONQUER
     * Worst case performance: O(n log n) - good for large unsorted data sets, data splitting means the algorithm can be made parallel
     * Average case performance: O(n log n) - good for large unsorted data sets
     * Best case performance: O(n log n) - good for large unsorted data sets, because whether the data is sorted or not it has to split the data into smaller arrays and recosntruct them 
     * Space required: O(n) - a lot of space requeried due the the data splits made into smaller arrays
     */
    let mergeSort = (function mergeSortModule() {
        function mergeTopDown(left, right) {
            var array = [];

            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    array.push(left.shift());
                } else {
                    array.push(right.shift());
                }
            }
            return array.concat(left.slice()).concat(right.slice());
        }

        function sort(items) {
            if (items.length < 2) {
                return items;
            }

            var middle = Math.floor(items.length / 2);
            var left = items.slice(0, middle);
            var right = items.slice(middle);

            return mergeTopDown(sort(left), sort(right));
        }

        const API = {
            name: names.MergeSort,
            sort: sort,
            type: types.Divide
        };
        return API;
    })();

    /**
     * DIVIDE AND CONQUER
     * Worst case performance: O(n^2) - not good for large sorted (inverse sorted) data sets
     * Average case performance: O(n log n) - good for large unsorted data sets
     * Best case performance: O(n log n) - good for small and nearly sorted data sets
     * Space required: O(n) - no space allocations needed because it operates in the input array
     */
    let quickSort = (function quickSortModule() {
        function swap(array, i, j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        function partitionHoare(array, left, right) {
            var pivot = Math.floor((left + right) / 2);

            while (left <= right) {
                while (array[left] < array[pivot]) {
                    left++;
                }
                while (array[right] > array[pivot]) {
                    right--;
                }
                if (left <= right) {
                    swap(array, left, right);
                    left++;
                    right--;
                }
            }
            return left;
        }

        function partitionLomuto(array, left, right) {
            var pivot = right;
            var i = left;

            for (var j = left; j < right; j++) {
                if (array[j] <= array[pivot]) {
                    swap(array, i, j);
                    i = i + 1;
                }
            }
            swap(array, i, j);
            return i;
        }

        function quicksort(array, left, right) {
            left = left || 0;
            right = right || array.length - 1;

            // var pivot = partitionLomuto(array, left, right); // you can play with both partition
            var pivot = partitionHoare(array, left, right); // you can play with both partition

            if (left < pivot - 1) {
                quicksort(array, left, pivot - 1);
            }
            if (right > pivot) {
                quicksort(array, pivot, right);
            }
            return array;
        }

        function sort(items) {
            if (items.length < 2) {
                return items;
            }

            var pivot = items[0];
            var lesser = [];
            var greater = [];

            for (var i = 1; i < items.length; i++) {
                if (items[i] < pivot) {
                    lesser.push(items[i]);
                } else {
                    greater.push(items[i]);
                }
            }

            return sort(lesser).concat(pivot, sort(greater));
        }

        const API = {
            name: names.QuickSort,
            sort: sort,
            type: types.Divide
        };

        return API;
    })();

    /**
     * Runs all sorting algorithms
     */
    (function testSortingAlgorithms() {
        const createValues = () => {
            let items = [];

            for (let i = 0; i < totalItems; i++) {
                items[i] = Math.floor(Math.random() * Math.floor(totalItems));
            }

            return items;
        };

        (function run() {
            console.log(`total items: ${totalItems}`);

            [bubbleSort, insertionSort, selectionSort, mergeSort, quickSort].forEach(algorithm => {
                console.time(`${algorithm.type} - ${algorithm.name}`);
                algorithm.sort(createValues());
                console.timeEnd(`${algorithm.type} - ${algorithm.name}`);
            });
        })();
    })();
})(Math.round(Math.random() * 10000));
