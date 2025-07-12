// mock.js

const sampleQuestions = [
  {
    id: 1,
    title: "How does JavaScript async/await work?",
    body: "I'm confused about promises and how async/await simplifies them. Can someone explain?",
    votes: 10,
    tags: ["javascript", "async"]
  },
  {
    id: 2,
    title: "What is a closure in JavaScript?",
    body: "Please explain closures in a simple way with an example.",
    votes: 7,
    tags: ["javascript", "closure"]
  }
];

// 🧠 Render questions
function loadQuestions() {
  const container = document.getElementById("question-list");
  container.innerHTML = "";

  sampleQuestions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-card";

    const tagsHTML = q.tags.map(tag => `<span class="tag">#${tag}</span>`).join(" ");

    div.innerHTML = `
      <h3>${q.title}</h3>
      <p>${q.body}</p>
      <div class="tags">${tagsHTML}</div>
      <div class="vote-controls">
        <button onclick="upvote(${q.id})">👍</button>
        <span>Votes: ${q.votes}</span>
        <button onclick="downvote(${q.id})">👎</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// 👍 Upvote
function upvote(id) {
  const q = sampleQuestions.find(q => q.id === id);
  if (q) {
    q.votes += 1;
    loadQuestions();
  }
}

// 👎 Downvote
function downvote(id) {
  const q = sampleQuestions.find(q => q.id === id);
  if (q) {
    q.votes -= 1;
    loadQuestions();
  }
}

// 📝 Submit Question
function submitQuestion() {
  const title = document.getElementById("q-title").value.trim();
  const body = document.getElementById("q-body").value.trim();
  const tagsInput = document.getElementById("q-tags").value.trim();

  if (!title || !body) {
    alert("Both title and body are required.");
    return;
  }

  const tags = tagsInput
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag !== "");

  const newQuestion = {
    id: sampleQuestions.length + 1,
    title,
    body,
    votes: 0,
    tags
  };

  sampleQuestions.unshift(newQuestion);
  loadQuestions();

  // Clear form
  document.getElementById("q-title").value = "";
  document.getElementById("q-body").value = "";
  document.getElementById("q-tags").value = "";
  showAskForm(); // Hide form
}

// 🧾 Initial Load
window.onload = loadQuestions;
