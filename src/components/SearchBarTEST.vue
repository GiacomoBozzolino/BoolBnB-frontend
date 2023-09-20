<template>

  <div class="container">
    <div class="row">
      <!-- SEARCHBAR WEB CON FILTRI -->
      <div class="col-12 d-flex align-items-center justify-content-evenly">
        <input v-model="searchQuery" placeholder="Cerca per città o indirizzo" @input="search" />
        <!-- Aggiungi i filtri di ricerca qui -->
        <button @click="clearFilters">Rimuovi filtri</button>
        <!-- Mostra i risultati della ricerca qui -->
        <ul>
          <li v-for="apartment in searchResults" :key="apartment.id">
              {{ apartment.name }} - {{ apartment.city }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- METODO SENZA FILTRI -->
  <template>
  <div>
    <input type="text" v-model="searchQuery" @input="search">
    <ul>
      <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
    </ul>
  </div>
  </template>

</template>

<!-- SCRIPT -->
<script>
  export default {
    
    data() {
      return {
        searchQuery: "",
        searchResults: [],
      };
    },
    
    
    methods: {
      async search() {
        try {
          const response = await axios.get(`/api/search?query=${this.searchQuery}`);
          this.searchResults = response.data;
        } catch (error) {
          console.error('Errore nella ricerca:', error);
        }
      }
    }
    
  };
  
  // METODO CON FILTRI
  // methods: {
    
  //   search() {
  //     axios.get(`http://localhost:8000`, {
  //       params: {
  //         query: this.searchQuery,
  //         // Aggiungi altri parametri di filtro (numero di stanze, letti, ecc.)
  //       },
  //     })
      
  //     .then((response) => {
  //       this.searchResults = response.data; // Aggiorna i risultati con i dati ricevuti dalla API
  //     })
      
  //     .catch((error) => {
  //       console.error("Errore nella ricerca:", error);
  //     });
  //   },  
    
  //   clearFilters() {
  //     // Implementa la logica per rimuovere i filtri di ricerca
  //   },
  // },
  
</script>
