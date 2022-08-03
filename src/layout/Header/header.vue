<template>
  <div id="header" ref="headerRef" theme>
    <div class="container" style="position: absolute;top: 0;left: 0">
      <div ref="containerTextRef" class="containerText"></div>
    </div>
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
      <svg class="icon" aria-hidden="true" @click="open">
        <use xlink:href="#icon-profile"></use>
      </svg>
    </div>
    <div class="dialog" v-if="show">
      <div class="login" :class="btnLoading ? `login loading ${isok ? 'active' : ''}` : 'login'">
        <div class="form">
          <h2>登 录
            <span style="float: right; cursor: pointer" @click="close">X</span>
          </h2>
          <div class="form-field">
            <label for="login-mail"><i class="fa fa-user"></i></label>
            <input v-model="fromData.username" id="login-mail" type="text" name="mail" placeholder="帐号"
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          <div class="form-field">
            <label for="login-password"><i class="fa fa-lock"></i></label>
            <input v-model="fromData.password" id="login-password" type="password" name="password" placeholder="密码"
                   pattern=".{6,}" required>
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          <button type="submit" class="button" @click="handleSubmit" :disabled="!!btnLoading">
            <div class="arrow-wrapper">
              <span class="arrow"></span>
            </div>
            <p class="button-text">登 录</p>
          </button>
        </div>
        <div class="finished">
          <svg>
            <use href="#svg-check" />
          </svg>
        </div>
      </div>


      <!-- //--- ## SVG SYMBOLS ############# -->
      <svg style="display:block;">
        <symbol id="svg-check" viewBox="0 0 130.2 130.2">
          <polyline points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </symbol>
      </svg>
    </div>
  </div>
</template>

<script>
import MusicPlay from "@/components/musicPlay.vue";
import { handleArrData, wenzi } from "@/utils";
import music from "@/api/163musicApi";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { alerts } from "@/components/Alert";

