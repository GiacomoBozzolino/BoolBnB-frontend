
<script>
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";

export default {
  name: "AdvancedSearch",
  components: {
    AppLoader,
    SearchBar,
    RenderApartments,
  },
  data() {
    return {
      searchCity: store.searchCity || this.$route.params.searchCity ||  '',
      n_rooms: this.$route.params.n_rooms || '',
      n_beds: this.$route.params.n_beds || '',
      distance: this.$route.params.distance || 0,
      suggestions: [],
      store,

      // Range

    }
  },
  computed: {
    // Funziona questa??
    filteredApartments() {
      return store.apartments.filter((apartments) => {
        const query = store.searchApartments.toLowerCase();
        return apartments.title.toLowerCase().includes(query);
      });
    },
    
    // Range
    rangeValue() {
      return `${this.distance}km`;
    },

  },
  methods: {
    async searchSuggestions() {
      if (this.searchCity !== '') {
        const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`, {
        });
        this.suggestions = response.data.results;
      } else {
        this.suggestions = [];
      }
    },
    async searchAdvancedApartment(city) {
      if (this.searchCity !== '') {
        const response = await axios.get(`http://localhost:8000/api/searchAdvanced`, {
          params: {
            city: city,
            n_rooms: this.n_rooms,
            n_beds: this.n_beds,
            distance: this.distance,
          },
        });
        store.apartments = response.data;
        store.city = city;
        this.$router.push({
          name: 'AdvancedSearch',
          params: {
            searchCity: `${this.searchCity}`,
            distance: `${this.distance}`,
            n_rooms: `${this.n_rooms}`,
            n_beds: `${this.n_beds}`,
          }
        });
      }
    },
    selectSuggestion(suggestion) {
      this.searchCity = suggestion.address.freeformAddress;
      this.suggestions = [];
      console.log(this.searchCity)
    },
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <!-- FORM CONTAINER -->
      <div class="form-container sidebar col-2 border-end border-3 bg-color-search ">
        <h2 class="px-2 pt-2">Ricerca avanzata</h2>
        <hr class="m-0 mb-3">
        <form @submit.prevent="searchAdvancedApartment(searchCity)" autocomplete="off">
          <!-- SEARCH CONTAINER -->
          <div class="serach-container p-2">
            <label class="form-label" for="city">Cerca la tua città</label>
            <div class="d-flex align-items-center">
              <input
                type="text"
                class="form-control text-dark"
                id="city"
                placeholder="Roma"
                v-model="searchCity"
                @input="searchSuggestions"
              >
            </div>
                      <!-- Suggerimenti -->
          <div v-if="suggestions.length > 0" class="suggestions">
            <ul>
              <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
                {{ suggestion.address.freeformAddress }}
              </li>
            </ul>
          </div>
          </div>
          <!-- RANGE SEARCH -->
          <div class=" p-2">
            <label for="distance" class="form-label mt-2">Imposta raggio di ricerca</label>
            <div class="range-container d-flex align-items-center justify-content-between">
              <input type="range" class="form-range border rounded-5 p-2" v-model="distance" id="distance" name="n_rooms" min="1" max="300">
              <span class="ms-3 badge bg-primary badge-pill px-3">{{ rangeValue}}</span>
            </div>
          </div>

          <!-- RANGE ROOMS -->
          <div class="d-flex">
            <div class="p-2">
              <label for="n_rooms" class="form-label">Numero Stanze <font-awesome-icon :icon="['fas', 'house']" /></label>
              <input type="number" class="form-control" v-model="n_rooms" id="n_rooms" name="n_rooms" min="1" max="15" >
            </div>
            <!-- RANGE BEDS -->
            <div class=" p-2">
              <label for="n_beds" class="form-label">Numero Letti <font-awesome-icon :icon="['fas', 'house']" /></label>
              <input type="number" class="form-control" v-model="n_beds" id="n_beds" name="n_beds" min="1" max="15">
            </div>
          </div>

          <!-- Bottone Cerca -->
          <div class="d-flex align-items-center justify-content-center mt-2">
            <button type="submit" class="btn btn-primary" :disabled="searchCity === ''">Cerca</button>
          </div>

        </form>
      </div>

      <div class="col-10 d-flex flex-wrap justify-content-center my-4">
        <div class="card m-3" style="width: 23rem;" v-for="(apartment, index) in filteredApartments" :key="index">
          <div class="card-image-top">
            <!-- da sistemare lo storage -->
            <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid" />
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">{{ apartment.title }}</h4>
            <div class="description-card overflow-auto mt-2">
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-location-dot"></i> Indirizzo:
                <strong>{{ apartment.address }}</strong>
              </p>
              <p class="card-text py-2 text-start">
                <i class="fa-solid fa-person-shelter"></i> Numero camere:
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
.btn:disabled {
  background-color: gray;
}

// SEARCH FORM
.bg-color-search{
  background-color: #B2B5E0; 
}
</style>
