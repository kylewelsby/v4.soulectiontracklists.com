<template lang="pug">
  div
    nuxt-link(
      :to="{path: `${path}${1}`}"
      class="px-2 py-1 mx-1"
    ) «
    nuxt-link(
      :to="{path: `${path}${prevPage}`}"
      class="px-2 py-1 mx-1 inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
    ) ‹

    nuxt-link(
      :to="{path: `${path}${nextPage}`}"
      class="px-2 py-1 mx-1 inline-flex flex-row items-center justify-center rounded-full text-black bg-white border-2 border-current w-8 h-8"
    ) ›
    nuxt-link(
      :to="{path: `${path}${totalPages}`}"
      class="px-2 py-1 mx-1"
    ) »
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
      default: '/',
    },
    perPage: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    totalPages() {
      return Math.floor(this.total / this.perPage)
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    },
  },
}
</script>
