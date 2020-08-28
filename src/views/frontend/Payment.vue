<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="banner" :style="{backgroundImage: `url(${img.banner})` }">
      <div class="bannerTitle">
        <h1>結帳流程</h1>
      </div>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" width="120px">圖示</th>
            <th scope="col">商品名稱</th>
            <th scope="col">數量</th>
            <th scope="col">單價</th>
            <th scope="col">小計</th>
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="itemPicture">
              <img
                :src="item.product.imageUrl[0]"
                class="img-fluid"
              >
            </td>
            <td>{{item.product.title}}</td>
            <td>
              <button class="btn minus">
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="number"
                max="10" min="1"
                class="productNumber"
                v-model="productNum"
              />
              <button class="btn add">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>{{item.product.price}}</td>
            <td>{{item.product.price}}</td>
            <td>
              <i class="far fa-trash-alt"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payment',
  data () {
    return {
      isLoading: false,
      cart: {},
      cartTotal: 0,
      productNum: 1,
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/HYMjBNd1w2pIbmbPkhzBETIPArFvCdK1hbyk8ug7kQOcTNQQ6Htwffj3G7alDUPIW7ZnJloorvHNYWIBrv1y27DwbZtUCbaQ7ozv3QeG8TEU2HRpbbxx6ZS68xNiU5VO.jpg'
      }
    }
  },
  created () {
    this.isLoading = true
    this.getCart()
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`

      this.$http.get(url).then((response) => {
        console.log('購物車', response)
        this.cart = response.data.data
        // 購物車金額拉出來重新計算，不然刪除時會出錯造成累加
        // this.updateTotal()
        this.isLoading = false
      })
    },
    updateTotal () {
      this.cartTotal = 0
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
      })
    }
  }
}
</script>
