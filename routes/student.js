const express = require('express');
const router = express.Router();
const { client } = require('../database/database'); 

  router.get('/', (req, res) => {
    const { queryType, studentId} = req.query;

    if (queryType === 'table') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT * FROM students`;
  
      client.query(query, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    
    } else if (queryType === 'student') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT s.student_id, s.student_name, s.major, s.gpa, s.year, s.email, s.address, s.date_of_birth, s.phone_number, a.advisor_name
      FROM students s
      INNER JOIN advisors a ON s.advisor_id = a.advisor_id
      WHERE s.student_id = $1`;
  
      client.query(query, [studentId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    } else if (queryType === 'credits') {
      
      const query = 
        'SELECT SUM(c.credits) AS total_credits FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id INNER JOIN courses c ON e.course_id = c.course_id WHERE s.student_id = $1';
  
      client.query(query, [studentId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });

    } else if (queryType === 'courseList') {
      
      const query = 
        'SELECT c.course_name, c.credits, r.grade FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id INNER JOIN courses c ON e.course_id = c.course_id INNER JOIN records r ON e.student_id = r.student_id AND e.course_id = r.course_id WHERE s.student_id = $1';
  
      client.query(query, [studentId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    } else if (queryType === 'schedule') {
      
      const query = 
      `SELECT c.course_name, c.days, c.time, c.location FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id INNER JOIN courses c ON e.course_id = c.course_id INNER JOIN records r ON e.student_id = r.student_id AND e.course_id = r.course_id WHERE r.grade = 'IP' AND s.student_id = $1`;
      ;
  
      client.query(query, [studentId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    } else {
      // Handle invalid query type
      res.status(400).json({ error: 'Invalid query type' });
    }
  });

  
module.exports = router;