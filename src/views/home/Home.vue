<template>
  <div id="home">
    <navigation-bar class="home-navigation-bar">
      <div slot="center">购物街</div>
    </navigation-bar>
    <home-swiper :banner="banner"/>
    <home-recommend :recommend="recommend"/>
  </div>
</template>

<script>
  import NavigationBar from "../../components/common/navigation-bar/NavigationBar";
  import HomeSwiper from "./child-components/HomeSwiper";
  import HomeRecommend from "./child-components/HomeRecommend";
  import {getHomeMultiData} from "../../network/home";


  export default {
    name: "Home",
    components: {
      NavigationBar,
      HomeSwiper,
      HomeRecommend
    },
    data() {
      return {
        banner: [],
        recommend: []
      }
    },
    created() {
      // 1. 请求多个数据
      getHomeMultiData().then(result => {
        console.log(result);
        this.banner = result.data.data.banner.list;
        this.recommend = result.data.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-navigation-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
