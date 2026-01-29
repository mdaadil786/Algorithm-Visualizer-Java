package com.example.algorithmvisualizer.Services;

import java.util.*;

public class TreeUtils {

    // ✅ TreeNode class
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }

    // ✅ Public method to return steps for animation
    public static List<Map<String, Object>> buildTreeSteps(Integer[] arr) {
        List<Map<String, Object>> steps = new ArrayList<>();
        TreeNode root = build(arr);
        if (root == null) return steps;

        int initialX = 800;      // horizontal center
        int spacing = 400;       // dynamic initial spacing between nodes

        assignCoordinates(root, 0, initialX, spacing, null, null, steps);
        return steps;
    }

    // ✅ Recursive coordinate assignment
    private static void assignCoordinates(TreeNode node, int depth, int x, int spacing,
                                          Integer parentX, Integer parentY,
                                          List<Map<String, Object>> result) {
        if (node == null) return;

        int y = depth * 120 + 50; // vertical spacing

        Map<String, Object> step = new HashMap<>();
        step.put("val", node.val);
        step.put("x", x);
        step.put("y", y);
        step.put("parentX", parentX);
        step.put("parentY", parentY);
        result.add(step);

        // Left and right children with updated spacing
        assignCoordinates(node.left, depth + 1, x - spacing / 2, spacing / 2, x, y, result);
        assignCoordinates(node.right, depth + 1, x + spacing / 2, spacing / 2, x, y, result);
    }

    // ✅ Tree builder from level order input
    private static TreeNode build(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;

        TreeNode root = new TreeNode(arr[0]);
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        int i = 1;
        while (i < arr.length) {
            TreeNode current = queue.poll();

            if (i < arr.length && arr[i] != null) {
                current.left = new TreeNode(arr[i]);
                queue.offer(current.left);
            }
            i++;

            if (i < arr.length && arr[i] != null) {
                current.right = new TreeNode(arr[i]);
                queue.offer(current.right);
            }
            i++;
        }

        return root;
    }

    // ✅ Traversal types
    public static List<Integer> traverse(Integer[] arr, String type) {
        TreeNode root = build(arr);
        List<Integer> result = new ArrayList<>();
        switch (type) {
            case "inorder": inorder(root, result); break;
            case "preorder": preorder(root, result); break;
            case "postorder": postorder(root, result); break;
            case "levelorder": levelOrder(root, result); break;
        }
        return result;
    }

    // ✅ Traversal implementations
    private static void inorder(TreeNode node, List<Integer> res) {
        if (node != null) {
            inorder(node.left, res);
            res.add(node.val);
            inorder(node.right, res);
        }
    }

    private static void preorder(TreeNode node, List<Integer> res) {
        if (node != null) {
            res.add(node.val);
            preorder(node.left, res);
            preorder(node.right, res);
        }
    }

    private static void postorder(TreeNode node, List<Integer> res) {
        if (node != null) {
            postorder(node.left, res);
            postorder(node.right, res);
            res.add(node.val);
        }
    }

    private static void levelOrder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            res.add(node.val);
            if (node.left != null) q.add(node.left);
            if (node.right != null) q.add(node.right);
        }
    }
}
