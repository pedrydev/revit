import { useTodos } from './hooks/useTodos';

export default function Todos() {
  const todos = useTodos();
  return <h1>Total todos: {todos?.length}</h1>;
}
