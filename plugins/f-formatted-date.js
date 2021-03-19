import Vue from 'vue'
Vue.filter('formattedDate', (value) => {
  if (value) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(Date.parse(value))
  } else {
    return 'INVALID DATE'
  }
})
