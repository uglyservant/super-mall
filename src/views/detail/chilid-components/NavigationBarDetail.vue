<template>
  <navigation-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" class="title-item"
           :class="{active: currentIndex === index}" @click="itemClick(index)">{{item}}</div>
    </div>
  </navigation-bar>
</template>

<script>
  import NavigationBar from "@/components/common/navigation-bar/NavigationBar";

  export default {
    name: "NavigationBarDetail",
    components: {
      NavigationBar
    },
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    vertical-align: middle;
  }
</style>
