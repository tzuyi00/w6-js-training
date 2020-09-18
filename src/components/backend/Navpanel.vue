<template>
<nav class="navpanel navpanel-fixed-left">
    <div class="navpanel-container navpanel-flex navpanel-light">
        <div class="navpanel-brand"></div>
        <div class="navpanel-body">
            <ul class="list-unstyled navpanel-nav">
                <li>
                  <router-link to="/admin/products" class="navpanel-link">
                    <span class="navpanel-text">產品列表</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/coupons" class="navpanel-link">
                    <span class="navpanel-text">優惠券列表</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/orders" class="navpanel-link">
                    <span class="navpanel-text">訂單列表</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/admin/storages" class="navpanel-link">
                    <span class="navpanel-text">圖片儲存列表</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/" class="navpanel-link">
                    <span class="navpanel-text">回到前台</span>
                  </router-link>
                </li>
            </ul>
        </div>
        <footer class="navpanel-footer border-top">
            <div>
                <a href="#" @click.prevent="signout">
                    <img src="@/assets/logout.svg" width="25">
                </a>
            </div>
        </footer>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Navpanel',
  data () {
    return {
    }
  },
  methods: {
    signout () {
      document.cookie = 'lizToken=;expires=;'
      this.$bus.$emit('message:push', '登出成功 (ゝ∀･)b', 'success')
      this.$router.push('/login')
    }
  }
}
</script>
