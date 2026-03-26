const USER_KEY = 'aura_user';

export const getUser = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to parse user data from localStorage', error);
    return null;
  }
};

export const setUser = (data) => {
  try {
    const currentUser = getUser() || {};
    const updatedUser = { ...currentUser, ...data };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error('Failed to save user data to localStorage', error);
    return null;
  }
};

export const clearUser = () => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Failed to clear user data from localStorage', error);
    }
}
