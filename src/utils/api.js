const baseUrl = 'https://lanzhiyuan99.cn/music_api'

export default {
    //获取排行榜
    getTopList : baseUrl + '/toplist',
    //获取榜单信息
    getTopListInfo : baseUrl + '/top/list',
    //榜单摘要
    getTopListDetail : baseUrl + '/toplist/detail',
    //获取音乐url
    getMusicUrl : baseUrl + '/song/url'
}
