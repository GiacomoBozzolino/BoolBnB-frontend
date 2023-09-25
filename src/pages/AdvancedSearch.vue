<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";

export default {
  name: "AdvancedSearch",
  components:{
    AppLoader,
    SearchBar,
    RenderApartments,
},

data() {
    return {
      searchCity: '',
      suggestions: [],
      store,
    };
  },


  methods: {
    
    // FUNZIONE RICERCA SUGGERIMENTI
    async searchSuggestions() {
      if (this.searchCity !== '') {
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`, {
            
          });

          this.suggestions = response.data.results;
        } 
       else {
        this.suggestions = [];
      }
    },

// FUNZIONE DI RICERCA INDIRIZZO NEL DB
    async searchApartment(city) {
      if (this.searchCity !== '') {
        
          const response = await axios.get(`http://localhost:8000/api/search`, {
            params: {
              city: city,
            },
          });

          store.apartments = response.data;
          store.city = city;

          this.$router.push({ name: 'AdvancedSearch' });
        } 
       
    },

    // FUNZIONE SELEZIONE INDIRIZZO DAI SUGGERIMENTI
    selectSuggestion(suggestion) {
      this.searchCity = suggestion.address.freeformAddress;
      this.suggestions = [];
      console.log(this.searchCity)
    },
  },

};
</script>

<template>
  <div class="container">
    <div class="row">
        <h1>PAGINA RICERCA AVANZATA</h1>
        <div class="col-12 col-md-6 mx-auto d-flex justify-content-center align-items-center">
            <SearchBar @apartmentsSearch="filteredApartments"/>
        </div>
        <div class="col-12 d-flex flex-wrap my-4">
        <div class="card m-3" style="width: 23rem; " v-for="(apartment, index) in filteredApartments" :key="index">
          <div class="card-image-top">
            <!-- da sistemare lo storage -->
            <!-- <img :src="${store.apartmentsUrl}/storage/${apartment.cover_img}" class="img-fluid" /> -->
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ apartment.title }}</h4>
            <div class="description-card overflow-auto mt-2">
                <p class="card-text py-2 text-start">
                <i class="fa-solid fa-location-dot"></i> Indirizzo: 
                <strong>{{ apartment.address }}</strong>
              </p> 
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
.suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 999;
  max-height: 150px;
  overflow-y: auto;
}

.suggestions ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}


.btn:disabled{
  background-color: gray;
}
</style>