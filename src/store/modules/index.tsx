import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

const rootReducer = (state : any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;


    default:
      return combineReducers({
        
      })(state, action);
  }
};

export default rootReducer;