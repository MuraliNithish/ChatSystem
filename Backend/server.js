// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql2');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MySQL connection 
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Murali@17',
//   database: 'message_system'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // API endpoint to fetch messages based on role
// app.get('/api/messages/:role', (req, res) => {
//   const role = req.params.role;
//   let query = '';

//   if (role === 'managers') {
//     query = 'SELECT * FROM manager_messages';
//   } else if (role === 'fieldOfficers') {
//     query = 'SELECT * FROM field_officer_messages';
//   }

//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(results);
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD || 'Murali@17', // Use environment variables for sensitive data
  database: 'message_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API endpoint to fetch messages based on role
app.get('/api/messages/:role', (req, res) => {
  const role = req.params.role;
  let query = '';

  if (role === 'managers') {
    query = 'SELECT * FROM manager_messages';
  } else if (role === 'fieldOfficers') {
    query = 'SELECT * FROM field_officer_messages';
  } else {
    return res.status(400).json({ error: 'Invalid role' });
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
