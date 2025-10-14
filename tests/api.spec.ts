import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API', () => {
    test('GET /posts returns a list of posts', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts');
        expect(response.ok()).toBeTruthy();
        const posts = await response.json();
        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
    });

    test('GET /posts/1 returns a single post', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post).toHaveProperty('id', 1);
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
    });

    test('GET /users returns a list of users', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users');
        expect(response.ok()).toBeTruthy();
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('username');
    });

    test('GET /users/1 returns a user', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
    });

    test('POST /posts creates a new post', async ({ request }) => {
        const newPost = { title: 'foo', body: 'bar', userId: 1 };
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: newPost,
        });
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post).toMatchObject(newPost);
        expect(post).toHaveProperty('id');
    });

    test('PUT /posts/1 updates a post', async ({ request }) => {
        const updatedPost = { id: 1, title: 'updated', body: 'updated body', userId: 1 };
        const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
            data: updatedPost,
        });
        expect(response.ok()).toBeTruthy();
        const post = await response.json();
        expect(post).toMatchObject(updatedPost);
    });

    test('DELETE /posts/1 deletes a post', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.ok()).toBeTruthy();
        // JSONPlaceholder returns an empty object for delete
        const result = await response.json();
        expect(result).toEqual({});
    });
});