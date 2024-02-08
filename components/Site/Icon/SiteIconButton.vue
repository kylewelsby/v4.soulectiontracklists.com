<template>
  <component
    :is="tag"
    class="bg-transparent rounded-full text-black flex justify-center items-center w-8 h-8 max-h-8 max-w-8 border border-black dark:text-white dark:border-white"
    v-bind="localAttrs"
    v-on="$listeners"
  >
    <SiteIcon :icon="$attrs.icon" :filled="$attrs.filled" />
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  computed: {
    tag() {
      if (this.$attrs.href) {
        return 'a'
      } else if (this.$attrs.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    },
    localAttrs() {
      let baseAttrs = { ...this.$attrs }
      if (this.tag === 'a') {
        baseAttrs = { rel: 'noopener', target: '_blank', ...baseAttrs }
      } else if (this.tag === 'nuxt-link') {
        baseAttrs = { to: '#', ...baseAttrs }
      } else if (this.tag === 'button') {
        baseAttrs = { type: 'button', ...baseAttrs }
      }
      return baseAttrs
    },
  },
}
</script>

<style scoped>
/* Your component-specific styles here */
</style>
