<template lang="pug">
  div(
    class="container mx-auto"
  )
    form(
      @submit.prevent="signIn()"
    )
      input(
        type="email"
        v-model="email"
      )
      button(
        type="submit"
      ) Sign-in
</template>
<script>
export default {
  middleware: ['unauth'],
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async signIn() {
      const { error: err } = await this.$supabase.auth.signIn(
        {
          email: this.email,
        },
        {
          redirectTo: 'http://localhost:3000/admin/',
        }
      )
      if (!err) {
        window.alert('Please check your email for magic-link')
      } else {
        window.alert(err.message)
      }
    },
  },
}
</script>
