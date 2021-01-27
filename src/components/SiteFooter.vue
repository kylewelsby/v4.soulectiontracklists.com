<template>
  <footer class="bg-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4">
      <div class="flex">
        <div class="flex-grow">
          <SiteBrand />
        </div>
        <div class="flex-grow flex flex-col items-end">
          <g-link
            to="/donate"
            class="bg-black rounded-full text-white px-6 py-2 font-medium text-l flex flex-row"
          >
            Donate / Support
          </g-link>
        </div>
      </div>
      <div class="flex flex-row mt-3">
        <div class="flex flex-col flex-grow items-start">
          <g-link to="/episodes/" class="py-1 text-sm">All Tracklists</g-link>
          <g-link class="py-1 text-sm">Soulection Events</g-link>
          <g-link class="py-1 text-sm">Receive Email Updates</g-link>
        </div>
        <div class="flex flex-col flex-grow items-end">
          <g-link to="/tracks/" class="py-1 text-sm">All Tracks Played</g-link>
          <g-link class="py-1 text-sm">Contact</g-link>
        </div>
      </div>
      <p class="mt-6 text-gray-500 text-sm">
        Soulection Tracklists is developed and maintained with love by <a href="https://mekyle.com" class="underline">Kyle Welsby</a>
and is not affiliated with <a href="https://soulection.com" class="underline">Soulection LLC</a>, or any of the linked music services.
      </p>
    </div>
  </footer>
</template>
<script>
import SiteBrand from "@/components/SiteBrand.vue";
export default {
  components: {
    SiteBrand
  }
};
</script>
