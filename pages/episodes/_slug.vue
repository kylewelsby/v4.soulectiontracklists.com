<template>
  <div v-if="document" class="bg-white flex flex-col items-stretch">
    <EpisodeHero :document="document" />
    <EpisodeTracklist :document="document" />
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  useStatic,
  computed,
  useMeta,
  ref,
} from '@nuxtjs/composition-api'
import { useSummary } from '@/compositions/Episodes'
import EpisodeHero from '@/components/Episodes/EpisodeHero'
import EpisodeTracklist from '@/components/Episodes/EpisodeTracklist'

export default defineComponent({
  components: {
    EpisodeHero,
    EpisodeTracklist,
  },
  setup(_props, { emit, root }) {
    const { $content, params } = useContext()
    const summary = ref('')
    const slug = computed(() => params.value.slug)
    const { title, meta } = useMeta()
    const document = useStatic(
      async (slug) => {
        const data = await $content('episodes', slug).fetch()
        title.value = data.title
        meta.value = [
          {
            hid: 'description',
            name: 'description',
            content: data.description || data.excerpt,
          },
        ]
        summary.value = useSummary({ $i18n: root.$i18n }, data.sessions)
        return data
      },
      slug,
      'episode'
    )
    return {
      document,
      summary,
    }
  },
  head: {},
})
</script>
