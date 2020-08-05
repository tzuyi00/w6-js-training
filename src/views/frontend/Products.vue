<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h1>前台 產品列表</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">品名</th>
          <th scope="col">價錢</th>
          <th scope="col">連結</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <th scope="row">{{index + 1}}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
          <td>
            <!-- 動態連結(路由) -->
            <router-link :to="`/product/${item.id}`">link</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      products: []
    }
  },
  created () {
    this.isLoading = true
    this.$http.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`).then((response) => {
      console.log('products response', response)
      this.isLoading = false
      this.products = response.data.data
    })
  }
}
</script>
