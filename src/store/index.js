import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const middlewares = [
    thunkMiddleware,
    createLogger()
]

export default function configStore () {
    // const store = createStore(rootReducer, applyMiddleware(...middlewares))
    const store = createStore(rootReducer)
    return store
}
