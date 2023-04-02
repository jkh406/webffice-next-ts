import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  // localStorage에 저장.
  storageSession,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합
  whitelist: ["auth"]
  // blacklist -> 그것만 제외
};

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