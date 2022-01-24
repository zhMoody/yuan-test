<template>
  <div id="menu">
    <div class="leftbar-user">
      <router-link to="/">
        <img src="https://s1.ax1x.com/2020/07/25/UzAaMq.jpg" alt="" />
      </router-link>
    </div>

    <div class="menu_card">
      <ul class="menu">
        <li id="text" class="text">导航</li>
        <li>
          <router-link to="/">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhuye"></use>
            </svg>
            首页
          </router-link>
        </li>
        <li>
          <router-link to="/links">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian1"></use>
            </svg>
            YUAN官网
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wendang"></use>
            </svg>
            YUAN-使用文档
          </router-link>
        </li>
        <li v-for="(item, index) in menuList" :key="item.name" class="oneMenu">
          <div
            :class="item.isSubShow ? 'active' : ''"
            @click="showToggle(item, index)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.name }}</span>
            <svg class="icon float" aria-hidden="true">
              <use
                :xlink:href="item.isSubShow ? '#icon-shang' : '#icon-xia'"
              ></use>
            </svg>
          </div>
          <transition name="slide-fade">
            <ul v-show="item.isSubShow" class="menu-item">
              <li v-for="subItem in item.subItems" :key="subItem.name">
                <router-link :to="subItem.path">{{ subItem.name }}</router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li id="text" class="text">组成</li>
        <li
          v-for="(item, index) in navItemList"
          :key="item.name"
          class="oneMenu"
        >
          <div
            :class="item.isSubShow ? 'active' : ''"
            @click="showSubItem(item, index)"
          >
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.name }}</span>
            <svg class="icon float" aria-hidden="true">
              <use
                :xlink:href="item.isSubShow ? '#icon-shang' : '#icon-xia'"
              ></use>
            </svg>
          </div>
          <transition name="slide-fade">
            <ul v-show="item.isSubShow" class="menu-item">
              <li v-for="subItem in item.subItems" :key="subItem.name">
                <router-link :to="subItem.path">{{ subItem.name }}</router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
      <!-- <li>
          <router-link to="/1234">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg>
            菜单二
            <svg class="icon float" aria-hidden="true">
              <use xlink:href="#icon-xia"></use>
            </svg>
          </router-link> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        menuList: [
          {
            name: '菜单一',
            isSubShow: false,
            icon: '#icon-category',
            subItems: [
              {
                name: '二级目录',
                path: '/links',
              },
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
            ],
          },
          {
            name: '菜单二',
            isSubShow: false,
            icon: '#icon-biaoqian',
            subItems: [
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
            ],
          },
        ],
        navItemList: [
          {
            name: '分类',
            isSubShow: false,
            icon: '#icon-calendar',
            subItems: [
              {
                name: '二级目录',
                path: '/links',
              },
              {
                name: '二级目录',
                path: '/',
              },
            ],
          },
          {
            name: '页面',
            isSubShow: false,
            icon: '#icon-biaoqian',
            subItems: [
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
            ],
          },
          {
            name: '友链',
            isSubShow: false,
            icon: '#icon-lianjie1',
            subItems: [
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
              {
                name: '二级目录',
                path: '/',
              },
            ],
          },
        ],
      }
    },
    methods: {
      // 点击展开折叠菜单事件
      showToggle(item, ind) {
        this.menuList.forEach((i) => {
          // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
          if (i.isSubShow !== this.menuList[ind].isSubShow) {
            i.isSubShow = false
          }
        })
        item.isSubShow = !item.isSubShow
      },
      showSubItem(item, ind) {
        this.navItemList.forEach((i) => {
          // 判断如果数据中的menuList[i]的show属性不等于当前数据的isSubShow属性那么menuList[i]等于false
          if (i.isSubShow !== this.navItemList[ind].isSubShow) {
            i.isSubShow = false
          }
        })
        item.isSubShow = !item.isSubShow
      },
    },
  }
</script>

<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all 0.3s ease-out !important;
  }
  // .slide-fade-leave-active {
  //   transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  // }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px) !important;
    opacity: 0 !important;
  }
  #menu {
    width: 18%;
    min-height: 90vh;
    //background-color: var(--inis-background);
    background-color: #cccccc2d;
    margin-left: 50px;
    margin-right: 30px;
    position: fixed;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    border-radius: 5px;
    user-select: none;

    .leftbar-user {
      height: 25%;
      background: url(~@/assets/waves.png) no-repeat;
      padding: 30px 20px;
      text-align: center;
      overflow: hidden;

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
      padding: 0 0.1rem;
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
      color: var(--yuan-font-color);
      font-size: 12px;
    }

    .router-link-active {
      color: #0acf97 !important;
    }
  }
  .oneMenu {
    user-select: none;
    padding: 15px 30px;
    font-size: 16px;
    color: var(--yuan-font-white-color);
    transition: all 0.4s;
    cursor: pointer;
    .active {
      color: #0acf97 !important;
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
