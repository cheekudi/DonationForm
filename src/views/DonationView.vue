<template>
  <div class="donation-view">
    <h1>Happy Tails Animal Shelter - Donation Management</h1>
    <DonationForm :initialDonation="currentDonation" @save="handleSave" />
    <DonationStats :donations="filteredDonations" @filter="handleFilter" />
    <DonationList
      :donations="filteredDonations"
      @edit-donation="handleEdit"
      @delete-donation="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import DonationForm from '@/components/DonationForm.vue'
import DonationList from '@/components/DonationList.vue'
import DonationStats from '@/components/DonationStats.vue'
import useDonations from '@/stores/useDonations'

interface Donation {
  id: number
  donorName: string
  type: string
  amount: number
  date: string
}

export default defineComponent({
  components: {
    DonationForm,
    DonationList,
    DonationStats
  },
  setup() {
    const { donations, addDonation, editDonation, deleteDonation } = useDonations()
    const defaultDonation = {
      donorName: '',
      id: 0,
      type: 'money',
      amount: 0,
      date: new Date().toISOString().substring(0, 10)
    }
    const currentDonation = ref<Donation>({ ...defaultDonation })
    const currentFilter = ref('')

    const handleSave = (donation: Donation) => {
      if (currentDonation.value && currentDonation.value.id) {
        editDonation(donation)
      } else {
        addDonation(donation)
      }
      currentDonation.value = defaultDonation // Reset the form
    }

    const handleEdit = (donation: Donation) => {
      currentDonation.value = donation // Set the form for editing

      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }

    const handleDelete = (id: number) => {
      deleteDonation(id)
    }

    const handleFilter = (type: string) => {
      currentFilter.value = type
    }

    const filteredDonations = computed(() => {
      return currentFilter.value
        ? donations.value.filter((donation) => donation.type === currentFilter.value)
        : donations.value
    })

    return {
      donations,
      currentDonation,
      filteredDonations,
      handleSave,
      handleEdit,
      handleDelete,
      handleFilter
    }
  }
})
</script>

<style scoped>
.donation-view {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
