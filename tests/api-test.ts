import { test, expect } from '@playwright/test';

// API tests for JSONPlaceholder public API

test.describe('JSONPlaceholder API', () => {
    // Test: GET /posts returns a list of posts
    test('GET /posts returns a list of posts', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts');
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        // Assert the response is an array and has at least one post
        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts.length).toBeGreaterThan(0);
        // Assert the first post has required properties
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
    });

    // Test: GET /posts/1 returns a single post
    test('GET /posts/1 returns a single post', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        // Assert the post has required properties and correct id
        expect(post).toHaveProperty('id', 1);
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
    });

    // Test: GET /users returns a list of users
    test('GET /users returns a list of users', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users');
        expect(response.ok()).toBeTruthy();
        const users = await response.json();
        // Assert the response is an array and has at least one user
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        // Assert the first user has required properties
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('username');
    });

    // Test: GET /users/1 returns a user
    test('GET /users/1 returns a user', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        // Assert the user has required properties and correct id
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
    });

    // Test: POST /posts creates a new post
    test('POST /posts creates a new post', async ({ request }) => {
        const newPost = { title: 'foo', body: 'bar', userId: 1 };
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: newPost,
        });
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        // Assert the created post matches the sent data and has an id
        expect(post).toMatchObject(newPost);
        expect(post).toHaveProperty('id');
    });

    // Test: PUT /posts/1 updates a post
    test('PUT /posts/1 updates a post', async ({ request }) => {
        const updatedPost = { id: 1, title: 'updated', body: 'updated body', userId: 1 };
        const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
            data: updatedPost,
        });
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        // Assert the updated post matches the sent data
        expect(post).toMatchObject(updatedPost);
    });

    // Test: DELETE /posts/1 deletes a post
    test('DELETE /posts/1 deletes a post', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.ok()).toBeTruthy();
        // JSONPlaceholder returns an empty object for delete
        const result = await response.json();
        expect(result).toEqual({});
    });
});