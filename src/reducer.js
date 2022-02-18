export const initialState = {
  user: null,
  uid: null,
  photoURL: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_SESSION: "SET_SESSION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_SESSION:
      localStorage.setItem("uid", action.uid);
      localStorage.setItem("displayName", action.displayName);
      localStorage.setItem("photoURL", action.photoURL);
      return {
        ...state,
        uid: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL,
      };
    default:
      return state;
  }
};

export default reducer;
