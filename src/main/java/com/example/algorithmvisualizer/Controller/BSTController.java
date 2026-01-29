package com.example.algorithmvisualizer.Controller;

import com.example.algorithmvisualizer.models.TreeNode;
import com.example.algorithmvisualizer.Services.BSTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bst")
@CrossOrigin(origins = "*")
public class BSTController {

    @Autowired
    private BSTService bstService;

    @PostMapping("/build")
    public TreeNode buildTree(@RequestBody int[] values) {
        return bstService.build(values);
    }

    @PostMapping("/insert")
    public TreeNode insert(@RequestParam int val) {
        return bstService.insert(val);
    }

    @DeleteMapping("/delete")
    public TreeNode delete(@RequestParam int val) {
        return bstService.delete(val);
    }

    @GetMapping("/search")
    public boolean search(@RequestParam int val) {
        return bstService.search(val);
    }

    @GetMapping("/tree")
    public TreeNode getTree() {
        return bstService.getTree();
    }
}
