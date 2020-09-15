<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="banner" :style="{backgroundImage: `url(${img.banner})` }">
      <div class="bannerTitle">
        <h1>家具列表</h1>
      </div>
    </div>
    <div class="category mx-auto">
      <ul>
        <li :class="{ active: filterType === 'all' }" @click="getFilter(filterType = 'all')">全部家具</li>
        <li :class="{ active: filterType === 'table' }" @click="getFilter(filterType = 'table')">桌子</li>
        <li :class="{ active: filterType === 'chair' }" @click="getFilter(filterType = 'chair')">椅子</li>
        <li :class="{ active: filterType === 'sofa' }" @click="getFilter(filterType = 'sofa')">沙發</li>
        <li :class="{ active: filterType === 'lamp' }" @click="getFilter(filterType = 'lamp')">燈飾</li>
      </ul>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div v-for="item in newProducts" :key="item.id" class="col-xl-3 col-lg-4 col-sm-6 px-xl-3 px-3">
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
              <del class="h6 text-secondary mb-0">NT{{ item.origin_price | currency }}</del>
              <div class="h5 text-info">NT{{ item.price | currency }}</div>
              <!-- <div class="cateTag">{{ item.category }}</div> -->
              <i class="fas fa-cart-plus cart" @click="updateCart(item)"></i>
            </div>
          </div>
        </div>
      </div>

      <Pagination :pages="pagination" @emit-pages="getProducts" v-if="newProducts.length >= 20"></Pagination>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Products',
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      products: [],
      newProducts: [],
      filterType: 'all',
      img: {
        banner:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/HYMjBNd1w2pIbmbPkhzBETIPArFvCdK1hbyk8ug7kQOcTNQQ6Htwffj3G7alDUPIW7ZnJloorvHNYWIBrv1y27DwbZtUCbaQ7ozv3QeG8TEU2HRpbbxx6ZS68xNiU5VO.jpg'
      }

    }
  },
  created () {
    this.isLoading = true
    this.getProducts()
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}`

      this.$http.get(api).then((response) => {
        this.isLoading = false
        this.products = response.data.data // 取得產品列表
        this.newProducts = this.products
        this.pagination = response.data.meta.pagination // 取得分頁資訊
      })
    },
    getFilter () {
      switch (this.filterType) {
        case 'all':
          this.newProducts = this.products
          break
        case 'table':
          this.newProducts = this.products.filter((item) => item.category === '桌子')
          break
        case 'chair':
          this.newProducts = this.products.filter((item) => item.category === '椅子')
          break
        case 'sofa':
          this.newProducts = this.products.filter((item) => item.category === '沙發')
          break
        case 'lamp':
          this.newProducts = this.products.filter((item) => item.category === '燈飾')
          break
        default:
          break
      }
    },
    updateCart (item) {
      this.$bus.$emit('add-cart', item)
    }
  }
}
</script>
