<template>
  <component
    :is="localTag"
    :href="localTag === 'a' ? $attrs.href : undefined"
    :to="localTag === 'nuxt-link' ? $attrs.to : undefined"
    class="site-button bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 transition rounded-full text-white px-6 py-2 font-medium text-sm flex flex-row justify-center items-center"
    v-bind="localAttrs"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  inheritAttrs: false,
  computed: {
    localTag() {
      if (this.$attrs.href) {
        return 'a'
      } else if (this.$attrs.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    },
    localAttrs() {
      const baseAttrs = { ...this.$attrs }
      if (this.localTag === 'a') {
        return { rel: 'noopener', target: '_blank', ...baseAttrs }
      } else if (this.localTag === 'nuxt-link') {
        return { to: '#', ...baseAttrs }
      }
      return baseAttrs
    },
  },
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
