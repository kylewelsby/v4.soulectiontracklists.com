<template>
  <div class="relative antialiased text-gray-900">
    <SiteHeader />
    <slot/>
    <!-- TODO PLAYER -->
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import SiteHeader from '../components/SiteHeader'
export default {
  components: {
    SiteHeader
  }
}
</script>