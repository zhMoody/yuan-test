<template>
  <div id="content">
    <router-view />
    <yFooter class="footer"></yFooter>
  </div>
</template>

<script>
  import yFooter from '@/layout/Footer/footer.vue'

  export default {
    name: 'Content',
    components: {
      yFooter,
    },
  }
</script>

<style scoped lang="scss">
  #content {
    min-width: 74%;
    min-height: 89vh;
    margin-left: 23%;
    margin-top: 40px;
    margin-right: 50px;
    //background-color: var(--yuan-bg-clolr);
    //box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    border-radius: 5px;
    position: relative;
    transition: all 0.1s;
  }

  .footer {
    position: absolute;
    bottom: -30px;
    left: 0;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
