<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="banner" :style="{backgroundImage: `url(${img.banner})` }">
      <div class="bannerTitle">
        <h1>購物流程</h1>
      </div>
    </div>
    <div class="container section960">
      <div class="cartPage mt-5">
        <div class="stepGroup d-flex justify-content-between mx-auto my-5 text-center">
          <div class="stepBox current">
            <div class="num mx-auto h5">1</div>
            購物車
          </div>
          <div class="stepBox">
            <div class="num mx-auto h5">2</div>
            填寫資料
          </div>
          <div class="stepBox">
            <div class="num mx-auto h5">3</div>
            訂單確認
          </div>
        </div>
        <table class="table cartTable">
          <thead>
            <tr>
              <th scope="col" class="thPicture pl-4">圖示</th>
              <th scope="col" class="thName">商品名稱</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
              <th scope="col" class="thTrash"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td class="itemPicture">
                <img :src="item.product.imageUrl[0]" class="img-fluid" />
              </td>
              <td>{{item.product.title}}</td>
              <td class="countNumber d-flex align-items-center">
                <button
                class="btn minus"
                type="button"
                @click="quantityUpdata(item.product.id, item.quantity - 1)"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input type="number"
                max="10" min="1"
                class="productNumber"
                :value="item.quantity"
                @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                @change="quantityUpdata(item.product.id, $event.target.value)"
                />
                <button
                class="btn add"
                type="button"
                @click="quantityUpdata(item.product.id, item.quantity + 1)"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </td>
              <td>{{item.product.price | currency}}</td>
              <td class="trashIcon" @click="removeCartItem(item.product.id)">
                <i class="far fa-trash-alt"></i>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="input-group d-flex align-items-center justify-content-end">
          <span class="mr-3">使用優惠券</span>
          <input v-model="coupon_code"  @keyup.enter="addCoupon" type="text" class="couponInput form-control" placeholder="輸入優惠券序號" />
          <div class="input-group-append">
            <button class="btn btn-outline-primary couponBtn" type="button" @click="addCoupon" :disabled="!coupon_code">套用</button>
          </div>
        </div>

        <table class="table totalInfo ml-auto mt-3">
          <tbody>
            <tr>
              <td>總計金額</td>
              <td class="text-right text-info">NT {{ cartTotal  | currency}}</td>
            </tr>
            <tr v-if="coupon.enabled">
              <td>優惠折抵</td>
              <td class="text-right">- NT {{ cartTotal - cartTotal * (coupon.percent / 100)  | currency}}</td>
            </tr>
            <tr v-if="coupon.enabled">
              <td>應付金額</td>
              <td class="text-right text-danger">NT {{ cartTotal * (coupon.percent / 100)  | currency}}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-info d-block ml-auto" @click="changePage()">
          <i class="fas fa-shopping-bag"></i> 確認購買
        </button>
      </div>

      <div class="orderPage mt-5" style="display: none;">
        <div class="stepGroup d-flex justify-content-between mx-auto my-5 text-center">
          <div class="stepBox">
            <div class="num mx-auto h5">1</div>
            購物車
          </div>
          <div class="stepBox current">
            <div class="num mx-auto h5">2</div>
            填寫資料
          </div>
          <div class="stepBox">
            <div class="num mx-auto h5">3</div>
            訂單確認
          </div>
        </div>
        <table class="table paymentTable mt-5">
          <thead>
            <tr>
              <th colspan="4">購買清單</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td class="itemPicture">
                <img :src="item.product.imageUrl[0]" class="img-fluid" />
              </td>
              <td>{{item.product.title}}</td>
              <td class="text-center">x{{ item.quantity }}</td>
              <td class="text-right">{{item.product.price | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="coupon.enabled">
              <td colspan="3" class="text-right py-3">優惠折抵</td>
              <td class="text-right">- NT {{ cartTotal - cartTotal * (coupon.percent / 100)  | currency}}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right" :class="{ isCoupon: coupon.enabled }">總計</td>
              <td v-if="!coupon.enabled" class="text-right text-danger"  :class="{ isCoupon: coupon.enabled }">NT {{ cartTotal  | currency}}</td>
              <td v-if="coupon.enabled" class="text-right text-danger"  :class="{ isCoupon: coupon.enabled }">NT {{ cartTotal * (coupon.percent / 100)  | currency}}</td>
            </tr>
          </tfoot>
        </table>

        <validation-observer v-slot="{ invalid }">
          <div class="orderTitle mt-5 font-weight-bold">訂單資訊</div>
          <form class="infoArea" @submit.prevent="createOrder">
            <div class="form-row userInfo">
              <div class="form-group col-sm-6">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="userName">
                    收件人姓名
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="userName"
                    name="姓名"
                    v-model="form.name"
                    type="text"
                    placeholder="請輸入姓名"
                    class="form-control"
                    :class="classes"
                  />
                  <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group col-sm-6">
                <validation-provider v-slot="{ errors, classes }" rules="required|min:8">
                  <label for="usertel">
                    收件人手機
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="userTel"
                    name="手機"
                    v-model="form.tel"
                    type="tel"
                    placeholder="0912345678"
                    maxlength="10"
                    class="form-control"
                    :class="classes"
                  />
                  <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-sm-6">
                <validation-provider v-slot="{ errors, classes }" rules="required|email">
                  <label for="userEmail">
                    收件人Email
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="userEmail"
                    name="Email"
                    v-model="form.email"
                    type="email"
                    placeholder="請輸入Email"
                    class="form-control"
                    :class="classes"
                  />
                  <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group col-sm-6">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="payment">
                    付款方式
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    id="payment"
                    name="付款方式"
                    v-model="form.payment"
                    class="form-control"
                    :class="classes"
                  >
                    <option value="WebATM">WebATM</option>
                    <option value="ATM">ATM</option>
                    <option value="CVS">CVS</option>
                    <option value="Credit">Credit</option>
                    <option value="ApplePay">ApplePay</option>
                    <option value="GooglePay">GooglePay</option>
                  </select>
                  <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="userAddress">
                  收件人地址
                  <span class="text-danger">*</span>
                </label>
                <input
                  id="userAddress"
                  name="地址"
                  v-model="form.address"
                  type="text"
                  placeholder="請輸入地址"
                  class="form-control"
                  :class="classes"
                />
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group mb-5">
              <label for="message">備註</label>
              <textarea
                id="message"
                name="message"
                v-model="form.message"
                cols="10"
                rows="3"
                class="form-control"
              ></textarea>
            </div>
            <button type="submit" :disabled="invalid" class="btn btn-info d-block ml-auto">
              <i class="fas fa-clipboard-check"></i> 完成訂單
            </button>
          </form>
        </validation-observer>
        <button type="botton" class="btn btn-primary mt-3" @click="goBack()">
          <i class="fas fa-angle-left"></i> 回上一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'payment',
  data () {
    return {
      isLoading: false,
      cart: {},
      cartTotal: 0,
      coupon: {},
      coupon_code: '',
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
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
    changePage () {
      $('.cartPage').hide()
      $('.orderPage').fadeIn(800)
    },
    goBack () {
      $('.orderPage').hide()
      $('.cartPage').fadeIn(800)
    },
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`

      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        // 購物車金額拉出來重新計算，不然刪除時會出錯造成累加
        this.updateTotal()
        this.isLoading = false
      })
    },
    /**
     * 總金額計算
    */
    updateTotal () {
      this.cartTotal = 0
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity
      })
    },
    /**
     * 編輯商品數量
    */
    quantityUpdata (id, num) {
      if (num > 10) {
        this.$bus.$emit('message:push', '數量不可超過10喔!', 'info')
      } else if (num < 1) {
        this.$bus.$emit('message:push', '數量不可低於1喔!', 'info')
      } else {
        this.isLoading = true
        const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`

        const data = {
          product: id,
          quantity: num
        }

        this.$http.patch(url, data).then(() => {
          this.isLoading = false
          this.$bus.$emit('nav-getCart')
          this.getCart()
        })
      }
    },
    /**
     * 刪除某一筆購物車資料
    */
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping/${id}`

      this.$http.delete(url).then((response) => {
        this.$bus.$emit('nav-getCart')
        this.isLoading = false
        this.getCart()
      })
    },
    /**
     * 搜尋此序號是否有coupon
    */
    addCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/coupon/search`

      const data = {
        code: this.coupon_code
      }

      this.$http.post(url, data).then((response) => {
        this.coupon = response.data.data // 若 coupon 存在就回寫到 this.coupon
        this.isLoading = false
      }).catch((error) => {
        this.isLoading = false
        this.$bus.$emit('message:push', `${error.response.data.message}`, 'info')
      })
    },
    createOrder () {
      this.isLoading = true

      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`

      const order = { ...this.form }

      // coupon.enabled = ture 表示已執行過 addCoupon()，再將 coupon.code 放進 order
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }

      this.$http.post(url, order).then((response) => {
        if (response.data.data.id) {
          this.$router.push(`/payment/${response.data.data.id}`)
        }
        this.$bus.$emit('nav-getCart')
        this.isLoading = false
      }).catch((error) => {
        const errorData = error.response.data.errors

        errorData.forEach((err) => {
          this.$bus.$emit('message:push',
            `建立訂單失敗惹，好糗Σ( ° △ °|||)︴
          ${err}`,
            'info')
        })

        this.isLoading = false
      })
    }
  }
}
</script>
