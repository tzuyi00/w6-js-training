<template>
  <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
            <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-sm-4 position-relative">
                <span id="requireIcon"
                class="text-danger position-absolute"
                v-if="isNew">*</span>
                <div v-for="i in 5" :key="i + 'img'" class="form-group">
                  <label :for="'img' + i">輸入圖片網址</label>
                  <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">
                      或 上傳圖片
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                      v-if="status.fileUploading"></span>
                  </label>
                  <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
            </div>
            <div class="col-sm-8">
              <span class="text-danger float-right" v-if="isNew">*必填</span>
              <div class="form-group">
                <label for="title">標題</label>
                <span class="text-danger ml-1"
                v-if="isNew">*</span>
                <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題"
                    required>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <span class="text-danger ml-1"
                    v-if="isNew">*</span>
                    <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                    placeholder="請輸入分類" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control" placeholder="請輸入單位">
                </div>
                </div>

                <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                    placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                    placeholder="請輸入售價">
                </div>
                </div>
                <hr>

                <div class="form-group">
                <label for="description">產品說明</label>
                <span class="text-danger ml-1"
                v-if="isNew">*</span>
                <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                    placeholder="請輸入產品說明" required>
            </textarea>
                </div>
                <div class="form-group">
                <label for="content">產品描述</label>
                <span class="text-danger ml-1"
                v-if="isNew">*</span>
                <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                    placeholder="請輸入產品描述" required>
            </textarea>
                </div>
                <div class="form-group">
                <div class="form-check">
                    <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #requireIcon{
    left: 114px;
  }
</style>

<script>
/* global $ */

export default {
  name: 'ProductModal',
  data () {
    return {
      isLoading: false
    }
  },
  props: {
    tempProduct: {
      imageUrl: []
    },
    status: {},
    isNew: Boolean
  },
  methods: {
    updateProduct () {
      console.log(this.isNew)
      this.isLoading = true

      let api = ''
      let httpMethod = ''
      let status = ''

      if (this.isNew) {
        // 新增商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product`
        httpMethod = 'post'
        status = '新增成功囉，好棒ヽ(＾Д＾)ﾉ '
      } else {
        // 編輯商品
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
        status = '更新成功囉，好棒ヽ(＾Д＾)ﾉ '
      }

      // 用 httpMethod 帶入是用post還是patch
      this.$http[httpMethod](api, this.tempProduct).then((response) => {
        console.log(response)
        this.isLoading = false
        $('#productModal').modal('hide')

        if (response.status === 200) {
          this.$bus.$emit('message:push', status, 'success')
          this.$emit('update') // 更新畫面
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`,
            'info')
        }
      }).catch((error) => {
        this.isLoading = false
        console.log(error.response.data.errors)
        this.$bus.$emit('message:push', '必填項目沒填唷！', 'info')
      })
    },
    uploadFile () {
      // 選取 DOM 中的檔案資訊
      const uploadedFile = this.$refs.file.files[0]

      // 使用 FormData 上傳檔案
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`

      this.status.fileUploading = true

      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 聲明此內容的要用formData格式
        }
      }).then((response) => {
        this.status.fileUploading = false
        // 200上傳成功
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path)
        }
      }).catch(() => {
        console.log('上傳不可超過 2 MB')
        this.status.fileUploading = false
      })
    }
  }
}
</script>
