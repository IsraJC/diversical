<template>
  <v-app>
    <v-content>
      <Calendar/>
    </v-content>
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
