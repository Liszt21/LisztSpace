export const initUserState = {
  id: undefined,
  username: undefined,
  email: undefined,
  nation: undefined,
  hobby: undefined,
  major: undefined,
  about_me: undefined,
  token: undefined,
  name: undefined,
};

const User = (state: UserState = initUserState, action: any): UserState => {
  switch (action.type) {
    case 'LOGIN':
      console.log('login');
      return {
        ...action.payload,
      };
    case 'UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'LOGOUT':
    default:
      return initUserState;
  }
};

export default User;
