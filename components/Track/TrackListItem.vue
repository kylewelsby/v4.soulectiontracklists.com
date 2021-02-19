<template lang="pug">
  div {{ track }}
</template>
<script>
export default {
  props: {
    track: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>
