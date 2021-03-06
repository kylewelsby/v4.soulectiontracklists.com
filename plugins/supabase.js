import { createClient } from '@supabase/supabase-js'

export default ({ $config, store }, inject) => {
  const supabase = createClient($config.supabase.url, $config.supabase.anonKey)
  inject('supabase', supabase)
  supabase.auth.onAuthStateChange((event, session) => {
    store.commit('auth/SET_USER', session.user)
  })
}
