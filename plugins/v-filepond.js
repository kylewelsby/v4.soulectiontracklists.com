import Vue from 'vue'
import vueFilePond, { setOptions } from 'vue-filepond'
// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'

// Import styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)
setOptions({
  credits: false,
  server: {
    url: '/api/upload',
    process: {
      url: '/',
      method: 'POST',
      credentials: 'same-origin',
      withCredentials: true,
      timeout: 7000,
    },
  },
})

Vue.component('FilePond', FilePond)
