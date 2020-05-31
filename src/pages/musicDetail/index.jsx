import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView, Slider} from '@tarojs/components'
import NavBar from '../../components/navbar/'
import './index.scss'
import { useSelector,useDispatch } from '@tarojs/redux'

import request from '../../utils/request'
import api from '../../utils/api'
import defaultImg from '../../../static/img/default-img.png'

import { setmusicid, setaudio,setcurrenttime,setcurrentindex } from '../../store/action/music'

let bgcUrl = 'https://music.163.com/api/img/blur/'
import classNames from 'classnames'
import CommentItem from '../../components/commentItem'
// import Taro from "@tarojs/taro";

let lyricIndex = -1

const MusicDetail = () => {
    const router = useRouter()
    const state = useSelector(state => state.navbar)
    const music = useSelector(state => state.music)
    const navBarInfo = state.navBarInfo
    const musicId = router.params.id
    let id = musicId
    const dispatch = useDispatch()
    const [musicDetail,setMusicDetail] = useState({
        songs : {
            al : {
                picUrl : '',
                blurImg : defaultImg
            }
        },
        urlDetail : {},
        lyricDetail : {},
        comment : {
            hotComments : []
        },
        likeSongs : [],
        lyric : [],
        isFlag : false
    })
    const [isPaused,setIsPaused] = useState(false)
    const [currentTimeStr,setCurrentTimeStr] = useState('00:00')
    const [musicDuration,setMusicDuration] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)

    let getMusicDetail = () => {
        return request(`${api.getMusicDetail}?ids=${id}`,'get')
    }
    let getMusicUrl = () => {
        return request(`${api.getMusicUrl}?id=${id}`,'get')
    }
    let getMusicLyric = () => {
        return request(`${api.getMusicLyric}?id=${id}`,'get')
    }
    let getComment = () => {
        return request(`${api.getComment}?id=${id}`,'get')
    }
    let getLike = () => {
        return request(`${api.getLikeList}?id=${id}`,'get')
    }

    let getData = () => {
        Promise.all([getMusicDetail(),getMusicUrl(),getMusicLyric(),getComment(),getLike()]).then(res => {
            let songs = res[0].songs[0]
            console.log(res[0],'aaa')
            let blurImg = songs.al.picUrl.split('==/')[1]
            songs.al.blurImg = bgcUrl + blurImg

            //歌词解析
            let lrc = res[2].lrc.lyric
            let lrcs = lrc.split("\n")
            let lyric = []
            lrcs.forEach(item => {
                let t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
                lyric.push({
                    t :(t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                    c: item.substring(item.indexOf("]") + 1, item.length)
                })
            })
            setMusicDetail({
                songs : songs,
                urlDetail : res[1].data[0],
                lyricDetail : res[2].lyc,
                comment : res[3],
                likeSongs : res[4].songs,
                lyric : lyric,
                isFlag : true
            })
            //播放音乐
            plalMusic({
                songs : songs,
                urlDetail : res[1].data[0],
                lyricDetail : res[2].lyc,
                comment : res[3],
                likeSongs : res[4].songs,
                lyric : lyric,
                isFlag : true
            })
        })
    }

    useEffect(() => {
        getData()
    },[])

    const plalMusic = (musicDetail) => {
        if (musicDetail.isFlag) {
            if (!musicDetail.urlDetail.url) {
                Taro.showModal({
                    title : '提示',
                    content : '该歌曲暂时不能播放！',
                    showCancel : false,
                })
                return
            }
            let backgroundAudioManager;
            if (music.audioEle) {
                if (music.musicId == id && music.audioEle.paused) {
                    music.audioEle.play()
                }
            }
            if (music.musicId == id) {
                backgroundAudioManager = music.audioEle
                setMusicDuration(Math.floor(backgroundAudioManager.duration))
                setCurrentTime(Math.floor(backgroundAudioManager.currentTime))
            } else {
                let singerStr = ''
                musicDetail.songs.ar.forEach(item => {
                    singerStr += item.name
                })
                dispatch(setmusicid(id))
                backgroundAudioManager = Taro.getBackgroundAudioManager()
                dispatch(setaudio(backgroundAudioManager))

                console.log(music)

                backgroundAudioManager.src = musicDetail.urlDetail.url
                backgroundAudioManager.title = musicDetail.songs.name
                backgroundAudioManager.epname = musicDetail.songs.al.epname
                backgroundAudioManager.singer = singerStr
                backgroundAudioManager.coverImgUrl = musicDetail.songs.al.picUrl
            }
            //播放事件
            backgroundAudioManager.onPlay(() => {
                setIsPaused(backgroundAudioManager.paused)
                setMusicDuration(Math.floor(backgroundAudioManager.duration))
            })
            //暂停事件
            backgroundAudioManager.onPause(() => {
                setIsPaused(backgroundAudioManager.paused)
            })

            //播放失败监听
            backgroundAudioManager.onError((e) => {
                Taro.showToast({
                    title : '播放失败',
                    icon : 'none'
                })
            })
            //播放进度更新事件
            backgroundAudioManager.onTimeUpdate(() => {
                if (lyricIndex >= 0) {
                    lyricIndex = -1
                }
                let currentTime = backgroundAudioManager.currentTime
                dispatch(setcurrenttime(currentTime))
                setCurrentTimeStr(getTimeMMSS(currentTime))
                setCurrentTime(Math.floor(currentTime))
            })
            //播放停止事件
            backgroundAudioManager.onStop(() => {
                setIsPaused(backgroundAudioManager.paused)
            })
            //可以播放了
            backgroundAudioManager.onCanplay(() => {
                console.log('可以播放了')
            })
            //缓冲
            backgroundAudioManager.onWaiting(() => {
                console.log('缓冲中')
            })
            //播放完毕
            backgroundAudioManager.onEnded(() => {
                console.log('播放完毕')
                nextMusic()
            })
            //下一首
            backgroundAudioManager.onNext(() => {
                console.log('下一首')
                nextMusic()
            })
            //上一首
            backgroundAudioManager.onPrev(() => {
                console.log('上一首')
                prevMusic()
            })
        }
    }

    const changeLyric = (index) => {
        lyricIndex = index
        return 'active-text'
    }

    const getMusicOrder = () => {
        return Taro.getStorageSync('playOrder')
    }

    const changeMusic = (mId) => {
        id = mId
        getData()
    }

    const pausedMusic = () => {
        music.audioEle.pause()
    }

    const playMusic = () => {
        music.audioEle.play()
    }

    const prevMusic = () => {
        let musicOrder = getMusicOrder()
        let { musicList,currentIndex } = music
        let prevMusicId
        if (currentIndex > 0) {
            prevMusicId = musicList[currentIndex-1].id
            dispatch(setcurrentindex(currentIndex-1))
        } else {
            prevMusicId = musicList[musicList.length-1].id
            dispatch(setcurrentindex(musicList.length-1))
        }

        if (musicOrder === 0) {
            changeMusic(prevMusicId)
        }
    }

    const nextMusic = () => {
        let musicOrder = getMusicOrder()
        let { musicList,currentIndex } = music
        let nextMusicId
        if (musicList[currentIndex+1]) {
            nextMusicId = musicList[currentIndex+1].id
            dispatch(setcurrentindex(currentIndex+1))
        } else {
            nextMusicId = musicList[0].id
            dispatch(setcurrentindex(0))
        }

        if (musicOrder === 0) {
            changeMusic(nextMusicId)
        }
    }

    const getTimeMMSS = date => {
        let minute =  Math.floor(date / 60)
        let second =  Math.floor(date % 60)
        return `${minute < 10?'0'+minute:minute}:${second < 10? '0'+second:second}`
    }

    const changeMusicPosition = e => {
        let val = e.detail.value
        music.audioEle.seek(val)
    }

    return (
        <View className="music-detail-box">
            <View className='bgc-img' style={{backgroundImage:'url("'+musicDetail.songs.al.blurImg+'")'}}></View>
            <NavBar
                title={musicDetail.songs.name}
                background='transparent'
                color='#fff'
                iconTheme='white'
                back
                home
            ></NavBar>
            <ScrollView scrollY={true} className='scroll-view-content' style={`height:calc(100% - ${navBarInfo.navBarHeight + navBarInfo.navBarExtendHeight}px)`}>
                <View className="content">
                    <View className="play-box">
                        <View className='play-support'>
                            <View className='support-img'>
                                <Image src={require('../../../static/img/bgc-support.png')}></Image>
                            </View>
                        </View>
                        <View className='play-bgc-content'>
                            <View className='bgc-img-box spin__'>
                                <View className='music-bgc'></View>
                                <View className="music-img">
                                    <Image src={musicDetail.songs.al.picUrl}></Image>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='music-slider-content'>
                        <Slider
                            activeColor='#fff'
                            backgroundColor='hsla(0,0%,100%,.6)'
                            max={musicDuration}
                            value={currentTime}
                            block-size='12'
                            onChange={changeMusicPosition}
                        ></Slider>
                        <Text className='time'>{currentTimeStr}</Text>
                    </View>
                    <View className='operating'>
                        <View className='prev-music' onClick={prevMusic}>
                            <Image className='music-icon' src={require('../../../static/img/prec-music-icon.png')}></Image>
                        </View>
                        <View className="music-play-content">
                            {
                                isPaused?
                                    <Image onClick={playMusic} className='music-icon' src={require('../../../static/img/play-music-icon.png')}></Image>
                                    :
                                    <Image onClick={pausedMusic} className='music-icon' src={require('../../../static/img/zanting-music-icon.png')}></Image>
                            }

                        </View>
                        <View className="next-music" onClick={nextMusic}>
                            <Image className='music-icon' src={require('../../../static/img/next-music-icon.png')}></Image>
                        </View>
                    </View>
                    <View className='lyrics-box'>
                        <View className='lyrics-content' style={`transform:translateY(${music.musicTop}rpx)`}>
                            {
                                musicDetail.lyric.map((item,index) => {
                                    return (
                                        index >= lyricIndex-1 && index < index + 1?
                                        <View className={
                                            classNames('lyrics-text',
                                                (parseFloat(music.musicTime) >= parseFloat(item.t) && parseFloat(music.musicTime) <= parseFloat(musicDetail.lyric[index+1].t))?changeLyric(index):'')
                                        } key={item.t}>{item.c}</View>:''
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View className="like-music">
                        <View className="like-text">喜欢这首歌的人也听</View>
                        <View className="like-music-list">
                            {
                                musicDetail.likeSongs.map(item => {
                                    return (
                                        <View key={item.id} className="like-music-item" onClick={() => { changeMusic(item.id) }}>
                                            <View className='music-img'>
                                                <Image src={item.album.picUrl}></Image>
                                            </View>
                                            <View className="music-info">
                                                <View className="music-info-content">
                                                    <View className="music-name">{item.album.name}</View>
                                                    {
                                                        item.artists.map(arItem => {
                                                            return <Text key={arItem.name} className='singer-name'>{arItem.name}</Text>
                                                        })
                                                    }
                                                </View>
                                                <View className='play-music'>
                                                    <Image src={require('../../../static/img/play-1.png')}></Image>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View className="comments-content">
                        <View className="comment-text">精彩评论</View>
                        <View className="comment-list">
                            {
                                musicDetail.comment.hotComments.map(item => {
                                    return (
                                        <View key={item.commentId} className="comment-item">
                                            <CommentItem comment={item}></CommentItem>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MusicDetail
