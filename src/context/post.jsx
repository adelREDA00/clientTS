import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  Id: JSON.parse(localStorage.getItem("Id")) || null,
};

export const PostContext = createContext(INITIAL_STATE);


const AuthReducer = (state, action) => {
  switch (action.type) {
    case "POST_START":
      return {
        Id: action.payload,
      };
    case "EXIT":
      return {
        Id: null,
      };
    default:
      return state;
  }
};


export const PostContextProvider = ({ children }) => {
  const [state, dispatchPost] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("Id", JSON.stringify(state.Id));
  }, [state.Id]);


  return (
    <PostContext.Provider
      value={{
        Id: state.Id,
        dispatchPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};