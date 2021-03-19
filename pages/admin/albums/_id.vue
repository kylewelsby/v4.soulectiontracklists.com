<template lang="pug">
  div(
    class="py-8"
  )
    div(
      class="px-4 sm:px-6 md:px-0 sm:flex sm:items-center sm:justify-between"
    )
      h1(
        class="text-2xl font-semibold text-gray-900"
      ) Edit {{ data.title }}
    div(
      class="px-4 sm:px-6 md:px-0"
    )
      div(
        class="py-4"
      )
        AdminAlbumsForm(
          @submit="onSubmit()"
          @cancel="$router.push('/admin/albums/')"
          :value="data"
        )
</template>
<script>
export default {
  layout: 'admin',
  middleware: ['auth'],
  async asyncData({ $supabase, params, error }) {
    const { data, error: err } = await $supabase
      .from('albums')
      .select('*')
      .eq('id', params.id)
      .single()
    if (err) {
      error({ statusCode: 500, err })
    }
    return { data }
  },
  methods: {
    async onSubmit() {
      const resp = await this.$supabase.from('albums').update(this.data).match({
        id: this.data.id,
      })
      if (resp.status !== 200) {
        window.alert(resp.error)
        return
      }
      this.$router.push({
        path: '/admin/albums/',
      })
    },
  },
}
</script>
