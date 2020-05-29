import { useEffect, useRouter, useLayoutEffect, useReducer, useState, useContext, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Text ,Image ,ScrollView} from '@tarojs/components'
import './index.scss'


const CommentItem = (props) => {
    CommentItem.defaultProps = {
        comment : {}
    }
    const { comment } = props
    let [commentItem,setCommentItem] = useState({})
    useEffect(() => {
        comment.commentTime = new Date(comment.time).Format('yyyy-mm-dd')
        setCommentItem(comment)
    },[comment])
    return (
        <View className="comment">
            <View className='user-avatar'>
                <Image src={commentItem.user.avatarUrl}></Image>
            </View>
            <View className='comment-item-content'>
                <View className='comment-item-header'>
                    <View className="comment-user-info">
                        <View className="user-name">{commentItem.user.nickname}</View>
                        <View className='time'>{commentItem.commentTime}</View>
                    </View>
                    <View className="comment-awesome">
                        <Text>{commentItem.likedCount}</Text>
                        <Image src={require('../../../static/img/zan.png')}></Image>
                    </View>
                </View>
                <View className="comment-conetent-text">
                    {commentItem.content}
                </View>
            </View>
        </View>
    )
}

export default CommentItem
