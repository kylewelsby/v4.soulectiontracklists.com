export default async function ({ store, redirect }) {
  if (!process.server) {
    const data = await fetch('/api/supabase/user', {
      credentials: 'include',
    }).then((resp) => resp.json)
    const { user } = data
    if (user) {
      store.commit('auth/SET_USER', user)
    } else {
      return redirect('/admin/sign-in')
    }
  }
}
