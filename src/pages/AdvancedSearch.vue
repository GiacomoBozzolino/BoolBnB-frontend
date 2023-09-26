<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import axios from "axios";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";
import MapApartament from "../components/MapApartament.vue";

export default {
  name: "AdvancedSearch",
  components:{
    AppLoader,
    SearchBar,
    RenderApartments,
    MapApartament,
  },

  data() {
    return {
      searchCity: '',
      suggestions: [],
      store,
      n_rooms:'',
      n_beds:'',
      distance:'',
    }

  },


  computed:{
    //FUNZIONE FILTRAGGIO <-------FUNZIONA
    filteredApartments() {
      return store.apartments.filter((apartments) => {
        const query = store.searchApartments.toLowerCase();
        // console.log(query);
        // Esegui una ricerca per nome, città o numero di stanze
        return (
          apartments.title.toLowerCase().includes(query)
        );

      });
    },
  },


  methods: {
    
    // FUNZIONE RICERCA SUGGERIMENTI
    async searchSuggestions() {
      if (this.searchCity !== '') {
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`, {
          });

          this.suggestions = response.data.results;

          this.button = document.querySelector('.btn')

          if (this.suggestions == 0) {
            this.button.disabled = true
          }else{
            this.button.disabled = false
          }
        } 
       else {
        this.suggestions = [];
      }
    },

// FUNZIONE DI RICERCA INDIRIZZO NEL DB
    async searchAdvancedApartment(city) {
      if (this.searchCity !== '') {
          const response = await axios.get(`http://localhost:8000/api/searchAdvanced`, {
            params: {
              city: city,
              n_rooms:this.n_rooms,
              n_beds:this.n_beds,
              distance:this.distance,
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

  //FUNZIONE PER VISUALIZZARE LA MAPPA
  viewMap(longitude, latitude) {
    let map = tt.map({
      container: "map",
      key: "zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p",
      center: [longitude, latitude],
      zoom: 15
    });

    var marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
  }

};
</script>

<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="searchAdvancedApartment(searchCity)" autocomplete="off">
        <div class="form-floating mb-3 col-5 col-lg-8 mx-auto ms-lg-0">
          <input
            type="text"
            class="form-control text-dark"
            id="city"
            placeholder="Roma"
            v-model="searchCity"
            @input="searchSuggestions"
          >
          <label class="text-dark" for="city">Città</label>
        </div>
        <!-- Suggerimenti -->
        <div v-if="suggestions.length > 0" class="suggestions">
          <ul>
            <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
              {{ suggestion.address.freeformAddress }}
            </li>
          </ul>
        </div>

        <div class="col-11 p-2">
              <label for="distance" class="form-label">Imposta raggio di ricerca</label>
              <input type="text" class="form-control" v-model="distance" id="distance" name="n_rooms"
              min="1" max="50">
              
        </div>
        <div class="d-flex">
          <div class="col-6 p-2">
              <label for="n_rooms" class="form-label">Numero Stanze <font-awesome-icon :icon="['fas', 'house']" /></label>
              <input type="number" class="form-control" v-model="n_rooms" id="n_rooms" name="n_rooms"
              min="1" max="15">
          </div>
          <div class="col-6 p-2">
              <label for="n_beds" class="form-label">Numero Letti <font-awesome-icon :icon="['fas', 'house']" /></label>
              <input type="number" class="form-control" v-model="n_beds" id="n_beds" name="n_beds"
              min="1" max="15">
          </div>
        </div>
        

        <!-- Bottone Cerca -->
        <button type="submit" class="btn btn-primary" :disabled="searchCity === '' " >Cerca</button>

      </form>
    </div>
    <div class="container">
      <div class="row">
          <div class="col-12 mt-3">
              <div class="row justify-content-center">
                <MapApartment :apartments="filtered"></MapApartment>
              </div> 
          </div>
        </div>
    </div>
    <div v-if="filteredApartments.length === 0" class="no-results">
      <p>-- Ci spiace ma non ci sono risultati --</p>
    </div>
    <div v-else>
      <div class="col-12 d-flex flex-wrap my-4">
        <div class="card m-3" style="width: 23rem; " v-for="(apartment, index) in filteredApartments" :key="index">
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
            <router-link class="btn s btn-sm btn-primary" :to="{name:'SingleApartment', params:{slug:apartment.slug}}">Guarda il progetto</router-link>
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

.no-results {
  font-size: larger;
  text-align: center;
  margin: 100px;
  color: red;
}

.map {
  height: 500px;
  width: 100%;
}
</style>