export default async function ({ $axios, redirect }) {
  const { data } = await $axios.get('/api/supabase/user')
  if (data.user) {
    redirect('/admin/')
  }
}
