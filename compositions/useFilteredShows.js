export default async function useFilteredShows(
  { $staticData, $config },
  type,
  page
) {
  const tagsJson = await $staticData('data/tags.json')
  const tags = tagsJson.tags || []
  const tagsWithCounts = tagsJson.tagsWithCounts || []

  // Load shows: either filtered by tag type or all
  let tagData
  if (type) {
    tagData = await $staticData(`data/shows-by-tag/${type}.json`)
  } else {
    tagData = await $staticData('data/shows-by-tag/_all.json')
  }

  const allShows = tagData.shows || []
  const totalCount = tagData.totalCount || allShows.length
  const count = tagData.count || allShows.length

  // Client-side pagination
  const paginate = $config.paginate || 50
  page = page - 1 || 0
  if (page < 0) page = 0
  const rangeStart = paginate * page
  const rangeEnd = rangeStart + paginate
  const shows = allShows.slice(rangeStart, rangeEnd)

  return {
    error: null,
    shows,
    tagsWithCounts,
    totalCount,
    count,
  }
}
