<template>
  <div id="detail">
    <navigation-bar-detail/>
    <detail-swipper :top-images="topImages"/>
    <detail-basic-info :goods="goods"/>
  </div>
</template>

<script>
  import NavigationBarDetail from "@/views/detail/chilid-components/NavigationBarDetail";
  import DetailSwipper from "@/views/detail/chilid-components/DetailSwipper";
  import DetailBasicInfo from "@/views/detail/chilid-components/DetailBasicInfo";
  import {getDetail, Goods} from "@/network/detail";

  export default {
    name: "GoodDetail",
    computed: {
      iid() {
        return this.$route.params.iid;
      }
    },
    data() {
      return {
        topImages: [],
        goods: {}
      }
    },
    components: {
      DetailSwipper,
      NavigationBarDetail,
      DetailBasicInfo
    },
    created() {
      getDetail(this.iid).then(res => {
        let data = res.data.result;
        console.log(data);
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      });
    }
  }
</script>

<style scoped>

</style>
