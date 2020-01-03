<template>
  <div id="home">
    <navigation-bar class="home-navigation-bar"><div slot="center">购物街</div></navigation-bar>
    <scroll class="wrapper" ref="scroll" :probe-type="3" :pull-up-load="true"
            @getPosition="getPosition" @pullingUp="loadMore">
      <home-swiper :banner="banner"/>
      <home-recommend :recommend="recommend"/>
      <weekly-fashion/>
      <tab-control :titles="tabControlTitles" @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <!--监听组件加native修饰符-->
    <back-top v-if="showBackTop" @click.native="backTopClick"/>
  </div>
</template>

<script>
  import NavigationBar from "../../components/common/navigation-bar/NavigationBar";

  import TabControl from "../../components/content/tab-control/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import BackTop from "../../components/content/BackTop";

  import Scroll from "../../components/scroll/Scroll";

  import HomeSwiper from "./child-components/HomeSwiper";
  import HomeRecommend from "./child-components/HomeRecommend";
  import WeeklyFashion from "./child-components/WeeklyFashion";

  import {getHomeMultiData, getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavigationBar,

      TabControl,
      GoodList,
      BackTop,

      Scroll,

      HomeSwiper,
      HomeRecommend,
      WeeklyFashion
    },
    computed: {
      showGoods() {
        return this.goods[this.tabControlCurrentType].list
      }
    },
    data() {
      return {
        banner: [],
        recommend: [],
        tabControlTitles: ['流行', '新款', '精选'],
        tabControlCurrentType: "pop",
        goods: {
          "pop": {page: 0, list:[]},
          "new": {page: 0, list:[]},
          "sell": {page: 0, list:[]}
        },
        showBackTop: false
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultiData();

      // 2. 请求商品信息
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 500);
      this.$bus.$on("goodImageLoad", () => {
        refresh();
      });
    },
    methods: {
      /***
       * 防抖函数
       */
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay)
        }
      },
      /**
       * 网络请求
       */
      getHomeMultiData() {
        getHomeMultiData().then(result => {
          // console.log(result);
          this.banner = result.data.data.banner.list;
          this.recommend = result.data.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        const page = ++this.goods[type].page;
        // console.log(page);
        getHomeGoods(type, page).then(result => {
          let goodList = result.data.data.list;
          // console.log(goodList);
          this.goods[type].list.push(...goodList);
          this.$refs.scroll.finishPullUp();
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.tabControlCurrentType = 'pop';
            break;
          case 1:
            this.tabControlCurrentType = 'new';
            break;
          case 2:
            this.tabControlCurrentType = 'sell';
        }
      },
      /**
       * 返回顶部
       */
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      getPosition(position) {
        this.showBackTop = position.y < -500;
      },
      /**
       * 上拉加载更多
       */
      loadMore() {
        this.getHomeGoods(this.tabControlCurrentType);
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-navigation-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .wrapper {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
