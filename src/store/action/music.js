import {
    SETPLAYMUSICID,
    SETAUDIO,
    SETCURRENTTIME,
    SETTOP
} from '../constants/music'

export const setmusicid = (musicId) => {
    return {
        type: SETPLAYMUSICID,
        musicId
    }
}
export const setaudio = (audioEle) => {
    return {
        type: SETAUDIO,
        audioEle
    }
}
export const setcurrenttime = (musicTime) => {
    return {
        type: SETCURRENTTIME,
        musicTime
    }
}
export const settop = (top) => {
    return {
        type: SETCURRENTTIME,
        lyricTop : top
    }
}
