<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="banner" :style="{backgroundImage: `url(${img.banner})` }">
      <div class="bannerTitle">
        <h1>產品介紹</h1>
      </div>
    </div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mt-3 pl-sm-5">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/products">家具列表</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-7 mb-5">
          <div class="pdImg mb-4">
            <img :src="product.imageUrl[0]" class="shadow" alt />
          </div>
        </div>
        <div class="col-md-5">
          <div class="productInfo">
            <div class="cateTag mb-3">{{ product.category }}</div>
            <h3 class="">{{ product.title }}</h3>
            <div class="line"></div>
            <div class="descript mt-4">
              <h6 class="disTitle">【產品說明】</h6>
              <p class="">{{ product.description }}</p>
            </div>
            <hr>
            <div class="mb-3">
              <del class="h6 text-secondary mb-0">NT{{ product.origin_price | currency }}</del>
              <div class="h4 text-info">NT{{ product.price | currency}}</div>
            </div>
            <div class="countNumber d-flex align-items-center">
              <button class="btn minus" @click="changeQty(-1)">
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="number"
                max="10" min="1"
                class="productNumber"
                v-model="productNum"
                @change="changeNumber(productNum)"
              />
              <button class="btn add" @click="changeQty(1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button class="btn btn-info mt-4 px-3" @click="updateCart(product,productNum)">
              <i class="fa fa-shopping-cart"></i> 加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      isLoading: false,
      product: [],
      productNum: 1,
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/HYMjBNd1w2pIbmbPkhzBETIPArFvCdK1hbyk8ug7kQOcTNQQ6Htwffj3G7alDUPIW7ZnJloorvHNYWIBrv1y27DwbZtUCbaQ7ozv3QeG8TEU2HRpbbxx6ZS68xNiU5VO.jpg'
      }
    }
  },
  created () {
    this.isLoading = true
    console.log('$route', this.$route.params.id)
    const id = this.$route.params.id
    // const { id } = this.$route.params // Airbnb es6寫法
    this.$http
      .get(
        `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
      )
      .then((response) => {
        this.isLoading = false
        console.log(response)
        this.product = response.data.data
      })
  },
  methods: {
    // 點擊 + - 按鈕做數量判斷
    changeQty (num) {
      const qty = this.productNum + num
      this.changeNumber(qty)
    },
    // 商品數量欄位變動時判斷
    changeNumber (num) {
      if (num >= 10) {
        this.productNum = 10
        this.$bus.$emit('message:push', '數量不可超過10喔!', 'info')
      } else if (num <= 1) {
        this.productNum = 1
        this.$bus.$emit('message:push', '數量不可低於1喔!', 'info')
      } else {
        this.productNum = num
      }
    },
    updateCart (item, quantity) {
      this.$bus.$emit('add-cart', item, quantity)
    }
  }
}
</script>
