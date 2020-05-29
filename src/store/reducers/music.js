import { SETPLAYMUSICID, SETAUDIO, SETCURRENTTIME, SETTOP} from '../constants/music'

const INITIAL_STATE = {
    musicId: null,
    audioEle : null,
    musicTime : 0,
    musicTop : 0
}

export default function music (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETPLAYMUSICID:
            return {
                ...state,
                musicId: action.musicId
            }
            break;
        case SETAUDIO:
            return {
                ...state,
                audioEle : action.audioEle
            }
            break;
        case SETCURRENTTIME:
            return {
                ...state,
                musicTime : action.musicTime
            }
            break;
        case SETTOP:
            return {
                ...state,
                musicTime : action.musicTop
            }
            break;

        default:
            return state
    }
}
