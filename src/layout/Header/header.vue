<template>
  <div id="header" ref="headerRef" theme>
    <div class="left">
      <div class="logo">
        <router-link to="/links">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.79 37.12">
            <g>
              <g>
                <path
                  fill="#ff2351"
                  d="M11.13 25.52v9.12H8.67v2.48H11.14v-2.48h2.51v2.48h9.7V25.26l3.51-6.62h-1.97v-2.48h5.81L39.27 0H23.42v2.48h2.3l-4.75 8.82 1.28 2.32L21 15.94l-1.27-2.32L12.21 0H0l8.65 16.16H6.63v2.48H15.35v2.47H4.15v2.48h5.95l1.03 1.93z"
                />
                <path fill="#ff2351" d="M1.68 16.16h2.48v2.47H1.68z" />
                <path
                  fill="#00d8eb"
                  d="M11.05 18.64H9.98h5.37v2.47H11.3l2.36 4.41v11.6H28.5v-2.48h-2.63v-9.38l2.2-4.15h4.51v-2.47h-7.69v-2.48h8.33L41.8 0H29.58L28.5 2l-.25.48-6 11.14-1.28-2.32L14.74 0H2.52l9.98 18.64h-1.45z"
                />
                <path
                  fill="#00d8eb"
                  d="M35.05 16.16h2.48v2.47h-2.48zM32.58 21.11h2.47v2.47h-2.47z"
                />
                <path
                  fill="#000b34"
                  d="M11.05 18.64H9.98h5.37v2.47H11.3l2.36 4.41v11.6h9.69V25.26l3.51-6.62h-1.97v-2.48h5.81L39.27 0h-9.69L28.5 2l-.25.48-6 11.14L21 15.94l-1.27-2.32L12.21 0H2.52l9.98 18.64h-1.45z"
                />
              </g>
            </g>
          </svg>
          <span class="font">uan</span>
        </router-link>
      </div>
      <div class="search">
        <div>
          <input type="text" placeholder="学会搜索。" required />
        </div>
      </div>
    </div>
    <div class="right">
      <MusicPlay :list="musiclist"></MusicPlay>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rank"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-message"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="showDialog">
        <use xlink:href="#icon-profile"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import MusicPlay from "@/components/musicPlay.vue";

import { handleArrData } from "@/utils";
import music from "@/api/163musicApi";
import { ref } from "vue";
import { ElNotification } from "element-plus";

export default {
  name: "Header",
  components: {
    MusicPlay
  },
  setup() {
    const musiclist = ref([
      //数据格式
      {
        id: 0,
        name: "漫步人生路 (原唱：邓丽君)", //歌曲名
        url: "http://m10.music.126.net/20220127160017/ce94e914e388f251a006435e80d31538/yyaac/obj/wonDkMOGw6XDiTHCmMOi/1918458169/baa9/638e/4385/bfc440b9ca05c987fc7d4178814325ef.m4a", // 歌曲url
        cover: "http://p2.music.126.net/eoSIzgM0aCYBhw-eV_U7hw==/109951164818179058.jpg?param=130y130",
        singer: "丫蛋蛋" // 歌手
      },
      {
        id: 1,
        name: "喜欢你", //歌曲名
        url: "http://m704.music.126.net/20220127160845/f823c55bb07bf119b90abba70cbcc906/jdyyaac/5359/5659/0409/d37e80e877a318ee6fd23c169dd395a7.m4a?authSecret=0000017e9a7d8b3200570aaba72e169b",
        cover: "http://p1.music.126.net/u_1EudmF8Swgow6vfgYe1g==/8896148580676276.jpg?param=130y130",
        singer: "G.E.M.邓紫棋" // 歌手
      }
    ]);
    const showDialog = () => {
      ElNotification({
        title: "复制成功",
        message: `${musiclist.value}`,
        type: "success",
        offset: 70,
        duration: 2000
      });
    };
    return {
      showDialog,
      musiclist
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    // music play List
    async getSongList() {
      const res = await music.getMusicList(5081480238);
      console.log(res.data.playlist.tracks);
      if (res.status === 200 && res.data) {
        let arr = [];
        for (const item of res.data.playlist.tracks) {
          const song = await music.getSong(item.id);
          const songurl = await music.getSongUrl(item.id);
          arr.push({
            ...song.data.songs[0],
            ...song.data.songs[0],
            ...songurl.data.data[0]
          });
          this.musiclist = handleArrData(arr);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
svg {
  height: 35px;
}

#header {
  width: 100%;
  height: 70px;
  line-height: 80px;
  background: url('~@/assets/MulticolorGlows.png') #e7e4e4;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  border-radius: 5px;
  position: fixed;
  top: 0;
  z-index: 10;
  transition: all 0.5s;

  ::v-deep .el-notification {
    background-color: rgba(255, 255, 255, 0.99) !important;
  }

  .left {
    display: flex;
    margin-left: 50px;
  }

  .right {
    display: flex;
    margin-right: 50px;
    line-height: 18px;
    padding-top: 5px;
  }

  .logo {
    .font {
      font-size: 50px;
      font-weight: 500;
      color: #000b34ff;
      user-select: none;
      font-family: Basketball, sans-serif;
    }
  }
}

.search {
  margin-left: 65px;
  line-height: 65px;
}

.search > div {
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 1px #0091c2);
}

.search > div:after {
  content: '';
  background: #000b34ff;
  width: 4px;
  height: 20px;
  position: absolute;
  top: 40px;
  right: 2px;
  transform: rotate(135deg);
}

.search > div > input {
  color: #000b34ff;
  font-size: 16px;
  background: transparent;
  width: 35px;
  height: 35px;
  padding: 10px;
  border: solid 3px #000b34ff;
  outline: none;
  border-radius: 35px;
  transition: width 0.5s;
}

.search > div > input::placeholder {
  color: #2f2e2e;
  opacity: 0;
  font-size: 12px;
  transition: opacity 150ms ease-out;
}

.search > div > input:focus::placeholder {
  opacity: 1;
}

.search > div > input:focus,
.search > div > input:not(:placeholder-shown) {
  width: 250px;
}

.icon {
  font-size: 35px;
  margin-top: 15px;
  margin-left: 20px;
}
</style>
