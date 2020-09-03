<template>
  <div>
    <Nav/>
    <router-view></router-view>
    <footer class="container-fluid">
      <div class="row contactUs">
        <div class="contactTxt col-12 col-md-5">
          <div class="contactDetail ml-auto">
            <h2 class="title">Contact Us</h2>
            <div class="line"></div>
            <p class="mt-4">
              感謝您對 HomeTown 的支持與愛護，如有任何問題或商品合作洽談，
              歡迎提出意見及回饋，我們將用心聆聽，並以最快速度回應，為您提供更好的服務。
            </p>
          </div>

          <form class="contactForm shadow p-3 p-md-5">
            <div class="form-group">
              <input type="text" class="form-control" id placeholder="Name 姓名" />
            </div>
            <div class="form-group">
              <input type="tel" class="form-control" id placeholder="Phone 電話" />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" id placeholder="Email 信箱" />
            </div>
            <div class="form-group">
              <textarea class="form-control" id rows="3" placeholder="Message 訊息"></textarea>
            </div>
            <div class="form-group text-right">
              <div type="button" class="btn btn-info mx-auto">送出</div>
            </div>
          </form>
        </div>
        <div
          class="contactImg d-none d-md-block col-md-7"
          :style="{backgroundImage: `url(${img.office})` }"
        ></div>
      </div>
      <div class="container underLine py-2 text-center">
        HomeTown Designed by Liz.Lin ⓒ 2020 All Right Reserved. ｜僅個人作品練習，無商業用途
        <router-link to="/login">
          <i class="fas fa-user-cog"></i>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'

export default {
  name: 'Layout',
  components: {
    Nav
  },
  data () {
    return {
      img: {
        office:
          'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/ToGrp5oKeNiOvFn60NseexL3mdxLc6HTYC77Oqu6dAr4QXzwdOKXvDzW7biyZkTHAc4WT4ea0mI8ESiUPJbOfCm7HwQpc42bOhdKVw5ugihTgwef0jMH896ixy1S9l4U.jpg'
      }
    }
  }
}
</script>
