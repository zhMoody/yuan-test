<template>
  <div class="about">
    <div class="audioPlay">
      <div
        :class="
          player[list[index].id] && player[list[index].id].play
            ? 'startRoute'
            : 'stopRoute'
        "
        class="logo"
      >
        <el-avatar :src="list[index].cover" />
      </div>
      <div class="musicInfo">
        <div class="musicName">
          {{ list[index].name }} -
          <span>&nbsp;{{ list[index].singer }}</span>
        </div>
        <div class="selectMusic">
          <div class="select">
            <i
              class="iconfont icon-shangyishou_huaban"
              @click="musicPlay('pre')"
            ></i>
            <i
              :class="
                play ? 'iconfont icon-bofangzanting' : 'iconfont icon-24gf-play'
              "
              @click="musicPlay('play')"
            ></i>
            <i
              class="iconfont icon-xiayishou_huaban"
              style="margin-right: 10px"
              @click="musicPlay('next')"
            ></i>
          </div>
          <div class="time">
            <div class="viedo">
              <i
                :class="
                  flag
                    ? 'iconfont  icon-jingyin'
                    : 'iconfont icon-shengyin_shiti '
                "
                style="color: #211f1f; font-size: 12px"
                @click="closraudio((flag = !flag))"
              ></i>
              <el-slider
                v-model="voiceVal"
                :max="voiceMax"
                :min="voiceMin"
                class="selects"
                @change="voiceSelect"
              />
              <i
                class="iconfont icon-gedan"
                style="color: #211f1f; font-size: 12px; margin-left: 10px"
                @click="isShows"
              ></i>
            </div>
          </div>
        </div>
        <div class="slidingSelect">
          <el-slider
            v-model="sliderVal"
            :format-tooltip="formatTooltip"
            :max="sliderMax"
            :min="sliderMin"
            @change="slidingSelect"
          />
        </div>
      </div>

      <div v-if="isShow" class="songList" style="opacity: 1 !important">
        <div
          v-for="item in list"
          :key="item.id"
          class="song"
          @click.stop="handlerPlay(item.id)"
        >
          <div
            :style="{
              color:
                player[item.id] && player[item.id].play ? '#626262' : '#ccc',
            }"
            class="songName"
          >
            {{ item.name }} -
            <span>{{ item.singer }}</span>
          </div>
          <div class="songSinger">
            <i
              :class="
                player[item.id] && player[item.id].play
                  ? 'iconfont icon-bofangzanting'
                  : 'iconfont icon-24gf-play'
              "
              :style="{
                color:
                  player[item.id] && player[item.id].play ? '#626262' : '#ccc',
              }"
              style="font-size: 12px"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <audio ref="singeBox"></audio>
  </div>
