<template lang="pug">
  div(
    class="container mx-auto"
  )
    | Posts Page
    nuxt-link(
      to="/admin/posts/new/"
    ) New Post
    table(

    )
      tr(
        v-for="post of data"
      )
        td {{ post.published_at | formatDate }}
        th {{ post.title }}
        td
          nuxt-link(
            :to="`/admin/posts/${post.id}/`"
          ) Edit
</template>
<script>
export default {
  filters: {
    formatDate(value) {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
      }).format(Date.parse(value))
    },
  },
  middleware: ['auth'],
  async asyncData({ $supabase, error }) {
    const { data } = await $supabase
      .from('posts')
      .select('*')
      .eq('profile', 1)
      .order('published_at', { ascending: false })
    return {
      data,
    }
  },
}
</script>
