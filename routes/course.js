const express = require('express');
const router = express.Router();
const { client } = require('../database/database'); 


router.get('/', (req, res) => {
    const { queryType, coursetId} = req.query;

    if (queryType === 'table') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT * FROM courses`;
  
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
    
    } else if (queryType === 'course') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT c.course_id, c.course_name, c.location, c.credits, c.time, c.days, p.prof_name AS professor, ta.ta_name AS ta, d.dept_name AS department
      FROM courses c
      LEFT JOIN professors p ON c.prof_id = p.prof_id
      LEFT JOIN teaching_assistants ta ON c.ta_id = ta.ta_id
      LEFT JOIN departments d ON c.dept_id = d.dept_id
      WHERE c.course_id = $1`;
  
      client.query(query, [coursetId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    } else if (queryType === 'studentList') {
      
      const query = 
      `SELECT s.student_id, s.student_name, s.major
      FROM students s
      INNER JOIN enrollments e ON s.student_id = e.student_id
      WHERE e.course_id = $1`;
  
      client.query(query, [coursetId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });

    } else if (queryType === 'studentCount') {
      
      const query = 
      `SELECT COUNT(*) AS student_count
      FROM enrollments
      WHERE course_id = $1`;

      client.query(query, [coursetId], (err, result) => {
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