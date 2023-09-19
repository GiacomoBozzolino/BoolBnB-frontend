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
    };
  },

  methods: {
    getApartments() {
      store.loading = true
      axios.get(`${store.apartmensUrl}/api/apartments`).then((response) => {
        
        // per il loading
        if(response.data.success){
            store.apartments = response.data.results;
            store.loading = false;
        }
      });
    },
  },

  created() {
    this.getApartments();
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
        <div class="card m-3" style="width: 23rem; " v-for="(apartment, index) in store.apartments" :key="index">
          <div class="card-image-top">
            <!-- da sistemare lo storage -->
            <img :src="`${store.apartmensUrl}/storage/${apartment.cover_img}`" class="img-fluid" />
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ apartment.title }}</h4>
            <div class="description-card overflow-auto mt-2">
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-person-shelter"></i> Numero letti:
                <strong>{{ apartment.n_rooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bath"></i> Numero bagni:
                <strong>{{ apartment.n_bathrooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bed"></i> Numero letto:
                <strong>{{ apartment.n_beds }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-file-medical"></i> Breve descrizione:
                <strong>{{ apartment.description }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-ruler-combined"></i> Metri quadri:
                <strong>{{ apartment.square_meters }}</strong>
              </p> 
            </div>
          </div>
          <div class="card-footer">
            <router-link class="btn btn-sm btn-primary" :to="{name:'SingleApartment', params:{slug:apartment.slug}}">Guarda il progetto</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z {
  background-color: red;
}
</style>
