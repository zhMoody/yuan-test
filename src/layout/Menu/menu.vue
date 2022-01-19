<template>
  <div id="menu">
    <div class="leftbar-user">
      <router-link to="/">
        <img src="https://s1.ax1x.com/2020/07/25/UzAaMq.jpg" alt="" />
      </router-link>
    </div>
    <div id="text" class="text">导航</div>
    <div>
      <ul class="menu">
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
        <li class="line"></li>
        <li>
          <router-link to="/add">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-category"></use>
            </svg>
            菜单一
            <svg class="icon float" aria-hidden="true">
              <use xlink:href="#icon-xia"></use>
            </svg>
          </router-link>
        </li>
        <li>
          <router-link to="/1234">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg>
            菜单二
            <svg class="icon float" aria-hidden="true">
              <use xlink:href="#icon-xia"></use>
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
  }
</script>

<style scoped lang="scss">
  #menu {
    width: 18%;
    height: 100vh;
    //background-color: var(--inis-background);
    background-color: #cccccc2d;
    margin-left: 50px;
    margin-right: 30px;
    position: fixed;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    border-radius: 5px;

    .leftbar-user {
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
      color: var(--yuan-font-color);
    }

    .menu {
      width: 100%;
      height: 100%;
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

        .icon {
          margin-right: 10px;
        }

        .float {
          float: right;
        }

        &:hover {
          color: #0acf97;
        }
      }

      .line::before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #ccc;
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
</style>
