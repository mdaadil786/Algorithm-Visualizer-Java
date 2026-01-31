# 🔍 Algorithm Visualizer
### Java • Spring Boot • REST APIs • Frontend Visualization

An interactive **Algorithm Visualizer** that demonstrates how algorithms work internally using **step-by-step animations**.  
Designed to strengthen **Data Structures & Algorithms (DSA)** understanding through visual learning.

🌐 Live Backend  
    ///Link
---

## 📌 Overview

This project visualizes common **sorting, searching, tree, and graph algorithms** using a **Spring Boot backend** and a **lightweight frontend** built with **HTML, CSS, and JavaScript**.

The backend computes algorithm steps and exposes them via REST APIs, while the frontend consumes these APIs to animate each step visually.

---

## ✨ Features

### 🔢 Sorting Algorithms
- Bubble Sort  
- Selection Sort  
- Insertion Sort  
- Merge Sort  
- Quick Sort  
- Heap Sort  
- Radix Sort  

### 🔍 Searching Algorithms
- Linear Search  
- Binary Search  

### 🌳 Tree Algorithms
- Binary Search Tree (BST)
  - Build
  - Insert
  - Delete
  - Search
- Tree Traversals
  - Inorder
  - Preorder
  - Postorder
  - Level Order

### 🕸 Graph Algorithms
- Graph Build
- Breadth First Search (BFS)
- Depth First Search (DFS)

### 🎬 Visualization & UI
- Step-by-step animation
- Speed control slider
- Pause / Resume / Next / Previous controls
- Real-time output display
- Dark Mode 🌙
- Mobile & desktop responsive design

---

## 🧠 Tech Stack

### Backend
- Java 17
- Spring Boot
- REST APIs
- Embedded Tomcat
- Maven
- Docker

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

### Deployment
- Backend: Render (Dockerized Spring Boot application)
- Frontend: Netlify (Static hosting)

---

## ⚙️ How It Works

1. User selects an algorithm and provides input.
2. Frontend sends input data to backend using REST APIs.
3. Backend processes the algorithm and returns **step-by-step execution data**.
4. Frontend animates each step using JavaScript and DOM manipulation.
5. User can control speed, pause, resume, or move step-by-step.

---

## ▶️ Run Locally

### Backend
- git clone https://github.com/mdaadil786/Algorithm-Visualizer-Java.git  
- cd Algorithm-Visualizer-Java  
- ./mvnw spring-boot:run  

Backend runs at  
http://localhost:8080

### Frontend
- Open index.html in browser  
- Or deploy static files to Netlify  

---

## 🌐 API Configuration

Frontend uses a centralized API base URL:

const API_BASE_URL = window.API_BASE_URL || "http://localhost:8080";

- Local development → localhost  
- Production → Render backend URL  

This ensures clean, environment-based configuration.

---

## 🗂 Project Structure

Algorithm-Visualizer-Java  
│  
├── src/main/java  
│   └── com.example.algorithmvisualizer  
│       ├── controller  
│       ├── services  
│       ├── models  
│       └── AlgorithmVisualizerApplication.java  
│  
├── src/main/resources  
│   ├── static  
│   │   ├── index.html  
│   │   ├── algorithm.html  
│   │   ├── script.js  
│   │   ├── algorithm.js  
│   │   ├── style.css  
│   │   ├── Graph/  
│   │   └── Tree/  
│   └── application.properties  
│  
├── Dockerfile  
├── pom.xml  
└── README.md  

---

## 🐳 Docker Support

- Base image: eclipse-temurin:17-jdk  
- Build using Maven Wrapper  
- Exposes port 8080  
- Runs Spring Boot JAR inside container  

---

## 🚀 Future Enhancements

- Dynamic Programming visualizations  
- Weighted graph algorithms (Dijkstra, Bellman-Ford)  
- Authentication for personalized dashboards  
- Save and replay algorithm sessions  
- Performance comparison between algorithms  

---

## 🎓 Learning Outcomes

- Strong understanding of DSA through visualization  
- REST API design and integration  
- Spring Boot backend architecture  
- Frontend–Backend communication  
- Docker-based deployment  
- Real-world debugging (CORS, environment configs)  

---


## 👤 Author

Md Aadil  
Java Developer | Spring Boot | DSA  
