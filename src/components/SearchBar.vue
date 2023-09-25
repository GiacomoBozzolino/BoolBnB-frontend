<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <div class="input-group">
          <input type="search" class="form-control rounded" v-model="store.searchApartments" name="apartment-search" id="autocomplete-address" placeholder="Inserisci il tuo indirizzo" @input="getAddressResults" required>
          <div class="input-group-append">
            <button class="btn btn-warning" type="button" @click="performApartmentSearch">Cerca</button>
          </div>
        </div>
      </div>
    </div>
    <div id="address-results">
      <div v-for="result in resultsContainer" :key="result.id" class="address-result-item" @click="selectAddress(result)">
        {{ result.address.freeformAddress }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const apiKey = 'zXBjzKdSap3QJnfDcfFqd0Ame7xXpi1p';
const resultsContainer = ref([]);

function getAddressResults() {
  let searchValue = document.getElementById('autocomplete-address').value;

  axios.get(`https://api.tomtom.com/search/2/search/${searchValue}.json?key=${apiKey}&language=it-IT&idxSets=Str&countrySet=IT&typeahead=true`)
    .then(response => {
      resultsContainer.value = response.data.results || [];
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function selectAddress(result) {
  store.searchApartments = result.address.freeformAddress;
  resultsContainer.value = [];
  document.activeElement.blur();
}
</script>

<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    performApartmentSearch() {
      // Add your logic for apartment search here
    }
  }
};
</script>

<style scoped>
.address-result-item {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}
</style>