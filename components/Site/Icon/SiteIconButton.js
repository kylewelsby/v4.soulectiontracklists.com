import Vue from 'vue'
export default Vue.component('SiteIconButton', {
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
      if (this.tag === 'a') {
        return Object.assign(
          {
            rel: 'noopener',
            target: '_blank',
          },
          this.$attrs
        )
      } else if (this.tag === 'nuxt-link') {
        return Object.assign({ to: '#' }, this.$attrs)
      } else if (this.tag === 'button') {
        return Object.assign({ type: 'button' }, this.$attrs)
      } else {
        return this.$attrs
      }
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class:
          'bg-transparent rounded-full text-black flex justify-center items-center w-8 h-8 max-h-8 max-w-8 border border-black dark:text-white dark:border-white ',
        on: this.$listeners,
        attrs: this.localAttrs,
        props: this.$props,
      },
      [
        h(
          'SiteIcon',
          {
            props: {
              icon: this.$attrs.icon,
              filled: this.$attrs.filled,
            },
          },
          this.$slots.default
        ),
      ]
    )
  },
})
