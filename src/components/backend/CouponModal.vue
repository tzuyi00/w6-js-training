<template>
  <div
    id="couponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">建立優惠券</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="title">標題</label>
            <input
              id="title"
              v-model="tempCoupon.title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
            />
          </div>
          <div class="form-group">
            <label for="coupon_code">優惠碼</label>
            <input
              id="coupon_code"
              v-model="tempCoupon.code"
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="form-group">
            <label for="due_date">到期日</label>
            <input id="due_date" v-model="new_date" type="date" class="form-control" />
          </div>
          <div class="form-group">
            <label for="due_time">到期時間</label>
            <input id="due_time" v-model="new_time" type="time" step="1" class="form-control" />
          </div>
          <div class="form-group">
            <label for="price">折扣百分比</label>
            <input
              id="price"
              v-model="tempCoupon.percent"
              type="number"
              class="form-control"
              placeholder="請輸入折扣數量"
            />
          </div>
          <div class="form-group">
            <div class="form-check">
              <input
                id="enabled"
                v-model="tempCoupon.enabled"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon"
          >確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'CouponModal',
  props: {
    tempCoupon: {},
    isNew: Boolean,
    due_date: String,
    due_time: String
  },
  data () {
    return {
      isLoading: false,
      new_date: this.due_date,
      new_time: this.due_time
    }
  },
  methods: {
    updateCoupon () {
      console.log(this.isNew)
      this.isLoading = true

      let api = ''
      let httpMethod = ''

      if (this.isNew) {
        // 新增商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`
        httpMethod = 'post'
      } else {
        // 編輯商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        httpMethod = 'patch'
      }

      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline.datetime = `${this.new_date} ${this.new_time}`

      // 用 httpMethod 帶入是用post還是patch
      this.$http[httpMethod](api, this.tempCoupon).then(() => {
        // console.log(res)
        this.isLoading = false
        $('#couponModal').modal('hide')
        this.$emit('update') // 更新畫面
      }).catch((error) => {
        this.isLoading = false
        console.log(error.response.data.errors)
        this.$bus.$emit('message:push', '必填項目沒填唷！', 'danger')
      })
    }
  }
}
</script>
