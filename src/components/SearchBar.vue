<template>
  <!-- <div class="container">
      <div class="row">
          <div class="col-6 d-flex align-items-center input-group rounded">
              <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <span class="input-group-text border-0" id="search-addon">
                  <i class="fas fa-search"></i>
              </span>
          </div>
      </div>
  </div> -->


  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <!-- Aggiungo col-12 col-md-6 per occupare 6 colonne su schermi medi e grandi -->
        <div class="input-group">
          <input type="search" class="form-control rounded" v-model="input" name="apartment-search" id="apartment-search" placeholder="Cerca un appartamento">
          <div class="input-group-append">
              <button class="btn btn-warning" type="button">Cerca</button>
          </div>
        </div>
      </div>
    </div>
</div>

  <!-- <input v-model="searchQuery" placeholder="Cerca per città o indirizzo" /> -->



</template>

  
<script>
  export default {

    data() {
      return {
        searchQuery: "",
        searchResults: [],
      };
    },

    methods: {

        search() {
            axios
                .get(`http://localhost:8000`, {
                params: {
                    query: this.searchQuery,
                    // Aggiungi altri parametri di filtro come numero di stanze, posti letto, ecc.
                },
                })

                .then((response) => {
                this.searchResults = response.data; // Aggiorna i risultati con i dati ricevuti dalla API
                })

                .catch((error) => {
                console.error("Errore nella ricerca:", error);
                });
        },  

        clearFilters() {
        // Implementa la logica per rimuovere i filtri di ricerca
        },
    },
  };
</script>
  