<template lang="pug">
  svg(
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
  )
    path(
      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="d"
    )
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    d() {
      if (this.icon === 'search') {
        return 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      }
      if (this.icon === 'share') {
        return 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
      }
      if (this.icon === 'arrow-right') {
        return 'M14 5l7 7m0 0l-7 7m7-7H3'
      }
      if (this.icon === 'arrow-left') {
        return 'M10 19l-7-7m0 0l7-7m-7 7h18'
      }
      if (this.icon === 'arrow-down') {
        return 'M19 14l-7 7m0 0l-7-7m7 7V3'
      }
      if (this.icon === 'menu') {
        return 'M4 6h16M4 12h16M4 18h16'
      }
      if (this.icon === 'chevron-down') {
        return 'M19 9l-7 7-7-7'
      }
      if (this.icon === 'chevron-up') {
        return 'M5 15l7-7 7 7'
      }
      if (this.icon === 'badge-check') {
        return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
      }
      return ''
    },
  },
}
</script>
