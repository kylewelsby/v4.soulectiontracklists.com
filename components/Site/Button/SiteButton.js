import Vue from 'vue'
export default Vue.component('SiteButton', {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  render(h) {
    return h(
      this.$props.tag,
      {
        class:
          'bg-black rounded-full text-white px-6 py-2 font-medium text-sm flex flex-row justify-center items-center',
        props: {
          to: this.$props.to || this.$attrs.to || {},
        },
      },
      this.$slots.default
    )
  },
})
