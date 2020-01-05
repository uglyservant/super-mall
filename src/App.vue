<template>
  <div id="app">
    <keep-alive exclude="GoodDetail">
      <router-view/>
    </keep-alive>
    <tab-bar>
      <tab-bar-item path="/home" active-color="red">
        <img slot="item-icon" src="./assets/img/tab-bar/home.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tab-bar/home-active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="./assets/img/tab-bar/category.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tab-bar/category-active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopping-cart">
        <img slot="item-icon" src="./assets/img/tab-bar/shopping-cart.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tab-bar/shopping-cart-active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="./assets/img/tab-bar/profile.svg" alt="">
        <img slot="item-icon-active" src="./assets/img/tab-bar/profile-active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "@/components/common/tab-bar/TabBar";
  import TabBarItem from "@/components/common/tab-bar/TabBarItem";

  export default {
    name: 'App',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
