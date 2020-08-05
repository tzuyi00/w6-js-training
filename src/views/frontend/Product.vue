<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h1>單一產品頁面</h1>
    <h3>{{ products.title }}</h3>
    <p>{{ products.description }}</p>
    <img :src="products.imageUrl" alt="">
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
    console.log('$route', this.$route.params.id)
    const id = this.$route.params.id
    // const { id } = this.$route.params // Airbnb es6寫法
    this.$http.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`).then((response) => {
      this.isLoading = false
      console.log(response)
      this.products = response.data.data
    })
  }
}
</script>
