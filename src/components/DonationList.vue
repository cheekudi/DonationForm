<template>
  <div>
    <ul>
      <li v-for="donation in donations" :key="donation.id">
        <div>
          {{ donation.donorName }} - {{ donation.type }} - {{ donation.amount }} -
          {{ donation.date }}
        </div>
        <button @click="editDonation(donation)">Edit</button>
        <button @click="deleteDonation(donation.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Donation } from '@/stores/useDonations'

export default defineComponent({
  props: {
    donations: {
      type: Array as PropType<Donation[]>,
      required: true
    }
  },
  emits: ['edit-donation', 'delete-donation'],
  setup(_, { emit }) {
    const editDonation = (donation: Donation) => {
      emit('edit-donation', donation)
    }

    const deleteDonation = (id: number) => {
      emit('delete-donation', id)
    }

    return {
      editDonation,
      deleteDonation
    }
  }
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #5d647b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #4e5566;
}
</style>
