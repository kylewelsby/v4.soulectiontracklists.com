<template lang="pug">
  div(
    class="absolute top-full transform scale-0"
  )
    iframe(
      ref="soundcloudWidget"
      scrolling="no"
      style="border: 0;"
      allow="autoplay"
      title="SoundCloud Player"
      width="100"
      height="100"
      :src="soundcloudIframeSrc"
    )
</template>
<script>
export default {
  computed: {
    soundcloudUrl() {
      return this.$store.state.player.soundcloud
    },
    soundcloudIframeSrc() {
      if (this.soundcloudUrl === null) {
        return 'about:blank'
      }
      const url = new URL('https://w.soundcloud.com/player/')
      url.searchParams.append('url', this.soundcloudUrl)
      url.searchParams.append('auto_play', true)
      url.searchParams.append('buying', false)
      url.searchParams.append('download', false)
      url.searchParams.append('hide_related', true)
      url.searchParams.append('sharing', false)
      url.searchParams.append('show_artwork', false)
      url.searchParams.append('show_comments', false)
      url.searchParams.append('show_playcount', false)
      url.searchParams.append('show_reposts', false)
      url.searchParams.append('show_teaser', false)
      url.searchParams.append('show_user', true)
      return url.href
    },
  },
  mounted() {
    window.addEventListener('message', this.onMessage)
    this.unsubscribeSeekTo = this.$store.subscribeAction((action) => {
      if (action.type === 'player/seekTo') {
        this.sendMessage('seekTo', action.payload)
      }
    })
    this.unsubscribeToggle = this.$store.subscribeAction((action) => {
      if (action.type === 'player/toggle') {
        this.sendMessage('toggle')
      }
    })
  },
  beforeDestroy() {
    this.unsubscribeSeekTo()
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    onMessage(event) {
      if (event.origin.endsWith('w.soundcloud.com')) {
        const data = JSON.parse(event.data)
        if (data.method === 'ready') this.handleReady()
        if (data.method === 'playProgress') this.handleProgress(data.value)
        if (data.method === 'play') this.handlePlaying()
        if (data.method === 'pause') this.handlePaused()
        if (data.method === 'finish') this.handleFinished()
        if (data.method === 'seek') this.handleSeeked(data.value)
      }
    },
    handleReady() {
      this.$store.commit('player/SET_READY')
      this.sendMessage('addEventListener', 'playProgress')
      this.sendMessage('addEventListener', 'play')
      this.sendMessage('addEventListener', 'pause')
      this.sendMessage('addEventListener', 'finish')
      this.sendMessage('addEventListener', 'seek')
      this.sendMessage('play')
    },
    handleProgress(data) {
      this.$store.dispatch('player/updateProgress', data)
    },
    handlePlaying() {
      this.$store.commit('player/SET_PLAYING')
    },
    handlePaused() {
      this.$store.commit('player/SET_PAUSED')
    },
    handleFinished() {
      this.$store.commit('player/SET_FINISHED')
    },
    handleSeeked(data) {
      console.log(data)
      this.$store.dispatch('player/updateProgress', data)
    },
    sendMessage(method, value) {
      this.$refs.soundcloudWidget.contentWindow.postMessage(
        JSON.stringify({ method, value }),
        'https://w.soundcloud.com'
      )
    },
  },
}
</script>
