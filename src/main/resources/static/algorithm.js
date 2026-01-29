let algoName = "";
let animationInterval = null;
let animationPaused = false;
let animationSpeed = 300;
let steps = [];
let currentStep = 0;

const algoTypeMap = {
  linear: "search",
  binary: "search",
  interpolation: "search",
  bubble: "sort",
  selection: "sort",
  insertion: "sort",
  merge: "sort",
  quick: "sort",
  heap: "sort",
  radix: "sort",
  inorder: "tree",
  preorder: "tree",
  postorder: "tree",
  levelorder: "tree",
  knapsack: "dp",
  lcs: "dp",
  lis: "dp",
  matrixchain: "dp",
};

const complexity = {
  bubble: { time: "O(n²)", space: "O(1)" },
  selection: { time: "O(n²)", space: "O(1)" },
  insertion: { time: "O(n²)", space: "O(1)" },
  merge: { time: "O(n log n)", space: "O(n)" },
  quick: { time: "O(n log n)", space: "O(log n)" },
  heap: { time: "O(n log n)", space: "O(1)" },
  radix: { time: "O(nk)", space: "O(n + k)" },
};

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  algoName = params.get("algo") || "bubble";

  document.querySelector(".header").innerText =
    algoName.charAt(0).toUpperCase() + algoName.slice(1) +
    (algoTypeMap[algoName] === "search" ? " Search" : " Sort");

  const info = complexity[algoName];
  if (info) {
    document.querySelector(".complexity").innerText = `Time: ${info.time} | Space: ${info.space}`;
  }

  document.querySelector(".run-button").addEventListener("click", runAlgorithm);
  document.getElementById("pauseResumeBtn").addEventListener("click", togglePause);
  document.getElementById("prevStepBtn").addEventListener("click", stepBackward);
  document.getElementById("nextStepBtn").addEventListener("click", stepForward);
  document.getElementById("speedRange").addEventListener("input", (e) => {
    animationSpeed = parseInt(e.target.value);
  });

  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  });
});

function runAlgorithm() {
  const arrayInput = document.getElementById("arrayInput").value;
  let parsed;
  try {
    parsed = JSON.parse(arrayInput);
    if (!Array.isArray(parsed)) throw "Invalid input";
  } catch {
    alert("Invalid input format. Use format like: [4,2,5]");
    return;
  }

  // Determine if it’s a search or sort
  const type = algoTypeMap[algoName];
  if (type === "search") {
    const target = parseInt(prompt("Enter target element to search:"));
    if (isNaN(target)) {
      alert("Invalid target.");
      return;
    }

    fetch(`http://localhost:8080/api/search/${algoName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array: parsed, target }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API call failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid response format from server");

        steps = data.map((step) => {
          const arr = step.array;
          const highlight = [];

          if ("currentIndex" in step) highlight.push(step.currentIndex); // linear
          else if ("mid" in step) highlight.push(step.mid); // binary

          return { array: arr, highlight, found: step.found };
        });

        currentStep = 0;
        animationPaused = false;
        document.getElementById("pauseResumeBtn").innerText = "⏸ Pause";
        animateStepsSearch();
      })
      .catch((err) => alert("Error: " + err.message));
  } else {
    fetch(`http://localhost:8080/api/sort/${algoName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API call failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid response format from server");
        steps = data;
        currentStep = 0;
        animationPaused = false;
        document.getElementById("pauseResumeBtn").innerText = "⏸ Pause";
        animateSteps();
      })
      .catch((err) => alert("Error: " + err.message));
  }
}

function togglePause() {
  animationPaused = !animationPaused;
  document.getElementById("pauseResumeBtn").innerText = animationPaused ? "▶ Resume" : "⏸ Pause";
}

function playTick() {
  const audio = new Audio("tick.mp3");
  audio.volume = 0.2;
  audio.play();
}

function animateSteps() {
  clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    if (animationPaused || currentStep >= steps.length) return;

    const current = steps[currentStep];
    const prev = currentStep > 0 ? steps[currentStep - 1] : null;
    const highlight = [];

    if (prev) {
      for (let i = 0; i < current.length; i++) {
        if (current[i] !== prev[i]) highlight.push(i);
      }
    }

    drawStep(current, highlight);
    playTick();
    currentStep++;
  }, animationSpeed);
}

