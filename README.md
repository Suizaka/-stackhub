# -stackhub
Repo for Odoo Hackathon 2025
# 📚 Stackhub – A Minimal Q&A Forum Platform

**Built for Odoo Hackathon 2025**

Stackhub is a clean and minimal platform for asking and answering questions within a community.  
It is designed to encourage collaborative learning and structured knowledge sharing, just like StackOverflow — but lightweight and hackathon-fast.

---

## 🧠 Problem Statement

**Problem Statement #2 – StackIt: A Minimal Q&A Forum**

Build a simple, intuitive Q&A web app where users can ask questions, answer them, upvote/downvote responses, and mark correct answers — with role-based access and notification support.

[📄 Full Problem PDF](#)  
[🎨 Figma Mockup](https://app.excalidraw.com/l/65VNwvy7c4X/9mhEahV0MQg)

---

## 👥 Team Members

| Name              | Email                     | Role           |
|-------------------|----------------------------|----------------|
| Hitarth Shah      | hitarthhitu27@gmail.com    | Backend Lead and Frontend Dev   |
| Tanish Patel      | tanishpatel1205@gmail.com  | Backend + DB   |
| Riddhi Patel      | riddhi2you@gmail.com       | Backend        |
| Mahi Thakor       | mahiya.at1123@gmail.com    | Fronted Dev    |


## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python (Flask)
- **Database**: SQLite
- **Tools**: GitHub, VS Code, Excalidraw


## 🚀 Features

- ✅ Submit new questions (with title, description, and user ID)
- ✅ View all questions on the homepage (paginated)
- ✅ Submit answers to any question
- ✅ View all answers under a question
- ✅ Upvote/Downvote questions
- ✅ Search and tag-based filtering (mock/local)
- ✅ Responsive UI (mobile/tablet supported)
- ✅ Local storage fallback for testing
- ✅ Clean REST API using Flask

---

## 🧠 Problem Statement (Odoo Hackathon)

> **Stackhub** addresses the need for a clean, collaborative Q&A space where users can **ask technical/non-technical questions**, get answers from others, and vote on relevance. It promotes a learning culture inside teams, campuses, or communities — solving the “knowledge gap” in a simple and intuitive way.

---

## 🛠 Tech Stack

| Part        | Technology     |
|-------------|----------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend     | Python + Flask |
| Database    | SQLite (via SQLAlchemy) |
| Versioning  | Git + GitHub |
| Other       | Blueprint Routing, CORS, REST API |

---

## 📂 Folder Structure

```
your-project-root/
│
├── backend/
│   ├── app.py
│   ├── extensions.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── question.py
│   │   └── answer.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── questions.py
│   │   ├── answers.py
│   │   └── votes.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── ask.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── script.js
│       └── mock.js
│
└── README.md
```

---

## ✅ How It Works

### 👨‍💻 Questions API

- `GET /questions`: Fetch all questions  
- `POST /questions`: Add a new question

```json
{
  "title": "Your Question",
  "body": "Details...",
  "user_id": 1
}
```

---

### 💬 Answers API

- `GET /answers/<question_id>`: Get all answers for a question  
- `POST /answers`: Submit a new answer

```json
{
  "body": "Your answer",
  "question_id": 1,
  "user_id": 1
}
```

---

### 🗳 Voting API

- `POST /votes`: Vote on a question

```json
{
  "id": 1,
  "vote": "up"
}
```

---

## 🖥️ How to Run Locally

### 1. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # For Windows
pip install -r requirements.txt
python app.py
```

Server will start on: `http://127.0.0.1:5000`

---

### 2. Frontend

Simply open the file:

```
frontend/index.html
```

in any browser.

Make sure your Flask backend is running before that.****
