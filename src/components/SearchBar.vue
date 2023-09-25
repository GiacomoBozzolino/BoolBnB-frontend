
<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      searchCity: '',
      suggestions: [],
    };
  },
  methods: {
    // FUNZIONE RICERCA SUGGERIMENTI
    async searchSuggestions() {
      if (this.searchCity !== '') {
          const response = await axios.get(`https://api.tomtom.com/search/2/search/${this.searchCity}.json?key=zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p&typeahead=true`, {
            
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

          this.$router.push({ name: 'Home' });
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
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <form @submit.prevent="searchApartment(searchCity)" autocomplete="off">
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
          <!-- Bottone Cerca -->
          <div class="d-flex d-lg-block justify-content-center py-2 py-lg-0">
            <button type="submit" class="btn btn-primary" :disabled="searchCity === '' " >Cerca</button>
          </div>

        </form>
      </div>
    </div>
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
</style>
