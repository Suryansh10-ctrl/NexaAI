<div align="center">

# 🚀 NexaAI

### An AI-powered conversational assistant inspired by ChatGPT & Perplexity

<p>
Modern • Fast • Intelligent • Real-Time
</p>

<img src="./Frontend/public/logo.svg" alt="NexaAI Logo" width="120"/>

</div>

---

## ✨ Overview

NexaAI is a full-stack AI chatbot built with the MERN stack that delivers an intuitive conversational experience similar to ChatGPT and Perplexity AI.

It supports secure authentication, persistent chat history, real-time communication, and AI-generated responses through a clean, responsive interface.

---

## 🌟 Features

- AI-powered conversations
- Persistent chat history
- JWT Authentication
- Secure Cookie-based Login
- Real-time communication using Socket.io
- Modern UI built with React & Tailwind CSS
- Fully Responsive Design
- Dark Theme
- Delete Conversations
- Automatic Chat Title Generation
- Protected Routes
- Fast API with Express.js

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router
- Axios
- Socket.io Client
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- Socket.io
- CORS

## AI

- Google Gemini API
- Mistral API Just like google gemini api key
- Travily API For web search

---

# 📂 Project Structure

```
NexaAI
│
├── Frontend
│   ├── src
│   ├── public
│   └── vite.config.js
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── socket
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NexaAI.git

cd NexaAI
```

---

## 2. Install Dependencies

### Backend

```bash
cd Backend
npm install
```

### Frontend

```bash
cd ../Frontend
npm install
```

---

## 3. Environment Variables

Create a `.env` file inside the Backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

MISTRAL_API_KEY=your_mistral_api_key

TRAVILY_API_KEY=your_travily_api_key

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

---

## 4. Run Backend

```bash
cd Backend

npm run dev
```

---

## 5. Run Frontend

```bash
cd Frontend

npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:3000
```

---

# 📸 Screenshots

### Login

<img width="1918" height="883" alt="image" src="https://github.com/user-attachments/assets/31345cf3-2837-4ac9-a183-3f7d946f98ed" />


---

### AI Conversation

<img width="1918" height="880" alt="image" src="https://github.com/user-attachments/assets/73764c0b-9c47-4cc1-a2f1-e1971d38939c" />


---

# 🔐 Authentication

- Register
- Login
- JWT Authentication
- HTTP Only Cookies
- Protected Routes
- Logout

---

# 📡 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/get-me
POST   /api/auth/logout
```

## Chat

```
GET    /api/chats
POST   /api/chats
DELETE /api/chats/:id
POST   /api/chats/message
```

---

# 🌐 Deployment

Frontend

https://nexaai-mb5t.onrender.com/

Backend

https://nexaai-mb5t.onrender.com/

Database

- MongoDB Atlas

---

# 💡 Future Improvements

- Voice Chat
- Image Generation
- File Uploads
- Markdown Rendering
- Code Syntax Highlighting
- Streaming AI Responses
- Multi AI Model Support
- Chat Search
- Export Chats
- Themes
- Mobile App

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the project

2. Create your feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add Amazing Feature"
```

4. Push to the branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Suryansh Sharma**

GitHub:
https://github.com/Suryansh10-ctrl

LinkedIn:
https://www.linkedin.com/in/suryan925a98309sh-sharma-/

---

<div align="center">

### ⭐ If you like this project, don't forget to star the repository!

Made with ❤️ using React, Node.js, MongoDB & Gemini AI

</div>
