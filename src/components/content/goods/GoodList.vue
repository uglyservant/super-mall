<template>
  <div class="good-list">
    <good v-for="good in goods" :good-object="good"/>
  </div>
</template>

<script>
  import Good from "@/components/content/goods/Good";

  export default {
    name: "GoodList",
    components: {
      Good
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }


</style>
