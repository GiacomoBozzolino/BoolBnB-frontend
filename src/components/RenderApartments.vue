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

  computed:{
  },

  methods: {
    getApartments() {
      store.loading = true
      axios.get(`${store.apartmentsUrl}/api/apartments`).then((response) => {
        store.apartments = response.data.results;
        // per il loading
        if(response.data.success){
            store.apartments = response.data.results;
            store.loading = false;
        }
      });
    },

    // Controlla se l'ID dell'elemento è presente anche nell'array2
    shouldShowItem() {
      return store.apartments.filter((apartment) => {
        return !store.sponsoredApartments.some(
          (sponsoredApartment) => sponsoredApartment.id === apartment.id
        );
      });
    }

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
        <div class="card m-3" style="width: 23rem; " v-for="(apartment, index) in shouldShowItem()" :key="index" v-if="shouldShowItem">
          <div class="card-image-top">
            <!-- da sistemare lo storage -->
            <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid" />
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ apartment.title }}</h4>
            <div class="description-card overflow-auto mt-2">
              <!-- INDIRIZZO -->
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-location-dot"></i> Indirizzo: 
                <strong>{{ apartment.address }}</strong>
              </p> 
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-person-shelter"></i> Numero stanze:
                <strong>{{ apartment.n_rooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bath"></i> Numero bagni:
                <strong>{{ apartment.n_bathrooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bed"></i> Numero letti:
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