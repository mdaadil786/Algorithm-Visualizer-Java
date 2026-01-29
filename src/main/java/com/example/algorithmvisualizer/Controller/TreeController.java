package com.example.algorithmvisualizer.Controller;

import com.example.algorithmvisualizer.Services.TreeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/tree")
@CrossOrigin(origins = "*")
public class TreeController {

    @PostMapping("/build")
    public List<Map<String, Object>> buildTree(@RequestBody Map<String, Object> body) {
        List<Integer> levelOrderList = (List<Integer>) body.get("levelOrder");
        Integer[] levelOrder = levelOrderList.toArray(new Integer[0]);
        return TreeUtils.buildTreeSteps(levelOrder);
    }

    @PostMapping("/{type}")
    public List<Integer> traverse(@PathVariable String type, @RequestBody Map<String, Object> body) {
        List<Integer> levelOrderList = (List<Integer>) body.get("levelOrder");
        Integer[] levelOrder = levelOrderList.toArray(new Integer[0]);
        return TreeUtils.traverse(levelOrder, type);
    }
}
