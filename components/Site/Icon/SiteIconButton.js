import Vue from 'vue'
export default Vue.component('SiteIconButton', {
  inheritAttrs: false,
  computed: {
    tag() {
      if (this.$attrs.to) {
        return 'nuxt-link'
      } else {
        return 'button'
      }
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class:
          'bg-transparent rounded-full text-black p-1.5 flex justify-center items-center w-8 h-8 max-h-8 max-w-8 border border-black dark:text-white dark:border-white',
        on: this.$listeners,
        attrs: Object.assign({ type: 'button' }, this.$attrs),
        props: this.$props,
      },
      [
        h(
          'SiteIcon',
          {
            props: {
              icon: this.$attrs.icon,
            },
          },
          this.$slots.default
        ),
      ]
    )
  },
})
