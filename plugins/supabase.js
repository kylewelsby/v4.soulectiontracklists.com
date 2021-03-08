import { createClient } from '@supabase/supabase-js'

export default ({ $config, $axios, store }, inject) => {
  const supabase = createClient($config.supabase.url, $config.supabase.anonKey)
  inject('supabase', supabase)
  supabase.auth.onAuthStateChange((event, session) => {
    $axios.$post('/api/supabase/auth', {
      event,
      session,
    })
    store.commit('auth/SET_USER', session.user)
  })
}
