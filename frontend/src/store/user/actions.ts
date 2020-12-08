export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';

export const login = (payload: UserState) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const synchronize = () => {
  return {
    type: UPDATE,
  };
};
