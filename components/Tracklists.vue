<template>
  <div class="bg-black text-white flex flex-col items-center">
    <div class="w-full md:w-10/12 p-4 py-8 flex flex-col">
      <div class="flex flex-row items-end leading-none mb-4">
        <h2 class="flex-grow text-4xl">All Tracklists</h2>
        <span>Filter</span>
      </div>
      <div class="flex flex-row">
        <div class="w-2/12">
          <h4 class="text-lg font-bold">Type</h4>
          <ul class="mb-4">
            <li>
              <label>
                <input
                  v-model="typeOfEpisode.all"
                  type="checkbox"
                  @click="uncheckOthers(typeOfEpisode)"
                />
                All ({{ episodes.length }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.solo" type="checkbox" />
                Solo Joe Kay ({{ soloCount }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.takeover" type="checkbox" />
                Takeovers ({{ takeoverCount }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.interview" type="checkbox" />
                Interviews ({{ interviewCount }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.guest" type="checkbox" />
                Guest Appearance ({{ guestAppearanceCount }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.international" type="checkbox" />
                International shows ({{ internationalCount }})
              </label>
            </li>
            <li>
              <label>
                <input v-model="typeOfEpisode.peopleChoice" type="checkbox" />
                The People's Choice ({{ peopleChoiceCount }})
              </label>
            </li>
            <li>
              <label>
                <input
                  v-model="typeOfEpisode.missingTracklist"
                  type="checkbox"
                />
                Missing Tracklist ({{ missingTracklistCount }})
              </label>
            </li>
          </ul>
          <h4 class="text-lg font-bold">Services</h4>
          <ul class="mb-4">
            <li>
              <lable>
                <input
                  v-model="serviceOfEpisode.all"
                  type="checkbox"
                  @click="uncheckOthers(serviceOfEpisode)"
                />
                All
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="serviceOfEpisode.appleMusic" type="checkbox" />
                Apple Music
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="serviceOfEpisode.soundcloud" type="checkbox" />
                SoundCloud
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="serviceOfEpisode.mixcloud" type="checkbox" />
                Mixcloud
              </lable>
            </li>
          </ul>
          <h4 class="text-lg font-bold">Broadcast Station</h4>
          <ul class="mb-4">
            <li>
              <lable>
                <input
                  v-model="stationOfEpisode.all"
                  type="checkbox"
                  @click="uncheckOthers(stationOfEpisode)"
                />
                All
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="stationOfEpisode.appleMusic" type="checkbox" />
                Apple Music
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="stationOfEpisode.redbull" type="checkbox" />
                Redbull Studios
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="stationOfEpisode.rinsefm" type="checkbox" />
                Rinse.fm
              </lable>
            </li>
            <li>
              <lable>
                <input v-model="stationOfEpisode.kbeach" type="checkbox" />
                K-Beach
              </lable>
            </li>
          </ul>
        </div>
        <div class="w-10/12">
          <Tracklist
            v-for="episode of filteredEpisodes"
            :key="episode.episode"
            :episode="episode"
            class="mb-8"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tracklist from './Tracklist'

function isTakeoverEpisode(e) {
  return e.takeover === true
}

function isInterviewEpisode(e) {
  if (e.sessions) {
    return e.sessions.some((s) => /interview/gi.test(s.name))
  } else {
    return false
  }
}

function isGuestAppeanceEpisode(e) {
  return /\sw\s?\//gi.test(e.title)
}

function isPeoplesChoiceEpisode(e) {
  return e.peopleChoice === true || /the people's choice/gi.test(e.title)
}

function isMissingTracklistEpisode(e) {
  if (e.sessions) {
    return (
      e.sessions.length === 0 || e.sessions.some((s) => s.tracks.length === 0)
    )
  } else {
    return true
  }
}

function isInternationalEpisode(e) {
  return (e.location && e.location !== 'US') || /live from/gi.test(e.title)
}

function isSoloEpisode(e) {
  return (
    !isPeoplesChoiceEpisode(e) &&
    !isGuestAppeanceEpisode(e) &&
    !isInternationalEpisode(e) &&
    !isTakeoverEpisode(e) &&
    e.sessions.length <= 1
  )
}

function isBroadcastOn(e, service) {
  if (service === 'appleMusic') {
    return e.beats1 && e.beats1.length > 0
  } else {
    return e[service] && e[service].length > 0
  }
}

function isStation(e, station) {
  if (station === 'appleMusic') {
    return e.station === station || e.station === 'beats1'
  }
  return e.station === station
}

export default {
  components: {
    Tracklist,
  },
  props: {
    episodes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      typeOfEpisode: {
        all: true,
        takeover: false,
        interview: false,
        guest: false,
        missingTracklist: false,
      },
      serviceOfEpisode: {
        all: true,
        appleMusic: false,
        soundcloud: false,
        mixcloud: false,
      },
      stationOfEpisode: {
        all: true,
        appleMusic: false,
        redbull: false,
        rinsefm: false,
        kbeach: false,
        other: false,
      },
    }
  },
  computed: {
    filteredEpisodes() {
      let filtered = this.episodes
      if (this.typeOfEpisode.takeover) {
        filtered = filtered.filter(isTakeoverEpisode)
      }
      if (this.typeOfEpisode.interview) {
        filtered = filtered.filter(isInterviewEpisode)
      }
      if (this.typeOfEpisode.guest) {
        filtered = filtered.filter(isGuestAppeanceEpisode)
      }
      if (this.typeOfEpisode.peopleChoice) {
        filtered = filtered.filter(isPeoplesChoiceEpisode)
      }
      if (this.typeOfEpisode.missingTracklist) {
        filtered = filtered.filter(isMissingTracklistEpisode)
      }
      if (this.typeOfEpisode.international) {
        filtered = filtered.filter(isInternationalEpisode)
      }
      if (this.typeOfEpisode.solo) {
        filtered = filtered.filter(isSoloEpisode)
      }

      Object.keys(this.serviceOfEpisode).forEach((key) => {
        if (key !== 'all' && this.serviceOfEpisode[key]) {
          filtered = filtered.filter((e) => isBroadcastOn(e, key))
        }
      })

      Object.keys(this.stationOfEpisode).forEach((key) => {
        if (key !== 'all' && this.stationOfEpisode[key]) {
          filtered = filtered.filter((e) => isStation(e, key))
        }
      })

      return filtered.sort((a, b) => {
        if (a.date < b.date) return 1
        if (a.date > b.date) return -1
        return 0
      })
    },

    takeoverCount() {
      return this.episodes.filter(isTakeoverEpisode).length
    },
    interviewCount() {
      return this.episodes.filter(isInterviewEpisode).length
    },
    guestAppearanceCount() {
      return this.episodes.filter(isGuestAppeanceEpisode).length
    },
    peopleChoiceCount() {
      return this.episodes.filter(isPeoplesChoiceEpisode).length
    },
    missingTracklistCount() {
      return this.episodes.filter(isMissingTracklistEpisode).length
    },
    internationalCount() {
      return this.episodes.filter(isInternationalEpisode).length
    },
    soloCount() {
      return this.episodes.filter(isSoloEpisode).length
    },
  },
  watch: {
    typeOfEpisode: {
      handler(obj) {
        for (const [key, value] of Object.entries(obj)) {
          if (key !== 'all' && value) {
            obj.all = false
          }
        }
        if (Object.values(obj).every((v) => v === false)) {
          obj.all = true
        }
      },
      deep: true,
    },
    serviceOfEpisode: {
      handler(obj) {
        for (const [key, value] of Object.entries(obj)) {
          if (key !== 'all' && value) {
            obj.all = false
          }
        }
        if (Object.values(obj).every((v) => v === false)) {
          obj.all = true
        }
      },
      deep: true,
    },
    stationOfEpisode: {
      handler(obj) {
        for (const [key, value] of Object.entries(obj)) {
          if (key !== 'all' && value) {
            obj.all = false
          }
        }
        if (Object.values(obj).every((v) => v === false)) {
          obj.all = true
        }
      },
      deep: true,
    },
  },
  methods: {
    uncheckOthers(obj) {
      Object.keys(obj).forEach((key) => {
        if (key !== 'all') {
          obj[key] = false
        }
      })
      obj.all = true
    },
  },
}
</script>
