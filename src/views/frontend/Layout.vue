<template>
  <div>
    前台
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/about">關於我們</router-link> |
      <router-link to="/payment">結帳</router-link> |
      <router-link to="/paymentok">結帳完成</router-link> |
      <router-link to="/admin/products">前往後台</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
