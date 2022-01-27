<template>
  <div id="nav">
    <y-Loding></y-Loding>
    <y-header></y-header>
    <div class="content">
      <yMenu></yMenu>
      <yContent></yContent>
      <div class="top" @click="show">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gongneng"></use>
        </svg>
      </div>
      <div :class="showTopCard ? 'topCard' : 'opacity'">
        <div class="switchBgColor" @click="switchBgColor">
          <span v-if="showNight">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-taiyang"></use>
            </svg>
            日间模式
          </span>
          <span v-else>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yueliang"></use>
            </svg>
            夜间模式
          </span>
        </div>
        <hr />
        <div class="BackToTheTop" @click="BackToTheTop">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huojian"></use>
          </svg>
          回到顶部
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import yLoding from "@/views/loding";
import yHeader from "@/layout/Header/header.vue";
import yMenu from "@/layout/Menu/menu.vue";
import yContent from "@/layout/Content/content.vue";
import { getData } from "@/api";
import { ref } from "vue";

export default {
  components: {
    yLoding,
    yHeader,
    yMenu,
    yContent
  },
  setup() {
    const showTopCard = ref(false);
    const showNight = ref(false);
    const night = ref("");
    const show = () => {
      showTopCard.value = !showTopCard.value;
    };
    const BackToTheTop = () => {
      showTopCard.value = false;
      let curTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let each = curTop / 2000;
      let timer = setInterval(function() {
        curTop -= each;
        each += 1;
        if (curTop <= 0) {
          clearInterval(timer);
        }
        window.scrollTo(0, curTop);
      }, 10);
    };
    const switchBgColor = () => {
      showNight.value = !showNight.value;
      showTopCard.value = false;
      if (showNight.value) {
        document.body.setAttribute("theme", "night");
        document.querySelector("#header").setAttribute("theme", "night");
        document.querySelector("#md-editor-v3").setAttribute("themes", "night");
      } else if (!showNight.value) {
        document.body.setAttribute("theme", "");
        document.querySelector("#header").setAttribute("theme", "");
        document.querySelector("#md-editor-v3").setAttribute("themes", "");
      }
    };
    return {
      showNight,
      showTopCard,
      show,
      BackToTheTop,
      switchBgColor
    };
  },
  async created() {
    console.log("\n %c XXXXXXXX | https://XXXXXXX.cn", "color:#fff;background: linear-gradient(to right , #7A88FF, #d26aff);padding:5px;border-radius: 10px;");
    const res = await getData();
    console.log(res);
  }
};
</script>
<style scoped lang="scss">
.content {
  margin-top: 100px;
  position: relative;
  transition: all 0.5s;

  .top {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 44px;
    border-radius: 40px;
    background-color: rgba(255, 253, 239, 0.62);
    position: fixed;
    bottom: 3.5%;
    right: 5%;
    z-index: 999;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

    svg {
      font-size: 20px;
    }
  }

  .opacity {
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    padding: 20px 20px;
    font-size: 16px;
    border-radius: 20px;
    background-color: var(--yuan-bg-clolr);
    position: fixed;
    bottom: 5%;
    right: 6%;
    transform: scale(0);
    transition: all 0.3s;
    z-index: -1;
  }

  .topCard {
    opacity: 1;
    width: 150px;
    height: 100px;
    padding: 20px 20px;
    font-size: 16px;
    border-radius: 20px;
    background-color: var(--yuan-bg-clolr);
    position: fixed;
    bottom: 5%;
    right: 6%;
    overflow: hidden;
    transition: all 0.3s;
    z-index: 1;
    line-height: 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  }

  .BackToTheTop,
  .switchBgColor {
    text-align: center;
    cursor: pointer;
    color: #2f2e2e;
    font-size: 14px;
    transition: all 0.5s;

    svg {
      font-size: 20px;
    }
  }

  .BackToTheTop:hover {
    color: #0ada02;
    background-color: var(--yuan-bg-clolr);
    border-radius: 0 0 10px 10px;
  }

  .switchBgColor:hover {
    color: #0ada02;
    background-color: var(--yuan-bg-clolr);
    border-radius: 10px 10px 0 0;
  }
}
</style>
