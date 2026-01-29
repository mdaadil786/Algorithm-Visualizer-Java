let treeSteps = [];
let currentStep = 0;

document.getElementById("buildTreeBtn").addEventListener("click", () => {
  const input = document.getElementById("levelOrderInput").value;
  let levelOrder;
  try {
    levelOrder = JSON.parse(input);
  } catch {
    alert("Please enter a valid array like [1,2,3,null,4]");
    return;
  }

  fetch("http://localhost:8080/api/tree/build", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ levelOrder }),
  })
    .then((res) => res.json())
    .then((steps) => {
      treeSteps = steps;
      currentStep = 0;
      animateTreeBuild();
    })
    .catch((err) => alert("Build failed: " + err.message));
});

function animateTreeBuild() {
  const container = document.getElementById("tree-container");
  const svg = container.querySelector("svg");

  container.querySelectorAll(".node").forEach((n) => n.remove());
  svg.innerHTML = "";

  const maxX = Math.max(...treeSteps.map((step) => step.x));
  const maxY = Math.max(...treeSteps.map((step) => step.y));

  // Set enough size for container
  container.style.minWidth = `${maxX + 200}px`;
  container.style.height = `${maxY + 200}px`;

  // Set enough size for SVG too!
  svg.setAttribute("width", `${maxX + 200}`);
  svg.setAttribute("height", `${maxY + 200}`);

  function placeNode(step) {
    const { val, x, y, parentX, parentY } = step;

    const node = document.createElement("div");
    node.className = "node";
    node.innerText = val;
    node.style.left = `${x - 25}px`;
    node.style.top = `${y - 25}px`;
    container.appendChild(node);

    if (parentX !== null && parentY !== null) {
      drawEdge(svg, parentX, parentY, x, y);
    }
  }

  function next() {
    if (currentStep >= treeSteps.length) {
      // ✅ Center scroll AFTER nodes are placed
      setTimeout(() => {
        container.scrollTop = container.scrollHeight / 2 - container.clientHeight / 2;
        container.scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
      }, 200);
      return;
    }

    placeNode(treeSteps[currentStep]);
    currentStep++;
    setTimeout(next, 400); // Smooth delay
  }

  next();
}


function drawEdge(svg, x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#888");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);
}

document.getElementById("traverseTreeBtn").addEventListener("click", () => {
  const input = document.getElementById("levelOrderInput").value;
  let levelOrder;
  try {
    levelOrder = JSON.parse(input);
  } catch {
    alert("Invalid input");
    return;
  }

  const type = document.getElementById("traversalType").value;

  fetch(`http://localhost:8080/api/tree/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ levelOrder }),
  })
    .then((res) => res.json())
    .then((result) => animateTraversal(result))
    .catch((err) => alert("Traversal error: " + err.message));
});

function animateTraversal(path) {
  const nodes = document.querySelectorAll(".node");
  let idx = 0;

  function step() {
    if (idx >= path.length) return;
    nodes.forEach((n) => {
      if (parseInt(n.textContent) === path[idx]) {
        n.style.backgroundColor = "#ff9800";
      }
    });
    document.getElementById("output").innerText =
      "Output: " + JSON.stringify(path.slice(0, idx + 1));
    idx++;
    setTimeout(step, 600);
  }

  step();
}
