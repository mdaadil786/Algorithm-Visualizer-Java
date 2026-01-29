package com.example.algorithmvisualizer.Controller;

import com.example.algorithmvisualizer.Services.GraphService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final GraphService graphService = new GraphService();

    public GraphController() {
        // graphService.buildSampleGraph(); // REMOVE THIS
    }

    @PostMapping("/build")
    public void buildGraph(@RequestBody List<List<Integer>> edges) {
        graphService.buildGraph(edges);
    }

    @GetMapping("/dfs")
    public List<Integer> getDFS(@RequestParam int start) {
        return graphService.dfs(start);
    }

    @GetMapping("/bfs")
    public List<Integer> getBFS(@RequestParam int start) {
        return graphService.bfs(start);
    }
}
