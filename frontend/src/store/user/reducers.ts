export const initUserState = {
  username: "username"
}

const User = (state = initUserState, action: any): UserState => {
  switch(action.type){
    case "LOGIN":
      console.log("login");
      return {
        ...action.payload
      }
    case "LOGOUT":
    default:
      console.log("logout")
      return initUserState
  }
}

export default User
