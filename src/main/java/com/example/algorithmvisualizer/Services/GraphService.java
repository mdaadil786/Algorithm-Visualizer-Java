package com.example.algorithmvisualizer.Services;

import java.util.*;

public class GraphService {

    // Adjacency list graph representation
    private final Map<Integer, List<Integer>> graph = new HashMap<>();

    // Add a single edge (undirected)
    public void addEdge(int u, int v) {
        graph.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
        graph.computeIfAbsent(v, k -> new ArrayList<>()).add(u); // Undirected
    }

    // Add multiple edges (used by controller)
    public void buildGraph(List<List<Integer>> edges) {
        graph.clear();
        for (List<Integer> edge : edges) {
            if (edge.size() == 2) {
                addEdge(edge.get(0), edge.get(1));
            }
        }
    }

    // BFS Traversal
    public List<Integer> bfs(int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();

        queue.offer(start);
        visited.add(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            result.add(node);

            for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    queue.offer(neighbor);
                    visited.add(neighbor);
                }
            }
        }
        return result;
    }

    // DFS Traversal
    public List<Integer> dfs(int start) {
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        dfsHelper(start, visited, result);
        return result;
    }

    private void dfsHelper(int node, Set<Integer> visited, List<Integer> result) {
        visited.add(node);
        result.add(node);

        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfsHelper(neighbor, visited, result);
            }
        }
    }

    // Optional: Build a default sample graph
    public void buildSampleGraph() {
        graph.clear();
        addEdge(0, 1);
        addEdge(0, 2);
        addEdge(1, 3);
        addEdge(2, 4);
        addEdge(2, 5);
    }
}
