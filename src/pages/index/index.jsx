import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import NavBar from '../../components/navbar/'
import Ranking  from '../../components/ranking/'
import './index.scss'
import { AtIcon } from 'taro-ui'

import request from '../../utils/request'
import api from '../../utils/api'
import Skeleton from 'taro-skeleton'

const topType = {
    '云音乐新歌榜':'0',
    '云音乐热歌榜':'1',
    '网易原创歌曲榜':'2',
    '云音乐飙升榜':'3'
}

export default class Index extends Component {
  constructor (props) {
      super(props)
      this.state = {
        topList : []
      }
  }
  componentWillMount () { }

  componentDidMount () {
     this.getTopList()
  }
  getTopList () {
      request(`${api.getTopListDetail}`,'get')
          .then(res => {
              let list = res.list.splice(0,4)
              list.forEach(item => {
                  item.idx = topType[item.name]
              })
              this.setState({
                  topList : list
              })
          })
          .catch(err => {
              console.log(err)
          })
  }
  config = {
    navigationBarTitleText: '首页'
  }
  goDetailPage (idx) {
      Taro.navigateTo({
          url : `/pages/songList/index?idx=${idx}`
      })
  }
  render () {
    return (
      <View className='index'>
          <NavBar
              title='听音乐'
              background='transparent'
          ></NavBar>
          <View className='search-box'>
              <View className='search-content'>
                  <AtIcon value='search' size='20' color='#ababab'></AtIcon>
                  <Text className='search-music-text'>搜索歌曲</Text>
              </View>
          </View>
          <View className='ranking-list'>
              {
                  this.state.topList.length > 0?this.state.topList.map(item => {
                      return (
                          <View className='ranking-item' key={item.id}>
                              <Ranking
                                item={item}
                                onHandClick={this.goDetailPage}
                              ></Ranking>
                          </View>
                      )
                  }):<Skeleton title avatar row={3} />
              }
          </View>
      </View>
    )
  }
}
