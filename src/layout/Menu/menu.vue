<template>
  <div id="menu">
    <div class="bgImg">
      <div class="leftbar-user">
        <router-link to="/">
          <img src="https://s1.ax1x.com/2020/07/25/UzAaMq.jpg" alt="" />
        </router-link>
        <div id="signature"></div>
      </div>
    </div>

    <div class="menu_card">
      <ul class="menu">
        <li class="text">导航</li>
        <li data-aos="fade-up" v-for="navigation in navigationList" :key="navigation.path">
          <router-link :to="navigation.path">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="navigation.icon"></use>
            </svg>
            {{ navigation.name }}
          </router-link>
        </li>
        <li data-aos="fade-up" v-for="(item, index) in menuList" :key="item.name" class="oneMenu">
          <div
            :class="item.isSubShow ? 'active' : 'myactive'"
            @click="showToggle(item, index)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.name }}</span>
            <svg class="icon float" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
          <ul data-aos="fade-up" v-show="item.isSubShow" class="menu-item">
            <li v-for="subItem in item.subItems" :key="subItem.name">
              <router-link :to="subItem.path">{{ subItem.name }}</router-link>
            </li>
          </ul>
        </li>
        <li id="text" class="text">构成</li>
        <li
          v-for="(item, index) in navItemList"
          :key="item.name"
          class="oneMenu"
        >
          <div
            :class="item.isSubShow ? 'active' : 'myactive'"
            @click="showSubItem(item, index)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.name }}</span>
            <svg class="icon float" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
          <ul v-show="item.isSubShow" class="box">
            <li v-for="subItem in item.subItems" :key="subItem.name">
              <router-link :to="subItem.path">{{ subItem.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { chakhsu } from "@/utils";
import AOS from "aos";

export default {
  name: "Menu",
  data() {
    return {
      menuList: [
        {
          name: "菜单一",
          isSubShow: false,
          icon: "#icon-category",
          subItems: [
            {
              name: "二级目录",
              path: "/links"
            },
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            }
          ]
        },
        {
          name: "菜单二",
          isSubShow: false,
          icon: "#icon-biaoqian",
          subItems: [
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            }
          ]
        }
      ],
      navItemList: [
        {
          name: "分类",
          isSubShow: false,
          icon: "#icon-calendar",
          subItems: [
            {
              name: "二级目录",
              path: "/links"
            },
            {
              name: "二级目录",
              path: "/"
            }
          ]
        },
        {
          name: "页面",
          isSubShow: false,
          icon: "#icon-biaoqian",
          subItems: [
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            }
          ]
        },
        {
          name: "友链",
          isSubShow: false,
          icon: "#icon-lianjie1",
          subItems: [
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            },
            {
              name: "二级目录",
              path: "/"
            }
          ]
        }
      ],
      navigationList: [
        {
          name: " 首页",
          path: "/",
          icon: "#icon-zhuye"
        },
        {
          name: "YUAN官网",
          path: "/links",
          icon: "#icon-biaoqian1"
        },
        {
          name: "YUAN-使用文档",
          path: "/s",
          icon: "#icon-wendang"
        }
      ]
    };
  },
  mounted() {
    AOS.init({
      offset: 200,
      duration: 200,   //持续时间
      easing: "ease-in-sine",
      delay: 100
    });
    chakhsu(document.getElementById("signature"), "如人饮水，冷暖自知。");
  },
  methods: {
    // 点击展开折叠菜单事件
    showToggle(item, ind) {
      this.menuList.forEach((i) => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        if (i.isSubShow !== this.menuList[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
    },
    showSubItem(item, ind) {
      this.navItemList.forEach((i) => {
        // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
        if (i.isSubShow !== this.navItemList[ind].isSubShow) {
          i.isSubShow = false;
        }
      });
      item.isSubShow = !item.isSubShow;
    }
  }
};
</script>

<style scoped lang="scss">
#menu {
  width: 18%;
  min-height: 90vh;
  background-color: #cccccc2d;
  margin-left: 50px;
  margin-right: 30px;
  position: fixed;
  box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  border-radius: 5px;
  user-select: none;

  .leftbar-user {
    background: url(~@/assets/waves.png) no-repeat;
    padding: 30px 20px;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;

    img {
      vertical-align: middle;
      border-style: none;
      height: 70px;
      aspect-ratio: auto 50 / 50;
      width: 70px;
      border-radius: 50%;
      transition: all 0.5s;

      &:hover {
        transform: rotate(360deg) scale(1.2);
      }
    }

    #signature {
      padding-top: 10px;
      color: var(--yuan-font-white-color);
    }
  }

  .bgImg:hover {
    background: url(http://rboa9eje7.hb-bkt.clouddn.com/assets/snow.8db5efdb.gif) no-repeat;
  }

  .text {
    font-size: 12px;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 20px;
    color: var(--yuan-font-white-color);
  }

  .menu {
    width: 100%;
    height: 700px;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    padding: 0 0.1rem 100px 0.1rem;
    margin-bottom: -0.2rem;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .menu li {
    a {
      color: var(--yuan-font-white-color);
      display: block;
      padding: 15px 30px;
      position: relative;
      font-size: 14px;
      font-weight: 500;
      -webkit-transition: all 0.4s;
      transition: all 0.4s;

      &:hover {
        color: #0acf97;
      }
    }
  }

  .font-12px {
    color: var(--yuan-font-white-color);
    font-size: 12px;
  }

  .router-link-active {
    color: #0acf97 !important;
  }
}

.oneMenu {
  user-select: none;
  padding: 15px 30px;
  font-size: 14px;
  font-weight: 500;
  color: var(--yuan-font-white-color);
  transition: all 0.4s;
  cursor: pointer;

  .myactive {
    .float {
      transform: rotate(00deg);
      transition: all 0.5s;
    }
  }

  .active {
    color: #0acf97 !important;

    .float {
      transform: rotate(90deg);
      transition: all 0.5s;
    }
  }

  &:hover {
    color: #0acf97;
  }

  .menu-item li a {
    padding: 30px 30px 0 30px !important;
  }

  .icon {
    margin-right: 10px;
  }

  .float {
    float: right;
  }
}
</style>
