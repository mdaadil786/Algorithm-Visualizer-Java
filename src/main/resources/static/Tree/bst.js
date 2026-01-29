let treeData = null;

async function buildTree() {
    const input = document.getElementById("inputArray").value.trim();
    if (!input) return;
    const values = input.split(" ").map(Number);

    const response = await fetch("http://localhost:8080/api/bst/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    });

    treeData = await response.json();
    renderTree();
}

async function performOperation() {
    const op = document.getElementById("operationSelect").value;
    const val = parseInt(document.getElementById("operationValue").value);
    if (isNaN(val)) return;

    let response;

    if (op === "insert") {
        response = await fetch(`http://localhost:8080/api/bst/insert?val=${val}`, {
            method: "POST"
        });
        treeData = await response.json();
    } else if (op === "delete") {
        response = await fetch(`http://localhost:8080/api/bst/delete?val=${val}`, {
            method: "DELETE"
        });
        treeData = await response.json();
    } else if (op === "search") {
        response = await fetch(`http://localhost:8080/api/bst/search?val=${val}`);
        const found = await response.json();
        alert(found ? "  Found" : " Not Found");
        return;
    }

    renderTree();
}

function clearTree() {
    treeData = null;
    document.getElementById("tree-container").innerHTML = "";
    document.getElementById("inputArray").value = "";
    document.getElementById("operationValue").value = "";
}

function renderTree() {
    const container = document.getElementById("tree-container");
    container.innerHTML = "";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("edge-svg");
    svg.style.position = "absolute";
    svg.style.width = "100%";
    svg.style.height = "100%";
    container.appendChild(svg);

    if (!treeData) return;

    const nodeElements = [];

    function traverse(node, depth, x) {
        if (!node) return [];

        const levelGap = 100;
        const xSpacing = 120 / (depth + 1);

        const left = traverse(node.left, depth + 1, x - xSpacing);
        const right = traverse(node.right, depth + 1, x + xSpacing);

        const y = depth * levelGap + 40;
        nodeElements.push({ node, x, y });

        return [...left, { node, x, y }, ...right];
    }

    const nodes = traverse(treeData, 0, 400);

    // Draw edges (from center to center of each circle)
    nodes.forEach(({ node, x, y }) => {
        const nodeRadius = 25; // Half of .node width/height (50px)

        if (node.left) {
            const child = nodes.find(n => n.node === node.left);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x + nodeRadius);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", child.x + nodeRadius);
            line.setAttribute("y2", child.y + nodeRadius);
            line.setAttribute("stroke", "black");
            svg.appendChild(line);
        }

        if (node.right) {
            const child = nodes.find(n => n.node === node.right);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x + nodeRadius);
            line.setAttribute("y1", y + nodeRadius);
            line.setAttribute("x2", child.x + nodeRadius);
            line.setAttribute("y2", child.y + nodeRadius);
            line.setAttribute("stroke", "black");
            svg.appendChild(line);
        }
    });

    // Draw nodes
    nodes.forEach(({ node, x, y }) => {
        const div = document.createElement("div");
        div.className = "node";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.innerText = node.val;
        container.appendChild(div);
    });
}
