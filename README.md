# Quiz-Craft 📒
Create personalized quizzes to test yourself and self-empower your learning with this simple app!

### Functionality:
- Login and Registration: Users can create and access their accounts.
- Quiz Generation: Users can generate quizzes by selecting the type of questions, difficulty, and subject matter.
- Taking Quizzes: Users can answer questions and have the option to like or unlike questions.
- Leaderboard: A ranking system based on the scores of different users.
- Question Management: Users can enter, delete, edit, and search for questions.

### Tech Stack:
- Frontend: React, Ant Design, Axios
- Backend: Node.js, Express, Sequelize
- Database: MySQL

## Setup On Your Local Machine

Download the repository.

To start the frontend application, follow these steps:

1. Open your terminal and change the directory to the frontend folder:

   ```bash
   cd path/to/frontend
2. Install the required dependencies for the project and start it:
   ```bash
   npm install
4. Start the frontend application:
   ```bash
   npm start

## Backend Setup

To start the backend application, follow these steps:

1. Open your terminal and change the directory to the backend folder:

   ```bash
   cd path/to/backend
   (Ensure to replace `path/to/frontend` and `path/to/backend` with the actual paths to your frontend and backend directories, respectively.)
2. Install the required dependencies for the project and start it:
   ```bash
   npm install
4. Ensure MySQL version 5.7 is installed on your machine. Update the MySQL database configuration in `backend/src/models/index.js` with your own username and password. The default configuration is:
   ```javascript
   username: 'root',
   password: '123456'
5. Before starting the backend server, set up the database:
Create a new MySQL database named qs. Ensure the encoding is set to utf8 and collation to utf8_general_ci:
   ```CREATE DATABASE qs CHARACTER SET utf8 COLLATE utf8_general_ci;
6. Initialize the database with the required tables and initial data by executing the qs.sql script found in the project's root directory. This can be done through the MySQL command line:
   ```bash
   mysql -u root -p qs < path/to/qs.sql
   (Make sure to replace path/to/qs.sql with the actual path to the qs.sql file.)
7. After setting up the database, start the backend application:
   ```npm run dev
After completing these steps, both the frontend and backend should be fully operational.
Also, you may choose to modify the database credentials in the backend configuration file to be personal to you.


