import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducers } from "./Reducers/reducers";
import watchSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(watchSaga);

export default store;
