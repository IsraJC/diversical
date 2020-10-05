<template>
  <v-app>
    <v-main>
      <Calendar/>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from '../components/Calendar.vue';

export default {
  name: 'CalendarPage',

  components: {
    Calendar,
  },

  data: () => ({
    //
  }),
};
</script>
