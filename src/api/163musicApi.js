import request from '@/utils/163music'

class Music {
  getMusicList = (id) =>
    request({
      url: `playlist/detail?id=${id}&limit=10`,
      method: 'post',
    })

  getSong = (id) =>
    request({
      url: `/song/detail?ids=${id}`,
      method: 'post',
    })

  getSongUrl = (id) =>
    request({
      url: `/song/url?id=${id}`,
      method: 'post',
    })
}

export default new Music()