function animateStepsSearch() {
  clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    if (animationPaused || currentStep >= steps.length) return;

    const stepObj = steps[currentStep];
    const arr = stepObj.array;
    const highlight = stepObj.highlight || [];
    const found = stepObj.found || false;

    drawStep(arr, highlight);
    playTick();

    if (found) {
      const index = highlight[0];
      document.getElementById("output").innerText = `✅ Found = true, Index = ${index}`;
      clearInterval(animationInterval); // Stop further animation
    } else {
      if (currentStep === steps.length - 1) {
        document.getElementById("output").innerText = `❌ Found = false`;
      } else {
        document.getElementById("output").innerText = `Checking index ${highlight[0]}...`;
      }
    }

    currentStep++;
  }, animationSpeed);
}


function drawStep(step, highlightIndices = []) {
  const container = document.getElementById("array-visual");
  const outputBox = document.getElementById("output");
  container.innerHTML = "";

  const values = step;
  const maxVal = Math.max(...values.map((v) => (typeof v === "number" ? v : 1)));

  // 👉 Set minimum bar width depending on array size
  const barWidth = values.length <= 20 ? 40 : values.length <= 40 ? 25 : 15;

  values.forEach((val, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bar-wrapper";
    wrapper.style.width = `${barWidth}px`; // 👈 Fixed width for consistent visual

    const bar = document.createElement("div");
    bar.className = "bar";

    // 👇 Make bars taller even for small numbers
    const normalizedHeight = Math.max(10, (parseInt(val) / maxVal) * 90);
    bar.style.height = `${normalizedHeight}%`;

    // 📏 Large numbers = slightly larger font
    bar.style.fontSize = `${Math.max(14, normalizedHeight * 0.3)}px`;
    bar.innerText = val;

    // 🎨 Color gradient
    const percentage = parseInt(val) / maxVal;
    const hue = 220 - percentage * 120;
    const lightness = document.body.classList.contains("dark") ? 60 : 70;

    bar.style.background = `hsl(${hue}, 80%, ${lightness}%)`;
    bar.style.color = "#fff";
    bar.style.fontWeight = "bold";
    bar.style.transition = "height 0.3s ease, transform 0.5s ease";

    // ✨ Highlighted bars grow slightly
    if (highlightIndices.includes(idx)) {
      bar.style.transform = "scale(1.1)";
      bar.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    }

    wrapper.appendChild(bar);
    container.appendChild(wrapper);
  });

  // 🔄 Animate swap
  if (highlightIndices.length === 2) {
    const bars = container.querySelectorAll(".bar");
    const [i, j] = highlightIndices;

    const bar1 = bars[i];
    const bar2 = bars[j];

    const distance = (j - i) * (bar1.offsetWidth + 4); // +4 for spacing

    bar1.style.position = "relative";
    bar2.style.position = "relative";
    bar1.style.zIndex = "10";
    bar2.style.zIndex = "10";
    bar1.style.transform = `translateX(${distance}px) scale(1.2)`;
    bar2.style.transform = `translateX(${-distance}px) scale(1.2)`;

    setTimeout(() => {
      bar1.style.transition = "none";
      bar2.style.transition = "none";
      bar1.style.transform = "none";
      bar2.style.transform = "none";
    }, 500);

    outputBox.innerText = `Swapping ${step[i]} ⇄ ${step[j]}`;
  } else if (highlightIndices.length === 1) {
    const index = highlightIndices[0];
    const bars = container.querySelectorAll(".bar");
    bars[index].style.background = "yellow";
    bars[index].style.color = "#000";
    outputBox.innerText = `Inspecting index ${index}: ${step[index]}`;
  } else {
    outputBox.innerText = JSON.stringify(step);
  }
}


function stepForward() {
  if (steps.length && currentStep < steps.length - 1) {
    currentStep++;
    const stepObj = steps[currentStep];
    drawStep(stepObj.array || stepObj, stepObj.highlight || []);
  }
}

function stepBackward() {
  if (steps.length && currentStep > 0) {
    currentStep--;
    const stepObj = steps[currentStep];
    drawStep(stepObj.array || stepObj, stepObj.highlight || []);
  }
}
