<template lang="pug">
  div(
    class="container mx-auto"
  )
    div(
    )
      ul
        li
          nuxt-link(
            to="/admin/posts/"
          ) Posts
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
}
</script>
