<!--suppress ALL -->
<template>
  <div class="header">
    <div class="carousel">
      <el-carousel style="width: 100%; border-radius: 10px" pause-on-hover loop>
        <el-carousel-item v-for="item in img" :key="item">
          <img :src="require(`@/assets/${item}`)" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="news">
      <div class="TakeUpInfo">
        <div class="blogInfo">
          <h1 class="blogTitle">YUAN 主题</h1>
        </div>
        <div class="TakeUp">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-neicun-RAM"></use>
            </svg>
            内存占用率：
          </div>
        </div>
        <div class="TakeUp_card">
          <div class="tikeUp">
            <div class="progress"></div>
          </div>
          <div style="color: var(--yuan-font-white-color)">
            {{ TakeUp.percentage }}%
          </div>
        </div>
        <div class="TakeUps">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-neicun-RAM"></use>
            </svg>
            内存占用：
          </div>
          <span class="information">{{ TakeUp.Mb }}</span>
        </div>
        <div class="dom">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-renwuguanli"></use>
            </svg>
            DOM渲染耗时：
          </div>
          <span class="information">{{ TakeUp.TimeConsuming }}</span>
        </div>
        <div class="response">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-reserve"></use>
            </svg>
            响应耗时：
          </div>
          <span class="information">{{ TakeUp.response }}</span>
        </div>
        <div class="article">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wenzhang"></use>
            </svg>
            文章：
          </div>
          <span class="information">{{ TakeUp.article }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div
      v-for="item in cardList"
      :key="item.title"
      class="card_img"
      @click="$router.push(`/article/${item.shopId}`)"
    >
      <div class="card_logo">
        <div class="card_icon">
          <img v-lazy="item.imgUrl[Math.floor(Math.random()*11)]" alt="" />
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-image"></use>
        </svg>
        <span class="likes">
          <i class="iconfont icon-lliulan"></i>
          {{ item.likes }}
        </span>
      </div>
      <div class="card_title">
        <h2 class="title">
          <span :class="item.overhead == 1 ? 'overHead' : null">
            {{ item.overhead == 1 ? "置顶" : null }}
          </span>
          {{ item.title }}
        </h2>
        <div class="user_logo_info">
          <div class="user">
            <div class="logo">
              <img src="https://s1.ax1x.com/2020/07/25/UzAaMq.jpg" alt="" />
            </div>
            &nbsp;
            <p class="username">{{ item.username }}</p>
          </div>
          <div class="info">
            <p class="content">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duihua"></use>
              </svg>
              {{ item.comments }}
            </p>
            <p class="timer">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shijian"></use>
              </svg>
              {{ item.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="more">
    <button class="btn" @click="moreContent" :disabled="more? true : false">{{ more ? "没有更多了。。。" : "展开更多" }}</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElCarousel, ElCarouselItem } from "element-plus";
import { getData } from "@/api";

export default {
  name: "App",
  components: {
    ElCarousel,
    ElCarouselItem
  },
  setup() {
    let cardList = ref([]);
    let TakeUp = ref({
      Mb: 0,
      percentage: 0,
      TimeConsuming: "0",
      response: "0",
      article: 0
    });
    let more = ref(false);
    const img = ref([
      "baise.jpeg",
      "flowers.png",
      "mianju.jpg",
      "hai.jpg.jpeg"
    ]);

    const moreContent = async () => {
      more.value = true;
      const res = await getData();
      let temp = [...cardList.value, ...res.data.datas];
      console.log(temp);
      cardList.value = temp || [];
    };
    return { img, cardList, TakeUp, more, moreContent };
  },
  async created() {
    let _per = window.performance;

    function getmb(size) {
      return Math.floor(size / 1024 / 1024, 4) + "Mb";
    }

    function getsec(time) {
      return time / 1000 + "s";
    }

    let time;
    time = setInterval(() => {
      clearInterval(time);
      let TakeUp =
        (_per.memory.totalJSHeapSize / _per.memory.jsHeapSizeLimit) * 100;
      document.querySelector(".progress").style.width = `${Math.ceil(
        TakeUp
      )}%`;
      this.TakeUp.Mb = getmb(_per.memory.usedJSHeapSize);
      this.TakeUp.percentage = Math.ceil(TakeUp);
    }, 1000);

    this.TakeUp.response = getsec(
      _per.timing.responseEnd - _per.timing.responseStart
    );
    window.onload = () => {
      this.TakeUp.TimeConsuming = getsec(
        _per.timing.domComplete - _per.timing.domLoading
      );
    };
    const res = await getData();
    let overheadList = res?.data?.data.filter((item) => item.overhead === 1);
    let overlastList = res?.data?.data.filter((item) => item.overhead === 0);
    let newCardList = [...overheadList, ...overlastList];
    console.log("overheadList", overheadList);
    console.log("overlastList", overlastList);
    console.log("newCardList", newCardList);
    this.cardList = newCardList || [];
    this.TakeUp.article = res.data.data.length + res.data.datas.length;


  }
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}

.carousel {
  width: 72%;
  padding: 10px;
  //background-color: var(--yuan-bg-clolr);
  border-radius: 10px;
}

::v-deep .el-carousel__container img {
  width: 100%;
}

.news {
  width: 27%;
  height: 320px;
  border-radius: 10px;
  padding: 10px;
  //background-color: var(--yuan-bg-clolr);

  // 内存进度条
  .TakeUpInfo {
    margin-top: 10px;

    .TakeUp_card {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .blogTitle {
      color: var(--yuan-font-color);
    }

    .TakeUp,
    .TakeUps,
    .dom,
    .response,
    .article {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      height: 20px;
      margin-top: 10px;
      color: var(--yuan-font-white-color);
      font-size: 16px;
    }

    .TakeUp {
      margin-bottom: 10px;
    }

    .information {
      display: inline-block;
      padding: 0 10px;
      background-color: rgba(48, 210, 219, 0.37);
      border-radius: 10px;
    }

    .tikeUp {
      width: 85%;
      height: 5px;
      background-color: #ccc;
      border-radius: 5px;
      overflow: hidden;

      .progress {
        width: 0;
        height: 100%;
        background-color: #43eeb2;
        transition: all 0.5s;
        border-radius: 5px;
      }
    }
  }
}

.card {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 10px 10px;
  margin-top: 1%;
  //background-color: var(--yuan-bg-clolr);
  border-radius: 10px;

  .card_img {
    margin-top: 1%;
    flex: 0 0 24%;
    min-width: 24%;
    height: 320px;
    border-radius: 10px;
    //background-color: #cccccc;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    //background-color: var(--yuan-bg-clolr);
    margin-right: 1%;
    cursor: pointer;

    .card_logo {
      padding: 10px;
      width: 100%;
      max-height: 200px;
      transition: all 0.5s;
      position: relative;

      margin-bottom: 20px;

      svg {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 24px;
        opacity: 0.5;
      }

      .likes {
        position: absolute;
        top: 15px;
        right: 15px;
        display: block;
        padding: 2px 4px;
        border-radius: 5px;
        background-color: #fff;
        font-size: 14px;
        opacity: 0.5;
        transform: scale(0.8);
      }

      .card_icon {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgb(0 0 0 / 25%);

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          object-fit: cover;
          transition: all 0.5s;
          overflow: hidden;
          box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;

          &:hover {
            opacity: 0.8;
            transform: rotate(5deg) scale(1.2);
            border-radius: 10px;
          }
        }
      }
    }

    .card_title {
      .title {
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--yuan-font-color);
        padding-top: 2px;
        font-weight: 500;

        .overHead {
          display: inline-block;
          padding: 2px 4px;
          background-color: #e85d5d;
          border-radius: 5px;
          font-size: 14px;
        }
      }

      .user_logo_info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        padding: 0 10px;
        margin-top: 20px;

        .user {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 10px;
        }

        .username {
          width: 100px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--yuan-font-color);
        }

        .logo {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;

          img {
            overflow: hidden;
            width: 100%;
            height: 100%;
            transition: all 0.5s;

            &:hover {
              transform: rotate(360deg);
            }
          }
        }

        .info {
          width: 100%;
          font-size: 14px;
          margin-right: 10px;
          text-align: right;

          .content,
          .timer {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: var(--yuan-font-color);
          }
        }
      }
    }
  }
}

.more {
  width: 200px;
  height: 30px;
  margin: 20px auto 0 auto;

  .btn {
    font-size: 14px;
    color: var(--yuan-font-color);
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 30px;
    background-color: #fffdef72;
    border-radius: 40px;
    transition: all 0.5s;
    border: transparent;
    cursor: pointer;
  }

  &:hover {
    background-color: #fffdefa6;
    border-radius: 40px;
  }
}
</style>
