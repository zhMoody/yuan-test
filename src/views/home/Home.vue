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
          <h1>YUAN 主题</h1>
        </div>
        <div class="TakeUp">内存占用：{{ TakeUp.Mb }}</div>
        <div class="TakeUp_card">
          <div class="tikeUp">
            <div class="progress"></div>
          </div>
          <div>{{ TakeUp.percentage }}%</div>
        </div>
        <div>DOM渲染耗时：{{ TakeUp.TimeConsuming }}</div>
        <div>TCP链接耗时：{{ TakeUp.TCP }}</div>
        <div>响应耗时：{{ TakeUp.response }}</div>
      </div>
    </div>
  </div>
  <div class="card">
    <div v-for="item in cardList" :key="item.title" class="card_img">
      <div class="card_logo">
        <div class="card_icon">
          <img src="../../assets/baise.jpeg" alt="" />
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-image"></use>
        </svg>
        <span class="likes">{{ item.likes }}</span>
      </div>
      <div class="card_title">
        <h2 class="title">
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
            <p class="content">评论：{{ item.comments }}</p>
          </div>
        </div>
        <p class="timer">{{ item.time }}</p>
      </div>
    </div>
  </div>
  <div class="more">展开更多</div>
</template>

<script>
  import { ref } from 'vue'
  import { ElCarousel, ElCarouselItem } from 'element-plus'
  import { getData } from '@/api'

  export default {
    name: 'App',
    components: {
      ElCarousel,
      ElCarouselItem,
    },
    setup() {
      let cardList = ref([])
      let TakeUp = ref({
        Mb: 0,
        percentage: 0,
        TimeConsuming: '0',
        TCP: '0',
        response: '0',
      })
      const img = ref([
        'baise.jpeg',
        'flowers.png',
        'mianju.jpg',
        'hai.jpg.jpeg',
      ])
      return { img, cardList, TakeUp }
    },
    async created() {
      let _per = window.performance

      function getmb(size) {
        return Math.floor(size / 1024 / 1024, 4) + 'mb'
      }

      function getsec(time) {
        return time / 1000 + 's'
      }

      setInterval(() => {
        let TakeUp =
          (_per.memory.totalJSHeapSize / _per.memory.jsHeapSizeLimit) * 100
        document.querySelector('.progress').style.width = `${Math.ceil(
          TakeUp
        )}%`
        this.TakeUp.Mb = getmb(_per.memory.usedJSHeapSize)
        this.TakeUp.percentage = Math.ceil(TakeUp)
      }, 1000)

      this.TakeUp.TCP = getsec(
        _per.timing.connectEnd - _per.timing.connectStart
      )
      this.TakeUp.response = getsec(
        _per.timing.responseEnd - _per.timing.responseStart
      )
      window.onload = () => {
        this.TakeUp.TimeConsuming = getsec(
          _per.timing.domComplete - _per.timing.domLoading
        )
      }
      const res = await getData()
      this.cardList = res.data.data
    },
  }
</script>
<style scoped lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
  }

  .carousel {
    width: 70%;
    padding: 10px;
    background-color: var(--yuan-bg-clolr);
    border-radius: 10px;
  }

  ::v-deep .el-carousel__container img {
    width: 100%;
  }

  .news {
    width: 29%;
    height: 320px;
    border-radius: 10px;
    padding: 10px;
    background-color: var(--yuan-bg-clolr);

    // 内存进度条
    .TakeUpInfo {
      .TakeUp_card {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .tikeUp {
        width: 80%;
        height: 10px;
        border: 2px solid #fff;
        border-radius: 5px;
        overflow: hidden;

        .progress {
          width: 0;
          height: 100%;
          background-color: red;
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
    background-color: var(--yuan-bg-clolr);
    border-radius: 10px;

    .card_img {
      margin-top: 1%;
      flex: 0 0 24%;
      min-width: 24%;
      height: 320px;
      border-radius: 10px;
      //background-color: #cccccc;
      box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
      background-color: var(--yuan-bg-clolr);
      margin-right: 1%;
      cursor: pointer;

      .card_logo {
        padding: 10px;
        width: 100%;
        height: 200px;
        transition: all 0.5s;
        position: relative;
        box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
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
        }

        .card_icon {
          width: 100%;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
            transition: all 0.5s;
            overflow: hidden;

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

            .content {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: var(--yuan-font-color);
            }
          }
        }

        .timer {
          padding: 0 10px;
          text-align: right;
          color: var(--yuan-font-color);
        }
      }
    }
  }

  .more {
    font-size: 14px;
    color: var(--yuan-font-color);
    text-align: center;
    width: 200px;
    height: 30px;
    line-height: 30px;
    background-color: #fffdef72;
    border-radius: 40px;
    margin: 20px auto 0 auto;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      background-color: #fffdefa6;
    }
  }
</style>
