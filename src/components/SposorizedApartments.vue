<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';


export default {
  name: "HomePage",
  components:{
    AppLoader,
            
  },

  data() {
    return {
      store,
      sponsoredApartments: [],
    };
  },

  mounted() {
    axios.get(store.apartmentsUrl + '/api/sponsored')
      .then((response) => {
        // Filtra solo gli appartamenti sponsorizzati
        this.sponsoredApartments = response.data.filter(apartment => apartment.sponsor_id !== null);
        console.log(this.sponsoredApartments);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  
};
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center py-5" v-if="store.loading">
          <AppLoader/>
        </div>
        <div class="col-12 d-flex flex-wrap my-4" v-else>
          <!-- Itera sugli appartamenti sponsorizzati e mostra le informazioni -->
          <div v-for="apartment in sponsoredApartments" :key="apartment.id" class="col-4">
            <div class="card">
              <!-- <img :src="apartment.cover_img" class="card-img-top" alt="Apartment Image"> -->
              <div class="card-body">
                <h5 class="card-title">{{ apartment.title }}</h5>
                <p class="card-text">{{ apartment.description }}</p>
                <!-- Altre informazioni dell'appartamento -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<style lang="scss" scoped>
</style>