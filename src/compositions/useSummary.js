export default function useSummary({ $i18n }, chapters = []) {
  const options = {
    markers: chapters.reduce((sum, chapter) => {
      return sum + chapter.markers.length
    }, 0),
    chapters: chapters.length,
    hasInterview: chapters.some((chapter) =>
      (chapter.name || '').includes('Interview')
    ),
  }
  let key = 'episode.singleChapter'
  if (options.chapters > 1) {
    key = 'episode.multiChapters'
  }
  if (options.hasInterview) {
    key = key + 'WithInterview'
  }
  return $i18n.t(key, options)
}
