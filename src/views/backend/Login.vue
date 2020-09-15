<template>
  <div class="container-fluid bg-main-bg" style="width: 100vw; height: 100vh;">

    <div class="d-flex flex-column align-items-center">
      <router-link to="/">
        <div class="back-brand text-center mb-3" style="margin-top: 8rem;">
          <img class="logoImg" src="@/assets/img/logoTop.png" alt="logoTop" />
          <div class="logoTxt">HomeTown</div>
        </div>
      </router-link>
      <div class="card" style="width: 340px;">
        <div class="card-body">
          <div class="h5 text-center"> <strong>後台登入</strong> </div>

          <div class="p-3">
            <form @submit.prevent="signin">
              <div class="pt-1">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text input-icon" style="background-color: transparent;"><i class="fas fa-envelope fa-lg"></i></span>
                  </div>
                  <input id="inputEmail" v-model="user.email" type="email" class="form-control" placeholder="請輸入Email" required autofocus>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text input-icon" style="background-color: transparent;"><i class="fas fa-lock fa-lg"></i></span>
                  </div>
                  <input id="inputPassword" v-model="user.password" type="password" class="form-control" placeholder="請輸入密碼" required>
                </div>
                <button type="submit" class="btn btn-block btn-outline-info w-75 mx-auto mt-4">登入</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    // 登入
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}auth/login`

      //   post將輸入的user資料送出
      this.$http.post(api, this.user).then((response) => {
        const { token } = response.data
        const { expired } = response.data

        // 將資料存入cookie
        document.cookie = `lizToken=${token}; expires=${new Date(expired * 1000)};`

        this.$bus.$emit('message:push', '登入成功 ヾ(●゜▽゜●)♡', 'success')

        this.$router.push('admin/products')
      }).catch(() => {
        this.$bus.$emit('message:push',
          '登入失敗，好糗 Σ( ° △ °|||)︴ ',
          'info')
      })
    }
  }
}
</script>
