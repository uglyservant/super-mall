<template>
  <h2>{{iid}}</h2>
</template>

<script>
  export default {
    name: "GoodDetail",
    computed: {
      iid() {
        return this.$route.params.iid;
      }
    }
  }
</script>

<style scoped>

</style>
