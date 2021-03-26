export default async function useFilteredShows(
  { $supabase, $config },
  type,
  page
) {
  const { error: tagsErr, data: tags } = await $supabase
    .from('tags')
    .select('id, name')
    .in('name', $config.tagNames)

  const { count: totalCount } = await $supabase
    .from('shows')
    .select('*', { head: true, count: 'exact' })
    .eq('profile', $config.profileId)
    .eq('state', 'published')

  const tagsWithCounts = {}
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i]
    const { count } = await $supabase
      .from('shows')
      .select('*', { head: true, count: 'exact' })
      .eq('profile', $config.profileId)
      .eq('state', 'published')
      .ov('tags', [tag.id])
    tagsWithCounts[tag.name] = count
  }

  let countQuery = $supabase
    .from('shows')
    .select('*', { head: true, count: 'exact' })
    .eq('profile', 1)
    .eq('state', 'published')

  if (type) {
    const tag = tags.find((t) => t.name === type)
    if (tag) {
      countQuery = countQuery.ov('tags', [tag.id])
    }
  }

  const { count } = await countQuery

  let query = $supabase
    .from('shows')
    .select(
      'id,title,slug,artwork,content,tags,published_at,links,chapters(title, markers(id))'
    )
    .eq('profile', $config.profileId)
    .eq('state', 'published')
    .order('published_at', { ascending: false })

  if (type) {
    const tag = tags.find((t) => t.name === type)
    if (tag) {
      query = query.ov('tags', [tag.id])
    }
  }
  page = page - 1 || 0
  if (page <= 0) {
    page = 0
  }
  const rangeStart = $config.paginate * page
  const rangeEnd = rangeStart + $config.paginate

  const { error: err, data } = await query.range(rangeStart, rangeEnd - 1)

  return {
    error: err || tagsErr,
    shows: data,
    tagsWithCounts,
    totalCount,
    count,
  }
}
