<template>
  <div class="relative antialiased text-gray-900">
    <SiteHeader />
    <slot/>
    <!-- TODO PLAYER -->
    <SiteFooter />
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
import SiteFooter from '@/components/SiteFooter'
export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>