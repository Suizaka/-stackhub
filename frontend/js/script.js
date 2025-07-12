const API_BASE = "http://127.0.0.1:5000";
let currentPage = 1;
const pageSize = 5;

async function loadQuestions() {
  const res = await fetch(${API_BASE}/questions);
  const questions = await res.json();

  renderQuestions(questions);
}

function renderQuestions(allQuestions) {
  const container = document.getElementById("question-list");
  container.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const questionsToShow = allQuestions.slice(start, end);

  questionsToShow.forEach((q) => {
    const div = document.createElement("div");
    div.className = "question-card";

    div.innerHTML = `
      <h3>${q.title}</h3>
      <p>${q.body}</p>
      <div class="vote-controls">
        <button onclick="vote(${q.id}, 'up')">👍</button>
        <span>Votes: ${q.votes || 0}</span>
        <button onclick="vote(${q.id}, 'down')">👎</button>
      </div>
      <details>
        <summary>💬 Answers</summary>
        <ul id="answers-${q.id}">Loading...</ul>
        <textarea id="answer-${q.id}" placeholder="Write your answer..."></textarea>
        <button onclick="submitAnswer(${q.id})">Submit Answer</button>
      </details>
    `;

    container.appendChild(div);
    loadAnswers(q.id);
  });

  updatePaginationIndicator(allQuestions.length);
}

async function loadAnswers(qId) {
  const res = await fetch(${API_BASE}/answers/${qId});
  const answers = await res.json();

  const list = document.getElementById(answers-${qId});
  list.innerHTML = answers.length
    ? answers.map((a) => <li>${a.body}</li>).join("")
    : "<li>No answers yet.</li>";
}

async function vote(id, direction) {
  await fetch(${API_BASE}/votes, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, vote: direction }),
  });
  loadQuestions();
}

async function submitQuestion() {
  const title = document.getElementById("q-title").value.trim();
  const body = document.getElementById("q-body").value.trim();
  const user_id = 1; // static for now

  if (!title || !body) {
    alert("Both title and body are required.");
    return;
  }

  await fetch(${API_BASE}/questions, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, user_id }),
  });

  document.getElementById("q-title").value = "";
  document.getElementById("q-body").value = "";

  loadQuestions();
}

async function submitAnswer(qId) {
  const textarea = document.getElementById(answer-${qId});
  const body = textarea.value.trim();
  const user_id = 1;

  if (!body) {
    alert("Answer cannot be empty.");
    return;
  }

  await fetch(${API_BASE}/answers, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body, question_id: qId, user_id }),
  });

  textarea.value = "";
  loadQuestions();
}

function updatePaginationIndicator(total) {
  const indicator = document.getElementById("page-indicator");
  const totalPages = Math.ceil(total / pageSize);
  indicator.textContent = Page ${currentPage} of ${totalPages};
}

function nextPage() {
  currentPage++;
  loadQuestions();
}

function prevPage() {
  if (currentPage > 1) currentPage--;
  loadQuestions();
}

window.onload = loadQuestions;
