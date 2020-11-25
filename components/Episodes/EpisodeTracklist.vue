<template>
  <div class="bg-black text-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4">
      <EpisodeSession
        v-for="(session, index) in sessions"
        :key="index"
        :session="session"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import EpisodeSession from '@/components/Episodes/EpisodeSession'
export default defineComponent({
  components: {
    EpisodeSession,
  },
  props: {
    document: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const page = props.document
    const sessions = computed(() => page.sessions)

    return {
      page,
      sessions,
    }
  },
})
</script>
