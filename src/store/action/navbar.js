import {
    SETNAVBARHEIGHT
} from '../constants/navbar'

export const setnavbarinfo = (info) => {
    return {
        type: SETNAVBARHEIGHT,
        navBarInfo : info
    }
}

