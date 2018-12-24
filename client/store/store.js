import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reducer from "reducers/reducer";

export default createStore(
  combineReducers({
    reducer,
  }),
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
