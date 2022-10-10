import { useQuery } from '@tanstack/react-query';
import todoService from '../services/todo-service';

export function useTodos() {
  const { data } = useQuery(['todos'], todoService.get);
  return data;
}