export default {
  name: "Header",
  components: {
    MusicPlay
  },
  setup() {
    let show = ref(false);
    let fromData = ref({
      username: "",
      password: ""
    });
    const open = () => alerts();
    let btnLoading = ref(false);
    let isok = ref(false);
    const musiclist = ref([
      //数据格式
      {
        id: 0,
        name: "孤勇者", //歌曲名
        url: "http://m704.music.126.net/20220224110538/0d05dff3c55424b18486757384f808a9/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/11983357028/fa35/71e6/ecfb/e58acc011ea31f62f8aad4bb0ce96846.m4a?authSecret=0000017f299a168707770aaba24bebbf",
        cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001uaPM93kxk1R.jpg?max_age=2592000",
        singer: "陈奕迅" // 歌手
      },
      {
        id: 1,
        name: "大雪", //歌曲名
        url: "http://m10.music.126.net/20220224110641/54de4bccd197f443a89bfe45546fe47c/yyaac/025c/5553/060c/56a2dd0f65b96f150dae1f59dd69ce8d.m4a",
        cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000035FWvO0bwXTo.jpg?max_age=2592000",
        singer: "音阙诗听" // 歌手
      }
    ]);
    const showDialog = () => {
      show.value = true;
      isok.value = false;
      btnLoading.value = false;
      fromData.value = {
        username: "",
        password: ""
      };
    };
    const handleSubmit = () => {
      console.log(fromData.value);
      console.log(1111);
      btnLoading.value = true;
      const { username, password } = fromData.value;
      if (username === "" && password === "") {
        btnLoading.value = false;
        ElNotification({
          title: "提示！",
          message: `请输入账户或密码`,
          type: "error",
          offset: 70,
          duration: 2000
        });
      } else {
        let timer;
        let timer2;
        if (username === "admin" && password === "123456") {
          timer = setInterval(() => {
            isok.value = true;
            clearInterval(timer);
          }, 2000);
          timer2 = setInterval(() => {
            show.value = false;
            clearInterval(timer2);
          }, 4000);
        } else {
          btnLoading.value = false;
          ElNotification({
            title: "提示！",
            message: `用户名或密码错误`,
            type: "error",
            offset: 70,
            duration: 2000
          });
        }
      }
    };
    const close = () => {
      show.value = false;
      isok.value = false;
      btnLoading.value = false;
    };
    return {
      fromData,
      btnLoading,
      isok,
      show,
      musiclist,
      close,
      showDialog,
      handleSubmit,
      open
    };
  },
  created() {
    this.getSongList();
  },
  mounted() {
    // let el = this.$refs.containerTextRef;
    // let phrases = [
    //   "好久不见",
    //   "最近为什么没见到你啊？",
    //   "园丁遍栽桃李树",
    //   "学子尽作栋梁才"
    // ];
    // wenzi(el, phrases);
  },
  methods: {
    // music play List
    async getSongList() {
      const res = await music.getMusicList(2151381888);
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
  background: url(http://rboa9eje7.hb-bkt.clouddn.com/assets%2FMulticolorGlows.8f03f6b2.png) var(--my-color);
  backdrop-filter: saturate(200%) blur(30px);
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
  margin-left: 125px;
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

.container {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.containerText {
  font-weight: 100;
  font-size: 24px;
  color: var(--yuan-font-white-color);
}

.dud {
  color: #757575;
}

.dialog {
  width: 600px;
  height: 600px;
  background-color: transparent;
  position: absolute;
  left: 50%;
  top: 290px;
  transform: translate(-50%, -30%);
}

.login {
  width: 420px;
  background: #ffffff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login:before {
  content: "";
  position: absolute;
  background: transparent;
  bottom: 45px;
  right: 40px;
  width: 55px;
  height: 55px;
  z-index: 5;
  transition: all .6s ease-in-out, background 0s ease;
}

.login .form {
  display: block;
  position: relative;
}

.login .form h2 {
  background: #f5f5fa;
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 30px 0;
  padding: 40px;
  font-weight: 200;
  color: #9596A2;
  font-size: 19px;
}

.login .form .form-field {
  display: flex;
  align-items: center;
  height: 55px;
  margin: 0 40px 30px 40px;
  border-bottom: 1px solid #9596A2;
}

.login .form .form-field label {
  width: 10px;
  padding: 0 15px 0 0;
  color: #9596A2;
}

.login .form .form-field input {
  width: 100%;
  background: transparent;
  color: #9596A2;
  padding: 15px;
  border: 0;
  margin: 0;
}

.login .form .form-field input + svg {
  width: 35px;
  width: 35px;
  fill: none;
  stroke: #00FCD1;
  stroke-width: 7;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: -100;
  transition: all .3s ease-in-out;
}

.login .form .form-field input:valid + svg {
  stroke-dashoffset: 0;
}

.login .form .form-field input:focus {
  outline: none;
}

.login .form .form-field *::placeholder {
  color: #9596A2;
}

.login .form .button {
  width: 100%;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 40px 45px 40px;
  margin: 0;
  border: 0;
  background: transparent;
  outline: none;
}

.login .form .button .arrow-wrapper {
  transition: all 0.45s ease-in-out;
  position: relative;
  margin: 0;
  width: 100%;
  height: 55px;
  right: 0;
  float: right;
  background: linear-gradient(90deg, #04DFBD, #00FCD1);
  box-shadow: 0 3px 20px rgba(0, 252, 209, 0.4);
  border-radius: 12px;
}

.login .form .button .arrow-wrapper .arrow {
  position: absolute;
  top: 50%;
  margin: auto;
  transition: all 0.45s ease-in-out;
  right: 35px;
  width: 15px;
  height: 2px;
  background: none;
  transform: translateY(-50%);
}

.login .form .button .arrow-wrapper .arrow:before {
  position: absolute;
  content: '';
  top: -4px;
  right: 0;
  width: 8px;
  height: 8px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}

.login .form .button .button-text {
  transition: all 0.45s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  color: #fff;
  line-height: 55px;
  text-align: center;
  text-transform: uppercase;
}

.login .finished {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
}

.login .finished svg {
  width: 100px;
  width: 100px;
  fill: none;
  stroke: #fff;
  stroke-width: 7;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: -100;
  transition: all .3s ease-in-out .5s;
}

.login.loading .form .button .arrow-wrapper {
  width: 55px;
  animation: sk-rotateplane 1.2s infinite ease-in-out .5s;
}

.login.loading .form .button .arrow-wrapper .arrow {
  background: #fff;
  transform: translate(15px, 0);
  opacity: 0;
  transition: opacity 0.3s ease-in-out .5s;
}

.login.loading .form .button .button-text {
  color: #9596A2;
}

.login.active:before {
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, #04DFBD, #00FCD1);
  border-radius: 12px;
  height: 100%;
  width: 100%;
}

.login.active .form .button .arrow-wrapper {
  animation-iteration-count: 1;
}

.login.active .finished svg {
  stroke-dashoffset: 0;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    transform: perspective(120px);
  }
  50% {
    transform: perspective(120px) rotateY(180deg);
  }
  100% {
    transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}
</style>
