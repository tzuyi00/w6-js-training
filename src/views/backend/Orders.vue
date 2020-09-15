<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex mb-2">
      <h1 class="h5 mr-auto font-weight-bold">訂單列表</h1>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">下單時間</th>
              <th scope="col">購買款項</th>
              <th scope="col">付款方式</th>
              <th scope="col">應付金額</th>
              <th scope="col" class="text-center">是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orders" :key="item.id">
              <th scope="row">{{index + 1}}</th>
              <td>{{ item.created.datetime }}</td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="(product, i) in item.products"
                    :key="i"
                  >
                    {{ product.product.title }} 數量：{{ product.quantity }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>
                {{ item.payment }}
              </td>
              <td class="text-right">
                {{ item.amount }}
              </td>
              <td>
                <div class="custom-control custom-switch">
                  <input
                    :id="item.id"
                    v-model="item.paid"
                    type="checkbox"
                    class="custom-control-input"
                    @change="setOrderPaid(item)"
                  >
                  <label
                    class="custom-control-label"
                    :for="item.id"
                  >
                    <strong
                      v-if="item.paid"
                      class="text-success"
                    >已付款</strong>
                    <span
                      v-else
                      class="text-muted"
                    >尚未付款</span>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 元件中 emitPages() 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts -->
        <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Orders',
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      orders: {},
      pagination: {}
    }
  },
  created () {
    this.isLoading = true
    this.getOrders()
  },
  methods: {
    getOrders (page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}&paged=10`

      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.orders = response.data.data
        this.pagination = response.data.meta.pagination
      })
    },
    setOrderPaid (item) {
      this.isLoading = true
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      let status = '已修改為 "已付款" ヽ(＾Д＾)ﾉ '

      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
        status = '已修改為 "尚未付款" ヽ(＾Д＾)ﾉ '
      }

      this.$http.patch(url, item.id).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', status, 'success')
        this.getOrders()
      })
    }
  }
}
</script>
