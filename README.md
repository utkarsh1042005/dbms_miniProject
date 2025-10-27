📘 Student Record Management System

A simple DBMS mini project built using Node.js, Express, EJS, and MySQL.
This system allows users to create, view, edit, and delete student records easily through a web interface.

🚀 Features

🧾 Add New Student Record — store roll number, name, course, subject, and marks.

👀 View Records — view all student records or filter by subject.

✏️ Edit Record — update student details.

🗑️ Delete Record — delete a record by roll number and name.

🎨 Bootstrap UI — simple, clean, and responsive design.

🔐 .env Support — secure MySQL credentials using environment variables.

| Layer                  | Technology          |
| ---------------------- | ------------------- |
| **Frontend**           | EJS, Bootstrap 5    |
| **Backend**            | Node.js, Express.js |
| **Database**           | MySQL               |
| **Template Engine**    | EJS-Mate            |
| **Environment Config** | dotenv              |

CREATE DATABASE student_record;
USE student_record;

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_no VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  course VARCHAR(50),
  subject VARCHAR(50),
  marks INT
);

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/student-record-system.git
cd student-record-system

2️⃣ Install Dependencies
npm install

3️⃣ Create .env File

Inside the project root, create a file named .env and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=student_record

4️⃣ Run MySQL Server

Make sure your MySQL server is running locally and the database above is created.

5️⃣ Start the Server
node index.js


Server will run on:

http://localhost:3000

Folder Structure
student-record-system/
│
├── views/
│   ├── home.ejs
│   ├── create.ejs
│   ├── view.ejs
│   ├── edit.ejs
│   ├── delete.ejs
│   └── layout.ejs
│
├── public/
│   └── (CSS, JS, images)
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

🧾 .gitignore (Recommended)
node_modules/
.env
