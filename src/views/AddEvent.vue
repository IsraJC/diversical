<template>
  <div class="addevent">
    <h1></h1>
    <AddEventForm/>
  </div>
</template>

<script>
import AddEventForm from '../components/AddEventForm.vue'

export default {
  name: 'AddEvent',
  components: {
    AddEventForm
  }
}
</script>
