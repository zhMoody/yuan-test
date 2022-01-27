<template>
  <div class="header">
    <div class="carousel">
      <div class="titleInfo">
       <span class="username"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode"></use>
        </svg>yuan</span>
        <span class="time"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shijian"></use>
        </svg>2020-10-01 15:26:47</span>
        <span class="look"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lliulan"></use>
        </svg>1651</span>
        <span class="comments"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>2112</span>
        <span class="doc"> <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wendang"></use>
        </svg>6475</span>
        <span class="articles"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wenzhang"></use>
        </svg>Vue ThinkPHP6</span>
        <span class="share" @click="copy"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg></span>
      </div>
      <div class="articleTitle">
        <span> Vue ThinkPHP6</span>
      </div>
      <MdEditor
        v-model="md"
        class="hText"
        prettier
        preview-only
        :on-get-catalog="getCatalog"
        themes
      ></MdEditor>
    </div>
    <div class="news">
      <div class="recommended">
        <p>推荐</p>
        <div class="recommendeds">
          <div class="img">
            <img src="../../assets/baise.jpeg" alt="">
          </div>
          <div class="titles">
            <p class="contents">推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐</p>
            <p class="Introduction">推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐推荐</p>
          </div>
        </div>
      </div>
      <div class="label" id="label">
        <p>标签</p>
        <div class="labels">
          <span v-for="i in 4" :key="i"
                :style="{'background':colorLists[Math.floor(Math.random()*10)]}">vue1{{ i + 1 }}</span>
        </div>
      </div>
      <div class="articleList" id="articleList">
        <p>文章目录</p>
        <div v-for="(item) in titleList" :key="item.level" @click="sectionChange(item.text)">
          <span># {{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { getData } from "@/api";
import MdEditor from "md-editor-v3";
import { ElNotification } from "element-plus";

export default {
  components: { MdEditor },
  setup() {
    const md = ref("");
    const titleList = ref([]);
    const share = ref("~");
    const colorLists = ref([

      "rgb(229, 0, 19)",

      "rgb(206,194,28)",

      "rgb(0,161,233)",

      "rgb(109,185,45)",

      "rgb(166,0,130)",

      "rgb(237,108,0)",

      "rgb(240, 28, 131)",

      "rgb(84, 21, 226)",

      "rgb( 0,128,0)",

      "rgb( 255,69,0)",

      "rgb( 255,165,0)",

      "rgb( 178,34,34)",

      "rgb( 255,0,255)",

      "rgb(65,105,225)",

      "blueviolet"

    ]);

    const copy = () => {
      let url = share.value;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      ElNotification({
        title: "提示！",
        message: `页面链接已复制${oInput.value}`,
        type: "success",
        offset: 70,
        duration: 2000
      });
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.remove();
    };

    const getCatalog = (list) => {
      console.log(list);
      titleList.value = list;
    };
    const sectionChange = (child) => {

      const scrollBox = document.documentElement; // 容器
      let distance = scrollBox.scrollTop;
      const curTag = document.querySelector("#" + child); // 节点tag
      console.log(curTag);
      const offsetTop = curTag.offsetTop - 120; // 滚动距离
      let step = offsetTop / 50;
      if (offsetTop > distance) {
        smoothDown();
      } else {
        const newTotal = distance - offsetTop;
        step = newTotal / 50;
        smoothUp();
      }
      scrollBox.scrollTop = offsetTop;

      function smoothDown() {
        if (distance < offsetTop) {
          distance += step;
          scrollBox.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          scrollBox.scrollTop = offsetTop;
        }
      }

      function smoothUp() {
        if (distance > offsetTop) {
          distance -= step;
          scrollBox.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          scrollBox.scrollTop = offsetTop;
        }
      }
    };
    return {
      md,
      titleList,
      share,
      colorLists,
      copy,
      getCatalog,
      sectionChange
    };
  },

  async created() {
    const res = await getData();
    this.md = res.data.article.content;
  },
  mounted() {
    document.body.onscroll = () => {
      console.log(document.querySelector("#label").scrollWidth);
      if (document.documentElement.scrollTop > 325) {
        document.querySelector("#articleList").style.position = "fixed";
        document.querySelector("#articleList").style.top = "100px";
        document.querySelector("#articleList").style.width = document.querySelector("#label").scrollWidth + "px";
      } else if (document.documentElement.scrollTop < 325) {
        document.querySelector("#articleList").style.position = "";
        document.querySelector("#articleList").style.width = "100%";
      }
    };
  }
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}

.carousel {
  width: 70%;
  padding: 10px;
  //background-color: var(--yuan-bg-clolr);
  border-radius: 10px;

  img {
    width: 100%;

  }
}

.news {
  width: 29%;
  border-radius: 10px;
  padding: 10px;
  //background-color: var(--yuan-bg-clolr);
}

.titleInfo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
  background-color: var(--yuan-bg-clolr);
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;

  .share {
    float: right;
    margin-right: 20px;
  }

  span {
    margin-right: 10px;

    svg {
      margin-right: 2px;
    }
  }
}

