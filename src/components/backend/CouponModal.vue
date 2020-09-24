<template>
  <div
    id="couponModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
  <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">建立優惠券</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <span class="text-danger float-right" v-if="isNew">*必填</span>
          <div class="form-group mt-2">
            <label for="title">標題</label>
            <span class="text-danger ml-1"
            v-if="isNew">*</span>
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
            <span class="text-danger ml-1"
            v-if="isNew">*</span>
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
            <span class="text-danger ml-1"
            v-if="isNew">*</span>
            <input id="due_date" v-model="tempCoupon.due_date" type="date" class="form-control" />
          </div>
          <div class="form-group">
            <label for="due_time">到期時間</label>
            <span class="text-danger ml-1"
            v-if="isNew">*</span>
            <input id="due_time" v-model="tempCoupon.due_time" type="time" step="1" class="form-control" />
          </div>
          <div class="form-group">
            <label for="price">折扣百分比</label>
            <span class="text-danger ml-1"
            v-if="isNew">*</span>
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
    tempCoupon: {
      deadline_at: 0
    },
    isNew: Boolean
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    updateCoupon () {
      this.isLoading = true

      let api = ''
      let httpMethod = ''
      let status = ''

      if (this.isNew) {
        // 新增商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`
        httpMethod = 'post'
        status = '新增成功囉，好棒ヽ(＾Д＾)ﾉ '
      } else {
        // 編輯商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        httpMethod = 'patch'
        status = '更新成功囉，好棒ヽ(＾Д＾)ﾉ '
      }

      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.tempCoupon.due_date} ${this.tempCoupon.due_time}`

      // 用 httpMethod 帶入是用post還是patch
      this.$http[httpMethod](api, this.tempCoupon).then((response) => {
        this.isLoading = false
        $('#couponModal').modal('hide')

        if (response.status === 200) {
          this.$bus.$emit('message:push', status, 'success')
          this.$emit('update') // 更新畫面
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`,
            'info')
        }
      }).catch(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', '必填項目沒填唷！', 'info')
      })
    }
  }
}
</script>
