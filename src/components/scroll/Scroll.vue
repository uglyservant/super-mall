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

    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {click: true, probeType: this.probeType});
      this.scroll.scrollTo(0, 0);
      this.scroll.on("scroll", (position) => {
        this.$emit("getPosition", position);
      })
    },
    methods: {
      scrollTo(x, y, time=1000) {
        this.scroll.scrollTo(x, y, time);
      }
    }
  }
</script>

<style scoped>

</style>
