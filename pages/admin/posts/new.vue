<template lang="pug">
  div(
    class="container mx-auto"
  )
    | New Post
    AdminPostsForm(
      @submit="onSubmit()"
      @cancel="$router.push('/admin/posts/')"
      :value="data"
    )
</template>
<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      data: {
        title: null,
        published_at: null,
        artwork: null,
        href: null,
      },
    }
  },
  methods: {
    async onSubmit() {
      const resp = await this.$supabase.from('posts').insert([
        Object.assign(
          {
            profile: 1,
          },
          this.data
        ),
      ])
      if (resp.status !== 201) {
        window.alert(`Error happened:\n\n${resp.error.message}`)
        return
      }
      this.$router.push({
        path: '/admin/posts/',
      })
    },
  },
}
</script>
