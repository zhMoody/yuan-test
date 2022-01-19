<template>
  <div class="footer">
    <div class="github-badge">
      <a href="./" title="©2021&nbsp;❀Moody❀">
        <span class="badge-subject">Copyright©2021&nbsp;</span>
        <span class="badge-value bg-blue">❀Moody❀</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="http://www.miitbeian.gov.cn/"
        target="_blank"
        title="豫ICP备 20018844号-1"
      >
        <span class="badge-subject2">豫ICP备</span>
        <span class="badge-value bg-green">20018844号-1</span>
      </a>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const msg = ref('1233')
      return {
        msg,
      }
    },
  }
</script>

<style scoped>
  /*底部页脚*/
  .github-badge {
    display: inline-block;
    border-radius: 4px;
    text-shadow: none;
    font-size: 12px;
    color: #fff;
    line-height: 15px;
    background-color: #abbac3;
    margin-bottom: 5px;
  }

  .github-badge .badge-subject {
    display: inline-block;
    background-color: rgb(128, 200, 255);
    padding: 4px 4px 4px 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: var(--yuan-font-color);
  }

  .github-badge .badge-subject2 {
    display: inline-block;
    background-color: rgb(5, 201, 194);
    padding: 4px 4px 4px 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: var(--yuan-font-color);
  }

  .github-badge .badge-value {
    display: inline-block;
    padding: 4px 6px 4px 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .github-badge .bg-blue {
    background-color: #ec3636;
  }

  .github-badge .bg-green {
    background-color: #da7b2d;
  }
</style>
