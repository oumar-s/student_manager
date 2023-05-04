const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "Ousi6367",
    database: "postgres"
});

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

module.exports = { client, connectToDatabase };