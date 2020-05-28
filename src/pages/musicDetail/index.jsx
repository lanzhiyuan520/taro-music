import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import NavBar from '../../components/navbar/'
import './index.scss'
import { useSelector,useDispatch } from '@tarojs/redux'

import request from '../../utils/request'
import api from '../../utils/api'
import defaultImg from '../../../static/img/default-img.png'

let bgcUrl = 'https://music.163.com/api/img/blur/'

import commentItem from '../../components/commentItem'

const MusicDetail = () => {
    const router = useRouter()
    const state = useSelector(state => state.navbar)
    const navBarInfo = state.navBarInfo
    const { id } = router.params

    const [musicDetail,setMusicDetail] = useState({
        songs : {
            al : {
                picUrl : ''
            }
        },
        urlDetail : {},
        lyricDetail : {},
        comment : {}
    })

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

    let getData = () => {
        Promise.all([getMusicDetail(),getMusicUrl(),getMusicLyric(),getComment()]).then(res => {
            console.log(res);
            let songs = res[0].songs[0]
            let blurImg = songs.al.picUrl.split('==/')[1]
            songs.al.blurImg = bgcUrl + blurImg
            setMusicDetail({
                songs : songs,
                urlDetail : res[1].data[0],
                lyricDetail : res[2].lyc,
                comment : res[3]
            })
        })
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <View className="music-detail-box">
            <View className='bgc-img' style={{backgroundImage:'url("'+musicDetail.songs.al.blurImg+'")'}}></View>
            <NavBar
                title='歌单'
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
                    <View className='lyrics-content'>
                        <View className='lyrics-text'>哈哈哈哈哈哈</View>
                        <View className='lyrics-text active-text'>哈哈哈哈哈哈</View>
                        <View className='lyrics-text'>哈哈哈哈哈哈</View>
                    </View>
                    <View className="like-music">
                        <View className="like-text">喜欢这首歌的人也听</View>
                        <View className="like-music-list">
                            <View className="like-music-item">
                                <View className='music-img'>
                                    <Image src='http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg'></Image>
                                </View>
                                <View className="music-info">
                                    <View className="music-info-content">
                                        <View className="music-name">夏天的风</View>
                                        <View className='singer-name'>哈哈哈</View>
                                    </View>
                                    <View className='play-music'>
                                        <Image src={require('../../../static/img/play-1.png')}></Image>
                                    </View>
                                </View>
                            </View>
                            <View className="like-music-item">
                                <View className='music-img'>
                                    <Image src='http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg'></Image>
                                </View>
                                <View className="music-info">
                                    <View className="music-info-content">
                                        <View className="music-name">夏天的风</View>
                                        <View className='singer-name'>哈哈哈</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="comments-content">
                        <View className="comment-text">精彩评论</View>
                        <View className="comment-list">
                            <View className="comment-item">
                                <commentItem></commentItem>
                            </View>
                            <View className="comment-item">
                                <commentItem></commentItem>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default MusicDetail
