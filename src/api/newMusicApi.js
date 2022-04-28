import request from "@/utils/newMusicRequest";

class Music {
  gitMusicLists = (id) =>
    request({
      url: `/v1/playlist/detail?id=${id}`,
      method: "get"
    });
  getSong = (id) =>
    request({
      url: `v1/music/detail?ids=${id}`,
      method: "post"
    });

  getSongUrl = (id) =>
    request({
      url: `v1/music/url?id=${id}`,
      method: "post"
    });
}

export default new Music();
