// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/query.js

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open a database connection
async function openDB() {
  return open({
    filename: '../backend/data/data.db', // path to your SQLite file
    driver: sqlite3.Database,
  });
}

export default async function handler(req, res) {
  try {
    console.log('Database connection opened successfully.');
    // Open the database connection
    const db = await openDB();


    // Query the database (example: select all users)
    const users = await db.all('SELECT sd.create_date, sd.watts as solar_watts, sd.surface_temperature, sd.ambient_temperature, hd.watts as hydro_watts, hd.flowrate, wd.watts as wind_watts FROM solar_data sd JOIN hydro_data hd ON sd.create_date = hd.create_date JOIN wind_data wd ON sd.create_date = wd.create_date ORDER BY sd.create_date DESC Limit 1');

    // Close the database connection
    await db.close();

    // Respond with the query result
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}






