<template>
  <div class="container-fluid bg-main-bg" style="width: 100vw; height: 100vh;">
    <!-- <div class="text-center">
      <img src="{{ asset('images/logo_new.svg') }}" width="170" alt="logo" class="mb-3">
      <h1 class="h5 pb-2 mb-4">{{ $title }}</h1>
    </div> -->
    <div class="d-flex justify-content-center">
      <div class="card" style="margin-top: 8rem;">
        <div class="card-body">
          <h1 class="h5 pb-2"> <strong>後台登入</strong> </h1>
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
                <button type="submit" class="btn btn-block btn-outline-primary w-75 mx-auto mt-4">登入</button>
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
      },
      token: ''
    }
  },
  methods: {
    // 登入
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}auth/login`

      //   post將輸入的user資料送出
      this.$http.post(api, this.user).then((response) => {
        console.log(response)
        const { token } = response.data
        const { expired } = response.data

        // 將資料存入cookie
        document.cookie = `lizToken=${token}; expires=${new Date(expired * 1000)};`

        this.$bus.$emit('message:push', '登入成功 ヾ(●゜▽゜●)♡', 'success')

        this.$router.push('admin/products')
      }).catch((error) => {
        this.$bus.$emit('message:push',
          '登入失敗，好糗 Σ( ° △ °|||)︴ ',
          'danger')
        console.log(error.response)
      })
    }
  }
}
</script>
