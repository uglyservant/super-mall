<template>
  <div id="home">
    <navigation-bar class="home-navigation-bar"><div slot="center">购物街</div></navigation-bar>
    <scroll class="wrapper" ref="scroll" :probe-type="3" :pull-up-load="true"
            @getPosition="getPosition" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperLoad="swiperLoad"/>
      <home-recommend :recommend="recommend"/>
      <weekly-fashion/>
      <tab-control ref="tabControl" :titles="tabControlTitles" @tabClick="tabClick" :class="{fixed: tabControlFixed}"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <!--监听组件加native修饰符-->
    <back-top v-if="showBackTop" @click.native="backTopClick"/>
  </div>
</template>

<script>
  import NavigationBar from "@/components/common/navigation-bar/NavigationBar";

  import TabControl from "@/components/content/tab-control/TabControl";
  import GoodList from "@/components/content/goods/GoodList";
  import BackTop from "@/components/content/BackTop";

  import Scroll from "@/components/scroll/Scroll";

  import HomeSwiper from "@/views/home/child-components/HomeSwiper";

  import HomeRecommend from "@/views/home/child-components/HomeRecommend";
  import WeeklyFashion from "@/views/home/child-components/WeeklyFashion";

  import {getHomeMultiData, getHomeGoods} from "@/network/home";
  import {debounce} from "@/common/utils";

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
        tabOffsetTop: 0,
        goods: {
          "pop": {page: 0, list:[]},
          "new": {page: 0, list:[]},
          "sell": {page: 0, list:[]}
        },
        showBackTop: false,
        tabControlFixed: false
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
      const refresh = debounce(this.$refs.scroll.refresh, 500);
      this.$bus.$on("goodImageLoad", () => {
        refresh();
      });
    },
    methods: {
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
        this.tabControlFixed = position.y <= (-this.tabOffsetTop);
      },
      /**
       * 上拉加载更多
       */
      loadMore() {
        this.getHomeGoods(this.tabControlCurrentType);
      },
      swiperLoad() {
        // 所有组件都有一个属性$el: 用于获取组件中的元素
        console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
