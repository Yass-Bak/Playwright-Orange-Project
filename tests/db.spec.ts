import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
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
