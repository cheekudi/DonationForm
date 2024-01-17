<template>
  <form @submit.prevent="handleSubmit">
    <!-- Donor's Name Input -->
    <div class="form-group">
      <label for="donorName">Donor's Name:</label>
      <input type="text" id="donorName" v-model="donation.donorName" required />
    </div>

    <!-- Donation Type Select -->
    <div class="form-group">
      <label for="type">Type of Donation:</label>
      <select id="type" v-model="donation.type">
        <option value="money">Money</option>
        <option value="food">Food</option>
        <option value="clothing">Clothing</option>
        <!-- Add more options as needed -->
      </select>
    </div>

    <!-- Donation Amount Input -->
    <div class="form-group">
      <label for="amount">Amount/Quantity:</label>
      <input type="number" id="amount" v-model.number="donation.amount" required min="1" />
    </div>

    <!-- Donation Date Input -->
    <div class="form-group">
      <label for="date">Date of Donation:</label>
      <input type="date" id="date" v-model="donation.date" required />
    </div>

    <button type="submit">{{ isEditMode ? 'Update Donation' : 'Save Donation' }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  props: {
    initialDonation: {
      type: Object,
      default: () => ({
        donorName: '',
        type: 'money',
        amount: 0,
        date: new Date().toISOString().substring(0, 10)
      })
    }
  },
  emits: ['save'],
  setup(props, { emit }) {
    const donation = ref({ ...props.initialDonation })

    const isEditMode = computed(() => {
      return props.initialDonation && props.initialDonation.id > 0
    })

    const handleSubmit = () => {
      emit('save', donation.value)
    }

    // Watch for changes in initialDonation prop and update the local donation state
    watch(
      () => props.initialDonation,
      (newDonation) => {
        donation.value = { ...newDonation }
      },
      { deep: true }
    )
    return {
      donation,
      handleSubmit,
      isEditMode
    }
  }
})
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #5d647b;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #4e5566;
}
</style>
