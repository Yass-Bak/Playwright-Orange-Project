import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file for database credentials
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

// Database connection configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // Database port (default 3306)
    user: process.env.DB_USER, // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
};

// Group all Sakila database tests
test.describe('Sakila Database Tests', () => {
    // Test: Check that the actor table contains data
    test('Actor table has data', async () => {
        const connection = await mysql.createConnection(dbConfig);
        // Query the first 5 actors
        const [rows] = await connection.execute<any[]>('SELECT * FROM actor LIMIT 5');
        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.length).toBeGreaterThan(0);
        await connection.end();
    });

    // Test: Check that the film table contains expected columns
    test('Film table contains expected columns', async () => {
        const connection = await mysql.createConnection(dbConfig);
        // Get column names from the film table
        const [rows] = await connection.execute('SHOW COLUMNS FROM film');
        const columnNames = (rows as any[]).map((col: any) => col.Field);
        expect(columnNames).toEqual(
            expect.arrayContaining(['film_id', 'title', 'description', 'release_year'])
        );
        await connection.end();
    });

    // Test: Find films with rating 'G'
    test('Find films with rating G', async () => {
        const connection = await mysql.createConnection(dbConfig);
        // Query films with rating 'G'
        const [rows] = await connection.execute("SELECT * FROM film WHERE rating = 'G' LIMIT 3");
        expect(Array.isArray(rows)).toBeTruthy();
        await connection.end();
    });
});