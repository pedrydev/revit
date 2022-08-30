import { assert, describe, expect, test } from 'vitest';

import HttpClient from './HttpClient';

const client = new HttpClient({
  url: 'https://jsonplaceholder.typicode.com',
});

describe('HttpClient', () => {
  test('should make get request', async () => {
    const { data, response } = await client.get({ url: 'todos/1' });
    const result = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };
    expect(response.ok).toBe(true);
    assert.deepEqual(data, result);
  });

  test('should make delete request', async () => {
    const { data, response } = await client.delete({ url: 'todos/1' });
    expect(response.ok).toBe(true);
    expect(data).toBe(null);
  });

  test('should make post request', async () => {
    const body = {
      id: 1,
      body: 'Body',
      title: 'Title',
      userId: 'Pedro',
    };
    const { data, response } = await client.post({
      data: body,
      responseType: 'json',
      url: 'todos',
    });
    expect(response.ok).toBe(true);
    expect(data.body).toBe(body.body);
    expect(data.title).toBe(body.title);
    expect(data.userId).toBe(body.userId);
    expect(data.id).toBe(201);
  });

  test('should make put request', async () => {
    const { data, response } = await client.put({
      data: {
        id: 1,
        body: 'Body',
        title: 'Title',
        userId: 'Pedro',
      },
      responseType: 'json',
      url: 'todos/1',
    });
    const result = {
      body: 'Body',
      title: 'Title',
      userId: 'Pedro',
      id: 1,
    };
    expect(response.ok).toBe(true);
    assert.deepEqual(data, result);
  });
});
