<template>
  <div id="nav">
    <y-Loding></y-Loding>
    <y-header></y-header>
    <div class="content">
      <yMenu></yMenu>
      <yContent></yContent>
    </div>
  </div>
</template>
<script>
  import yLoding from '@/views/loding'
  import yHeader from '@/layout/Header/header.vue'
  import yMenu from '@/layout/Menu/menu.vue'
  import yContent from '@/layout/Content/content.vue'
  import { getData } from '@/api'

  export default {
    components: {
      yLoding,
      yHeader,
      yMenu,
      yContent,
    },
    async created() {
      const res = await getData()
      console.log(res)
    },
  }
</script>
<style scoped lang="scss">
  .content {
    margin-top: 100px;
  }
</style>
