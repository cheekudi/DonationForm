/*
This file sets up a basic store using Vue's Composition API. It includes functions for adding, editing,\
 and deleting donations, as well as computed properties for calculating total donations and total amount. 
 The watch function is used to sync the donations array with local storage, ensuring data persistence.
*/
import { ref, computed, watch } from 'vue'

interface Donation {
  id: number
  donorName: string
  type: string
  amount: number
  date: string
}

// Reactive state to hold donations
const donations = ref<Donation[]>(JSON.parse(localStorage.getItem('donations') || '[]'))

// Watcher to keep local storage in sync with the donations array
watch(
  donations,
  (newDonations) => {
    localStorage.setItem('donations', JSON.stringify(newDonations))
  },
  { deep: true }
)

// Function to add a new donation
const addDonation = (donation: Donation) => {
  donations.value.push({ ...donation, id: Date.now() }) // Assign a unique ID
}

// Function to edit an existing donation
const editDonation = (donation: Donation) => {
  const index = donations.value.findIndex((d) => d.id === donation.id)
  if (index !== -1) {
    donations.value[index] = donation
  }
}

// Function to delete a donation
const deleteDonation = (id: number) => {
  donations.value = donations.value.filter((d) => d.id !== id)
}

// Computed properties for statistics
const totalAmount = computed(() =>
  donations.value.reduce((sum, donation) => sum + donation.amount, 0)
)
const totalDonations = computed(() => donations.value.length)

export default function useDonations() {
  return {
    donations,
    addDonation,
    editDonation,
    deleteDonation,
    totalAmount,
    totalDonations
  }
}

export type { Donation }
