<template>
  <div class="good">
    <img :src="goodObject.show.img" alt="" @load="imageLoad">
    <div class="good-info">
      <p>{{goodObject.title}}</p>
      <span class="price">{{goodObject.price}}</span>
      <span class="collection">{{goodObject.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Good",
    props: {
      goodObject: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit("goodImageLoad");
      }
    }
  }
</script>

<style scoped>
  .good {
    padding-bottom: 40px;
    position: relative;
    width: 46%;
  }

  .good img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .good-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .good-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .good-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .good-info .collection {
    position: relative;
  }

  .good-info .collection::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collection.svg") 0 0/14px 14px;
  }
</style>
