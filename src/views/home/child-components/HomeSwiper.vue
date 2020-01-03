<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from "../../../components/common/swiper/Swiper";
  import SwiperItem from "../../../components/common/swiper/SwiperItem";

  export default {
    name: "HomeSwiper",
    props: {
      banner: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      swiperLoad() {
        this.$emit("swiperLoad");
      }
    }
  }
</script>

<style scoped>

</style>
