<template>
  <header
    class="flex flex-row flex-wrap items-center justify-between py-2 px-4"
  >
    <a
      href="/"
      class="lg:w-1/5 flex flex-row items-center font-semibold order-1"
    >
      <SoulectionIcon class="w-12 mr-2" />
      <span>Tracklists</span>
    </a>
    <div
      class="flex lg:flex-row flex-col items-stretch lg:items-center w-full order-3 lg:w-3/5 lg:order-2 lg:static fixed inset-0 lg:h-auto h-screen lg:bg-transparent bg-black bg-opacity-75 z-50 justify-end lg:text-black text-white transition duration-150 ease-in-out"
      :class="{ 'hidden lg:flex': hideMenu }"
      @click="hideMenu = true"
    >
      <nuxt-link class="lg:w-1/3 p-2 text-center" to="/episodes">
        All Tracklists
      </nuxt-link>
      <nuxt-link class="lg:w-1/3 p-2 text-center" to="/tracks">
        All Tracks Played
      </nuxt-link>
      <nuxt-link class="lg:w-1/3 p-2 text-center" to="/donate">
        Donate / Support
      </nuxt-link>
      <div class="flex flex-col items-center my-4 lg:hidden">
        <span class="bg-white text-black rounded-full p-2 my-2">
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <span>Close</span>
      </div>
    </div>
    <div class="lg:w-1/5 flex flex-row justify-end order-2 lg:order-3">
      <div class="relative flex items-center">
        <div
          class="static lg:absolute inset-y-0 left-0 py-3 px-2 flex items-center bg-opacity-75 z-40 lg:pointer-events-none"
          @click="toggleSearch()"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="w-full fixed z-50 lg:z-auto inset-0 h-screen bg-opacity-75 bg-black p-4 flex flex-col items-center lg:p-0 lg:static lg:bg-transparent lg:h-auto"
          :class="{ 'hidden lg:block': hideSearch }"
          @click="toggleSearch()"
        >
          <input
            ref="search"
            type="search"
            placeholder="Search"
            class="w-full appearance-none rounded-full bg-gray-100 py-2 px-3 lg:pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            @click.stop=""
          />
        </div>
      </div>
      <button
        class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none transition duration-150 ease-in-out"
        aria-label="Main menu"
        aria-expanded="false"
        @click="toggleMenu()"
      >
        <!-- Icon when menu is closed. -->
        <!-- Menu open: "hidden", Menu closed: "block" -->
        <svg
          class="block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
<script>
import SoulectionIcon from '~/assets/images/soulection-icon.svg?inline'
export default {
  components: {
    SoulectionIcon,
  },
  data() {
    return {
      hideMenu: true,
      hideSearch: true,
    }
  },
  methods: {
    toggleMenu() {
      if (!this.hideSearch) this.hideSearch = true
      this.hideMenu = !this.hideMenu
    },
    toggleSearch() {
      if (!this.hideMenu) this.hideMenu = true
      this.hideSearch = !this.hideSearch
      if (!this.hideSearch) {
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      }
    },
  },
}
</script>
