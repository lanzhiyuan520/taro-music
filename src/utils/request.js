import Taro, { Component } from '@tarojs/taro'
let count = 0
const request = (requestUrl,method,data) => {
    count++
    Taro.showLoading({title : '加载中'})
    return new Promise((resolve, reject) => {
        Taro.request({
          url : requestUrl,
          method,
          data,
          success : res => {
              resolve(res.data)
          },
          fail : err => {
              reject(err)
          },
          complete : msg => {
              count--
              if (count <= 0) {
                  Taro.hideLoading()
              }
          }
        })
    })
}

export default request
