package com.example.algorithmvisualizer.Services;

import com.example.algorithmvisualizer.models.TreeNode;
import org.springframework.stereotype.Service;

@Service
public class BSTService {
    private TreeNode root;

    public TreeNode build(int[] values) {
        root = null;
        for (int val : values) {
            root = insert(root, val);
        }
        return root;
    }

    public TreeNode insert(int val) {
        root = insert(root, val);
        return root;
    }

    public TreeNode delete(int val) {
        root = delete(root, val);
        return root;
    }

    public boolean search(int val) {
        return search(root, val);
    }

    public TreeNode getTree() {
        return root;
    }

    private TreeNode insert(TreeNode node, int val) {
        if (node == null) return new TreeNode(val);
        if (val < node.val) node.left = insert(node.left, val);
        else node.right = insert(node.right, val);
        return node;
    }

    private TreeNode delete(TreeNode node, int val) {
        if (node == null) return null;
        if (val < node.val) node.left = delete(node.left, val);
        else if (val > node.val) node.right = delete(node.right, val);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            TreeNode min = findMin(node.right);
            node.val = min.val;
            node.right = delete(node.right, min.val);
        }
        return node;
    }

    private TreeNode findMin(TreeNode node) {
        while (node.left != null) node = node.left;
        return node;
    }

    private boolean search(TreeNode node, int val) {
        if (node == null) return false;
        if (val == node.val) return true;
        return val < node.val ? search(node.left, val) : search(node.right, val);
    }
}
