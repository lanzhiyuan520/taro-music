import { SETNAVBARHEIGHT } from '../constants/navbar'

const INITIAL_STATE = {
    navBarInfo: {}
}

export default function navbar (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETNAVBARHEIGHT:
            return {
                ...state,
                navBarInfo: action.navBarInfo
            }
        default:
            return state
    }
}
