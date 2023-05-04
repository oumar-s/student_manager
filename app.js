const express = require('express');
const { client, connectToDatabase } = require('./database/database');
const routes = require('./routes');
const app = express();

app.use(express.json());
connectToDatabase();

app.use('/api', routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

