const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mysql = require("mysql2");
require("dotenv").config();

app.engine("ejs", ejsMate); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//  MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


app.get("/", (req, res) => {
  res.send(" Root Route Working");
});

app.get("/home", (req, res) => {
  res.render("home"); 
});
app.get("/create", (req, res) => {
  res.render("create"); 
});

app.post("/create", (req, res) => {
  const { roll_no, name, course, subject, marks } = req.body;
  const q = `INSERT INTO results (roll_no, name, course, subject, marks) VALUES (?, ?, ?, ?, ?)`;

  try {
    db.query(q, [roll_no, name, course, subject, marks], (err, result) => {
      if (err) throw err;
      console.log(" New record added.");
      res.redirect("/home");

    })}catch(err){
        console.log(err);
         res.send("some error in db");
        }
});

app.get("/view", (req, res) => {
  const subjectFilter = req.query.subject;
  const subjectQuery = "SELECT DISTINCT subject FROM results WHERE subject IS NOT NULL";
  let recordsQuery = "SELECT * FROM results";
  let params = [];

  if (subjectFilter && subjectFilter.trim() !== "") {
    recordsQuery += " WHERE subject = ?";
    params.push(subjectFilter);
  }

  db.query(subjectQuery, (err, subjects) => {
    if (err) throw err;

    db.query(recordsQuery, params, (err, records) => {
      if (err) throw err;

      res.render("view", {
        subjects,          
        records,           
        selectedSubject: subjectFilter || "",
      });
    });
  });
});

// SHOW EDIT FORM
app.get("/edit/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM results WHERE id = ?";
    db.query(q, [id], (err, result) => {
        if (err) throw err;
        const student = result[0];
        res.render("edit.ejs", { student });
    });
});

// HANDLE EDIT 
app.post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { roll_no, name, course, subject, marks } = req.body;
    const q = "UPDATE results SET roll_no=?, name=?, course=?, subject=?, marks=? WHERE id=?";
    db.query(q, [roll_no, name, course, subject, marks, id], (err, result) => {
        if (err) throw err;
        console.log(" Record updated successfully");
        res.redirect("/view");
    });
});
// SHOW DELETE FORM
app.get("/delete", (req, res) => {
  res.render("delete"); 
});

// HANDLE DELETE REQUEST
app.post("/delete", (req, res) => {
  const { roll_no, name } = req.body;
  const q = "DELETE FROM results WHERE roll_no = ? AND name = ?";

  db.query(q, [roll_no, name], (err, result) => {
    if (err) {
      console.error(err);
      return res.send(" Error deleting record");
    }
    if (result.affectedRows > 0) {
      console.log(`🗑️ Record deleted: Roll No ${roll_no}, Name ${name}`);
      res.send(`<h3 style="text-align:center; color:green;"> Record deleted successfully!<br><a href='/home'>Go Back</a></h3>`);
    } else {
      res.send(`<h3 style="text-align:center; color:red;"> No matching record found.<br><a href='/home'>Go Back</a></h3>`);
    }
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
