package com.example.algorithmvisualizer.Services;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SearchingService {

    // Linear Search with steps (each step shows current index and if found)
    public List<Map<String, Object>> linearSearch(int[] arr, int target) {
        List<Map<String, Object>> steps = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            Map<String, Object> step = new HashMap<>();
            step.put("array", Arrays.copyOf(arr, arr.length));
            step.put("currentIndex", i);
            step.put("found", arr[i] == target);
            steps.add(step);

            if (arr[i] == target) break;
        }

        return steps;
    }
    // SearchingService.java
        public List<Map<String, Object>> binarySearch(int[] arr, int target) {
            List<Map<String, Object>> steps = new ArrayList<>();
            int left = 0, right = arr.length - 1;

            while (left <= right) {
                int mid = left + (right - left) / 2;

                Map<String, Object> step = new HashMap<>();
                step.put("array", Arrays.copyOf(arr, arr.length));
                step.put("left", left);
                step.put("right", right);
                step.put("mid", mid);
                step.put("found", arr[mid] == target);
                steps.add(step);

                if (arr[mid] == target) {
                    break;
                } else if (arr[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return steps;
        }

    }