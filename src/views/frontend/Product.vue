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
            <button class="addCart btn btn-info mt-4 px-3" @click="updateCart(product,productNum)">
              <i class="fa fa-shopping-cart"></i> 加入購物車
            </button>
          </div>
        </div>
      </div>
      <div class="referPro mt-5">
        <h4 class="text-center">相關產品</h4>
        <div class="line mx-auto"></div>
        <div class="row mt-5">
          <div v-for="item in selectedProducts" :key="item.id" class="col-xl-3 col-lg-4 col-sm-6" @click="getProduct(), getRelatedProducts()">
            <div class="productBox">
              <router-link :to="`/product/${item.id}`">
                <div class="top">
                  <div class="detailBg">
                    <div class="detailBtn">
                      Veiw Detail
                    </div>
                  </div>
                  <img :src="item.imageUrl[0]" alt />
                </div>
              </router-link>
              <div class="bottom">
                <router-link :to="`/product/${item.id}`">
                  <h4>{{ item.title }}</h4>
                </router-link>
                <div class="h5 text-info">NT{{ item.price | currency }}</div>
              </div>
            </div>
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
      products: [],
      product: { imageUrl: [] },
      productNum: 1,
      relatedProducts: [],
      selectedProducts: [],
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/HYMjBNd1w2pIbmbPkhzBETIPArFvCdK1hbyk8ug7kQOcTNQQ6Htwffj3G7alDUPIW7ZnJloorvHNYWIBrv1y27DwbZtUCbaQ7ozv3QeG8TEU2HRpbbxx6ZS68xNiU5VO.jpg'
      }
    }
  },
  created () {
    this.isLoading = true

    const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=1`

    this.$http.get(api).then((response) => {
      this.isLoading = false
      this.products = response.data.data // 取得產品列表
    })

    this.getProduct()
    this.getRelatedProducts()
  },
  methods: {
    getProduct () {
      const id = this.$route.params.id
      // const { id } = this.$route.params // Airbnb es6寫法
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http
        .get(url).then((response) => {
          this.isLoading = false
          this.product = response.data.data
        })
    },
    getRelatedProducts () {
      this.relatedProducts = []
      this.selectedProducts = []
      const id = this.$route.params.id
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.isLoading = true
      this.$http.get(url).then(response => {
        this.products.forEach(product => {
          // products內產品的種類=此產品種類 && 排除此產品
          if (product.category === response.data.data.category && product.id !== id) {
            this.relatedProducts.push(product)
          }
        })
        if (this.relatedProducts.length > 4) {
          for (let i = 0; i < 4; i++) { // 選四個相關產品
            let num = Math.random() * this.relatedProducts.length // 取得區間內亂數
            num = Math.floor(num) // 小於等於所給數字的最大整數
            this.selectedProducts.push(this.relatedProducts[num]) // 將 relatedProduct 的第 num 個放入 selectedProducts
            this.relatedProducts.splice(num, 1) // 須同時除掉 relatedProduct 的第 num 個，以免重複
          }
        } else {
          this.selectedProducts = this.relatedProducts
        }
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
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
