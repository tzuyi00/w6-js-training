<template>
  <div>
    後台
    <div id="nav">
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/coupons">優惠券列表</router-link> |
      <router-link to="/admin/orders">訂單列表</router-link> |
      <router-link to="/admin/pictures">圖片儲存列表</router-link> |
      <router-link to="/">回到前台</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view :token-receive="token" v-if="checkSuccess" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    // 確認 Token 狀態
    checkLogin () {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)lizToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}` // Token 夾帶入 Headers 內，放於此(外層)就好

      const api = `${process.env.VUE_APP_APIPATH}auth/check`

      this.$http
        .post(api, {
          api_token: this.token
        })
        .then((res) => {
          // 登入沒有問題
          console.log(res)
          this.checkSuccess = true
        })
        .catch((error) => {
          console.log('error', error.response)
          // 驗證失敗，返回登入頁，內層不需再重複驗證
          this.$router.push('/login')
        })
    },
    signout () {
      document.cookie = 'lizToken=;expires=;'
      console.log('token 已清除')
      this.$router.push('/login')
    }
  }
}
</script>
