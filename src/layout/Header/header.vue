<template>
  <div id="header" ref="headerRef">
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
  import MusicPlay from '@/components/musicPlay.vue'

  import { handleArrData } from '@/utils'
  import music from '@/api/163musicApi'
  import { ref } from 'vue'
  import { ElNotification } from 'element-plus'

  export default {
    name: 'Header',
    components: {
      MusicPlay,
    },
    setup() {
      const musiclist = ref([
        //数据格式
        {
          id: 0,
          name: '童话镇', //歌曲名
          url: 'http://ting6.yymp3.net:82/new27/chengyifa/1.mp3', // 歌曲url
          cover:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F0ff41bd5ad6eddc4405c3d8533dbb6fd52663310&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642124154&t=cc6198748d1d376fba5dd48b43b4b6af', // 歌曲封面
          singer: '陈一发儿', // 歌手
        },
      ])
      const showDialog = () => {
        ElNotification({
          title: '复制成功',
          message: `${musiclist.value}`,
          type: 'success',
          offset: 70,
          duration: 2000,
        })
      }
      return {
        showDialog,
        musiclist,
      }
    },
    created() {
      this.getSongList()
    },
    methods: {
      // music play List
      async getSongList() {
        const res = await music.getMusicList(478946817)
        console.log(res.data.playlist.tracks)
        if (res.status === 200 && res.data) {
          let arr = []
          for (const item of res.data.playlist.tracks) {
            const song = await music.getSong(item.id)
            const songurl = await music.getSongUrl(item.id)
            arr.push({
              ...song.data.songs[0],
              ...song.data.songs[0],
              ...songurl.data.data[0],
            })
            this.musiclist = handleArrData(arr)
          }
        }
      },
    },
  }
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
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    position: fixed;
    top: 0;
    z-index: 100000;

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
