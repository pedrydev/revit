import { useCallback, useState } from 'react';

export type UseToggle = [boolean, () => void];

export default function useToggle(init = false): UseToggle {
  const [state, setState] = useState(init);
  const toggle = useCallback(() => {
    setState((s) => !s);
  }, []);
  return [state, toggle];
}
