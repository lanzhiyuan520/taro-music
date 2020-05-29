import {
    SETPLAYMUSICID,
    SETAUDIO,
    SETCURRENTTIME,
    SETCURRENTINDEX,
    SETMUSICLIST
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
export const setcurrentindex = (index) => {
    return {
        type: SETCURRENTINDEX,
        currentIndex : index
    }
}
export const setmusiclist = (musicList) => {
    return {
        type: SETMUSICLIST,
        musicList
    }
}
