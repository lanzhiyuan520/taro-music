import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import './index.scss'


const MusicBeat = () => {
    return (
        <View className='beat-content'>
            <View className='beat-item item1'></View>
            <View className='beat-item item2'></View>
            <View className='beat-item item3'></View>
            <View className='beat-item item4'></View>
            <View className='beat-item item5'></View>
            <View className='beat-item item6'></View>
            <View className='beat-item item7'></View>
        </View>
    )
}

export default MusicBeat