</template>
<script>
export default {
  name: "MusicPlay",
  props: {
    list: {
      type: Array,
      require: true,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },

  data() {
    return {
      flag: false,
      isShow: false,
      box: undefined, //audio对象
      musicPath: "", // mp3链接
      coverPath: "", // 封面
      musicTitle: "", // 当前播放标题
      musicImg: "", //  当前播放封面
      duration: undefined, // 音乐总时长
      currentTime: undefined, // 当前播放时长
      sliderVal: 0, // 这个对接当前时长。
      sliderMin: 0,
      sliderMax: 0, // 这个对接总时长、
      voiceVal: 0, // 当前声音大小。
      voiceMin: 0,
      voiceMax: 100, // 最大声音。

      index: 0, // 当前播放的音乐素质索引
      play: false, //播放状态，true为正在播放
      player: {}
    };
  },
  mounted() {
    this.init();
    document.documentElement.addEventListener("click", () => {
      this.isShow = false;
    });
  },
  methods: {
    //歌单
    isShows(e) {
      e.stopPropagation();
      this.isShow = !this.isShow;
    },
    // 静音
    closraudio(flag) {
      this.box.muted = !this.box.muted;
      this.flag = flag;
    },
    // 列表关联播放
    handlerPlay(id) {
      console.log(this.player);
      if (!this.player[id]) {
        // 没值触发新的播放
        this.index = this.list.findIndex((x) => x.id === id);
        this.play = false;
      }
      this.musicPlay("play");
    },
    // 播放控件
    musicPlay(flag) {
      switch (flag) {
        case "pre":
          if (this.list[this.index - 1]) {
            this.box.src = this.musicPath + this.list[this.index - 1].url;
            this.index -= 1;
          } else {
            this.box.src =
              this.musicPath + this.list[this.list.length - 1].url;
            this.index = this.list.length - 1;
          }
          break;
        case "play":
          this.play = !this.play;
          // 对接控件 同步 列表里的控件
          if (this.player[this.list[this.index].id])
            this.player[this.list[this.index].id].play = this.play;
          // 新的歌曲播放
          if (this.play && !this.player[this.list[this.index].id])
            this.box.src = this.musicPath + this.list[this.index].url;
          break;
        case "next":
          if (this.list[this.index + 1]) {
            this.box.src = this.musicPath + this.list[this.index + 1].url;
            this.index += 1;
          } else {
            this.box.src = this.musicPath + this.list[0].url;
            this.index = 0;
          }
          break;
      }
      if (this.play && !this.player[this.list[this.index].id]) {
        this.player = {};
        this.player[this.list[this.index].id] = {};
        this.player[this.list[this.index].id].play = true;
      } else {
        this.play ? this.box.play() : this.box.pause();
      }
    },
    //进度条
    formatTooltip(val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = this.formatTime(val);
      return `${time.min}:${time.sec}`;
    },
    slidingSelect() {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      this.box.currentTime = this.sliderVal;
    },
    voiceSelect() {
      // 滑块松动后触发。更新当前声音大小，
      // 时长发生变动会init里的方法进行更新数据
      this.box.volume = this.voiceVal / 100;
    },
    //初始化播放器
    init() {
      let _that = this;
      this.box = this.$refs.singeBox;
      console.log(11111, this.box.play);
      this.box.src = this.list[0].url;
      // 歌曲链接;
      // 绑定三个触发方法
      // 当时长有变化时触发，由"NaN"变为实际时长也算
      this.box.ondurationchange = function() {
        // console.log('时长发生了变化')
        _that.play ? _that.box.play() : _that.box.pause();
        _that.sliderMax = _that.box.duration;
        // console.log('声音', _that.box.volume * 100)
        _that.voiceVal = _that.box.volume * 100;
        _that.updateTime();
      };
      // 当前数据可用是触发
      this.box.oncanplay = function() {
        _that.play ? _that.box.play() : _that.box.pause();
        // console.log('已经可以播放了')
      };
      // 播放位置发送改变时触发。
      this.box.ontimeupdate = function() {
        // console.log('播放位置发送了变动')
        _that.updateTime();
      };
      // 音频播放完毕
      this.box.onended = function() {
        _that.musicPlay("next");
        // console.log('播放完毕，谢谢收听')
      }; // 音频播放完毕

      // 音频播放完毕
      this.box.onerror = function() {
        console.log("加载出错！");
      };
    },
    // 格式化
    updateTime() {
      const total = this.formatTime(this.box.duration);
      const current = this.formatTime(this.box.currentTime);
      this.duration = `${total.min}:${total.sec}`;
      this.currentTime = `${current.min}:${current.sec}`;
      // 值为xx.xxxxx 需要取整
      this.sliderVal = Math.floor(this.box.currentTime);
      this.musicTitle =
        this.list[this.index].name + " - " + this.list[this.index].singer;
      this.musicImg = this.coverPath + this.list[this.index].cover + ".jpg";
    },
    // 格式化毫秒，返回String型分秒对象
    formatTime(time) {
      // 格式化毫秒，返回String型分秒对象
      // 有可能没获取到，为NaN
      if (!time) return { min: "00", sec: "00" };
      return {
        min: Math.floor(time / 60)
          .toString()
          .padStart(2, "0"),
        sec: Math.floor(time % 60)
          .toString()
          .padStart(2, "0")
      };
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
@import '~@/styles/theme.scss';

.audioPlay {
  position: relative;
  width: 260px;
  height: 60px;
  //background-color: #dc3e3e;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  opacity: 1;

  .startRoute {
    animation: aa 15s linear infinite;
  }

  @keyframes aa {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }

  .musicInfo {
    display: flex;
    flex-direction: column;
  }

  .musicName {
    box-sizing: border-box;
    user-select: none;
    width: 190px;
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    color: $AllColor;
    padding-left: 12px;
    margin-top: 8px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    padding-right: 10px;
    z-index: 1000;

    span {
      font-size: 12px;
      color: $AllColor;
    }
  }

  .logo {
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px dashed $AllColor;
    //pointer-events: none;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    //
    ::v-deep img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .selectMusic {
    display: flex;
    justify-content: flex-start;
    font-weight: 700;

    .select {
      display: flex;
      justify-content: space-evenly;
      width: 110px;
      margin-bottom: 6px;

      i {
        color: $AllColor;
      }

      i:hover {
        opacity: 0.5;
      }
    }

    .time {
      user-select: none;
      font-size: 12px;
      color: $AllColor;
      transition: all 0.5s;
      opacity: 0;
    }
  }

  .viedo {
    width: 90px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 2px;
  }

  .selects {
    width: 80px !important;
    margin: 2px 0 0 5px;

    ::v-deep .el-slider__button-wrapper {
      height: 11px;
      width: 11px;
      z-index: 1001;
      top: -4px;
    }
  }

  .songList {
    position: absolute;
    left: -1px;
    top: 65px;
    width: 260px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    transition: all 0.4s;
    border-radius: 3px;
    font-weight: 500;
    background-color: rgb(255 255 255 / 29%);
    opacity: 1 !important;

    .songName {
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      color: $AllColor;
    }

    .song {
      position: relative;
      user-select: none;
      margin: 5px;
      padding-top: 1px;
      font-size: 14px;
      display: flex;
      line-height: 17px;
      justify-content: space-between;
      border-radius: 5px;
      color: $AllColor;
      padding-left: 3px;
      transition: all 0.3s;

      span {
        font-size: 12px;
      }
    }
  }
}

//.audioPlay::before {
//  content: "";
//  position: absolute;
//  top: 0;
//  right: 0;
//  bottom: 0;
//  left: 0;
//  background-color: #fff;
//  filter: blur(100px);
//  margin: -30px;
//  z-index: -1;
//}

.song:hover::before {
  position: absolute;
  top: 0;
  left: -5px;
  content: '';
  display: block;
  width: 3px;
  height: 100%;
  background-color: $AllColor;
}

.audioPlay:hover .time {
  opacity: 1;
}

.audioPlay:hover ::v-deep .el-slider__runway {
  opacity: 1;
}

::v-deep .el-slider__runway {
  box-sizing: border-box;
  transition: all 0.5s;
  opacity: 0;
  width: 100%;
  height: 4px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin: 3px 0 0 0;
  position: relative;
  cursor: pointer;
  vertical-align: middle;

  .el-slider__bar {
    box-sizing: border-box;
    border-radius: 2px;
    height: 2px;
    background-color: $AllColor;
    position: absolute;
  }

  .el-slider__button {
    width: 0;
    height: 0;
    border: 0 solid #fff;
    border-radius: 50%;
    transition: 0.2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

::v-deep .el-slider__runway:hover .el-slider__button {
  width: 0;
  height: 0;
  border: 0;
  border-radius: 50%;
  margin-bottom: 3px;
}

::v-deep .el-slider {
  height: 100%;
}

::v-deep .el-avatar {
  --el-avatar-bg-color: var(--yuan-bg-clolr);
}
</style>
