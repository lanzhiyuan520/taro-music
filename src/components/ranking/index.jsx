import { useEffect, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image } from '@tarojs/components'

import './index.scss'
const Ranking = (props) => {
    const { item, } = props
    return (
        <View className='ranking-item' onClick={() => { props.onHandClick(item.idx) }}>
            <View className='ranking-img'>
                <Image src={item.coverImgUrl}></Image>
            </View>
            <View className='ranking-item-music-list'>
                {
                    item.tracks.map((Item,index) => {
                        return <View className='music-name' key={Item.first}>{index+1}.{Item.first}-{Item.second}</View>
                    })
                }
            </View>
        </View>
    )
}

export default Ranking


