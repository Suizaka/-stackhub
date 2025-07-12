
const API_BASE = "http://127.0.0.1:5000"; // Your Flask backend

async function loadQuestions() {
  try {
    const res = await fetch(${API_BASE}/questions);
    const data = await res.json();
    const container = document.getElementById("question-list");
    container.innerHTML = "";

    data.questions.forEach(q => {
      const div = document.createElement("div");
      div.className = "question-card";
      div.innerHTML = `
        <h3>${q.title}</h3>
        <p>${q.body}</p>
        <small>Votes: ${q.votes}</small>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading questions", err);
  }
}

function showAskForm() {
  document.getElementById("ask-form").classList.toggle("hidden");
}

async function submitQuestion() {
  const title = document.getElementById("q-title").value;
  const body = document.getElementById("q-body").value;

  if (!title || !body) {
    alert("Both title and body are required.");
    return;
  }

  const res = await fetch(${API_BASE}/questions, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, body })
  });

  if (res.ok) {
    alert("Question submitted!");
    document.getElementById("q-title").value = "";
    document.getElementById("q-body").value = "";
    showAskForm();
    loadQuestions();
  } else {
    alert("Something went wrong!");
  }
}

// Load questions on page load
window.onload = loadQuestions;
