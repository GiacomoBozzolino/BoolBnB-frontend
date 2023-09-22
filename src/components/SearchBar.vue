  
<script>
import { store } from "../store";

export default {

  data() {
    return {
      store,
    };
  },

  methods: {

  },
};
</script>


<template>

  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <!-- Aggiungo col-12 col-md-6 per occupare 6 colonne su schermi medi e grandi -->
        <div class="input-group">
          <input type="search" class="form-control rounded" v-model="store.searchApartments" name="apartment-search" id="apartment-search" placeholder="Cerca un appartamento" @keyup.enter="$emit('apartmentSearch')">
          <div class="input-group-append">
              <button class="btn btn-warning ms-2" type="button" @click="$emit('apartmentSearch')">Cerca</button>
          </div>
        </div>
      </div>
    </div>
</div>

<!-- <input v-model="searchQuery" placeholder="Cerca per città o indirizzo" /> -->

</template>