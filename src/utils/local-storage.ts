/* eslint-disable no-unused-vars */
export enum StorageItems {
  barOptionsDimensions = 'BAR_OPTIONS_DIMENSIONS',
  barOptionsPositioning = 'BAR_OPTIONS_POSITIONING',
  barGoalDimensions = 'BAR_GOAL_DIMENSIONS',
  barGoalPositioning = 'BAR_GOAL_POSITIONING',
  windowDimensions = 'WINDOW_DIMENSIONS',
  windowPositioning = 'WINDOW_POSITIONING',
  level = 'LEVEL',
}

interface Storage {
  localString: StorageItems;
  localObject: any;
}

export const setLocalStorage = ({ localString, localObject }: Storage) =>
  localStorage.setItem(localString, JSON.stringify(localObject));

export const getLocalStorage = ({ localString }: Pick<Storage, 'localString'>) => {
  const item = localStorage.getItem(localString);
  return item ? JSON.parse(item) : null;
};

export const setSimpleLocalStorage = (localString: 'LEVEL', value: number) => {
  localStorage.setItem(localString, String(value));
};

export const getSimpleLocalStorage = (localString: 'LEVEL') => {
  return localStorage.getItem(localString);
};
