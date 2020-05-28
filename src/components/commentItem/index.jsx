import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import './index.scss'


const CommentItem = (props) => {
    return (
        <View className="comment">
            <View className='user-avatar'>
                <Image src='http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg'></Image>
            </View>
            <View className='comment-item-content'>
                <View className='comment-item-header'>
                    <View className="comment-user-info">
                        <View className="user-name">雨落东海只剩浪</View>
                        <View className='time'>2020年4月25日</View>
                    </View>
                    <View className="comment-awesome">
                        <Text>94330</Text>
                        <Image src={require('../../../static/img/zan.png')}></Image>
                    </View>
                </View>
                <View className="comment-conetent-text">
                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                </View>
            </View>
        </View>
    )
}

export default CommentItem
