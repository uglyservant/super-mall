<template>
  <div ref="wrapper">
    <div ref="content">
      <slot/>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: false
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      // 2. 监听滚动的位置
      this.scroll.scrollTo(0, 0);
      this.scroll.on("scroll", (position) => {
        this.$emit("getPosition", position);
      });

      // 3. 监听上拉事件
      this.scroll.on("pullingUp", () => {
        console.log("pullingUp");
        this.$emit("pullingUp");
      })
    },
    methods: {
      scrollTo(x, y, time=1000) {
        this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        console.log("--- refresh ---");
        this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
