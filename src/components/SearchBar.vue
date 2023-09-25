
<script>
import axios from 'axios';
import { store } from '../store';

export default {

  data() {
    return {
      store,
      searchCity:'',
    };
  },




  methods: {
    async searchApartment(city) {
            if(this.searchCity !== ''){
              const response = await axios.get(`http://localhost:8000/api/search`, {
                params: {
                    city: city,
                },
                });
                console.log(response)
                // Chiamata alla mutazione per salvare i risultati nello store
                store.apartments = response.data;
                store.city = city,
                console.log(store.apartments),

                // Reindirizzamento
                this.$router.push({ name: 'Home' });
            } 

            }
                

          
  },
}

</script>




<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
        <form @submit.prevent="searchApartment($event.target.city.value)">
            <div class="form-floating mb-3 col-5 col-lg-8 mx-auto ms-lg-0">
                <input type="text" class="form-control text-dark" id="city" placeholder="Roma" name="city" v-model="searchCity">
                <label name="city" class="text-dark" for="floatingInput">Città</label>
            </div>
            <!-- bottone cerca -->
            <div class="d-flex d-lg-block justify-content-center py-2 py-lg-0"  >
                <button type="submit" value="Cerca" class="btn btn-primary" > cerca
                </button>
            </div>

        </form>
      </div>
    </div>
    
  </div>
</template>






<style scoped>
.address-result-item {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}
</style>