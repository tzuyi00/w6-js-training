<template>
  <div
    id="storageModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-m" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>上傳圖片</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="customFile">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
                v-if="fileUploading"
              ></span>
            </label>
            <input id="customFile" ref="file" type="file" class="form-control"
            @change="uploadFile" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'StorageModal',
  data () {
    return {
      fileUploading: false
    }
  },
  props: {},
  methods: {
    uploadFile () {
      // 選取 DOM 中的檔案資訊
      const uploadedFile = this.$refs.file.files[0]

      // 使用 FormData 上傳檔案
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`

      this.fileUploading = true

      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 聲明此內容的要用formData格式
        }
      }).then((response) => {
        this.fileUploading = false
        // 200上傳成功
        if (response.status === 200) {
          this.$emit('update') // 更新畫面
          $('#storageModal').modal('hide')
          this.$bus.$emit('message:push', '圖片新增成功囉，好棒ヽ(＾Д＾)ﾉ ', 'success')
        } else {
          this.$bus.$emit('message:push',
            `出現錯誤惹，好糗Σ( ° △ °|||)︴
            ${response.data.message}`,
            'info')
        }
      }).catch(() => {
        this.fileUploading = false
        this.$bus.$emit('message:push', '上傳不可超過 2 MB', 'info')
      })
    }
  }
}
</script>
