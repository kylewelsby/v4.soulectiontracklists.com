<template>
  <component
    :is="tag"
    class="py-4 px-4 flex whitespace-nowrap text-sm font-light text-black text-opacity-60 dark:text-white dark:text-opacity-60 hover:text-opacity-100 dark:hover:text-opacity-100 transition"
    :class="activeClasses"
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
    tag() {
      return this.$attrs.href ? 'a' : 'nuxt-link'
    },
    localAttrs() {
      let attrs = { ...this.$attrs }
      if (this.tag === 'a') {
        attrs = { rel: 'noopener', target: '_blank', ...attrs }
      } else if (this.tag === 'nuxt-link') {
        attrs = { to: '#', ...attrs }
      }
      return attrs
    },
    activeClasses() {
      const classes = 'text-opacity-100 font-semibold opacity-90'
      let path = this.$attrs.to
      if (path) {
        if (typeof path === 'object') {
          path = path.path
        }
        if (this.$route.fullPath.startsWith(path)) {
          if (path === '/' && this.$route.fullPath !== '/') {
            return ''
          } else {
            return classes
          }
        }
      }
      return ''
    },
  },
}
</script>

<style scoped>
/* Add your component-specific CSS here */
</style>
