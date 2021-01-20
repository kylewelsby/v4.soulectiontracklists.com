<template>
  <div
    class="episode__tracklist bg-black text-white flex flex-col items-center"
  >
    <div class="w-full md:w-10/12 p-4">
      <Chapter
        v-for="chapter in episode.chapters"
        :key="chapter.id"
        :chapter="chapter"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import Chapter from "@/components/Chapter";
export default defineComponent({
  components: {
    Chapter
  },
  props: {
    episode: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  setup() {}
});
</script>