.recommended {
  width: 100%;
  min-height: 200px;
  background: var(--yuan-bg-clolr);
  border-radius: 10px;
  padding: 20px 10px;
  margin-bottom: 10px;

  p {
    font-size: 16px;
    margin-bottom: 30px;
    font-weight: 500;

    color: var(--yuan-font-white-color);
  }

  .recommendeds {
    display: flex;
  }

  div {
    cursor: pointer;
    color: var(--yuan-font-white-color);

    .img {
      width: 50%;
      height: 100%;

      overflow: hidden;

      img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }
  }

  .titles {
    width: 50%;
    height: 100%;
    padding: 0 10px;
    font-size: 15px;

    .contents {
      margin: 4px 0 10px 0;
      width: 100%; /*设置宽度*/
      white-space: nowrap; /*设置不折行*/
      text-overflow: ellipsis; /*这就是省略号喽*/
      -o-text-overflow: ellipsis; /*兼容opera*/
      overflow: hidden; /*设置超过的隐藏*/
    }

    .Introduction {
      font-size: 12px;
      font-weight: 400;
      margin: 0;
      height: 100%;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.articleList {
  width: 100%;
  padding: 20px 10px;
  border-radius: 10px;
  background: var(--yuan-bg-clolr);

  p {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 500;
    color: var(--yuan-font-white-color);
  }

  div {
    padding: 10px 0 10px 20px;
    cursor: pointer;
    color: var(--yuan-font-white-color);

    span {
      font-size: 14px;

      &:hover {
        opacity: .8;
      }
    }
  }
}

.label {
  margin-bottom: 10px;
  width: 100%;
  min-height: 100px;
  padding: 20px 10px;
  background-color: #ccc;
  border-radius: 10px;
  background: var(--yuan-bg-clolr);

  p {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 500;
    color: var(--yuan-font-white-color);
  }

  .labels {
    display: flex;
    flex-wrap: wrap;

    span {
      border-radius: 6px;
      margin-top: 10px;
      margin-right: 10px;
      padding: 3px 10px;
      cursor: pointer;
      color: var(--yuan-font-white-color);

      &:hover {
        opacity: .9;
      }
    }
  }
}

.username::before,
.time::before,
.look::before,
.comments::before,
.doc::before,
.articles::before,
.share::before {
  content: '';
  display: block;
  position: absolute;
  transition: all .2s;
  opacity: 0;
  top: 20px;
  width: 0;
  height: 0;
  border-left: 0 solid transparent;
  border-right: 0 solid transparent;
  border-top: 0 solid var(--yuan-font-color);
}

.username::after,
.time::after,
.look::after,
.comments::after,
.doc::after,
.articles::after,
.share::after {
  transition: all .2s;
  opacity: 0;
  display: block;
  background-color: var(--yuan-font-color);
  position: absolute;
  line-height: 30px;
  padding: 0 0;
  border-radius: 7px;
  color: var(--yuan-font-white-color);
  height: 0;
  top: -7px;
}

.username::before {
  left: 35px;
}

.time::before {
  left: 120px;
}

.look::before {
  left: 225px;
}

.comments::before {
  left: 270px;
}

.doc::before {
  left: 320px;
}

.articles::before {
  left: 400px;
}

.username::after {
  content: '作者';
  left: 10px;
}

.time::after {
  content: '创建时间';
  left: 83px;
}

.look::after {
  content: '浏览量';
  left: 192px;
}

.comments::after {
  content: '评论数';
  left: 240px;
}

.doc::after {
  content: '字数';
  left: 295px;
}

.articles::after {
  content: '分类';
  left: 375px;
}

.share::after {
  content: '分享';
  right: 343px;
}


.username:hover::after,
.time:hover::after,
.look:hover::after,
.comments:hover::after,
.doc:hover::after,
.articles:hover::after,
.share:hover::after {
  opacity: 1;
  padding: 0 20px;
  height: 30px;
}

.username:hover::before,
.time:hover::before,
.look:hover::before,
.comments:hover::before,
.doc:hover::before,
.articles:hover::before,
.share:hover::before {
  opacity: 1;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid var(--yuan-font-color);
}


.articleTitle {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}

#md-editor-v3 {
  background-color: var(--yuan-transparent);
  transition: all 1s;
  border-radius: 10px;
}

::v-deep .default-theme h1,
::v-deep .default-theme h2,
::v-deep .default-theme h3,
::v-deep .default-theme h4,
::v-deep .default-theme h5,
::v-deep .default-theme h6 {
  margin: 1.4em 0 0.8em;
  font-weight: 700;
  color: #666;
}

::v-deep .default-theme h1::after,
::v-deep .default-theme h2::after,
::v-deep .default-theme h3::after,
::v-deep .default-theme h4::after,
::v-deep .default-theme h5::after,
::v-deep .default-theme h6::after {
  content: '';
  display: block;
  width: 70px;
  height: 3px;
  border-radius: 4px;
  background-color: var(--yuan-teal);
  position: absolute;
  box-shadow: rgb(51 227 26 / 97%) 0 2px 2px;
  bottom: -2px;
  left: 0;
  transition: all 0.5s;
}

::v-deep .default-theme h1::before,
::v-deep .default-theme h2::before,
::v-deep .default-theme h3::before,
::v-deep .default-theme h4::before,
::v-deep .default-theme h5::before,
::v-deep .default-theme h6::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  border-radius: 4px;
  background-color: var(--yuan-light);
  position: absolute;
  bottom: -4px;
  left: 0;
  transition: all 0.5s;
}

::v-deep .default-theme h1:hover::after,
::v-deep .default-theme h2:hover::after,
::v-deep .default-theme h3:hover::after,
::v-deep .default-theme h4:hover::after,
::v-deep .default-theme h5:hover::after,
::v-deep .default-theme h6:hover::after {
  width: 140px;
}
</style>
