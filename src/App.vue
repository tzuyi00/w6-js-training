<template>
  <div id="app">
    <Toast />
    <router-view/>
  </div>
</template>

<script>
import Toast from '@/components/Toasts.vue'

export default {
  name: 'App',
  components: {
    Toast
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main';
</style>
