<template lang="pug">
  client-only
    div(
      class="sm:col-span-4"
    )
      FilePond(
        label-idle="Drop artwork here…"
        accepted-file-types="image/jpeg, image/png"
        name="test"
        ref="pond"
        allow-multiple="false"
        :files="files"
        :init="handleFilePondInit"
      )
</template>
<script>
export default {
  data() {
    return {
      files: [],
    }
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized')
      this.$refs.pond.getFiles()
    },
  },
}
</script>
