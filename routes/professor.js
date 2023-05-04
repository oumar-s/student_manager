const express = require('express');
const router = express.Router();
const { client } = require('../database/database'); 


router.get('/', (req, res) => {
    const { queryType, professorId} = req.query;

    if (queryType === 'table') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT * FROM professors`;
  
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
    
    } else if (queryType === 'professor') {
      // Handle query to retrieve a specific student by ID
      const query = 
      `SELECT p.prof_id, p.prof_name, p.prof_office_hrs, d.dept_name
      FROM professors p
      JOIN departments d ON p.dept_id = d.dept_id
      WHERE prof_id = $1;`;
  
      client.query(query, [professorId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });
    } else if (queryType === 'teachingList') {
      
      const query = 
      `SELECT c.course_id, c.course_name
      FROM courses c
      INNER JOIN professors p ON c.prof_id = p.prof_id
      WHERE p.prof_id = $1;`;
  
      client.query(query, [professorId], (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        console.log('Connected to the database');
        console.table(result.rows);
        res.json(result.rows);
      });

    } else if (queryType === 'teachingCount') {
      
      const query = 
      `SELECT COUNT(*) AS class_count
      FROM courses
      WHERE prof_id = $1;`;

      client.query(query, [professorId], (err, result) => {
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