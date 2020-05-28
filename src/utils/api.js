const baseUrl = 'https://lanzhiyuan99.cn/music_api'

export default {
    //获取排行榜
    getTopList : baseUrl + '/toplist',
    //获取榜单信息
    getTopListInfo : baseUrl + '/top/list',
    //榜单摘要
    getTopListDetail : baseUrl + '/toplist/detail',
    //获取音乐url
    getMusicUrl : baseUrl + '/song/url',
    //获取音乐详情
    getMusicDetail : baseUrl + '/song/detail',
    //获取歌词
    getMusicLyric : baseUrl + '/lyric',
    //获取喜欢
    getLikeList : baseUrl + '/like',
    //获取评论
    getComment : baseUrl + '/comment/music',
}
