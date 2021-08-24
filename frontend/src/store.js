import { createStore, combineReducers, applyMiddleware } from 'redux'
import queryReducer from './reducers/queryReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export default createStore(
    combineReducers({
      queries: queryReducer
    }),
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
