<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- previous -->
      <li
        class="page-item"
        :class="{'disabled': pages.current_page === 1}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 分頁 -->
      <li
        v-for="item in pages.total_pages"
        :key="item"
        class="page-item"
        :class="{'active': item === pages.current_page}"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="emitPages(item)"
        >
          {{ item }}
        </a>
      </li>
      <!-- next -->
      <li
        class="page-item"
        :class="{'disabled': pages.current_page === pages.total_pages}"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
    }
  },
  props: {
    pages: {}
  },
  methods: {
    emitPages (item) {
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts
      this.$emit('emit-pages', item)
    }
  }
}
</script>
