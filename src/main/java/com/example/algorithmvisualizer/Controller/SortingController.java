package com.example.algorithmvisualizer.Controller;

import com.example.algorithmvisualizer.Services.SortingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sort")
@CrossOrigin(origins = "*")
public class SortingController {

    private final SortingService sortingService;

    public SortingController(SortingService sortingService) {
        this.sortingService = sortingService;
    }

    @PostMapping("/bubble")
    public List<int[]> bubbleSort(@RequestBody int[] array) {
        return sortingService.bubbleSort(array);
    }
    @PostMapping("/selection")
    public List<int[]> selectionSort(@RequestBody int[] array) {
        return sortingService.selectionSort(array);
    }

    @PostMapping("/insertion")
    public List<int[]> insertionSort(@RequestBody int[] array) {
        return sortingService.insertionSort(array);
    }
    @PostMapping("/merge")
    public List<int[]> mergeSort(@RequestBody int[] array) {
        return sortingService.mergeSort(array);
    }

    @PostMapping("/quick")
    public List<int[]> quickSort(@RequestBody int[] array) {
        return sortingService.quickSort(array);
    }

    @PostMapping("/heap")
    public List<int[]> heapSort(@RequestBody int[] array) {
        return sortingService.heapSort(array);
    }

    @PostMapping("/radix")
    public List<int[]> radixSort(@RequestBody int[] array) {
        return sortingService.radixSort(array);
    }

}
