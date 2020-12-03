export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const login = (payload: UserState) => {
  return {
    type: LOGIN,
    payload
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
