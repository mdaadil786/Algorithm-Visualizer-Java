package com.example.algorithmvisualizer.Services;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class SortingService {

    public List<int[]> bubbleSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));

        for (int i = 0; i < a.length - 1; i++) {
            for (int j = 0; j < a.length - i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                    steps.add(Arrays.copyOf(a, a.length)); // Save step
                }
            }
        }

        return steps;
    }

    public List<int[]> selectionSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));

        for (int i = 0; i < a.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int temp = a[i];
                a[i] = a[minIdx];
                a[minIdx] = temp;
                steps.add(Arrays.copyOf(a, a.length));
            }
        }

        return steps;
    }

    public List<int[]> insertionSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));

        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
                steps.add(Arrays.copyOf(a, a.length));
            }
            a[j + 1] = key;
            steps.add(Arrays.copyOf(a, a.length));
        }

        return steps;
    }
    public List<int[]> mergeSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));
        mergeSortHelper(a, 0, a.length - 1, steps);
        return steps;
    }

    private void mergeSortHelper(int[] a, int left, int right, List<int[]> steps) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSortHelper(a, left, mid, steps);
            mergeSortHelper(a, mid + 1, right, steps);
            merge(a, left, mid, right, steps);
        }
    }

    private void merge(int[] a, int left, int mid, int right, List<int[]> steps) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];

        for (int i = 0; i < n1; i++) L[i] = a[left + i];
        for (int i = 0; i < n2; i++) R[i] = a[mid + 1 + i];

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                a[k++] = L[i++];
            } else {
                a[k++] = R[j++];
            }
            steps.add(Arrays.copyOf(a, a.length));
        }

        while (i < n1) {
            a[k++] = L[i++];
            steps.add(Arrays.copyOf(a, a.length));
        }
        while (j < n2) {
            a[k++] = R[j++];
            steps.add(Arrays.copyOf(a, a.length));
        }
    }
    public List<int[]> quickSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));
        quickSortHelper(a, 0, a.length - 1, steps);
        return steps;
    }

    private void quickSortHelper(int[] a, int low, int high, List<int[]> steps) {
        if (low < high) {
            int pi = partition(a, low, high, steps);
            quickSortHelper(a, low, pi - 1, steps);
            quickSortHelper(a, pi + 1, high, steps);
        }
    }

    private int partition(int[] a, int low, int high, List<int[]> steps) {
        int pivot = a[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (a[j] < pivot) {
                i++;
                int temp = a[i]; a[i] = a[j]; a[j] = temp;
                steps.add(Arrays.copyOf(a, a.length));
            }
        }
        int temp = a[i + 1]; a[i + 1] = a[high]; a[high] = temp;
        steps.add(Arrays.copyOf(a, a.length));
        return i + 1;
    }
    public List<int[]> heapSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));

        int n = a.length;

        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(a, n, i, steps);
        }

        for (int i = n - 1; i >= 0; i--) {
            int temp = a[0]; a[0] = a[i]; a[i] = temp;
            steps.add(Arrays.copyOf(a, a.length));
            heapify(a, i, 0, steps);
        }

        return steps;
    }

    private void heapify(int[] a, int n, int i, List<int[]> steps) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;

        if (largest != i) {
            int swap = a[i]; a[i] = a[largest]; a[largest] = swap;
            steps.add(Arrays.copyOf(a, a.length));
            heapify(a, n, largest, steps);
        }
    }
    public List<int[]> radixSort(int[] arr) {
        List<int[]> steps = new ArrayList<>();
        int[] a = Arrays.copyOf(arr, arr.length);
        steps.add(Arrays.copyOf(a, a.length));

        int max = Arrays.stream(a).max().orElse(0);

        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(a, exp, steps);
        }

        return steps;
    }

    private void countingSortByDigit(int[] a, int exp, List<int[]> steps) {
        int n = a.length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int i = 0; i < n; i++) {
            count[(a[i] / exp) % 10]++;
        }

        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {
            int idx = (a[i] / exp) % 10;
            output[count[idx] - 1] = a[i];
            count[idx]--;
        }

        for (int i = 0; i < n; i++) {
            a[i] = output[i];
            steps.add(Arrays.copyOf(a, a.length));
        }
    }


}
