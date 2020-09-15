<template>
  <div
    id="delModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
  <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>刪除{{delName}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> {{delName}}(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'DeleteModal',
  data () {
    return {
      isLoading: false
    }
  },
  props: {
    tempProduct: {
      imageUrl: []
    },
    delName: String
  },
  methods: {
    delProduct () {
      this.isLoading = true
      let url = ''
      switch (this.delName) {
        case '商品': {
          url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
          break
        }
        case '優惠券': {
          url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempProduct.id}`
          break
        }
        case '圖片': {
          url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage/${this.tempProduct.id}`
          break
        }
        default:
          break
      }

      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.$bus.$emit('message:push', `${this.delName}刪除成功囉，好棒ヽ(＾Д＾)ﾉ `, 'success')
        $('#delModal').modal('hide') // 刪除成功後關閉 Modal
        this.$emit('update') // 重新取得全部資料(更新畫面)
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
