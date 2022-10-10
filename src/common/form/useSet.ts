import { useCallback, useState } from 'react';

const defaultComparisonFunction = <T>(a: T, b: T) => {
  if (typeof a === 'object') {
    if (typeof b === 'object') {
      // @ts-ignore
      return a.id === b.id;
    }
    // @ts-ignore
    return a.id === b;
  }
  return a === b;
};

export interface UseSetArgs<T> {
  comparisonFunction: (a: T, b: T) => boolean;
  initSelected?: T[];
}

export default function useSet<T>({
  initSelected = [],
  comparisonFunction = defaultComparisonFunction,
}: UseSetArgs<T>) {
  const [selected, setSelected] = useState<T[]>(initSelected);

  const update = useCallback(
    (obj: T) => {
      const withoutCurrent = selected.filter((item) => !comparisonFunction(obj, item));
      if (withoutCurrent.length === selected.length) setSelected([...selected, obj]);
      else setSelected(withoutCurrent);
    },
    [comparisonFunction, selected]
  );

  const updateMany = useCallback(
    (arr: T[]) => {
      const withoutCurrents = selected.filter((s) => !arr.some((el) => comparisonFunction(s, el)));
      setSelected([...withoutCurrents, ...arr]);
    },
    [comparisonFunction, selected]
  );

  return { selected, setSelected, update, updateMany };
}
