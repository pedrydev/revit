import HttpClient from '@/common/http/HttpClient';
import Todo from '@/modules/home/models/Todo';

const client = new HttpClient({
  url: 'https://jsonplaceholder.typicode.com',
});

class TodoService {
  async get(): Promise<Todo[]> {
    const { data } = await client.get({
      url: 'todos',
    });
    return data as Todo[];
  }
}

export default new TodoService();
