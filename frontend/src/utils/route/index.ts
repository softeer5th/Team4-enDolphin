const LAST_VISITED_PATH_KEY = 'lastVisitedPath';

export const setLastRoutePath = (path: string) => {
  sessionStorage.setItem(LAST_VISITED_PATH_KEY, path);
};

export const getLastRoutePath = () => sessionStorage.getItem(LAST_VISITED_PATH_KEY);