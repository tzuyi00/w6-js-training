<template>
  <div id="rebody" class="bg-main-bg has-navpanel-left has-navpanel-fixed navbar-is-top">
    <loading :active.sync="isLoading"></loading>
    <!--navbar -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-light pt-4">
      <div class="d-flex justify-content-between w-100">
        <a href="#" class="hide-navpanel-btn my-auto" @click.prevent="hidenavpanel">
          <i class="fa fa-bars fa-lg"></i>
        </a>
        <div class="back-brand d-flex align-items-center">
          <img class="logoImg" src="@/assets/img/logoTop.png" alt="logoTop" />
          <span class="logoTxt">HomeTown</span>
        </div>
        <div class="my-auto mr-3">
          <i class="fas fa-user"></i> 管理員你好
        </div>
      </div>
    </nav>
    <Navpanel />
    <div class="has-navpanel-left border-top pt-3 mb-4">

      <router-view :token-receive="token" v-if="checkSuccess" />
    </div>
  </div>
</template>

<script>
import Navpanel from '@/components/backend/Navpanel.vue'

/* global $ */

export default {
  name: 'Dashboard',
  components: {
    Navpanel
  },
  data () {
    return {
      isLoading: false,
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.isLoading = true
    this.checkLogin()
  },
  methods: {
    hidenavpanel () {
      $('#rebody').toggleClass('hide-navpanel')
    },
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
          this.isLoading = false
          // 登入沒有問題
          this.checkSuccess = true
        })
        .catch(() => {
          this.isLoading = false
          // 驗證失敗，返回登入頁，內層不需再重複驗證
          this.$router.push('/login')
        })
    },
    signout () {
      document.cookie = 'lizToken=;expires=;'
      this.$router.push('/login')
    }
  }
}
</script>
