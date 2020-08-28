<template>
  <nav id="nav" class="navbar navbar-expand shadow-sm fixed-top">
    <loading :active.sync="isLoading"></loading>
    <router-link to="/" class="navbar-brand py-0">
      <img class="logoImg" src="@/assets/img/logoTop.png" alt="logoTop" />
      <div class="logoTxt">HomeTown</div>
    </router-link>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav mr-sm-auto ml-auto ml-sm-0">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">
            <i class="fas fa-couch mr-1"></i>
            <span class="shop">家具列表</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/coupon" class="nav-link">
            <i class="fas fa-money-bill-wave mr-1"></i>
            <span>限時優惠</span>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge badge-pill badge-danger" v-if="cart.length">{{cart.length}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <h5 class="itemTitle text-center my-2">已選擇商品</h5>
            <div class="cart-scroll">
              <table class="itemContent">
                <tbody class="d-flex justify-content-start align-items-center flex-column">
                  <tr v-for="item in cart" :key="item.id">
                    <td class="itemPicture">
                      <img
                        :src="item.product.imageUrl[0]"
                        alt
                      />
                    </td>
                    <td class="itemName">{{ item.product.title }}</td>
                    <td>x{{ item.quantity }}</td>
                    <td class="text-info">${{ item.product.price }}</td>
                    <td class="trashIcon" @click="removeCartItem(item.product.id)">
                      <i class="far fa-trash-alt"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="totalInfo">
              <p>
                小計
                <span class="text-info h4 ml-5">${{ cartTotal }}</span>
              </p>
              <router-link to="/payment" class="payBtn">
                <button class="btn btn-info">
                  <i class="fa fa-shopping-cart"></i> 結帳去
                </button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      isLoading: false,
      cart: {},
      cartTotal: 0
    }
  },
  props: {},
  created () {
    this.getCart()
    const vm = this
    vm.$bus.$on('add-cart', (item, quantity) => {
      vm.addToCart(item, quantity)
    })
  },
  methods: {
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`

      this.$http.get(url).then((response) => {
        console.log('購物車', response)
        this.cart = response.data.data
        // 購物車金額拉出來重新計算，不然刪除時會出錯造成累加
        this.updateTotal()
        this.isLoading = false
      })
    },
    updateTotal () {
      this.cartTotal = 0
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
      })
    },
    addToCart (item, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`

      const cart = {
        product: item.id,
        quantity
      }

      this.$http.post(url, cart).then((response) => {
        this.getCart()
        this.$bus.$emit('message:push', `"${response.data.data.product.title}" 已成功放入購物車！`, 'success')
      }).catch((error) => {
        console.log(error.response)
        this.$bus.$emit('message:push', `糟糕！${error.response.data.errors[0]}可直接去結帳囉~`, 'danger')
      })
    },
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`

      this.$http.delete(url).then((response) => {
        this.$bus.$emit('message:push', `${response.data.message}`, 'success')
        this.isLoading = false
        this.getCart()
      })
    }
  }
}
</script>
