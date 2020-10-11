<template>
  <div id="home">
    
      <v-app id="inspire">
        <v-carousel
          cycle
          height="600"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
          >
            <v-sheet
              :color="colors[i]"
              height="100%"
            >
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">
                  {{ slide }} Event
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-app>

      <div class="col2">
        <div class="row">
          <div class="col-md-4">
            <img src="../images/DiversiCal_logo.png">
          </div>
          <div class="col-md-8">
            <p>DiversiCal is a resource which "compiles" diversity-centered events such as hackathons, seminars, workshops and talks.
            Companies can sign up, login and add events, which will be displayed on the calendar.</p>
          </div>
        </div>
      </div>

  </div>
</template> 

<script>
export default {
  data () {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  }
}
</script>


<style scoped lang="scss">
  #home {
    background-color: #EAEDE8;
  }
  img {
    max-width: 100%;
    position: relative;
    top: 0%;
    padding-left: 70px;
  }
  section {
    margin-top: 0px;
  }
  .col2 {
    padding: 0px;
    background-color: white;
    margin-top:  -120px;
  } 
  p {
    font-size: 18px;
    text-align: right;
    position: relative;
    top: 10%;
    padding-left: 20px;
    padding-right: 70px;
  }
  v-carousel {
    margin: 20px;
    padding-top: 20px;
    height: 100%
  }
  #col-md-6 {
    margin-top: -100px;
  }
  @import '../assets/LoginFormSCSS/app.scss';
  
</style>