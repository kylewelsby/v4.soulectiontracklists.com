export default async function ({ $axios, store, redirect }) {
  const data = await $axios.$get('/api/supabase/user')
  const { user } = data
  if (user) {
    store.commit('auth/SET_USER', user)
  } else {
    return redirect('/admin/sign-in')
  }
}
