function toggleSubtopics(topicElement, id) {
  const subtopics = document.getElementById(id);
  const isVisible = subtopics.style.display === 'block';

  document.querySelectorAll('.subtopics').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.topic').forEach(el => el.classList.remove('active'));

  if (!isVisible) {
    subtopics.style.display = 'block';
    topicElement.classList.add('active');
  }
}

function goToAlgo(algo) {
  window.location.href = `algorithm.html?algo=${algo}`;
}

// 🌙 Dark Mode
window.addEventListener("DOMContentLoaded", () => {
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
