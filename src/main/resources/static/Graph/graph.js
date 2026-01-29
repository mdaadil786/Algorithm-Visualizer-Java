let nodes = new Set();
let edges = [];
let nodePositions = {};
let container = document.getElementById('graphVisualizer');

function buildGraph() {
  container.innerHTML = '';
  nodes.clear();
  nodePositions = {};
  edges = [];

  const input = document.getElementById('edgesInput').value;
  try {
    const parsed = JSON.parse(input);
    for (let [u, v] of parsed) {
      nodes.add(u);
      nodes.add(v);
      edges.push([u, v]);
    }

   fetch("http://localhost:8080/api/graph/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edges)
    });

  } catch {
    alert('Invalid input. Use format like [[0,1],[1,2]]');
    return;
  }

  animateGraph();
}

function animateGraph() {
  let index = 0;
  const allNodes = Array.from(nodes);
  const spacing = 80;
  const radius = 200;
  const centerX = container.clientWidth / 2;
  const centerY = container.clientHeight / 2;

  function placeNextNode() {
    if (index >= allNodes.length) {
      drawEdges();
      return;
    }
    const nodeId = allNodes[index];
    const angle = (2 * Math.PI * index) / allNodes.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const node = document.createElement('div');
    node.className = 'node';
    node.innerText = nodeId;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    container.appendChild(node);
    nodePositions[nodeId] = { x, y };
    index++;
    setTimeout(placeNextNode, 500);
  }

  placeNextNode();
}

function drawEdges() {
  for (let [u, v] of edges) {
    const p1 = nodePositions[u];
    const p2 = nodePositions[v];

    const x1 = p1.x + 15;
    const y1 = p1.y + 15;
    const x2 = p2.x + 15;
    const y2 = p2.y + 15;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    const line = document.createElement('div');
    line.className = 'edge-line';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    container.appendChild(line);
  }
}

async function startTraversal() {
    const selectedAlgo = document.getElementById('algorithm').value;
    const speed = parseInt(document.getElementById('speedSlider').value);

const startNodeInput = document.getElementById('startNode')?.value.trim();

// Check if input is empty or not a valid number
if (!startNodeInput || isNaN(startNodeInput)) {
  alert("Please enter a valid start node.");
  return;
}

const startNode = parseInt(startNodeInput);

// Check if node exists in the graph
if (!nodes.has(startNode)) {
  alert(`Start node ${startNode} not found in the graph.`);
  return;
}




    try {
        const response = await fetch(`http://localhost:8080/api/graph/${selectedAlgo}?start=${startNode}`);
        const traversal = await response.json();

        if (!traversal || !Array.isArray(traversal)) {
            document.getElementById('outputBox').innerText = "Traversal failed. Check backend or input.";
            return;
        }

        document.getElementById('outputBox').innerText = "Traversal Output: ";

        for (let i = 0; i < traversal.length; i++) {
            const nodeId = traversal[i];
            const nodeEl = [...document.querySelectorAll('.node')].find(n => n.innerText === String(nodeId));

            if (nodeEl) {
                nodeEl.classList.add("highlight");
                await new Promise(resolve => setTimeout(resolve, speed));
                nodeEl.classList.remove("highlight");
                nodeEl.classList.add("visited");
            }

            // Update text output dynamically
            const currentOutput = document.getElementById('outputBox').innerText;
            document.getElementById('outputBox').innerText = currentOutput + (i === 0 ? "" : " → ") + nodeId;
        }

    } catch (error) {
        console.error("Error during traversal:", error);
        document.getElementById('outputBox').innerText = "Traversal failed. Check backend or input.";
    }
}








function showTraversalOutput(traversal) {
    const outputBox = document.getElementById("outputBox");
    outputBox.textContent = "Traversal Output: " + traversal.join(" → ");
    animateTraversal(traversal);
}

function animateTraversal(traversal) {
    const speed = 600;
    traversal.forEach((node, index) => {
        setTimeout(() => {
            const el = [...document.querySelectorAll('.node')]
                .find(n => n.innerText === String(node));
            if (el) el.classList.add("visited");
        }, index * speed);
    });
}



