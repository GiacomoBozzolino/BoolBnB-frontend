<script>
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
  
  methods: {
    getSponsoredApartaments() {
      axios.get(store.apartmentsUrl+'/api/sponsored-apartments')
        .then((response) => {
          // Filtra gli appartamenti in base alla data corrente e alla presenza di sponsor
          const currentDate = new Date();
          this.sponsoredApartments = response.data.filter(apartment => 
            apartment.sponsors.length > 0 && new Date(apartment.sponsors[0].pivot.end_at) > currentDate
          );
          console.log(this.sponsoredApartments);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },

  created() {
    this.getSponsoredApartaments();
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
        <div v-for="apartment in this.sponsoredApartments" :key="apartment.id" class="col-md-4 mb-4">
          <div class="card p-3 bg-warning">
            <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="card-img-top" alt="Apartment Image">
            <div class="card-body">
              <h5 class="card-title">{{ apartment.title }}</h5>
              <p class="card-text">{{ apartment.description }}</p>
              <!-- Altre informazioni sull'appartamento -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  

<style lang="scss" scoped>
</style>