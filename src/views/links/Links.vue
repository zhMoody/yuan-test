<template>
  <div v-for="i in 100" id="Links" :key="i">this is an Links page{{ msg }}</div>
  <button class="btn" @click="handliClick">换颜色</button>
  <div class="tikeUp">
    <div class="progress"></div>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const msg = ref('1233')
      const handliClick = () => {
        document.body.style.backgroundColor = 'var(--yuan-dark)'
        document.querySelector('#header').style.backgroundColor =
          'var(--yuan-dark)'
        document.querySelector('#text').style.color =
          'var(--yuan-font-white-color)'
      }
      return {
        msg,
        handliClick,
      }
    },
    created() {},
  }
</script>

<style scoped lang="scss">
  .btn {
    width: 100px;
    height: 100px;
    background-color: #fff;
  }

  .tikeUp {
    width: 500px;
    height: 10px;
    background-color: #ccc;
    border: 2px solid #fff;

    .progress {
      width: 0;
      height: 100%;
      background-color: red;
    }
  }
</style>
