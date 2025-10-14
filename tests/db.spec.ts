import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

// Update these credentials to match your MySQL Workbench setup
const dbConfig = {
    host: 'localhost',
    port: 3307,
    user: 'root', // <-- replace with your MySQL username
    password: 'Yassine_1144!', // <-- replace with your MySQL password
    database: 'sakila',
};
//jdbc:mysql://localhost:3307/?user=root
test.describe('Sakila Database Tests', () => {
    test('Actor table has data', async () => {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute<any[]>('SELECT * FROM actor LIMIT 5');
        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.length).toBeGreaterThan(0);
        await connection.end();
    });

    test('Film table contains expected columns', async () => {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SHOW COLUMNS FROM film');
        const columnNames = (rows as any[]).map((col: any) => col.Field);
        expect(columnNames).toEqual(
            expect.arrayContaining(['film_id', 'title', 'description', 'release_year'])
        );
        await connection.end();
    });

    test('Find films with rating G', async () => {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM film WHERE rating = 'G' LIMIT 3");
        expect(Array.isArray(rows)).toBeTruthy();
        await connection.end();
    });
});
