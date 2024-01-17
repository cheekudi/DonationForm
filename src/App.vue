<template>
  <div id="app">
    <DonationView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DonationView from './views/DonationView.vue'

export default defineComponent({
  name: 'App',
  components: {
    DonationView
  }
})
</script>
