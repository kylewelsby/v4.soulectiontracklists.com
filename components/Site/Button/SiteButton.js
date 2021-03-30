import Vue from 'vue'
export default Vue.component('SiteButton', {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    localTag() {
      if (this.$attrs.href) {
        return 'a'
      } else {
        return this.tag
      }
    },
    localAttrs() {
      if (this.localTag === 'a') {
        return Object.assign(
          {
            rel: 'noopener',
            target: '_blank',
          },
          this.$attrs
        )
      } else if (this.tag === 'nuxt-link') {
        return Object.assign({ to: '#' }, this.$attrs)
      } else {
        return this.$attrs
      }
    },
  },
  render(h) {
    return h(
      this.localTag,
      {
        class:
          'site-button bg-black rounded-full text-white px-6 py-2 font-medium text-sm flex flex-row justify-center items-center',
        props: Object.assign(this.localAttrs, this.$props),
        attrs: this.localAttrs,
      },
      this.$slots.default
    )
  },
})
