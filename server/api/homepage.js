import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const supplyResp = await client
    .from('supply')
    .select('*')
    .eq('id', 1)
    .single()

  return { supply: supplyResp.data }
})
