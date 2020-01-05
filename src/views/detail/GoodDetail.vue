<template>
  <div id="detail">
    <navigation-bar-detail/>
  </div>
</template>

<script>
  import NavigationBarDetail from "@/views/detail/chilid-components/NavigationBarDetail";

  export default {
    name: "GoodDetail",
    computed: {
      iid() {
        return this.$route.params.iid;
      }
    },
    components: {
      NavigationBarDetail
    }
  }
</script>

<style scoped>

</style>
