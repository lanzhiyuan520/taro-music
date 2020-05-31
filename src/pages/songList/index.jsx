import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import NavBar from '../../components/navbar/'
import MusicBeat from '../../components/musicBeat'
import './index.scss'
import { useSelector,useDispatch } from '@tarojs/redux'

import request from '../../utils/request'
import api from '../../utils/api'

import playIcon from '../../../static/img/play-2.png'
import playIcon2 from '../../../static/img/play-1.png'

import Skeleton from 'taro-skeleton'
import { setmusiclist, setcurrentindex } from '../../store/action/music'

const SongList = (props) => {
    const router = useRouter()
    const dispatch = new useDispatch()
    const music = useSelector(state => state.music)
    const [topListInfo,setTopListInfo] = useState({
        tracks : []
    })


    let { idx } = router.params
    SongList.config = {
        "navigationBarTextStyle":"white"
    }
    const state = useSelector(state => state.navbar)
    const navBarInfo = state.navBarInfo

    let getTopListInfo = () => {
        request(`${api.getTopListInfo}?idx=${idx}`,'get')
            .then(res => {
                setTopListInfo(res.playlist)
                dispatch(setmusiclist(res.playlist.tracks))
            })
            .catch(err => {
                Taro.showToast('加载失败')
            })
    }

    useEffect(() => {
        getTopListInfo()
    },[])

    let goMusicDetail = (id,index) => {
        dispatch(setcurrentindex(index))
        Taro.navigateTo({
            url : `/pages/musicDetail/index?id=${id}`
        })
    }

    return (
        <View className='song-detail'>
            <View className='bgc-img' style={{backgroundImage:'url("'+topListInfo.coverImgUrl+'")'}}></View>
            <NavBar
                title='歌单'
                background='transparent'
                color='#fff'
                iconTheme='white'
                back
                home
            ></NavBar>
            <ScrollView scrollAnchoring={true} scrollY={true} className='scroll-view-content' style={`height:calc(100% - ${navBarInfo.navBarHeight + navBarInfo.navBarExtendHeight}px)`}>
                <View className='song-header-box'>
                    <View>{title}</View>
                    <View className='song-img'>
                        {
                            topListInfo.coverImgUrl?
                                <Image src={topListInfo.coverImgUrl}></Image>
                                :
                                <Skeleton avatar avatarShape='square' avatarSize={180}/>
                        }

                    </View>
                    <View className='song-info'>
                        {
                            topListInfo.name?
                                <View className='song-name'>{topListInfo.name}</View>
                                :
                                <Skeleton title titleWidth='70%'/>
                        }

                        <View className='song-text-content'>
                            {
                                topListInfo.description?
                                    <View className='song-text'>{topListInfo.description}</View>
                                    :
                                    <Skeleton title titleWidth='70%' row={2}/>
                            }
                        </View>
                    </View>
                </View>
                <View className='music-content'>
                    <View className="music-play-title">
                        <Image src={playIcon}></Image>
                        <Text className='play-all'>播放全部</Text>
                        <Text className='all-num'>(共{topListInfo.tracks.length}首)</Text>
                    </View>
                    <View className="music-list">
                        {
                            topListInfo.tracks.length > 0?topListInfo.tracks.map((item,index) => {
                                return (
                                    <View className="music-item" key={item.id} onClick={() => {goMusicDetail(item.id,index)}}>
                                        <View className="music-item-content">
                                            <View className="music-index">{index + 1}</View>
                                            <View className='music-info'>
                                                <View className='music-name'>{item.name}</View>
                                                <View className='singer-box'>
                                                    {
                                                        item.ar.map(arItem => {
                                                            return <Text key={arItem.id} className='singer-name'>{arItem.name}</Text>
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                        <View className='beat-item'>
                                            {
                                                item.id == music.musicId?
                                                    <MusicBeat></MusicBeat>
                                                    :null
                                            }
                                        </View>
                                        <View className="music-play">
                                            <Image src={playIcon2}></Image>
                                        </View>
                                    </View>
                                )
                            }):<Skeleton title avatar row={2} />
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SongList
