import { createStore, compose } from "redux";
import reducers from "../reducers/";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      //rootReducer,
      reducers,
      storeEnhancers()
      //storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
    );
    
    

export default store;