<template>
  <component
    :is="tag"
    :href="tag === 'a' ? $attrs.href : undefined"
    :to="tag === 'nuxt-link' ? $attrs.to : undefined"
    class="py-4 px-6 border-b-2 border-opacity-50 sm:border-transparent sm:py-2 sm:px-3 text-center text-xl sm:text-sm text-black sm:text-opacity-50 font-header sm:font-sans hover:text-opacity-80 active:text-opacity-100 dark:text-white sm:dark:text-opacity-60 dark:hover:text-opacity-75 dark:active:text-opacity-100 transition hover:border-b-2 hover:border-white hover:border-opacity-80"
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
      const classes =
        'text-opacity-100 dark:text-opacity-100 sm:dark:text-opacity-100 font-semibold border-b-2 sm:border-white border-opacity-60'
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
/* Your component-specific styles here */
</style>
