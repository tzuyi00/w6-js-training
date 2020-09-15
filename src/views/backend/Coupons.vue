<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="d-flex mb-2">
      <h1 class="h5 mr-auto font-weight-bold">優惠券列表</h1>
      <div class>
        <button @click="openModal('new')" class="btn btn-sm btn-outline-dark px-5 font-weight-bold">
          <i class="fas fa-plus mr-1"></i>新增優惠券
        </button>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">名稱</th>
              <th scope="col">優惠碼</th>
              <th scope="col">折扣百分比</th>
              <th scope="col">到期日</th>
              <th scope="col">是否啟用</th>
              <th scope="col" class="text-center">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in coupons" :key="item.id">
              <th scope="row">{{index + 1}}</th>
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }}</td>
              <td>{{ item.deadline.datetime }}</td>
              <td>
                <span v-if="item.enabled" class="text-success">啟用</span>
                <span v-else class="text-danger">未啟用</span>
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', item)"
                    :disabled="loadingBtn === item.id"
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      v-if="loadingBtn === item.id"
                    ></span>
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', item)"
                  >刪除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 元件中 emitPages() 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts -->
        <Pagination :pages="pagination" @emit-pages="getCoupons"></Pagination>

        <CouponModal
          :temp-coupon="tempCoupon"
          :is-new="isNew"
          @update="getCoupons"
        />

        <DeleteModal :temp-product="tempCoupon" :del-name="delName" @update="getCoupons" />
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'
import CouponModal from '@/components/backend/CouponModal.vue'
import DeleteModal from '@/components/backend/DeleteModal.vue'

export default {
  name: 'Coupons',
  components: {
    Pagination,
    CouponModal,
    DeleteModal
  },
  data () {
    return {
      isLoading: false,
      coupons: [],
      tempCoupon: {
        due_date: '',
        due_time: ''
      },
      pagination: {},
      isNew: false, // 判斷是新增(true)或編輯(false)。
      loadingBtn: '',
      delName: '優惠券'
    }
  },
  created () {
    this.isLoading = true
    this.getCoupons()
  },
  methods: {
    getCoupons (page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}&paged=10`

      this.$http.get(url).then((response) => {
        this.isLoading = false
        this.coupons = response.data.data
        this.pagination = response.data.meta.pagination
      })
    },
    openModal (modalStatus, item) {
      switch (modalStatus) {
        case 'new': {
          this.tempCoupon = {}
          this.isNew = true
          $('#couponModal').modal('show')
          break
        }
        case 'edit': {
          this.loadingBtn = item.id // 當loadingBtn = item.id時顯示loading畫面

          const api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`

          this.$http.get(api).then((res) => {
            this.tempCoupon = res.data.data // 取得成功後回寫到 tempCoupon

            // 使用 split 切割相關時間戳
            const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
            [this.tempCoupon.due_date, this.tempCoupon.due_time] = dedlineAt // 日期
          }).then((res) => {
            $('#couponModal').modal('show')
            this.loadingBtn = '' // 清除loading畫面
          }).catch((error) => {
            this.$bus.$emit('message:push', `${error.response.data.message}`, 'info')
          })

          this.isNew = false
          break
        }
        case 'delete': {
          this.tempCoupon = Object.assign({ ...item }) // 由於目前範本僅有一層物件，因此使用淺拷貝
          $('#delModal').modal('show')
          break
        }
        default: {
          break
        }
      }
    }
  }
}
</script>
