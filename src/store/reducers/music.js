import { SETPLAYMUSICID, SETAUDIO, SETCURRENTTIME, SETCURRENTINDEX, SETMUSICLIST} from '../constants/music'

const INITIAL_STATE = {
    musicId: null,
    audioEle : null,
    musicTime : 0,
    musicTop : 0,
    musicList : [],
    currentIndex : 0
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
        case SETMUSICLIST:
            return {
                ...state,
                musicList : action.musicList
            }
            break;
        case SETCURRENTINDEX:
            return {
                ...state,
                currentIndex : action.currentIndex
            }
            break;
        default:
            return state
    }
}
