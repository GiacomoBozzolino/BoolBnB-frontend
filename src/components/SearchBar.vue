
<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      suggestions: [],
    };
  },
  methods: {
    // FUNZIONE RICERCA SUGGERIMENTI
    async searchSuggestions() {
      if (store.searchCity !== '') {
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${store.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`, {
            
          });

          this.suggestions = response.data.results;


          this.button = document.querySelector('.s')

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
    async searchApartment(city) {
      if (store.searchCity !== '') {
        
          const response = await axios.get(`http://localhost:8000/api/search`, {
            params: {
              city: city,
            },
          });

          store.apartments = response.data;
          store.city = city;

          console.log(store.apartments)

          this.$router.push({ name: 'AdvancedSearch' });

          
        } 
       
    },

    // FUNZIONE SELEZIONE INDIRIZZO DAI SUGGERIMENTI
    selectSuggestion(suggestion) {
      store.searchCity = suggestion.address.freeformAddress;
      this.suggestions = [];
      console.log(store.searchCity)
    },
  },
};
</script>

<template>
  <div class="input-group">
    <form @submit.prevent="searchApartment(store.searchCity)" autocomplete="off" class="d-flex">
      <div>
        <div class="form-group">
          
          <input
            type="text"
            class="form-control text-dark"
            id="city"
            placeholder="Cerca"
            v-model="store.searchCity"
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
        <div class="form-group px-2 ">
          <button type="submit" class="btn btn-primary" :disabled="store.searchCity === '' " >Cerca</button>
        </div>
    </form>
      <!-- Bottone Cerca -->
  </div>
</template>

<style scoped>
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
