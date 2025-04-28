# ✨ Full Stack Realtime Chat App ✨

## 📖 Project Description

This is a full-stack realtime chat application built using modern web technologies like React, Node.js, Express, and Socket.io. It enables users to create accounts, log in, and engage in real-time conversations. Key features include user authentication, message history, and notifications, all wrapped in a responsive and user-friendly interface.

---

## 🚀 Highlights

- 🔒 **Secure Authentication**: User authentication powered by JWT.
- ⚡ **Realtime Messaging**: Instant communication with Socket.io.
- 📱 **Responsive Design**: Built with Tailwind CSS for seamless usability across devices.
- 🌐 **RESTful API**: Backend API designed with Express.
- 🗄️ **Database**: MongoDB for efficient data storage.
- 🐳 **Containerization**: Dockerized for easy deployment.
- 🚀 **Deployment**: Hosted on Render.com for scalability.
- 🔧 **Environment Configuration**: Managed via environment variables.
- 🛠️ **Code Quality**: Enforced with ESLint and Prettier.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB
- **Authentication**: JWT
- **Containerization**: Docker
- **Deployment**: Render.com
- **Code Quality**: ESLint, Prettier

---

## 📦 Installation (Local Development)

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=...

   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...

   NODE_ENV=development
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## 🏗️ Build the App

To create an optimized production build, run:

```bash
npm run build
```

The build will be available in the `build` directory.

---

## ▶️ Start the App

To start the application in development mode, use:

```bash
npm start
```

---
