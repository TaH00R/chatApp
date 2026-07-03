# 💬 Real-Time Group Chat Application

A real-time group chat application built with **Node.js**, **Express.js**, **Socket.IO**, and **MongoDB**. Users can create private rooms, join existing rooms, exchange messages instantly, and view previous chat history.

## 🚀 Live Demo

**Demo:** https://group-chat-e7e7.onrender.com

---

## ✨ Features

* 🔒 Create private chat rooms
* 🚪 Join existing rooms using a Room ID
* 💬 Real-time messaging with Socket.IO
* 👥 Live room member list
* ✍️ Typing indicator
* 📊 Live online user count
* ✅ Room ID validation
* 🚫 Duplicate username prevention within a room
* 💾 MongoDB message storage
* 📜 Previous chat history on joining a room
* 🌐 Deployed on Render

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* Socket.IO

### Database

* MongoDB
* Mongoose

### Deployment

* Render

---

## 📷 Screenshots

> Add screenshots of:
>
> * Home Page
> * Chat Room
> * Room Members Sidebar
> * Previous Messages
> * Typing Indicator

---

## 📂 Project Structure

```text
.
├── config/
│   └── db.js
├── model/
│   └── message.js
├── public/
│   ├── home.html
│   ├── home.js
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   └── home.css
├── app.js
├── package.json
└── .env
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Start the server:

```bash
npm start
```

Open your browser:

```
http://localhost:3000
```

---

## 🔮 Future Improvements

* 🔐 User Authentication (JWT)
* 😀 Emoji Support
* 📎 File & Image Sharing
* 📱 React Native Mobile App
* 🔔 Join/Leave Notifications
* 🌙 Dark/Light Theme
* 📩 Private Messaging
* 🔍 Message Search

---

## 📚 What I Learned

Building this project helped me understand:

* WebSockets and real-time communication
* Socket.IO rooms and events
* Event-driven backend development
* MongoDB integration with Mongoose
* Managing connected users and room state
* Persisting and loading chat history
* Deploying a full-stack application on Render

---

## 👨‍💻 Author

**Krishna Agarwal**

If you found this project interesting, feel free to ⭐ the repository or connect with me on LinkedIn.
