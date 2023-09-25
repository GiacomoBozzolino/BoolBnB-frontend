<script>
// importo stro e aCSios dove si trova la base API
import { store } from "../store";
import AppLoader from '../components/AppLoader.vue';
import SearchBar from "../components/SearchBar.vue";
import RenderApartments from "../components/RenderApartments.vue";


export default {
  name: "HomePage",
  components:{
    AppLoader,
    SearchBar,
    RenderApartments
            
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
        // console.log(query);
        // Esegui una ricerca per nome, città o numero di stanze
        return (
          apartments.title.toLowerCase().includes(query)
        );

      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 mx-auto d-flex justify-content-center align-items-center">
        <SearchBar @apartmentSearch="filteredApartments"/>
      </div>
    </div>
    <RenderApartments/>
  </div>
</template>

<style lang="scss" scoped>
.z {
  background-color: red;
}
</style>