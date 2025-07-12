// mock.js
const STORAGE_KEY = "stackhub_questions";

function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : sampleQuestions;
}

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
    function loadQuestions() {
  const container = document.getElementById("question-list");
  container.innerHTML = "";

  sampleQuestions.forEach(q => {
    let sampleQuestions = loadFromLocalStorage();

    const div = document.createElement("div");
    div.className = "question-card";

    const tagsHTML = q.tags.map(tag => `<span class="tag">#${tag}</span>`).join(" ");
    const answersHTML = q.answers.map(a => `<li>${a.text}</li>`).join("");

    div.innerHTML = `
      <h3>${q.title}</h3>
      <p>${q.body}</p>
      <div class="tags">${tagsHTML}</div>
      <div class="vote-controls">
        <button onclick="upvote(${q.id})">👍</button>
        <span>Votes: ${q.votes}</span>
        <button onclick="downvote(${q.id})">👎</button>
      </div>

      <details>
        <summary>💬 ${q.answers.length} Answers</summary>
        <ul>${answersHTML}</ul>
        <textarea id="answer-${q.id}" placeholder="Your answer..."></textarea>
        <button onclick="submitAnswer(${q.id})">Submit Answer</button>
      </details>
    `;

    container.appendChild(div);
  });
}

    
    document.getElementById("clear-filter-btn").classList.add("hidden");

<input type="text" id="search-box" placeholder="Search questions..." oninput="filterQuestions()" />

  const container = document.getElementById("question-list");
  container.innerHTML = "";

  sampleQuestions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-card";

    const tagsHTML = q.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">#${tag}</span>`).join(" ");


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
    saveToLocalStorage(sampleQuestions);
saveToLocalStorage(sampleQuestions);

  }
}

// 👎 Downvote
function downvote(id) {
  const q = sampleQuestions.find(q => q.id === id);
  if (q) {
    q.votes -= 1;
    loadQuestions();
    saveToLocalStorage(sampleQuestions);

  }
}

// 📝 Submit Question
function submitQuestion() {
  const title = document.getElementById("q-title").value.trim();
  const body = document.getElementById("q-body").value.trim();
  const tagsInput = document.getElementById("q-tags").value.trim();

  if (!title || !body) {
    alert("Both title and body are required.");
    saveToLocalStorage(sampleQuestions);

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
function filterByTag(tag) {
    
  const container = document.getElementById("question-list");
  container.innerHTML = "";
  document.getElementById("clear-filter-btn").classList.remove("hidden");


  const filtered = sampleQuestions.filter(q => q.tags.includes(tag.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `<p>No questions found for tag: <strong>#${tag}</strong></p>`;
    return;
  }

  filtered.forEach(q => {
    const div = document.createElement("div");
    div.className = "question-card";

    const tagsHTML = q.tags.map(tag => 
      `<span class="tag" onclick="filterByTag('${tag}')">#${tag}</span>`).join(" ");

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

// 🧾 Initial Load
window.onload = loadQuestions;
function submitAnswer(qId) {
  const textarea = document.getElementById(`answer-${qId}`);
  const answerText = textarea.value.trim();

  if (!answerText) {
    alert("Answer cannot be empty.");
    return;
  }

  const question = sampleQuestions.find(q => q.id === qId);
  if (question) {
    const newAnswer = {
      id: question.answers.length + 1,
      text: answerText
    };
    question.answers.push(newAnswer);
    loadQuestions(); // refresh UI
  }
}

