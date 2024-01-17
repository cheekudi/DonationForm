<template>
  <div>
    <h2>Donation Statistics</h2>
    <label for="filterType">Filter by Type:</label>
    <select id="filterType" v-model="selectedType" @change="emitFilter">
      <option value="">All</option>
      <option value="money">Money</option>
      <option value="food">Food</option>
      <option value="clothing">Clothing</option>
    </select>
    <p>Total Amount for {{ selectedType || 'All' }}: {{ totalAmount }}</p>
    <p>Total Donations for {{ selectedType || 'All' }}: {{ totalDonations }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import useDonations from '@/stores/useDonations'

export default defineComponent({
  setup(_, { emit }) {
    const { donations } = useDonations()
    const selectedType = ref('')

    const filteredDonations = computed(() => {
      return selectedType.value
        ? donations.value.filter((donation) => donation.type === selectedType.value)
        : donations.value
    })

    const totalAmount = computed(() => {
      return filteredDonations.value.reduce((sum, donation) => sum + donation.amount, 0)
    })

    const totalDonations = computed(() => filteredDonations.value.length)

    const emitFilter = () => {
      emit('filter', selectedType.value)
    }

    return {
      selectedType,
      totalAmount,
      totalDonations,
      emitFilter
    }
  }
})
</script>
