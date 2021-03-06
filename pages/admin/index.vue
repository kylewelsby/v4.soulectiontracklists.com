<template lang="pug">
  div(
    class="container mx-auto"
  )
    div(
      v-if="signedIn"
    )
      ul
        li
          nuxt-link(
            to="/admin/posts/"
          ) Posts

    form(
      v-else
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
  data() {
    return {
      email: '',
    }
  },
  computed: {
    currentUser() {
      return this.$supabase.auth.user()
    },
    signedIn() {
      return !!this.currentUser
    },
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
