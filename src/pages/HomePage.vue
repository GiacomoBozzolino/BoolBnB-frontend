<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import axios from "axios";
import SearchBar from "../components/SearchBar.vue";


export default {
  name: "HomePage",

  components :{
    SearchBar,
  },

  data() {
    return {
      store,
    };
  },

  computed:{
    //FUNZIONE FILTRAGGIO <-------FUNZIONA
    filteredApartments() {
      return store.apartments.filter((apartments) => {
        const query = store.searchApartments.toLowerCase();
        console.log(query);
        // Esegui una ricerca per nome, città o numero di stanze
        return (
          apartments.title.toLowerCase().includes(query)
        );

      });
    },
  },

  methods: {
    getApartments() {
      // store.loading = true
      axios.get(`${store.apartmentsUrl}/api/apartments`).then((response) => {
        store.apartments = response.data.results;
        // per il loading
        // if(response.data.success){
        //     store.apartments = response.data.resuslts;
        //     store.loading = false;
        // }
      });
    },

    filteredApartments(){
      
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
    <SearchBar @apartmentSearch="filteredApartments"/>
      <div class="col-12 d-flex flex-wrap my-4">
        <div
          class="card m-3"
          style="width: 23rem; height: 45rem"
          v-for="(items, index) in filteredApartments"
          :key="index"
        >
          <div class="card-image-top">
            <!-- da sistemare lo storage -->
            <img :src="`${store.apartmentsUrl}/storage/${items.cover_img}`" class="img-fluid" />
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ items.title }}</h4>
            <div class="description-card overflow-auto mt-2">
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-person-shelter"></i> Numero stanze:
                <strong>{{ items.n_rooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bath"></i> Numero bagni:
                <strong>{{ items.n_bathrooms }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-bed"></i> Numero letto:
                <strong>{{ items.n_beds }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-file-medical"></i> Breve descrizione:
                <strong>{{ items.description }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-ruler-combined"></i> Metri quadri:
                <strong>{{ items.square_meters }}</strong>
              </p>
            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="btn btn-sm btn-primary"> Leggi il progetto</a>
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