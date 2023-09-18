<script>
    // importo stro e aCSios dove si trova la base API
    import { store } from '../store';
    import axios from 'axios';



    export default {
        name: "HomePage",

        data() {
            return {
                store,
            }
        },

        methods: {
            getApartments(){
                // store.loading = true
                axios.get(`${store.apartmensUrl}/api/apartments`).then((response) =>{
                    store.apartments = response.data.results;
                    console.log(store.apartments);
                    // per il loading
                    // if(response.data.success){
                    //     store.apartments = response.data.resuslt;
                    //     store.loading = false;
                    // }
                })
            }
        },

        created(){
            this.getApartments();
        },
    }
</script>


<template >
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-4" v-for="(items, index) in  store.apartments " :key="index">
                <div class="card my-3 min-height-200px">
                    <div class="card-image-top">
                        <img :src="`${baseUrl}/storage/${items.cover_img}`" class="img-fluid">
                    </div>
                    <div class="card-body">
                        <div class="card-title">
                            <h2>{{ items.title }}</h2>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="btn btn-sm btn-primary"> Leggi il progetto</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>





<style lang="scss" scoped>
    
</style>