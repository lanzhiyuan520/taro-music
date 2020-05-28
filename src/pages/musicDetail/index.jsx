import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import NavBar from '../../components/navbar/'
import './index.scss'
import { useSelector,useDispatch } from '@tarojs/redux'

import request from '../../utils/request'
import api from '../../utils/api'


const MusicDetail = () => {

    return (
        <View className="music-detail-box">
            <View className='bgc-img'></View>
            <NavBar
                title='歌单'
                background='transparent'
                color='#fff'
                iconTheme='white'
                back
                home
            ></NavBar>
        </View>
    )
}

export default MusicDetail
