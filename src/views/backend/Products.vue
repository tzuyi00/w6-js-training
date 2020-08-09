<template>
<div class="">
  <div class="d-flex mb-2">
      <h1 class="h5 mr-auto font-weight-bold">產品列表</h1>
      <div class="">
        <a href="#" class="btn btn-sm btn-outline-dark px-5 font-weight-bold"><i class="fas fa-plus mr-1"></i>新增訂單</a>
      </div>
  </div>
  <div class="card">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">品名</th>
            <th scope="col">價錢</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="item.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  props: ['token-receive'], // 用props將外層的token帶入
  created () {
    // 後台管理API
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`
    this.$http.get(url).then((res) => {
      console.log(res)
      this.products = res.data.data
    })
  }
}
</script>
